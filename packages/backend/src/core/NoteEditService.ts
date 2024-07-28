/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { setImmediate } from 'node:timers/promises';
import * as mfm from 'mfm-js';
import { In, DataSource, LessThan } from 'typeorm';
import * as Redis from 'ioredis';
import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { extractMentions } from '@/misc/extract-mentions.js';
import { extractCustomEmojisFromMfm } from '@/misc/extract-custom-emojis-from-mfm.js';
import { extractHashtags } from '@/misc/extract-hashtags.js';
import type { IMentionedRemoteUsers } from '@/models/Note.js';
import { MiNote } from '@/models/Note.js';
import type { ChannelFollowingsRepository, ChannelsRepository, FollowingsRepository, InstancesRepository, MiFollowing, MutingsRepository, NotesRepository, NoteThreadMutingsRepository, UserListMembershipsRepository, UserProfilesRepository, UsersRepository, PollsRepository, DriveFilesRepository } from '@/models/_.js';
import type { MiDriveFile } from '@/models/DriveFile.js';
import type { MiApp } from '@/models/App.js';
import { concat } from '@/misc/prelude/array.js';
import { IdService } from '@/core/IdService.js';
import type { MiUser, MiLocalUser, MiRemoteUser } from '@/models/User.js';
import type { IPoll } from '@/models/Poll.js';
import { isDuplicateKeyValueError } from '@/misc/is-duplicate-key-value-error.js';
import type { MiChannel } from '@/models/Channel.js';
import { normalizeForSearch } from '@/misc/normalize-for-search.js';
import { RelayService } from '@/core/RelayService.js';
import { FederatedInstanceService } from '@/core/FederatedInstanceService.js';
import { DI } from '@/di-symbols.js';
import type { Config } from '@/config.js';
import NotesChart from '@/core/chart/charts/notes.js';
import PerUserNotesChart from '@/core/chart/charts/per-user-notes.js';
import InstanceChart from '@/core/chart/charts/instance.js';
import ActiveUsersChart from '@/core/chart/charts/active-users.js';
import { GlobalEventService } from '@/core/GlobalEventService.js';
import { NotificationService } from '@/core/NotificationService.js';
import { HashtagService } from '@/core/HashtagService.js';
import { AntennaService } from '@/core/AntennaService.js';
import { QueueService } from '@/core/QueueService.js';
import { NoteEntityService } from '@/core/entities/NoteEntityService.js';
import { UserEntityService } from '@/core/entities/UserEntityService.js';
import { ApRendererService } from '@/core/activitypub/ApRendererService.js';
import { ApDeliverManagerService } from '@/core/activitypub/ApDeliverManagerService.js';
import { NoteReadService } from '@/core/NoteReadService.js';
import { RemoteUserResolveService } from '@/core/RemoteUserResolveService.js';
import { bindThis } from '@/decorators.js';
import { DB_MAX_NOTE_TEXT_LENGTH } from '@/const.js';
import { RoleService } from '@/core/RoleService.js';
import { MetaService } from '@/core/MetaService.js';
import { SearchService } from '@/core/SearchService.js';
import { FeaturedService } from '@/core/FeaturedService.js';
import { FanoutTimelineService } from '@/core/FanoutTimelineService.js';
import { UtilityService } from '@/core/UtilityService.js';
import { UserBlockingService } from '@/core/UserBlockingService.js';
import { ModerationLogService } from '@/core/ModerationLogService.js';

type NotificationType = 'reply' | 'renote' | 'quote' | 'mention';

class NotificationManager {
	private notifier: { id: MiUser['id']; };
	private note: MiNote;
	private queue: {
		target: MiLocalUser['id'];
		reason: NotificationType;
	}[];

	constructor(
		private mutingsRepository: MutingsRepository,
		private notificationService: NotificationService,
		notifier: { id: MiUser['id']; },
		note: MiNote,
	) {
		this.notifier = notifier;
		this.note = note;
		this.queue = [];
	}

	@bindThis
	public push(notifiee: MiLocalUser['id'], reason: NotificationType) {
		// 自分自身へは通知しない
		if (this.notifier.id === notifiee) return;

		const exist = this.queue.find(x => x.target === notifiee);

		if (exist) {
			// 「メンションされているかつ返信されている」場合は、メンションとしての通知ではなく返信としての通知にする
			if (reason !== 'mention') {
				exist.reason = reason;
			}
		} else {
			this.queue.push({
				reason: reason,
				target: notifiee,
			});
		}
	}

