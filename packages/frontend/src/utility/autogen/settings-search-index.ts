
/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

// This file was automatically generated by create-search-index.
// Do not edit this file.

import { i18n } from '@/i18n.js';

export type SearchIndexItem = {
	id: string;
	path?: string;
	label: string;
	keywords: string[];
	icon?: string;
	children?: SearchIndexItem[];
};

export const searchIndexes: SearchIndexItem[] = [
	{
		id: 'flXd1LC7r',
		children: [
			{
				id: 'hB11H5oul',
				label: i18n.ts.syncDeviceDarkMode,
				keywords: ['sync', 'device', 'dark', 'light', 'mode'],
			},
			{
				id: 'fDbLtIKeo',
				label: i18n.ts.themeForLightMode,
				keywords: ['light', 'theme'],
			},
			{
				id: 'CsSVILKpX',
				label: i18n.ts.themeForDarkMode,
				keywords: ['dark', 'theme'],
			},
			{
				id: '8wcoRp76b',
				label: i18n.ts.setWallpaper,
				keywords: ['wallpaper'],
			},
		],
		label: i18n.ts.theme,
		keywords: ['theme'],
		path: '/settings/theme',
		icon: 'ti ti-palette',
	},
	{
		id: '6fFIRXUww',
		children: [
			{
				id: 'EcwZE7dCl',
				label: i18n.ts.notUseSound,
				keywords: ['mute'],
			},
			{
				id: '9MxYVIf7k',
				label: i18n.ts.useSoundOnlyWhenActive,
				keywords: ['active', 'mute'],
			},
			{
				id: '94afQxKat',
				label: i18n.ts.masterVolume,
				keywords: ['volume', 'master'],
			},
		],
		label: i18n.ts.sounds,
		keywords: ['sounds', i18n.ts._settings.soundsBanner],
		path: '/settings/sounds',
		icon: 'ti ti-music',
	},
	{
		id: '5BjnxMfYV',
		children: [
			{
				id: '75QPEg57v',
				children: [
					{
						id: 'CiHijRkGG',
						label: i18n.ts.changePassword,
						keywords: [],
					},
				],
				label: i18n.ts.password,
				keywords: ['password'],
			},
			{
				id: '2fa',
				children: [
					{
						id: 'qCXM0HtJ7',
						label: i18n.ts.totp,
						keywords: ['totp', 'app', i18n.ts.totpDescription],
					},
					{
						id: '3g1RePuD9',
						label: i18n.ts.securityKeyAndPasskey,
						keywords: ['security', 'key', 'passkey'],
					},
					{
						id: 'pFRud5u8k',
						label: i18n.ts.passwordLessLogin,
						keywords: ['password', 'less', 'key', 'passkey', 'login', 'signin', i18n.ts.passwordLessLoginDescription],
					},
				],
				label: i18n.ts['2fa'],
				keywords: ['2fa'],
			},
		],
		label: i18n.ts.security,
		keywords: ['security', i18n.ts._settings.securityBanner],
		path: '/settings/security',
		icon: 'ti ti-lock',
	},
	{
		id: 'w4L6myH61',
		children: [
			{
				id: 'ru8DrOn3J',
				label: i18n.ts._profile.changeBanner,
				keywords: ['banner', 'change'],
			},
			{
				id: 'CCnD8Apnu',
				label: i18n.ts._profile.changeAvatar,
				keywords: ['avatar', 'icon', 'change'],
			},
			{
				id: 'yFEVCJxFX',
				label: i18n.ts._profile.name,
				keywords: ['name'],
			},
			{
				id: '2O1S5reaB',
				label: i18n.ts._profile.description,
				keywords: ['description', 'bio'],
			},
			{
				id: 'pWi4OLS8g',
				label: i18n.ts.location,
				keywords: ['location', 'locale'],
			},
			{
				id: 'oLO5X6Wtw',
				label: i18n.ts.birthday,
				keywords: ['birthday', 'birthdate', 'age'],
			},
			{
				id: 'm2trKwPgq',
				label: i18n.ts.language,
				keywords: ['language', 'locale'],
			},
			{
				id: 'kfDZxCDp9',
				label: i18n.ts._profile.metadataEdit,
				keywords: ['metadata'],
			},
			{
				id: 'uPt3MFymp',
				label: i18n.ts._profile.followedMessage,
				keywords: ['follow', 'message', i18n.ts._profile.followedMessageDescription],
			},
			{
				id: 'wuGg0tBjw',
				label: i18n.ts.reactionAcceptance,
				keywords: ['reaction'],
			},
			{
				id: 'EezPpmMnf',
				children: [
					{
						id: 'f2cRLh8ad',
						label: i18n.ts.flagAsCat,
						keywords: ['cat'],
					},
					{
						id: 'eVoViiF3h',
						label: i18n.ts.flagAsBot,
						keywords: ['bot'],
					},
				],
				label: i18n.ts.advancedSettings,
				keywords: [],
			},
		],
		label: i18n.ts.profile,
		keywords: ['profile'],
		path: '/settings/profile',
		icon: 'ti ti-user',
	},
	{
		id: '2rp9ka5Ht',
		children: [
			{
				id: 'BhAQiHogN',
				label: i18n.ts.makeFollowManuallyApprove,
				keywords: ['follow', 'lock', i18n.ts.lockedAccountInfo],
			},
			{
				id: '4DeWGsPaD',
				label: i18n.ts.autoAcceptFollowed,
				keywords: ['follow', 'auto', 'accept'],
			},
			{
				id: 'iaM6zUmO9',
				label: i18n.ts.makeReactionsPublic,
				keywords: ['reaction', 'public', i18n.ts.makeReactionsPublicDescription],
			},
			{
				id: '5Q6uhghzV',
				label: i18n.ts.followingVisibility,
				keywords: ['following', 'visibility'],
			},
			{
				id: 'pZ9q65FX5',
				label: i18n.ts.followersVisibility,
				keywords: ['follower', 'visibility'],
			},
			{
				id: 'DMS4yvAGg',
				label: i18n.ts.hideOnlineStatus,
				keywords: ['online', 'status', i18n.ts.hideOnlineStatusDescription],
			},
			{
				id: '8rEsGuN8w',
				label: i18n.ts.noCrawle,
				keywords: ['crawle', 'index', 'search', i18n.ts.noCrawleDescription],
			},
			{
				id: 's7LdSpiLn',
				label: i18n.ts.preventAiLearning,
				keywords: ['crawle', 'ai', i18n.ts.preventAiLearningDescription],
			},
			{
				id: 'l2Wf1s2ad',
				label: i18n.ts.makeExplorable,
				keywords: ['explore', i18n.ts.makeExplorableDescription],
			},
			{
				id: 'xEYlOghao',
				label: i18n.ts._chat.chatAllowedUsers,
				keywords: ['chat'],
			},
			{
				id: 'BnOtlyaAh',
				children: [
					{
						id: 'BzMIVBpL0',
						label: i18n.ts._accountSettings.requireSigninToViewContents,
						keywords: ['login', 'signin'],
					},
					{
						id: 'jJUqPqBAv',
						label: i18n.ts._accountSettings.makeNotesFollowersOnlyBefore,
						keywords: ['follower', i18n.ts._accountSettings.makeNotesFollowersOnlyBeforeDescription],
					},
					{
						id: 'ra10txIFV',
						label: i18n.ts._accountSettings.makeNotesHiddenBefore,
						keywords: ['hidden', i18n.ts._accountSettings.makeNotesHiddenBeforeDescription],
					},
				],
				label: i18n.ts.lockdown,
				keywords: ['lockdown'],
			},
		],
		label: i18n.ts.privacy,
		keywords: ['privacy', i18n.ts._settings.privacyBanner],
		path: '/settings/privacy',
		icon: 'ti ti-lock-open',
	},
	{
		id: '3yCAv0IsZ',
		children: [
			{
				id: 'AKvDrxSj5',
				children: [
					{
						id: 'cAszhShB0',
						label: i18n.ts.uiLanguage,
						keywords: ['language'],
					},
					{
						id: 'apz9AutPm',
						label: i18n.ts.overridedDeviceKind,
						keywords: ['device', 'type', 'kind', 'smartphone', 'tablet', 'desktop'],
					},
					{
						id: 'nqRVtw1xw',
						label: i18n.ts.useBlurEffect,
						keywords: ['blur'],
					},
					{
						id: 'EO5WHBeG8',
						label: i18n.ts.useBlurEffectForModal,
						keywords: ['blur', 'modal'],
					},
					{
						id: 'CWpyT9vLK',
						label: i18n.ts.showAvatarDecorations,
						keywords: ['avatar', 'icon', 'decoration', 'show'],
					},
					{
						id: '1wwACqQz1',
						label: i18n.ts.alwaysConfirmFollow,
						keywords: ['follow', 'confirm', 'always'],
					},
					{
						id: '1x3JNXj8N',
						label: i18n.ts.highlightSensitiveMedia,
						keywords: ['highlight', 'sensitive', 'nsfw', 'image', 'photo', 'picture', 'media', 'thumbnail'],
					},
					{
						id: 'CfAg0Qekq',
						label: i18n.ts.confirmWhenRevealingSensitiveMedia,
						keywords: ['sensitive', 'nsfw', 'media', 'image', 'photo', 'picture', 'attachment', 'confirm'],
					},
					{
						id: 'aefexW9fD',
						label: i18n.ts.enableAdvancedMfm,
						keywords: ['mfm', 'enable', 'show', 'advanced'],
					},
					{
						id: 'lu9v5Spqg',
						label: i18n.ts.enableInfiniteScroll,
						keywords: ['auto', 'load', 'auto', 'more', 'scroll'],
					},
					{
						id: '6kMj4HVOg',
						label: i18n.ts.emojiStyle,
						keywords: ['emoji', 'style', 'native', 'system', 'fluent', 'twemoji'],
					},
					{
						id: 'DftdlLbNu',
						label: i18n.ts.pinnedList,
						keywords: ['pinned', 'list'],
					},
				],
				label: i18n.ts.general,
				keywords: ['general'],
			},
			{
				id: 'CQldliCSi',
				children: [
					{
						id: 'kMB2hPyq3',
						label: i18n.ts.showFixedPostForm,
						keywords: ['post', 'form', 'timeline'],
					},
					{
						id: 'jC7LtTnmc',
						label: i18n.ts.showFixedPostFormInChannel,
						keywords: ['post', 'form', 'timeline', 'channel'],
					},
					{
						id: 'p2wlrnwLo',
						label: i18n.ts.collapseRenotes,
						keywords: ['renote', i18n.ts.collapseRenotesDescription],
					},
					{
						id: '6SFn3t8VS',
						label: i18n.ts.showGapBetweenNotesInTimeline,
						keywords: ['note', 'timeline', 'gap'],
					},
					{
						id: 'nygexkaUk',
						label: i18n.ts.disableStreamingTimeline,
						keywords: ['disable', 'streaming', 'timeline'],
					},
					{
						id: '7vnQgR42v',
						label: i18n.ts.showNoteActionsOnlyHover,
						keywords: ['hover', 'show', 'footer', 'action'],
					},
					{
						id: 'x5q4XZ7Kv',
						label: i18n.ts.showClipButtonInNoteFooter,
						keywords: ['footer', 'action', 'clip', 'show'],
					},
					{
						id: 'x9irZWjaF',
						label: i18n.ts.showReactionsCount,
						keywords: ['reaction', 'count', 'show'],
					},
					{
						id: 'dHPv9mrxi',
						label: i18n.ts.confirmOnReact,
						keywords: ['reaction', 'confirm'],
					},
					{
						id: 'bj42W4cvN',
						label: i18n.ts.loadRawImages,
						keywords: ['image', 'photo', 'picture', 'media', 'thumbnail', 'quality', 'raw', 'attachment'],
					},
					{
						id: 'fzPca1Gk9',
						label: i18n.ts.useReactionPickerForContextMenu,
						keywords: ['reaction', 'picker', 'contextmenu', 'open'],
					},
					{
						id: 'mNU5IBln7',
						label: i18n.ts.reactionsDisplaySize,
						keywords: ['reaction', 'size', 'scale', 'display'],
					},
					{
						id: 'kYgorbLUy',
						label: i18n.ts.limitWidthOfReaction,
						keywords: ['reaction', 'size', 'scale', 'display', 'width', 'limit'],
					},
					{
						id: 'm75VEWI3S',
						label: i18n.ts.mediaListWithOneImageAppearance,
						keywords: ['attachment', 'image', 'photo', 'picture', 'media', 'thumbnail', 'list', 'size', 'height'],
					},
					{
						id: 'CA42sC9Mx',
						label: i18n.ts.instanceTicker,
						keywords: ['ticker', 'information', 'label', 'instance', 'server', 'host', 'federation'],
					},
					{
						id: 'knEhibyFp',
						label: i18n.ts.displayOfSensitiveMedia,
						keywords: ['attachment', 'image', 'photo', 'picture', 'media', 'thumbnail', 'nsfw', 'sensitive', 'display', 'show', 'hide', 'visibility'],
					},
				],
				label: i18n.ts._settings.timelineAndNote,
				keywords: ['timeline', 'note'],
			},
			{
				id: 'yIR4YP0yU',
				children: [
					{
						id: 'cBkUgQNpH',
						label: i18n.ts.keepCw,
						keywords: ['remember', 'keep', 'note', 'cw'],
					},
					{
						id: 'Bv4YywaKL',
						label: i18n.ts.rememberNoteVisibility,
						keywords: ['remember', 'keep', 'note', 'visibility'],
					},
					{
						id: 'F3kpUNvSQ',
						label: i18n.ts.enableQuickAddMfmFunction,
						keywords: ['mfm', 'enable', 'show', 'advanced', 'picker', 'form', 'function', 'fn'],
					},
					{
						id: 'BBxwy4F6E',
						label: i18n.ts.defaultNoteVisibility,
						keywords: ['default', 'note', 'visibility'],
					},
				],
				label: i18n.ts.postForm,
				keywords: ['post', 'form'],
			},
			{
				id: 'e5XnQWk68',
				children: [
					{
						id: 'rOttgccaS',
						label: i18n.ts.useGroupedNotifications,
						keywords: ['group'],
					},
					{
						id: 'Ek4Cw3VPq',
						label: i18n.ts.position,
						keywords: ['position'],
					},
					{
						id: 'pZLzt3i0s',
						label: i18n.ts.stackAxis,
						keywords: ['stack', 'axis', 'direction'],
					},
				],
				label: i18n.ts.notifications,
				keywords: ['notification'],
			},
			{
				id: 'c9mbgmHQp',
				label: i18n.ts.dataSaver,
				keywords: ['datasaver'],
			},
			{
				id: '5h8vhCX1S',
				children: [
					{
						id: 'bDv03znUy',
						label: i18n.ts.squareAvatars,
						keywords: ['avatar', 'icon', 'square'],
					},
					{
						id: 'nkR2LWURW',
						label: i18n.ts.seasonalScreenEffect,
						keywords: ['effect', 'show'],
					},
					{
						id: 'sCscGhMmH',
						label: i18n.ts.openImageInNewTab,
						keywords: ['image', 'photo', 'picture', 'media', 'thumbnail', 'new', 'tab'],
					},
					{
						id: '4yCgcFElF',
						label: i18n.ts.withRepliesByDefaultForNewlyFollowed,
						keywords: ['follow', 'replies'],
					},
					{
						id: '5iMpm5rES',
						label: i18n.ts.whenServerDisconnected,
						keywords: ['server', 'disconnect', 'reconnect', 'reload', 'streaming'],
					},
					{
						id: 'dlQjnWBVU',
						label: i18n.ts.numberOfPageCache,
						keywords: ['cache', 'page'],
					},
					{
						id: 'qY5xTzl35',
						label: i18n.ts.forceShowAds,
						keywords: ['ad', 'show'],
					},
					{
						id: '2VSnj81vC',
						label: i18n.ts.hemisphere,
						keywords: [],
					},
					{
						id: 'vuG3aG3IE',
						label: i18n.ts.additionalEmojiDictionary,
						keywords: ['emoji', 'dictionary', 'additional', 'extra'],
					},
				],
				label: i18n.ts.other,
				keywords: ['other'],
			},
		],
		label: i18n.ts.preferences,
		keywords: ['general', 'preferences', i18n.ts._settings.preferencesBanner],
		path: '/settings/preferences',
		icon: 'ti ti-adjustments',
	},
	{
		id: 'mwkwtw83Y',
		label: i18n.ts.plugins,
		keywords: ['plugin', 'addon', 'extension', i18n.ts._settings.pluginBanner],
		path: '/settings/plugin',
		icon: 'ti ti-plug',
	},
	{
		id: 'F1uK9ssiY',
		children: [
			{
				id: 'E0ndmaP6Q',
				label: i18n.ts._role.policies,
				keywords: ['account', 'info'],
			},
			{
				id: 'r5SjfwZJc',
				label: i18n.ts.rolesAssignedToMe,
				keywords: ['roles'],
			},
			{
				id: 'cm7LrjgaW',
				label: i18n.ts.accountMigration,
				keywords: ['account', 'move', 'migration'],
			},
			{
				id: 'ozfqNviP3',
				label: i18n.ts.closeAccount,
				keywords: ['account', 'close', 'delete', i18n.ts._accountDelete.requestAccountDelete],
			},
			{
				id: 'tpywgkpxy',
				label: i18n.ts.experimentalFeatures,
				keywords: ['experimental', 'feature', 'flags'],
			},
			{
				id: 'zWbGKohZ2',
				label: i18n.ts.developer,
				keywords: ['developer', 'mode', 'debug'],
			},
		],
		label: i18n.ts.other,
		keywords: ['other'],
		path: '/settings/other',
		icon: 'ti ti-dots',
	},
	{
		id: '9bNikHWzQ',
		children: [
			{
				id: 'appYJbpkK',
				label: i18n.ts._settings.showNavbarSubButtons,
				keywords: ['navbar', 'sidebar', 'toggle', 'button', 'sub'],
			},
		],
		label: i18n.ts.navbar,
		keywords: ['navbar', 'menu', 'sidebar'],
		path: '/settings/navbar',
		icon: 'ti ti-list',
	},
	{
		id: '3icEvyv2D',
		children: [
			{
				id: 'lO3uFTkPN',
				children: [
					{
						id: '5JKaXRqyt',
						label: i18n.ts.showMutedWord,
						keywords: ['show'],
					},
				],
				label: i18n.ts.wordMute,
				keywords: ['note', 'word', 'soft', 'mute', 'hide'],
			},
			{
				id: 'fMkjL3dK4',
				label: i18n.ts.hardWordMute,
				keywords: ['note', 'word', 'hard', 'mute', 'hide'],
			},
			{
				id: 'cimSzQXN0',
				label: i18n.ts.instanceMute,
				keywords: ['note', 'server', 'instance', 'host', 'federation', 'mute', 'hide'],
			},
			{
				id: 'gq8rPy3Du',
				label: `${i18n.ts.mutedUsers} (${ i18n.ts.renote })`,
				keywords: ['renote', 'mute', 'hide', 'user'],
			},
			{
				id: 'mh2r7EUbF',
				label: i18n.ts.mutedUsers,
				keywords: ['note', 'mute', 'hide', 'user'],
			},
			{
				id: 'AUS1OgHrn',
				label: i18n.ts.blockedUsers,
				keywords: ['block', 'user'],
			},
		],
		label: i18n.ts.muteAndBlock,
		keywords: ['mute', 'block', i18n.ts._settings.muteAndBlockBanner],
		path: '/settings/mute-block',
		icon: 'ti ti-ban',
	},
	{
		id: 'yR1OSyLiT',
		children: [
			{
				id: 'yMJzyzOUk',
				label: i18n.ts._emojiPalette.enableSyncBetweenDevicesForPalettes,
				keywords: ['sync', 'palettes', 'devices'],
			},
			{
				id: 'wCE09vgZr',
				label: i18n.ts._emojiPalette.paletteForMain,
				keywords: ['main', 'palette'],
			},
			{
				id: 'uCzRPrSNx',
				label: i18n.ts._emojiPalette.paletteForReaction,
				keywords: ['reaction', 'palette'],
			},
			{
				id: 'hgQr28WUk',
				children: [
					{
						id: 'fY04NIHSQ',
						label: i18n.ts.size,
						keywords: ['emoji', 'picker', 'scale', 'size'],
					},
					{
						id: '3j7vlaL7t',
						label: i18n.ts.numberOfColumn,
						keywords: ['emoji', 'picker', 'width', 'column', 'size'],
					},
					{
						id: 'zPX8z1Bcy',
						label: i18n.ts.height,
						keywords: ['emoji', 'picker', 'height', 'size'],
					},
					{
						id: '2CSkZa4tl',
						label: i18n.ts.style,
						keywords: ['emoji', 'picker', 'style'],
					},
				],
				label: i18n.ts.emojiPickerDisplay,
				keywords: ['emoji', 'picker', 'display'],
			},
		],
		label: i18n.ts.emojiPalette,
		keywords: ['emoji', 'palette'],
		path: '/settings/emoji-palette',
		icon: 'ti ti-mood-happy',
	},
	{
		id: '3Tcxw4Fwl',
		children: [
			{
				id: 'iIai9O65I',
				label: i18n.ts.emailAddress,
				keywords: ['email', 'address'],
			},
			{
				id: 'i6cC6oi0m',
				label: i18n.ts.receiveAnnouncementFromInstance,
				keywords: ['announcement', 'email'],
			},
			{
				id: 'C1YTinP11',
				label: i18n.ts.emailNotification,
				keywords: ['notification', 'email'],
			},
		],
		label: i18n.ts.email,
		keywords: ['email'],
		path: '/settings/email',
		icon: 'ti ti-mail',
	},
	{
		id: 'tnYoppRiv',
		children: [
			{
				id: 'cN3dsGNxu',
				label: i18n.ts.usageAmount,
				keywords: ['capacity', 'usage'],
			},
			{
				id: 'rOAOU2P6C',
				label: i18n.ts.statistics,
				keywords: ['statistics', 'usage'],
			},
			{
				id: 'uXGlQXATx',
				label: i18n.ts.uploadFolder,
				keywords: ['default', 'upload', 'folder'],
			},
			{
				id: 'goQdtf3dD',
				label: i18n.ts.keepOriginalUploading,
				keywords: ['keep', 'original', 'raw', 'upload', i18n.ts.keepOriginalUploadingDescription],
			},
			{
				id: '83xRo0XJl',
				label: i18n.ts.keepOriginalFilename,
				keywords: ['keep', 'original', 'filename', i18n.ts.keepOriginalFilenameDescription],
			},
			{
				id: 'wf77yRQQq',
				label: i18n.ts.alwaysMarkSensitive,
				keywords: ['always', 'default', 'mark', 'nsfw', 'sensitive', 'media', 'file'],
			},
			{
				id: '3pxwNB8e4',
				label: i18n.ts.enableAutoSensitive,
				keywords: ['auto', 'nsfw', 'sensitive', 'media', 'file', i18n.ts.enableAutoSensitiveDescription],
			},
		],
		label: i18n.ts.drive,
		keywords: ['drive', i18n.ts._settings.driveBanner],
		path: '/settings/drive',
		icon: 'ti ti-cloud',
	},
	{
		id: 'FfZdOs8y',
		children: [
			{
				id: 'B1ZU6Ur54',
				label: i18n.ts._deck.enableSyncBetweenDevicesForProfiles,
				keywords: ['sync', 'profiles', 'devices'],
			},
			{
				id: 'iEF0gqNAo',
				label: i18n.ts._deck.useSimpleUiForNonRootPages,
				keywords: ['ui', 'root', 'page'],
			},
			{
				id: 'BNdSeWxZn',
				label: i18n.ts.defaultNavigationBehaviour,
				keywords: ['default', 'navigation', 'behaviour', 'window'],
			},
			{
				id: 'zT9pGm8DF',
				label: i18n.ts._deck.alwaysShowMainColumn,
				keywords: ['always', 'show', 'main', 'column'],
			},
			{
				id: '5dk2xv1vc',
				label: i18n.ts._deck.columnAlign,
				keywords: ['column', 'align'],
			},
		],
		label: i18n.ts.deck,
		keywords: ['deck', 'ui'],
		path: '/settings/deck',
		icon: 'ti ti-columns',
	},
	{
		id: 'BlJ2rsw9h',
		children: [
			{
				id: '9bLU1nIjt',
				label: i18n.ts._settings.api,
				keywords: ['api', 'app', 'token', 'accessToken'],
			},
			{
				id: '5VSGOVYR0',
				label: i18n.ts._settings.webhook,
				keywords: ['webhook'],
			},
		],
		label: i18n.ts._settings.serviceConnection,
		keywords: ['app', 'service', 'connect', 'webhook', 'api', 'token', i18n.ts._settings.serviceConnectionBanner],
		path: '/settings/connect',
		icon: 'ti ti-link',
	},
	{
		id: 'gtaOSdIJB',
		label: i18n.ts.avatarDecorations,
		keywords: ['avatar', 'icon', 'decoration'],
		path: '/settings/avatar-decoration',
		icon: 'ti ti-sparkles',
	},
	{
		id: 'zK6posor9',
		label: i18n.ts.accounts,
		keywords: ['accounts'],
		path: '/settings/accounts',
		icon: 'ti ti-users',
	},
	{
		id: '330Q4mf8E',
		children: [
			{
				id: 'eGSjUDIKu',
				label: i18n.ts._exportOrImport.allNotes,
				keywords: ['notes'],
			},
			{
				id: 'iMDgUVgRu',
				label: i18n.ts._exportOrImport.favoritedNotes,
				keywords: ['favorite', 'notes'],
			},
			{
				id: '3y6KgkVbT',
				label: i18n.ts._exportOrImport.clips,
				keywords: ['clip', 'notes'],
			},
			{
				id: 'cKiHkj8HE',
				label: i18n.ts._exportOrImport.followingList,
				keywords: ['following', 'users'],
			},
			{
				id: '3zzmQXn0t',
				label: i18n.ts._exportOrImport.userLists,
				keywords: ['user', 'lists'],
			},
			{
				id: '3ZGXcEqWZ',
				label: i18n.ts._exportOrImport.muteList,
				keywords: ['mute', 'users'],
			},
			{
				id: '84oL7B1Dr',
				label: i18n.ts._exportOrImport.blockingList,
				keywords: ['block', 'users'],
			},
			{
				id: 'ckqi48Kbl',
				label: i18n.ts.antennas,
				keywords: ['antennas'],
			},
		],
		label: i18n.ts._settings.accountData,
		keywords: ['import', 'export', 'data', 'archive', i18n.ts._settings.accountDataBanner],
		path: '/settings/account-data',
		icon: 'ti ti-package',
	},
	{
		id: 'f08Mi1Uwn',
		children: [
			{
				id: 'C5dRH2Ypy',
				label: i18n.ts.reduceUiAnimation,
				keywords: ['animation', 'motion', 'reduce'],
			},
			{
				id: '5mZxz2cru',
				label: i18n.ts.disableShowingAnimatedImages,
				keywords: ['disable', 'animation', 'image', 'photo', 'picture', 'media', 'thumbnail', 'gif'],
			},
			{
				id: 'c0Iy5hL5o',
				label: i18n.ts.enableAnimatedMfm,
				keywords: ['mfm', 'enable', 'show', 'animated'],
			},
			{
				id: '4HYFjs2Nv',
				label: i18n.ts.enableHorizontalSwipe,
				keywords: ['swipe', 'horizontal', 'tab'],
			},
			{
				id: 'kYVJ3SVNq',
				label: i18n.ts.keepScreenOn,
				keywords: ['keep', 'screen', 'display', 'on'],
			},
			{
				id: 'w4Bv0meAt',
				label: i18n.ts.useNativeUIForVideoAudioPlayer,
				keywords: ['native', 'system', 'video', 'audio', 'player', 'media'],
			},
			{
				id: 'b1GYEEJeh',
				label: i18n.ts._settings.makeEveryTextElementsSelectable,
				keywords: ['text', 'selectable'],
			},
			{
				id: 'vVLxwINTJ',
				label: i18n.ts.menuStyle,
				keywords: ['menu', 'style', 'popup', 'drawer'],
			},
			{
				id: '14cMhMLHL',
				label: i18n.ts._contextMenu.title,
				keywords: ['contextmenu', 'system', 'native'],
			},
			{
				id: 'oSo4LXMX9',
				label: i18n.ts.fontSize,
				keywords: ['font', 'size'],
			},
			{
				id: '7LQSAThST',
				label: i18n.ts.useSystemFont,
				keywords: ['font', 'system', 'native'],
			},
		],
		label: i18n.ts.accessibility,
		keywords: ['accessibility', i18n.ts._settings.accessibilityBanner],
		path: '/settings/accessibility',
		icon: 'ti ti-accessible',
	},
] as const;

export type SearchIndex = typeof searchIndexes;
