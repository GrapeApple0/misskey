/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { createApp, defineAsyncComponent, markRaw } from 'vue';
import { ui } from '@@/js/config.js';
import * as Misskey from 'misskey-js';
import { common } from './common.js';
import type { Component } from 'vue';
import type { Keymap } from '@/utility/hotkey.js';
import { i18n } from '@/i18n.js';
import { alert, confirm, popup, post, toast } from '@/os.js';
import { useStream } from '@/stream.js';
import * as sound from '@/utility/sound.js';
import { $i, signout, updateAccountPartial } from '@/account.js';
import { instance } from '@/instance.js';
import { ColdDeviceStorage, store } from '@/store.js';
import { reactionPicker } from '@/utility/reaction-picker.js';
import { miLocalStorage } from '@/local-storage.js';
import { claimAchievement, claimedAchievements } from '@/utility/achievements.js';
import { initializeSw } from '@/utility/initialize-sw.js';
import { emojiPicker } from '@/utility/emoji-picker.js';
import { mainRouter } from '@/router/main.js';
import { makeHotkey } from '@/utility/hotkey.js';
import { addCustomEmoji, removeCustomEmojis, updateCustomEmojis } from '@/custom-emojis.js';
import { prefer } from '@/preferences.js';
import { misskeyApi } from '@/utility/misskey-api.js';
import { deckStore } from '@/ui/deck/deck-store.js';
import { launchPlugin } from '@/plugin.js';