	@bindThis
	public async notify() {
		for (const x of this.queue) {
			if (x.reason === 'renote') {
				this.notificationService.createNotification(x.target, 'renote', {
					noteId: this.note.id,
					targetNoteId: this.note.renoteId!,
				}, this.notifier.id);
			} else {
				this.notificationService.createNotification(x.target, x.reason, {
					noteId: this.note.id,
				}, this.notifier.id);
			}
		}
	}
}

type MinimumUser = {
	id: MiUser['id'];
	host: MiUser['host'];
	username: MiUser['username'];
	uri: MiUser['uri'];
};

type Option = {
	createdAt?: Date | null;
	name?: string | null;
	text?: string | null;
	reply?: MiNote | null;
	renote?: MiNote | null;
	files?: MiDriveFile[] | null;
	poll?: IPoll | null;
	localOnly?: boolean | null;
	reactionAcceptance?: MiNote['reactionAcceptance'];
	cw?: string | null;
	visibility?: string;
	visibleUsers?: MinimumUser[] | MiUser[] | null;
	channel?: MiChannel | null;
	apMentions?: MinimumUser[] | MiUser[] | null;
	apHashtags?: string[] | null;
	apEmojis?: string[] | null;
	uri?: string | null;
	url?: string | null;
	app?: MiApp | null;
};

@Injectable()
export class NoteEditService implements OnApplicationShutdown {
	#shutdownController = new AbortController();

	public static ContainsProhibitedWordsError = class extends Error { };

	constructor(
		@Inject(DI.config)
		private config: Config,

		@Inject(DI.db)
		private db: DataSource,

		@Inject(DI.redisForTimelines)
		private redisForTimelines: Redis.Redis,

		@Inject(DI.usersRepository)
		private usersRepository: UsersRepository,

		@Inject(DI.notesRepository)
		private notesRepository: NotesRepository,

		@Inject(DI.mutingsRepository)
		private mutingsRepository: MutingsRepository,

		@Inject(DI.instancesRepository)
		private instancesRepository: InstancesRepository,

		@Inject(DI.userProfilesRepository)
		private userProfilesRepository: UserProfilesRepository,

		@Inject(DI.userListMembershipsRepository)
		private userListMembershipsRepository: UserListMembershipsRepository,

		@Inject(DI.channelsRepository)
		private channelsRepository: ChannelsRepository,

		@Inject(DI.noteThreadMutingsRepository)
		private noteThreadMutingsRepository: NoteThreadMutingsRepository,

		@Inject(DI.followingsRepository)
		private followingsRepository: FollowingsRepository,

		@Inject(DI.channelFollowingsRepository)
		private channelFollowingsRepository: ChannelFollowingsRepository,

		@Inject(DI.pollsRepository)
		private pollsRepository: PollsRepository,

		@Inject(DI.driveFilesRepository)
		private driveFilesRepository: DriveFilesRepository,

		private userEntityService: UserEntityService,
		private noteEntityService: NoteEntityService,
		private idService: IdService,
		private globalEventService: GlobalEventService,
		private queueService: QueueService,
		private fanoutTimelineService: FanoutTimelineService,
		private noteReadService: NoteReadService,
		private notificationService: NotificationService,
		private relayService: RelayService,
		private federatedInstanceService: FederatedInstanceService,
		private hashtagService: HashtagService,
		private antennaService: AntennaService,
		private featuredService: FeaturedService,
		private remoteUserResolveService: RemoteUserResolveService,
		private apDeliverManagerService: ApDeliverManagerService,
		private apRendererService: ApRendererService,
		private roleService: RoleService,
		private metaService: MetaService,
		private searchService: SearchService,
		private notesChart: NotesChart,
		private perUserNotesChart: PerUserNotesChart,
		private activeUsersChart: ActiveUsersChart,
		private instanceChart: InstanceChart,
		private utilityService: UtilityService,
		private userBlockingService: UserBlockingService,
		private moderationLogService: ModerationLogService,
	) { }

	@bindThis
	public async edit(user: {
		id: MiUser['id'];
		username: MiUser['username'];
		host: MiUser['host'];
		isBot: MiUser['isBot'];
		isCat: MiUser['isCat'];
	}, targetId: MiNote['id'], data: Option, silent = false, editor?: MiUser): Promise<MiNote> {
		const targetNote = await this.notesRepository.findOneByOrFail({ id: targetId });

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (targetNote == null) {
			throw new Error('No such note');
		}

		// if ((await this.roleService.getUserPolicies(user.id)).canEditNote !== true) {
		// 	throw new Error('Not allow edit note');
		// }

		if (data.reply == null) data.reply = targetNote.reply;
		if (data.channel == null) data.channel = targetNote.channel;

		// チャンネル外にリプライしたら対象のスコープに合わせる
		// (クライアントサイドでやっても良い処理だと思うけどとりあえずサーバーサイドで)
		if (data.reply && data.channel && data.reply.channelId !== data.channel.id) {
			if (data.reply.channelId) {
				data.channel = await this.channelsRepository.findOneBy({ id: data.reply.channelId });
			} else {
				data.channel = null;
			}
		}

		// チャンネル内にリプライしたら対象のスコープに合わせる
		// (クライアントサイドでやっても良い処理だと思うけどとりあえずサーバーサイドで)
		if (data.reply && (data.channel == null) && data.reply.channelId) {
			data.channel = await this.channelsRepository.findOneBy({ id: data.reply.channelId });
		}

		if (data.createdAt == null) data.createdAt = this.idService.parse(targetId).date;
		if (data.visibility == null) data.visibility = targetNote.visibility;
		if (data.localOnly == null) data.localOnly = targetNote.localOnly;
		if (data.renote == null && targetNote.renoteId) data.renote = await this.notesRepository.findOneByOrFail({ id: targetNote.renoteId });
		if (data.reply == null && targetNote.replyId) data.reply = await this.notesRepository.findOneByOrFail({ id: targetNote.replyId });
		if (data.poll == null) data.poll = targetNote.hasPoll ? await this.pollsRepository.findOneByOrFail({ noteId: targetId }) : null;
		if (data.files == null) data.files = await this.driveFilesRepository.findBy({ id: In(targetNote.fileIds) });
		if (data.name == null) data.name = targetNote.name;
		if (data.visibleUsers == null) data.visibleUsers = await this.usersRepository.findBy({ id: In(targetNote.visibleUserIds) });
		if (data.reactionAcceptance == null) data.reactionAcceptance = targetNote.reactionAcceptance;
		if (data.channel != null) data.visibility = 'public';
		if (data.channel != null) data.visibleUsers = [];
		if (data.channel != null) data.localOnly = true;
		const meta = await this.metaService.fetch();

		if (data.visibility === 'public' && data.channel == null) {
			const sensitiveWords = meta.sensitiveWords;
			if (this.utilityService.isKeyWordIncluded(data.cw ?? data.text ?? '', sensitiveWords)) {
				data.visibility = 'home';
			} else if ((await this.roleService.getUserPolicies(user.id)).canPublicNote === false) {
				data.visibility = 'home';
			}
		}

		if (this.utilityService.isKeyWordIncluded(data.cw ?? data.text ?? '', meta.prohibitedWords)) {
			throw new NoteEditService.ContainsProhibitedWordsError();
		}

		const inSilencedInstance = this.utilityService.isSilencedHost(meta.silencedHosts, user.host);

		if (data.visibility === 'public' && inSilencedInstance && user.host !== null) {
			data.visibility = 'home';
		}

		if (data.renote) {
			switch (data.renote.visibility) {
				case 'public':
					// public noteは無条件にrenote可能
					break;
				case 'home':
					// home noteはhome以下にrenote可能
					if (data.visibility === 'public') {
						data.visibility = 'home';
					}
					break;
				case 'followers':
					// 他人のfollowers noteはreject
					if (data.renote.userId !== user.id) {
						throw new Error('Renote target is not public or home');
					}

					// Renote対象がfollowersならfollowersにする
					data.visibility = 'followers';
					break;
				case 'specified':
					// specified / direct noteはreject
					throw new Error('Renote target is not public or home');
			}
		}

		// Check blocking
		if (data.renote && !this.isQuote(data)) {
			if (data.renote.userHost === null) {
				if (data.renote.userId !== user.id) {
					const blocked = await this.userBlockingService.checkBlocked(data.renote.userId, user.id);
					if (blocked) {
						throw new Error('blocked');
					}
				}
			}
		}

		// 返信対象がpublicではないならhomeにする
		if (data.reply && data.reply.visibility !== 'public' && data.visibility === 'public') {
			data.visibility = 'home';
		}

		// ローカルのみをRenoteしたらローカルのみにする
		if (data.renote && data.renote.localOnly && data.channel == null) {
			data.localOnly = true;
		}

		// ローカルのみにリプライしたらローカルのみにする
		if (data.reply && data.reply.localOnly && data.channel == null) {
			data.localOnly = true;
		}

		if (data.text) {
			if (data.text.length > DB_MAX_NOTE_TEXT_LENGTH) {
				data.text = data.text.slice(0, DB_MAX_NOTE_TEXT_LENGTH);
			}
			data.text = data.text.trim();
		} else {
			data.text = null;
		}

		let tags = data.apHashtags;
		let emojis = data.apEmojis;
		let mentionedUsers = data.apMentions;

		// Parse MFM if needed
		if (!tags || !emojis || !mentionedUsers) {
			const tokens = (data.text ? mfm.parse(data.text)! : []);
			const cwTokens = data.cw ? mfm.parse(data.cw)! : [];
			const choiceTokens = data.poll && data.poll.choices
				? concat(data.poll.choices.map(choice => mfm.parse(choice)!))
				: [];

			const combinedTokens = tokens.concat(cwTokens).concat(choiceTokens);

			tags = data.apHashtags ?? extractHashtags(combinedTokens);

			emojis = data.apEmojis ?? extractCustomEmojisFromMfm(combinedTokens);

			mentionedUsers = data.apMentions ?? await this.extractMentionedUsers(user, combinedTokens);
		}

		tags = tags.filter(tag => Array.from(tag).length <= 128).splice(0, 32);

		if (data.reply && (user.id !== data.reply.userId) && !mentionedUsers.some(u => u.id === data.reply!.userId)) {
			mentionedUsers.push(await this.usersRepository.findOneByOrFail({ id: data.reply!.userId }));
		}

		if (data.visibility === 'specified') {
			if (data.visibleUsers == null) throw new Error('invalid param');

			for (const u of data.visibleUsers) {
				if (!mentionedUsers.some(x => x.id === u.id)) {
					mentionedUsers.push(u);
				}
			}

			if (data.reply && !data.visibleUsers.some(x => x.id === data.reply!.userId)) {
				data.visibleUsers.push(await this.usersRepository.findOneByOrFail({ id: data.reply!.userId }));
			}
		}

		const note = new MiNote({
			id: targetNote.id,
			updatedAt: new Date(),
			fileIds: data.files ? data.files.map(file => file.id) : [],
			replyId: data.reply ? data.reply.id : null,
			renoteId: data.renote ? data.renote.id : null,
			channelId: data.channel ? data.channel.id : null,
			threadId: data.reply
				? data.reply.threadId
					? data.reply.threadId
					: data.reply.id
				: null,
			name: data.name,
			text: data.text,
			hasPoll: data.poll != null,
			cw: data.cw ?? null,
			tags: tags.map(tag => normalizeForSearch(tag)),
			emojis,
			userId: user.id,
			localOnly: data.localOnly!,
			reactionAcceptance: data.reactionAcceptance,
			visibility: data.visibility as any,
			visibleUserIds: data.visibility === 'specified'
				? data.visibleUsers
					? data.visibleUsers.map(u => u.id)
					: []
				: [],

			attachedFileTypes: data.files ? data.files.map(file => file.type) : [],

			// 以下非正規化データ
			replyUserId: data.reply ? data.reply.userId : null,
			replyUserHost: data.reply ? data.reply.userHost : null,
			renoteUserId: data.renote ? data.renote.userId : null,
			renoteUserHost: data.renote ? data.renote.userHost : null,
			userHost: user.host,
		});

		if (data.uri != null) note.uri = data.uri;
		if (data.url != null) note.url = data.url;

		// Append mentions data
		if (mentionedUsers.length > 0) {
			note.mentions = mentionedUsers.map(u => u.id);
			const profiles = await this.userProfilesRepository.findBy({ userId: In(note.mentions) });
			note.mentionedRemoteUsers = JSON.stringify(mentionedUsers.filter(u => this.userEntityService.isRemoteUser(u)).map(u => {
				const profile = profiles.find(p => p.userId === u.id);
				const url = profile != null ? profile.url : null;
				return {
					uri: u.uri,
					url: url ?? undefined,
					username: u.username,
					host: u.host,
				} as IMentionedRemoteUsers[0];
			}));
		}

		// 投稿を作成
		try {
			await this.notesRepository.update({ id: note.id }, note);
		} catch (e) {
			// duplicate key error
			if (isDuplicateKeyValueError(e)) {
				const err = new Error('Duplicated note');
				err.name = 'duplicated';
				throw err;
			}

			console.error(e);

			throw e;
		}

		setImmediate('post updated', { signal: this.#shutdownController.signal }).then(
			async () => this.postNoteEdited((await this.notesRepository.findOneByOrFail({ id: note.id })), user, data, silent, tags!, mentionedUsers!),
			() => { /* aborted, ignore this */ },
		);
		if (editor && (note.userId !== editor.id)) {
			const user = await this.usersRepository.findOneByOrFail({ id: note.userId });
			this.moderationLogService.log(editor, 'editNote', {
				noteId: note.id,
				noteUserId: note.userId,
				noteUserUsername: user.username,
				noteUserHost: user.host,
				note: note,
				oldNote: targetNote,
			});
		}
		return note;
	}

	@bindThis
	private async postNoteEdited(note: MiNote, user: {
		id: MiUser['id'];
		username: MiUser['username'];
		host: MiUser['host'];
		isBot: MiUser['isBot'];
	}, data: Option, silent: boolean, tags: string[], mentionedUsers: MinimumUser[]) {
		const meta = await this.metaService.fetch();

		this.notesChart.update(note, true);
		if (meta.enableChartsForRemoteUser || (user.host == null)) {
			this.perUserNotesChart.update(user, note, true);
		}

		// Register host
		if (this.userEntityService.isRemoteUser(user)) {
			this.federatedInstanceService.fetch(user.host).then(async i => {
				this.instancesRepository.increment({ id: i.id }, 'notesCount', 1);
				if ((await this.metaService.fetch()).enableChartsForFederatedInstances) {
					this.instanceChart.updateNote(i.host, note, true);
				}
			});
		}

		// ハッシュタグ更新
		if (data.visibility === 'public' || data.visibility === 'home') {
			this.hashtagService.updateHashtags(user, tags);
		}

		if (data.poll && data.poll.expiresAt) {
			const delay = data.poll.expiresAt.getTime() - Date.now();
			this.queueService.endedPollNotificationQueue.add(note.id, {
				noteId: note.id,
			}, {
				delay,
				removeOnComplete: true,
			});
		}

		if (!silent) {
			if (this.userEntityService.isLocalUser(user)) this.activeUsersChart.write(user);

			// 未読通知を作成
			if (data.visibility === 'specified') {
				if (data.visibleUsers == null) throw new Error('invalid param');

				for (const u of data.visibleUsers) {
					// ローカルユーザーのみ
					if (!this.userEntityService.isLocalUser(u)) continue;

					this.noteReadService.insertNoteUnread(u.id, note, {
						isSpecified: true,
						isMentioned: false,
					});
				}
			} else {
				for (const u of mentionedUsers) {
					// ローカルユーザーのみ
					if (!this.userEntityService.isLocalUser(u)) continue;

					this.noteReadService.insertNoteUnread(u.id, note, {
						isSpecified: false,
						isMentioned: true,
					});
				}
			}

			// Pack the note
			const noteObj = await this.noteEntityService.pack(note, null, { skipHide: true, withReactionAndUserPairCache: true });

			this.globalEventService.publishNotesStream(noteObj);

			this.roleService.addNoteToRoleTimeline(noteObj);

			//#region AP deliver
			if (this.userEntityService.isLocalUser(user)) {
				(async () => {
					const noteActivity = await this.renderNoteOrRenoteActivity(data, note, user.id);
					const dm = this.apDeliverManagerService.createDeliverManager(user, noteActivity);

					// メンションされたリモートユーザーに配送
					for (const u of mentionedUsers.filter(u => this.userEntityService.isRemoteUser(u))) {
						dm.addDirectRecipe(u as MiRemoteUser);
					}

					// 投稿がリプライかつ投稿者がローカルユーザーかつリプライ先の投稿の投稿者がリモートユーザーなら配送
					if (data.reply && data.reply.userHost !== null) {
						const u = await this.usersRepository.findOneBy({ id: data.reply.userId });
						if (u && this.userEntityService.isRemoteUser(u)) dm.addDirectRecipe(u);
					}

					// 投稿がRenoteかつ投稿者がローカルユーザーかつRenote元の投稿の投稿者がリモートユーザーなら配送
					if (data.renote && data.renote.userHost !== null) {
						const u = await this.usersRepository.findOneBy({ id: data.renote.userId });
						if (u && this.userEntityService.isRemoteUser(u)) dm.addDirectRecipe(u);
					}

					// フォロワーに配送
					if (['public', 'home', 'followers'].includes(note.visibility)) {
						dm.addFollowersRecipe();
					}

					if (['public'].includes(note.visibility)) {
						this.relayService.deliverToRelays(user, noteActivity);
					}

					dm.execute();
				})();
			}
			//#endregion
		}

		if (data.channel) {
			this.channelsRepository.update(data.channel.id, {
				lastNotedAt: new Date(),
			});
		}

		// Register to search database
		this.index(note);
	}

	@bindThis
	private isQuote(note: Option): note is Option & { renote: MiNote } {
		// sync with misc/is-quote.ts
		return !!note.renote && (!!note.text || !!note.cw || (!!note.files && !!note.files.length) || !!note.poll);
	}

	@bindThis
	private async renderNoteOrRenoteActivity(data: Option, note: MiNote, userId: string) {
		if (data.localOnly) return null;

		const content = data.renote && !this.isQuote(data)
			? this.apRendererService.renderAnnounce(data.renote.uri ? data.renote.uri : `${this.config.url}/notes/${data.renote.id}`, note)
			: this.apRendererService.renderNoteUpdate(await this.apRendererService.renderNote(note, false, true), note, { id: userId });

		return this.apRendererService.addContext(content);
	}

	@bindThis
	private index(note: MiNote) {
		if (note.text == null && note.cw == null) return;

		this.searchService.indexNote(note);
	}

	@bindThis
	private async extractMentionedUsers(user: { host: MiUser['host']; }, tokens: mfm.MfmNode[]): Promise<MiUser[]> {
		if (tokens == null) return [];

		const mentions = extractMentions(tokens);
		let mentionedUsers = (await Promise.all(mentions.map(m =>
			this.remoteUserResolveService.resolveUser(m.username, m.host ?? user.host).catch(() => null),
		))).filter(x => x != null) as MiUser[];

		// Drop duplicate users
		mentionedUsers = mentionedUsers.filter((u, i, self) =>
			i === self.findIndex(u2 => u.id === u2.id),
		);

		return mentionedUsers;
	}

	@bindThis
	public async checkHibernation(followings: MiFollowing[]) {
		if (followings.length === 0) return;

		const shuffle = (array: MiFollowing[]) => {
			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
			}
			return array;
		};

		// ランダムに最大1000件サンプリング
		const samples = shuffle(followings).slice(0, Math.min(followings.length, 1000));

		const hibernatedUsers = await this.usersRepository.find({
			where: {
				id: In(samples.map(x => x.followerId)),
				lastActiveDate: LessThan(new Date(Date.now() - (1000 * 60 * 60 * 24 * 50))),
			},
			select: ['id'],
		});

		if (hibernatedUsers.length > 0) {
			this.usersRepository.update({
				id: In(hibernatedUsers.map(x => x.id)),
			}, {
				isHibernated: true,
			});

			this.followingsRepository.update({
				followerId: In(hibernatedUsers.map(x => x.id)),
			}, {
				isFollowerHibernated: true,
			});
		}
	}

	@bindThis
	public dispose(): void {
		this.#shutdownController.abort();
	}

	@bindThis
	public onApplicationShutdown(signal?: string | undefined): void {
		this.dispose();
	}
}