export async function mainBoot() {
	const { isClientUpdated } = await common(() => {
		let uiStyle = ui;
		const searchParams = new URLSearchParams(window.location.search);

		if (!$i) uiStyle = 'visitor';

		if (searchParams.has('zen')) uiStyle = 'zen';
		if (uiStyle === 'deck' && prefer.s['deck.useSimpleUiForNonRootPages'] && location.pathname !== '/') uiStyle = 'zen';

		if (searchParams.has('ui')) uiStyle = searchParams.get('ui');

		let rootComponent: Component;
		switch (uiStyle) {
			case 'zen':
				rootComponent = defineAsyncComponent(() => import('@/ui/zen.vue'));
				break;
			case 'deck':
				rootComponent = defineAsyncComponent(() => import('@/ui/deck.vue'));
				break;
			case 'visitor':
				rootComponent = defineAsyncComponent(() => import('@/ui/visitor.vue'));
				break;
			case 'classic':
				rootComponent = defineAsyncComponent(() => import('@/ui/classic.vue'));
				break;
			default:
				rootComponent = defineAsyncComponent(() => import('@/ui/universal.vue'));
				break;
		}

		return createApp(rootComponent);
	});

	reactionPicker.init();
	emojiPicker.init();

	if (isClientUpdated && $i) {
		const { dispose } = popup(defineAsyncComponent(() => import('@/components/MkUpdated.vue')), {}, {
			closed: () => dispose(),
		});
	}

	const stream = useStream();

	let reloadDialogShowing = false;
	stream.on('_disconnected_', async () => {
		if (prefer.s.serverDisconnectedBehavior === 'reload') {
			location.reload();
		} else if (prefer.s.serverDisconnectedBehavior === 'dialog') {
			if (reloadDialogShowing) return;
			reloadDialogShowing = true;
			const { canceled } = await confirm({
				type: 'warning',
				title: i18n.ts.disconnectedFromServer,
				text: i18n.ts.reloadConfirm,
			});
			reloadDialogShowing = false;
			if (!canceled) {
				location.reload();
			}
		}
	});

	stream.on('emojiAdded', emojiData => {
		addCustomEmoji(emojiData.emoji);
	});

	stream.on('emojiUpdated', emojiData => {
		updateCustomEmojis(emojiData.emojis);
	});

	stream.on('emojiDeleted', emojiData => {
		removeCustomEmojis(emojiData.emojis);
	});

	for (const plugin of prefer.s.plugins.filter(p => p.active)) {
		launchPlugin(plugin);
	}

	try {
		if (prefer.s.enableSeasonalScreenEffect) {
			const month = new Date().getMonth() + 1;
			if (prefer.s.hemisphere === 'S') {
				// ▼南半球
				if (month === 7 || month === 8) {
					const SnowfallEffect = (await import('@/utility/snowfall-effect.js')).SnowfallEffect;
					new SnowfallEffect({}).render();
				}
			} else {
				// ▼北半球
				if (month === 12 || month === 1) {
					const SnowfallEffect = (await import('@/utility/snowfall-effect.js')).SnowfallEffect;
					new SnowfallEffect({}).render();
				} else if (month === 3 || month === 4) {
					const SakuraEffect = (await import('@/utility/snowfall-effect.js')).SnowfallEffect;
					new SakuraEffect({
						sakura: true,
					}).render();
				}
			}
		}
	} catch (error) {
		// console.error(error);
		console.error('Failed to initialise the seasonal screen effect canvas context:', error);
	}

	if ($i) {
		store.loaded.then(async () => {
			// prefereces migration
			// TODO: そのうち消す
			if (store.state.menu.length > 0) {
				const themes = await misskeyApi('i/registry/get', { scope: ['client'], key: 'themes' }).catch(() => []);
				if (themes.length > 0) {
					prefer.set('themes', themes);
				}
				const plugins = ColdDeviceStorage.get('plugins');
				prefer.set('plugins', plugins.map(p => ({
					...p,
					installId: (p as any).id,
					id: undefined,
				})));
				prefer.set('lightTheme', ColdDeviceStorage.get('lightTheme'));
				prefer.set('darkTheme', ColdDeviceStorage.get('darkTheme'));
				prefer.set('syncDeviceDarkMode', ColdDeviceStorage.get('syncDeviceDarkMode'));
				prefer.set('keepCw', store.state.keepCw);
				prefer.set('collapseRenotes', store.state.collapseRenotes);
				prefer.set('rememberNoteVisibility', store.state.rememberNoteVisibility);
				prefer.set('uploadFolder', store.state.uploadFolder);
				prefer.set('keepOriginalUploading', store.state.keepOriginalUploading);
				prefer.set('menu', store.state.menu);
				prefer.set('statusbars', store.state.statusbars);
				prefer.set('pinnedUserLists', store.state.pinnedUserLists);
				prefer.set('serverDisconnectedBehavior', store.state.serverDisconnectedBehavior);
				prefer.set('nsfw', store.state.nsfw);
				prefer.set('highlightSensitiveMedia', store.state.highlightSensitiveMedia);
				prefer.set('animation', store.state.animation);
				prefer.set('animatedMfm', store.state.animatedMfm);
				prefer.set('advancedMfm', store.state.advancedMfm);
				prefer.set('showReactionsCount', store.state.showReactionsCount);
				prefer.set('enableQuickAddMfmFunction', store.state.enableQuickAddMfmFunction);
				prefer.set('loadRawImages', store.state.loadRawImages);
				prefer.set('imageNewTab', store.state.imageNewTab);
				prefer.set('disableShowingAnimatedImages', store.state.disableShowingAnimatedImages);
				prefer.set('emojiStyle', store.state.emojiStyle);
				prefer.set('menuStyle', store.state.menuStyle);
				prefer.set('useBlurEffectForModal', store.state.useBlurEffectForModal);
				prefer.set('useBlurEffect', store.state.useBlurEffect);
				prefer.set('showFixedPostForm', store.state.showFixedPostForm);
				prefer.set('showFixedPostFormInChannel', store.state.showFixedPostFormInChannel);
				prefer.set('enableInfiniteScroll', store.state.enableInfiniteScroll);
				prefer.set('useReactionPickerForContextMenu', store.state.useReactionPickerForContextMenu);
				prefer.set('showGapBetweenNotesInTimeline', store.state.showGapBetweenNotesInTimeline);
				prefer.set('instanceTicker', store.state.instanceTicker);
				prefer.set('emojiPickerScale', store.state.emojiPickerScale);
				prefer.set('emojiPickerWidth', store.state.emojiPickerWidth);
				prefer.set('emojiPickerHeight', store.state.emojiPickerHeight);
				prefer.set('emojiPickerStyle', store.state.emojiPickerStyle);
				prefer.set('reportError', store.state.reportError);
				prefer.set('squareAvatars', store.state.squareAvatars);
				prefer.set('showAvatarDecorations', store.state.showAvatarDecorations);
				prefer.set('numberOfPageCache', store.state.numberOfPageCache);
				prefer.set('showNoteActionsOnlyHover', store.state.showNoteActionsOnlyHover);
				prefer.set('showClipButtonInNoteFooter', store.state.showClipButtonInNoteFooter);
				prefer.set('reactionsDisplaySize', store.state.reactionsDisplaySize);
				prefer.set('limitWidthOfReaction', store.state.limitWidthOfReaction);
				prefer.set('forceShowAds', store.state.forceShowAds);
				prefer.set('aiChanMode', store.state.aiChanMode);
				prefer.set('devMode', store.state.devMode);
				prefer.set('mediaListWithOneImageAppearance', store.state.mediaListWithOneImageAppearance);
				prefer.set('notificationPosition', store.state.notificationPosition);
				prefer.set('notificationStackAxis', store.state.notificationStackAxis);
				prefer.set('enableCondensedLine', store.state.enableCondensedLine);
				prefer.set('keepScreenOn', store.state.keepScreenOn);
				prefer.set('disableStreamingTimeline', store.state.disableStreamingTimeline);
				prefer.set('useGroupedNotifications', store.state.useGroupedNotifications);
				prefer.set('dataSaver', store.state.dataSaver);
				prefer.set('enableSeasonalScreenEffect', store.state.enableSeasonalScreenEffect);
				prefer.set('enableHorizontalSwipe', store.state.enableHorizontalSwipe);
				prefer.set('useNativeUiForVideoAudioPlayer', store.state.useNativeUIForVideoAudioPlayer);
				prefer.set('keepOriginalFilename', store.state.keepOriginalFilename);
				prefer.set('alwaysConfirmFollow', store.state.alwaysConfirmFollow);
				prefer.set('confirmWhenRevealingSensitiveMedia', store.state.confirmWhenRevealingSensitiveMedia);
				prefer.set('contextMenu', store.state.contextMenu);
				prefer.set('skipNoteRender', store.state.skipNoteRender);
				prefer.set('showSoftWordMutedWord', store.state.showSoftWordMutedWord);
				prefer.set('confirmOnReact', store.state.confirmOnReact);
				prefer.set('sound.masterVolume', store.state.sound_masterVolume);
				prefer.set('sound.notUseSound', store.state.sound_notUseSound);
				prefer.set('sound.useSoundOnlyWhenActive', store.state.sound_useSoundOnlyWhenActive);
				prefer.set('sound.on.note', store.state.sound_note as any);
				prefer.set('sound.on.noteMy', store.state.sound_noteMy as any);
				prefer.set('sound.on.notification', store.state.sound_notification as any);
				prefer.set('sound.on.reaction', store.state.sound_reaction as any);
				store.set('deck.profile', deckStore.state.profile);
				store.set('deck.columns', deckStore.state.columns);
				store.set('deck.layout', deckStore.state.layout);
				store.set('menu', []);
			}

			if (store.state.accountSetupWizard !== -1) {
				const { dispose } = popup(defineAsyncComponent(() => import('@/components/MkUserSetupDialog.vue')), {}, {
					closed: () => dispose(),
				});
			}
		});

		for (const announcement of ($i.unreadAnnouncements ?? []).filter(x => x.display === 'dialog')) {
			const { dispose } = popup(defineAsyncComponent(() => import('@/components/MkAnnouncementDialog.vue')), {
				announcement,
			}, {
				closed: () => dispose(),
			});
		}

		function onAnnouncementCreated(ev: { announcement: Misskey.entities.Announcement }) {
			const announcement = ev.announcement;
			if (announcement.display === 'dialog') {
				const { dispose } = popup(defineAsyncComponent(() => import('@/components/MkAnnouncementDialog.vue')), {
					announcement,
				}, {
					closed: () => dispose(),
				});
			}
		}

		stream.on('announcementCreated', onAnnouncementCreated);

		if ($i.isDeleted) {
			alert({
				type: 'warning',
				text: i18n.ts.accountDeletionInProgress,
			});
		}

		const now = new Date();
		const m = now.getMonth() + 1;
		const d = now.getDate();

		if ($i.birthday) {
			const bm = parseInt($i.birthday.split('-')[1]);
			const bd = parseInt($i.birthday.split('-')[2]);
			if (m === bm && d === bd) {
				claimAchievement('loggedInOnBirthday');
			}
		}

		if (m === 1 && d === 1) {
			claimAchievement('loggedInOnNewYearsDay');
		}

		if ($i.loggedInDays >= 3) claimAchievement('login3');
		if ($i.loggedInDays >= 7) claimAchievement('login7');
		if ($i.loggedInDays >= 15) claimAchievement('login15');
		if ($i.loggedInDays >= 30) claimAchievement('login30');
		if ($i.loggedInDays >= 60) claimAchievement('login60');
		if ($i.loggedInDays >= 100) claimAchievement('login100');
		if ($i.loggedInDays >= 200) claimAchievement('login200');
		if ($i.loggedInDays >= 300) claimAchievement('login300');
		if ($i.loggedInDays >= 400) claimAchievement('login400');
		if ($i.loggedInDays >= 500) claimAchievement('login500');
		if ($i.loggedInDays >= 600) claimAchievement('login600');
		if ($i.loggedInDays >= 700) claimAchievement('login700');
		if ($i.loggedInDays >= 800) claimAchievement('login800');
		if ($i.loggedInDays >= 900) claimAchievement('login900');
		if ($i.loggedInDays >= 1000) claimAchievement('login1000');

		if ($i.notesCount > 0) claimAchievement('notes1');
		if ($i.notesCount >= 10) claimAchievement('notes10');
		if ($i.notesCount >= 100) claimAchievement('notes100');
		if ($i.notesCount >= 500) claimAchievement('notes500');
		if ($i.notesCount >= 1000) claimAchievement('notes1000');
		if ($i.notesCount >= 5000) claimAchievement('notes5000');
		if ($i.notesCount >= 10000) claimAchievement('notes10000');
		if ($i.notesCount >= 20000) claimAchievement('notes20000');
		if ($i.notesCount >= 30000) claimAchievement('notes30000');
		if ($i.notesCount >= 40000) claimAchievement('notes40000');
		if ($i.notesCount >= 50000) claimAchievement('notes50000');
		if ($i.notesCount >= 60000) claimAchievement('notes60000');
		if ($i.notesCount >= 70000) claimAchievement('notes70000');
		if ($i.notesCount >= 80000) claimAchievement('notes80000');
		if ($i.notesCount >= 90000) claimAchievement('notes90000');
		if ($i.notesCount >= 100000) claimAchievement('notes100000');

		if ($i.followersCount > 0) claimAchievement('followers1');
		if ($i.followersCount >= 10) claimAchievement('followers10');
		if ($i.followersCount >= 50) claimAchievement('followers50');
		if ($i.followersCount >= 100) claimAchievement('followers100');
		if ($i.followersCount >= 300) claimAchievement('followers300');
		if ($i.followersCount >= 500) claimAchievement('followers500');
		if ($i.followersCount >= 1000) claimAchievement('followers1000');

		const createdAt = new Date($i.createdAt);
		const createdAtThreeYearsLater = new Date($i.createdAt);
		createdAtThreeYearsLater.setFullYear(createdAtThreeYearsLater.getFullYear() + 3);
		if (now >= createdAtThreeYearsLater) {
			claimAchievement('passedSinceAccountCreated3');
			claimAchievement('passedSinceAccountCreated2');
			claimAchievement('passedSinceAccountCreated1');
		} else {
			const createdAtTwoYearsLater = new Date($i.createdAt);
			createdAtTwoYearsLater.setFullYear(createdAtTwoYearsLater.getFullYear() + 2);
			if (now >= createdAtTwoYearsLater) {
				claimAchievement('passedSinceAccountCreated2');
				claimAchievement('passedSinceAccountCreated1');
			} else {
				const createdAtOneYearLater = new Date($i.createdAt);
				createdAtOneYearLater.setFullYear(createdAtOneYearLater.getFullYear() + 1);
				if (now >= createdAtOneYearLater) {
					claimAchievement('passedSinceAccountCreated1');
				}
			}
		}

		if (claimedAchievements.length >= 30) {
			claimAchievement('collectAchievements30');
		}

		if (!claimedAchievements.includes('justPlainLucky')) {
			let justPlainLuckyTimer: number | null = null;
			let lastVisibilityChangedAt = Date.now();

			function claimPlainLucky() {
				if (document.visibilityState !== 'visible') {
					if (justPlainLuckyTimer != null) window.clearTimeout(justPlainLuckyTimer);
					return;
				}

				if (Math.floor(Math.random() * 20000) === 0) {
					claimAchievement('justPlainLucky');
				} else {
					justPlainLuckyTimer = window.setTimeout(claimPlainLucky, 1000 * 10);
				}
			}

			window.addEventListener('visibilitychange', () => {
				const now = Date.now();

				if (document.visibilityState === 'visible') {
					// タブを高速で切り替えたら取得処理が何度も走るのを防ぐ
					if ((now - lastVisibilityChangedAt) < 1000 * 10) {
						justPlainLuckyTimer = window.setTimeout(claimPlainLucky, 1000 * 10);
					} else {
						claimPlainLucky();
					}
				} else if (justPlainLuckyTimer != null) {
					window.clearTimeout(justPlainLuckyTimer);
					justPlainLuckyTimer = null;
				}

				lastVisibilityChangedAt = now;
			}, { passive: true });

			claimPlainLucky();
		}

		if (!claimedAchievements.includes('client30min')) {
			window.setTimeout(() => {
				claimAchievement('client30min');
			}, 1000 * 60 * 30);
		}

		if (!claimedAchievements.includes('client60min')) {
			window.setTimeout(() => {
				claimAchievement('client60min');
			}, 1000 * 60 * 60);
		}

		// 邪魔
		//const lastUsed = miLocalStorage.getItem('lastUsed');
		//if (lastUsed) {
		//	const lastUsedDate = parseInt(lastUsed, 10);
		//	// 二時間以上前なら
		//	if (Date.now() - lastUsedDate > 1000 * 60 * 60 * 2) {
		//		toast(i18n.tsx.welcomeBackWithName({
		//			name: $i.name || $i.username,
		//		}));
		//	}
		//}
		//miLocalStorage.setItem('lastUsed', Date.now().toString());

		const latestDonationInfoShownAt = miLocalStorage.getItem('latestDonationInfoShownAt');
		const neverShowDonationInfo = miLocalStorage.getItem('neverShowDonationInfo');
		if (neverShowDonationInfo !== 'true' && (createdAt.getTime() < (Date.now() - (1000 * 60 * 60 * 24 * 3))) && !location.pathname.startsWith('/miauth')) {
			if (latestDonationInfoShownAt == null || (new Date(latestDonationInfoShownAt).getTime() < (Date.now() - (1000 * 60 * 60 * 24 * 30)))) {
				const { dispose } = popup(defineAsyncComponent(() => import('@/components/MkDonation.vue')), {}, {
					closed: () => dispose(),
				});
			}
		}

		const modifiedVersionMustProminentlyOfferInAgplV3Section13Read = miLocalStorage.getItem('modifiedVersionMustProminentlyOfferInAgplV3Section13Read');
		if (modifiedVersionMustProminentlyOfferInAgplV3Section13Read !== 'true' && instance.repositoryUrl !== 'https://github.com/misskey-dev/misskey') {
			const { dispose } = popup(defineAsyncComponent(() => import('@/components/MkSourceCodeAvailablePopup.vue')), {}, {
				closed: () => dispose(),
			});
		}

		if ('Notification' in window) {
			// 許可を得ていなかったらリクエスト
			if (Notification.permission === 'default') {
				Notification.requestPermission();
			}
		}

		const main = markRaw(stream.useChannel('main', null, 'System'));

		// 自分の情報が更新されたとき
		main.on('meUpdated', i => {
			updateAccountPartial(i);
		});

		main.on('readAllNotifications', () => {
			updateAccountPartial({
				hasUnreadNotification: false,
				unreadNotificationsCount: 0,
			});
		});

		main.on('unreadNotification', () => {
			const unreadNotificationsCount = ($i?.unreadNotificationsCount ?? 0) + 1;
			updateAccountPartial({
				hasUnreadNotification: true,
				unreadNotificationsCount,
			});
		});

		main.on('unreadMention', () => {
			updateAccountPartial({ hasUnreadMentions: true });
		});

		main.on('readAllUnreadMentions', () => {
			updateAccountPartial({ hasUnreadMentions: false });
		});

		main.on('unreadSpecifiedNote', () => {
			updateAccountPartial({ hasUnreadSpecifiedNotes: true });
		});

		main.on('readAllUnreadSpecifiedNotes', () => {
			updateAccountPartial({ hasUnreadSpecifiedNotes: false });
		});

		main.on('readAllAntennas', () => {
			updateAccountPartial({ hasUnreadAntenna: false });
		});

		main.on('unreadAntenna', () => {
			updateAccountPartial({ hasUnreadAntenna: true });
			sound.playMisskeySfx('antenna');
		});

		main.on('readAllAnnouncements', () => {
			updateAccountPartial({ hasUnreadAnnouncement: false });
		});

		// 個人宛てお知らせが発行されたとき
		main.on('announcementCreated', onAnnouncementCreated);

		// トークンが再生成されたとき
		// このままではMisskeyが利用できないので強制的にサインアウトさせる
		main.on('myTokenRegenerated', () => {
			signout();
		});
	}

	// shortcut
	const keymap = {
		'p|n': () => {
			if ($i == null) return;
			post();
		},
		'd': () => {
			store.set('darkMode', !store.state.darkMode);
		},
		's': () => {
			mainRouter.push('/search');
		},
	} as const satisfies Keymap;
	document.addEventListener('keydown', makeHotkey(keymap), { passive: false });

	initializeSw();
}
