/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/*
 * This file contains list of all endpoints exported as pathname of API endpoint
 *
 * When you add new endpoint, you should add it to this file.
 * This file is used to generate API documentation and EndpointsModule.
 */

export * as 'admin/abuse-report/notification-recipient/create' from './endpoints/admin/abuse-report/notification-recipient/create.js';
export * as 'admin/abuse-report/notification-recipient/delete' from './endpoints/admin/abuse-report/notification-recipient/delete.js';
export * as 'admin/abuse-report/notification-recipient/list' from './endpoints/admin/abuse-report/notification-recipient/list.js';
export * as 'admin/abuse-report/notification-recipient/show' from './endpoints/admin/abuse-report/notification-recipient/show.js';
export * as 'admin/abuse-report/notification-recipient/update' from './endpoints/admin/abuse-report/notification-recipient/update.js';
export * as 'admin/abuse-user-reports' from './endpoints/admin/abuse-user-reports.js';
export * as 'admin/accounts/create' from './endpoints/admin/accounts/create.js';
export * as 'admin/accounts/delete' from './endpoints/admin/accounts/delete.js';
export * as 'admin/accounts/find-by-email' from './endpoints/admin/accounts/find-by-email.js';
export * as 'admin/ad/create' from './endpoints/admin/ad/create.js';
export * as 'admin/ad/delete' from './endpoints/admin/ad/delete.js';
export * as 'admin/ad/list' from './endpoints/admin/ad/list.js';
export * as 'admin/ad/update' from './endpoints/admin/ad/update.js';
export * as 'admin/announcements/create' from './endpoints/admin/announcements/create.js';
export * as 'admin/announcements/delete' from './endpoints/admin/announcements/delete.js';
export * as 'admin/announcements/list' from './endpoints/admin/announcements/list.js';
export * as 'admin/announcements/update' from './endpoints/admin/announcements/update.js';
export * as 'admin/avatar-decorations/create' from './endpoints/admin/avatar-decorations/create.js';
export * as 'admin/avatar-decorations/delete' from './endpoints/admin/avatar-decorations/delete.js';
export * as 'admin/avatar-decorations/list' from './endpoints/admin/avatar-decorations/list.js';
export * as 'admin/avatar-decorations/update' from './endpoints/admin/avatar-decorations/update.js';
export * as 'admin/captcha/current' from './endpoints/admin/captcha/current.js';
export * as 'admin/captcha/save' from './endpoints/admin/captcha/save.js';
export * as 'admin/delete-account' from './endpoints/admin/delete-account.js';
export * as 'admin/delete-all-files-of-a-user' from './endpoints/admin/delete-all-files-of-a-user.js';
export * as 'admin/drive/clean-remote-files' from './endpoints/admin/drive/clean-remote-files.js';
export * as 'admin/drive/cleanup' from './endpoints/admin/drive/cleanup.js';
export * as 'admin/drive/files' from './endpoints/admin/drive/files.js';
export * as 'admin/drive/show-file' from './endpoints/admin/drive/show-file.js';
export * as 'admin/emoji/add' from './endpoints/admin/emoji/add.js';
export * as 'admin/emoji/add-aliases-bulk' from './endpoints/admin/emoji/add-aliases-bulk.js';
export * as 'admin/emoji/copy' from './endpoints/admin/emoji/copy.js';
export * as 'admin/emoji/delete' from './endpoints/admin/emoji/delete.js';
export * as 'admin/emoji/delete-bulk' from './endpoints/admin/emoji/delete-bulk.js';
export * as 'admin/emoji/import-zip' from './endpoints/admin/emoji/import-zip.js';
export * as 'admin/emoji/list' from './endpoints/admin/emoji/list.js';
export * as 'admin/emoji/list-remote' from './endpoints/admin/emoji/list-remote.js';
export * as 'admin/emoji/remove-aliases-bulk' from './endpoints/admin/emoji/remove-aliases-bulk.js';
export * as 'admin/emoji/set-aliases-bulk' from './endpoints/admin/emoji/set-aliases-bulk.js';
export * as 'admin/emoji/set-category-bulk' from './endpoints/admin/emoji/set-category-bulk.js';
export * as 'admin/emoji/set-license-bulk' from './endpoints/admin/emoji/set-license-bulk.js';
export * as 'admin/emoji/update' from './endpoints/admin/emoji/update.js';
export * as 'admin/federation/delete-all-files' from './endpoints/admin/federation/delete-all-files.js';
export * as 'admin/federation/refresh-remote-instance-metadata' from './endpoints/admin/federation/refresh-remote-instance-metadata.js';
export * as 'admin/federation/remove-all-following' from './endpoints/admin/federation/remove-all-following.js';
export * as 'admin/federation/update-instance' from './endpoints/admin/federation/update-instance.js';
export * as 'admin/forward-abuse-user-report' from './endpoints/admin/forward-abuse-user-report.js';
export * as 'admin/get-index-stats' from './endpoints/admin/get-index-stats.js';
export * as 'admin/get-table-stats' from './endpoints/admin/get-table-stats.js';
export * as 'admin/get-user-ips' from './endpoints/admin/get-user-ips.js';
export * as 'admin/invite/create' from './endpoints/admin/invite/create.js';
export * as 'admin/invite/list' from './endpoints/admin/invite/list.js';
export * as 'admin/meta' from './endpoints/admin/meta.js';
export * as 'admin/promo/create' from './endpoints/admin/promo/create.js';
export * as 'admin/queue/clear' from './endpoints/admin/queue/clear.js';
export * as 'admin/queue/deliver-delayed' from './endpoints/admin/queue/deliver-delayed.js';
export * as 'admin/queue/inbox-delayed' from './endpoints/admin/queue/inbox-delayed.js';
export * as 'admin/queue/promote' from './endpoints/admin/queue/promote.js';
export * as 'admin/queue/stats' from './endpoints/admin/queue/stats.js';
export * as 'admin/relays/add' from './endpoints/admin/relays/add.js';
export * as 'admin/relays/list' from './endpoints/admin/relays/list.js';
export * as 'admin/relays/remove' from './endpoints/admin/relays/remove.js';
export * as 'admin/reset-password' from './endpoints/admin/reset-password.js';
export * as 'admin/resolve-abuse-user-report' from './endpoints/admin/resolve-abuse-user-report.js';
export * as 'admin/roles/assign' from './endpoints/admin/roles/assign.js';
export * as 'admin/roles/create' from './endpoints/admin/roles/create.js';
export * as 'admin/roles/delete' from './endpoints/admin/roles/delete.js';
export * as 'admin/roles/list' from './endpoints/admin/roles/list.js';
export * as 'admin/roles/show' from './endpoints/admin/roles/show.js';
export * as 'admin/roles/unassign' from './endpoints/admin/roles/unassign.js';
export * as 'admin/roles/update' from './endpoints/admin/roles/update.js';
export * as 'admin/roles/update-default-policies' from './endpoints/admin/roles/update-default-policies.js';
export * as 'admin/roles/users' from './endpoints/admin/roles/users.js';
export * as 'admin/send-email' from './endpoints/admin/send-email.js';
export * as 'admin/server-info' from './endpoints/admin/server-info.js';
export * as 'admin/show-moderation-logs' from './endpoints/admin/show-moderation-logs.js';
export * as 'admin/show-user' from './endpoints/admin/show-user.js';
export * as 'admin/show-users' from './endpoints/admin/show-users.js';
export * as 'admin/suspend-user' from './endpoints/admin/suspend-user.js';
export * as 'admin/system-webhook/create' from './endpoints/admin/system-webhook/create.js';
export * as 'admin/system-webhook/delete' from './endpoints/admin/system-webhook/delete.js';
export * as 'admin/system-webhook/list' from './endpoints/admin/system-webhook/list.js';
export * as 'admin/system-webhook/show' from './endpoints/admin/system-webhook/show.js';
export * as 'admin/system-webhook/test' from './endpoints/admin/system-webhook/test.js';
export * as 'admin/system-webhook/update' from './endpoints/admin/system-webhook/update.js';
export * as 'admin/unset-user-avatar' from './endpoints/admin/unset-user-avatar.js';
export * as 'admin/unset-user-banner' from './endpoints/admin/unset-user-banner.js';
export * as 'admin/unsuspend-user' from './endpoints/admin/unsuspend-user.js';
export * as 'admin/update-abuse-user-report' from './endpoints/admin/update-abuse-user-report.js';
export * as 'admin/update-meta' from './endpoints/admin/update-meta.js';
export * as 'admin/update-proxy-account' from './endpoints/admin/update-proxy-account.js';
export * as 'admin/update-user-note' from './endpoints/admin/update-user-note.js';
export * as 'announcements' from './endpoints/announcements.js';
export * as 'announcements/show' from './endpoints/announcements/show.js';
export * as 'antennas/create' from './endpoints/antennas/create.js';
export * as 'antennas/delete' from './endpoints/antennas/delete.js';
export * as 'antennas/list' from './endpoints/antennas/list.js';
export * as 'antennas/notes' from './endpoints/antennas/notes.js';
export * as 'antennas/show' from './endpoints/antennas/show.js';
export * as 'antennas/update' from './endpoints/antennas/update.js';
export * as 'ap/get' from './endpoints/ap/get.js';
export * as 'ap/show' from './endpoints/ap/show.js';
export * as 'app/create' from './endpoints/app/create.js';
export * as 'app/show' from './endpoints/app/show.js';
export * as 'auth/accept' from './endpoints/auth/accept.js';
export * as 'auth/session/generate' from './endpoints/auth/session/generate.js';
export * as 'auth/session/show' from './endpoints/auth/session/show.js';
export * as 'auth/session/userkey' from './endpoints/auth/session/userkey.js';
export * as 'blocking/create' from './endpoints/blocking/create.js';
export * as 'blocking/delete' from './endpoints/blocking/delete.js';
export * as 'blocking/list' from './endpoints/blocking/list.js';
export * as 'bubble-game/ranking' from './endpoints/bubble-game/ranking.js';
export * as 'bubble-game/register' from './endpoints/bubble-game/register.js';
export * as 'channels/create' from './endpoints/channels/create.js';
export * as 'channels/favorite' from './endpoints/channels/favorite.js';
export * as 'channels/featured' from './endpoints/channels/featured.js';
export * as 'channels/follow' from './endpoints/channels/follow.js';
export * as 'channels/followed' from './endpoints/channels/followed.js';
export * as 'channels/my-favorites' from './endpoints/channels/my-favorites.js';
export * as 'channels/owned' from './endpoints/channels/owned.js';
export * as 'channels/search' from './endpoints/channels/search.js';
export * as 'channels/show' from './endpoints/channels/show.js';
export * as 'channels/timeline' from './endpoints/channels/timeline.js';
export * as 'channels/unfavorite' from './endpoints/channels/unfavorite.js';
export * as 'channels/unfollow' from './endpoints/channels/unfollow.js';
export * as 'channels/update' from './endpoints/channels/update.js';
export * as 'charts/active-users' from './endpoints/charts/active-users.js';
export * as 'charts/ap-request' from './endpoints/charts/ap-request.js';
export * as 'charts/drive' from './endpoints/charts/drive.js';
export * as 'charts/federation' from './endpoints/charts/federation.js';
export * as 'charts/instance' from './endpoints/charts/instance.js';
export * as 'charts/notes' from './endpoints/charts/notes.js';
export * as 'charts/user/drive' from './endpoints/charts/user/drive.js';
export * as 'charts/user/following' from './endpoints/charts/user/following.js';
export * as 'charts/user/notes' from './endpoints/charts/user/notes.js';
export * as 'charts/user/pv' from './endpoints/charts/user/pv.js';
export * as 'charts/user/reactions' from './endpoints/charts/user/reactions.js';
export * as 'charts/users' from './endpoints/charts/users.js';
export * as 'clips/add-note' from './endpoints/clips/add-note.js';
export * as 'clips/create' from './endpoints/clips/create.js';
export * as 'clips/delete' from './endpoints/clips/delete.js';
export * as 'clips/favorite' from './endpoints/clips/favorite.js';
export * as 'clips/list' from './endpoints/clips/list.js';
export * as 'clips/my-favorites' from './endpoints/clips/my-favorites.js';
export * as 'clips/notes' from './endpoints/clips/notes.js';
export * as 'clips/remove-note' from './endpoints/clips/remove-note.js';
export * as 'clips/show' from './endpoints/clips/show.js';
export * as 'clips/unfavorite' from './endpoints/clips/unfavorite.js';
export * as 'clips/update' from './endpoints/clips/update.js';
export * as 'drive' from './endpoints/drive.js';
export * as 'drive/files' from './endpoints/drive/files.js';
export * as 'drive/files/attached-notes' from './endpoints/drive/files/attached-notes.js';
export * as 'drive/files/check-existence' from './endpoints/drive/files/check-existence.js';
export * as 'drive/files/create' from './endpoints/drive/files/create.js';
export * as 'drive/files/delete' from './endpoints/drive/files/delete.js';
export * as 'drive/files/find' from './endpoints/drive/files/find.js';
export * as 'drive/files/find-by-hash' from './endpoints/drive/files/find-by-hash.js';
export * as 'drive/files/show' from './endpoints/drive/files/show.js';
export * as 'drive/files/update' from './endpoints/drive/files/update.js';
export * as 'drive/files/upload-from-url' from './endpoints/drive/files/upload-from-url.js';
export * as 'drive/folders' from './endpoints/drive/folders.js';
export * as 'drive/folders/create' from './endpoints/drive/folders/create.js';
export * as 'drive/folders/delete' from './endpoints/drive/folders/delete.js';
export * as 'drive/folders/find' from './endpoints/drive/folders/find.js';
export * as 'drive/folders/show' from './endpoints/drive/folders/show.js';
export * as 'drive/folders/update' from './endpoints/drive/folders/update.js';
export * as 'drive/stream' from './endpoints/drive/stream.js';
export * as 'email-address/available' from './endpoints/email-address/available.js';
export * as 'emoji' from './endpoints/emoji.js';
export * as 'emojis' from './endpoints/emojis.js';
export * as 'endpoint' from './endpoints/endpoint.js';
export * as 'endpoints' from './endpoints/endpoints.js';
export * as 'export-custom-emojis' from './endpoints/export-custom-emojis.js';
export * as 'federation/followers' from './endpoints/federation/followers.js';
export * as 'federation/following' from './endpoints/federation/following.js';
export * as 'federation/instances' from './endpoints/federation/instances.js';
export * as 'federation/show-instance' from './endpoints/federation/show-instance.js';
export * as 'federation/stats' from './endpoints/federation/stats.js';
export * as 'federation/update-remote-user' from './endpoints/federation/update-remote-user.js';
export * as 'federation/users' from './endpoints/federation/users.js';
export * as 'fetch-external-resources' from './endpoints/fetch-external-resources.js';
export * as 'fetch-rss' from './endpoints/fetch-rss.js';
export * as 'flash/create' from './endpoints/flash/create.js';
export * as 'flash/delete' from './endpoints/flash/delete.js';
export * as 'flash/featured' from './endpoints/flash/featured.js';
export * as 'flash/like' from './endpoints/flash/like.js';
export * as 'flash/my' from './endpoints/flash/my.js';
export * as 'flash/my-likes' from './endpoints/flash/my-likes.js';
export * as 'flash/show' from './endpoints/flash/show.js';
export * as 'flash/unlike' from './endpoints/flash/unlike.js';
export * as 'flash/update' from './endpoints/flash/update.js';
export * as 'following/create' from './endpoints/following/create.js';
export * as 'following/delete' from './endpoints/following/delete.js';
export * as 'following/invalidate' from './endpoints/following/invalidate.js';
export * as 'following/requests/accept' from './endpoints/following/requests/accept.js';
export * as 'following/requests/cancel' from './endpoints/following/requests/cancel.js';
export * as 'following/requests/list' from './endpoints/following/requests/list.js';
export * as 'following/requests/reject' from './endpoints/following/requests/reject.js';
export * as 'following/requests/sent' from './endpoints/following/requests/sent.js';
export * as 'following/update' from './endpoints/following/update.js';
export * as 'following/update-all' from './endpoints/following/update-all.js';
export * as 'gallery/featured' from './endpoints/gallery/featured.js';
export * as 'gallery/popular' from './endpoints/gallery/popular.js';
export * as 'gallery/posts' from './endpoints/gallery/posts.js';
export * as 'gallery/posts/create' from './endpoints/gallery/posts/create.js';
export * as 'gallery/posts/delete' from './endpoints/gallery/posts/delete.js';
export * as 'gallery/posts/like' from './endpoints/gallery/posts/like.js';
export * as 'gallery/posts/show' from './endpoints/gallery/posts/show.js';
export * as 'gallery/posts/unlike' from './endpoints/gallery/posts/unlike.js';
export * as 'gallery/posts/update' from './endpoints/gallery/posts/update.js';
export * as 'get-avatar-decorations' from './endpoints/get-avatar-decorations.js';
export * as 'get-online-users-count' from './endpoints/get-online-users-count.js';
export * as 'hashtags/list' from './endpoints/hashtags/list.js';
export * as 'hashtags/search' from './endpoints/hashtags/search.js';
export * as 'hashtags/show' from './endpoints/hashtags/show.js';
export * as 'hashtags/trend' from './endpoints/hashtags/trend.js';
export * as 'hashtags/users' from './endpoints/hashtags/users.js';
export * as 'i' from './endpoints/i.js';
export * as 'i/2fa/done' from './endpoints/i/2fa/done.js';
export * as 'i/2fa/key-done' from './endpoints/i/2fa/key-done.js';
export * as 'i/2fa/password-less' from './endpoints/i/2fa/password-less.js';
export * as 'i/2fa/register' from './endpoints/i/2fa/register.js';
export * as 'i/2fa/register-key' from './endpoints/i/2fa/register-key.js';
export * as 'i/2fa/remove-key' from './endpoints/i/2fa/remove-key.js';
export * as 'i/2fa/unregister' from './endpoints/i/2fa/unregister.js';
export * as 'i/2fa/update-key' from './endpoints/i/2fa/update-key.js';
export * as 'i/apps' from './endpoints/i/apps.js';
export * as 'i/authorized-apps' from './endpoints/i/authorized-apps.js';
export * as 'i/change-password' from './endpoints/i/change-password.js';
export * as 'i/claim-achievement' from './endpoints/i/claim-achievement.js';
export * as 'i/delete-account' from './endpoints/i/delete-account.js';
export * as 'i/export-antennas' from './endpoints/i/export-antennas.js';
export * as 'i/export-blocking' from './endpoints/i/export-blocking.js';
export * as 'i/export-clips' from './endpoints/i/export-clips.js';
export * as 'i/export-favorites' from './endpoints/i/export-favorites.js';
export * as 'i/export-following' from './endpoints/i/export-following.js';
export * as 'i/export-mute' from './endpoints/i/export-mute.js';
export * as 'i/export-notes' from './endpoints/i/export-notes.js';
export * as 'i/export-user-lists' from './endpoints/i/export-user-lists.js';
export * as 'i/favorites' from './endpoints/i/favorites.js';
export * as 'i/gallery/likes' from './endpoints/i/gallery/likes.js';
export * as 'i/gallery/posts' from './endpoints/i/gallery/posts.js';
export * as 'i/import-antennas' from './endpoints/i/import-antennas.js';
export * as 'i/import-blocking' from './endpoints/i/import-blocking.js';
export * as 'i/import-following' from './endpoints/i/import-following.js';
export * as 'i/import-muting' from './endpoints/i/import-muting.js';
export * as 'i/import-user-lists' from './endpoints/i/import-user-lists.js';
export * as 'i/move' from './endpoints/i/move.js';
export * as 'i/notifications' from './endpoints/i/notifications.js';
export * as 'i/notifications-grouped' from './endpoints/i/notifications-grouped.js';
export * as 'i/page-likes' from './endpoints/i/page-likes.js';
export * as 'i/pages' from './endpoints/i/pages.js';
export * as 'i/pin' from './endpoints/i/pin.js';
export * as 'i/read-announcement' from './endpoints/i/read-announcement.js';
export * as 'i/regenerate-token' from './endpoints/i/regenerate-token.js';
export * as 'i/registry/get' from './endpoints/i/registry/get.js';
export * as 'i/registry/get-all' from './endpoints/i/registry/get-all.js';
export * as 'i/registry/get-detail' from './endpoints/i/registry/get-detail.js';
export * as 'i/registry/keys' from './endpoints/i/registry/keys.js';
export * as 'i/registry/keys-with-type' from './endpoints/i/registry/keys-with-type.js';
export * as 'i/registry/remove' from './endpoints/i/registry/remove.js';
export * as 'i/registry/scopes-with-domain' from './endpoints/i/registry/scopes-with-domain.js';
export * as 'i/registry/set' from './endpoints/i/registry/set.js';
export * as 'i/revoke-token' from './endpoints/i/revoke-token.js';
export * as 'i/signin-history' from './endpoints/i/signin-history.js';
export * as 'i/unpin' from './endpoints/i/unpin.js';
export * as 'i/update' from './endpoints/i/update.js';
export * as 'i/update-email' from './endpoints/i/update-email.js';
export * as 'i/webhooks/create' from './endpoints/i/webhooks/create.js';
export * as 'i/webhooks/delete' from './endpoints/i/webhooks/delete.js';
export * as 'i/webhooks/list' from './endpoints/i/webhooks/list.js';
export * as 'i/webhooks/show' from './endpoints/i/webhooks/show.js';
export * as 'i/webhooks/test' from './endpoints/i/webhooks/test.js';
export * as 'i/webhooks/update' from './endpoints/i/webhooks/update.js';
export * as 'invite/create' from './endpoints/invite/create.js';
export * as 'invite/delete' from './endpoints/invite/delete.js';
export * as 'invite/limit' from './endpoints/invite/limit.js';
export * as 'invite/list' from './endpoints/invite/list.js';
export * as 'meta' from './endpoints/meta.js';
export * as 'miauth/gen-token' from './endpoints/miauth/gen-token.js';
export * as 'mute/create' from './endpoints/mute/create.js';
export * as 'mute/delete' from './endpoints/mute/delete.js';
export * as 'mute/list' from './endpoints/mute/list.js';
export * as 'my/apps' from './endpoints/my/apps.js';
export * as 'notes' from './endpoints/notes.js';
export * as 'notes/children' from './endpoints/notes/children.js';
export * as 'notes/clips' from './endpoints/notes/clips.js';
export * as 'notes/conversation' from './endpoints/notes/conversation.js';
export * as 'notes/create' from './endpoints/notes/create.js';
export * as 'notes/delete' from './endpoints/notes/delete.js';
export * as 'notes/favorites/create' from './endpoints/notes/favorites/create.js';
export * as 'notes/favorites/delete' from './endpoints/notes/favorites/delete.js';
export * as 'notes/featured' from './endpoints/notes/featured.js';
export * as 'notes/global-timeline' from './endpoints/notes/global-timeline.js';
export * as 'notes/hybrid-timeline' from './endpoints/notes/hybrid-timeline.js';
export * as 'notes/local-timeline' from './endpoints/notes/local-timeline.js';
export * as 'notes/mentions' from './endpoints/notes/mentions.js';
export * as 'notes/polls/recommendation' from './endpoints/notes/polls/recommendation.js';
export * as 'notes/polls/vote' from './endpoints/notes/polls/vote.js';
export * as 'notes/reactions' from './endpoints/notes/reactions.js';
export * as 'notes/reactions/create' from './endpoints/notes/reactions/create.js';
export * as 'notes/reactions/delete' from './endpoints/notes/reactions/delete.js';
export * as 'notes/renotes' from './endpoints/notes/renotes.js';
export * as 'notes/replies' from './endpoints/notes/replies.js';
export * as 'notes/search' from './endpoints/notes/search.js';
export * as 'notes/search-by-tag' from './endpoints/notes/search-by-tag.js';
export * as 'notes/show' from './endpoints/notes/show.js';
export * as 'notes/state' from './endpoints/notes/state.js';
export * as 'notes/thread-muting/create' from './endpoints/notes/thread-muting/create.js';
export * as 'notes/thread-muting/delete' from './endpoints/notes/thread-muting/delete.js';
export * as 'notes/timeline' from './endpoints/notes/timeline.js';
export * as 'notes/translate' from './endpoints/notes/translate.js';
export * as 'notes/unrenote' from './endpoints/notes/unrenote.js';
export * as 'notes/user-list-timeline' from './endpoints/notes/user-list-timeline.js';
export * as 'notifications/create' from './endpoints/notifications/create.js';
export * as 'notifications/flush' from './endpoints/notifications/flush.js';
export * as 'notifications/mark-all-as-read' from './endpoints/notifications/mark-all-as-read.js';
export * as 'notifications/test-notification' from './endpoints/notifications/test-notification.js';
export * as 'page-push' from './endpoints/page-push.js';
export * as 'pages/create' from './endpoints/pages/create.js';
export * as 'pages/delete' from './endpoints/pages/delete.js';
export * as 'pages/featured' from './endpoints/pages/featured.js';
export * as 'pages/like' from './endpoints/pages/like.js';
export * as 'pages/show' from './endpoints/pages/show.js';
export * as 'pages/unlike' from './endpoints/pages/unlike.js';
export * as 'pages/update' from './endpoints/pages/update.js';
export * as 'ping' from './endpoints/ping.js';
export * as 'pinned-users' from './endpoints/pinned-users.js';
export * as 'promo/read' from './endpoints/promo/read.js';
export * as 'renote-mute/create' from './endpoints/renote-mute/create.js';
export * as 'renote-mute/delete' from './endpoints/renote-mute/delete.js';
export * as 'renote-mute/list' from './endpoints/renote-mute/list.js';
export * as 'request-reset-password' from './endpoints/request-reset-password.js';
export * as 'reset-db' from './endpoints/reset-db.js';
export * as 'reset-password' from './endpoints/reset-password.js';
export * as 'retention' from './endpoints/retention.js';
export * as 'reversi/cancel-match' from './endpoints/reversi/cancel-match.js';
export * as 'reversi/games' from './endpoints/reversi/games.js';
export * as 'reversi/invitations' from './endpoints/reversi/invitations.js';
export * as 'reversi/match' from './endpoints/reversi/match.js';
export * as 'reversi/show-game' from './endpoints/reversi/show-game.js';
export * as 'reversi/surrender' from './endpoints/reversi/surrender.js';
export * as 'reversi/verify' from './endpoints/reversi/verify.js';
export * as 'roles/list' from './endpoints/roles/list.js';
export * as 'roles/notes' from './endpoints/roles/notes.js';
export * as 'roles/show' from './endpoints/roles/show.js';
export * as 'roles/users' from './endpoints/roles/users.js';
export * as 'server-info' from './endpoints/server-info.js';
export * as 'stats' from './endpoints/stats.js';
export * as 'sw/register' from './endpoints/sw/register.js';
export * as 'sw/show-registration' from './endpoints/sw/show-registration.js';
export * as 'sw/unregister' from './endpoints/sw/unregister.js';
export * as 'sw/update-registration' from './endpoints/sw/update-registration.js';
export * as 'test' from './endpoints/test.js';
export * as 'username/available' from './endpoints/username/available.js';
export * as 'users' from './endpoints/users.js';
export * as 'users/achievements' from './endpoints/users/achievements.js';
export * as 'users/clips' from './endpoints/users/clips.js';
export * as 'users/featured-notes' from './endpoints/users/featured-notes.js';
export * as 'users/flashs' from './endpoints/users/flashs.js';
export * as 'users/followers' from './endpoints/users/followers.js';
export * as 'users/following' from './endpoints/users/following.js';
export * as 'users/gallery/posts' from './endpoints/users/gallery/posts.js';
export * as 'users/get-frequently-replied-users' from './endpoints/users/get-frequently-replied-users.js';
export * as 'users/lists/create' from './endpoints/users/lists/create.js';
export * as 'users/lists/create-from-public' from './endpoints/users/lists/create-from-public.js';
export * as 'users/lists/delete' from './endpoints/users/lists/delete.js';
export * as 'users/lists/favorite' from './endpoints/users/lists/favorite.js';
export * as 'users/lists/get-memberships' from './endpoints/users/lists/get-memberships.js';
export * as 'users/lists/list' from './endpoints/users/lists/list.js';
export * as 'users/lists/pull' from './endpoints/users/lists/pull.js';
export * as 'users/lists/push' from './endpoints/users/lists/push.js';
export * as 'users/lists/show' from './endpoints/users/lists/show.js';
export * as 'users/lists/unfavorite' from './endpoints/users/lists/unfavorite.js';
export * as 'users/lists/update' from './endpoints/users/lists/update.js';
export * as 'users/lists/update-membership' from './endpoints/users/lists/update-membership.js';
export * as 'users/notes' from './endpoints/users/notes.js';
export * as 'users/pages' from './endpoints/users/pages.js';
export * as 'users/reactions' from './endpoints/users/reactions.js';
export * as 'users/recommendation' from './endpoints/users/recommendation.js';
export * as 'users/relation' from './endpoints/users/relation.js';
export * as 'users/report-abuse' from './endpoints/users/report-abuse.js';
export * as 'users/search' from './endpoints/users/search.js';
export * as 'users/search-by-username-and-host' from './endpoints/users/search-by-username-and-host.js';
export * as 'users/show' from './endpoints/users/show.js';
export * as 'users/update-memo' from './endpoints/users/update-memo.js';
export * as 'chat/messages/create-to-user' from './endpoints/chat/messages/create-to-user.js';
export * as 'chat/messages/create-to-room' from './endpoints/chat/messages/create-to-room.js';
export * as 'chat/messages/delete' from './endpoints/chat/messages/delete.js';
export * as 'chat/messages/show' from './endpoints/chat/messages/show.js';
export * as 'chat/messages/react' from './endpoints/chat/messages/react.js';
export * as 'chat/messages/user-timeline' from './endpoints/chat/messages/user-timeline.js';
export * as 'chat/messages/room-timeline' from './endpoints/chat/messages/room-timeline.js';
export * as 'chat/messages/search' from './endpoints/chat/messages/search.js';
export * as 'chat/rooms/create' from './endpoints/chat/rooms/create.js';
export * as 'chat/rooms/delete' from './endpoints/chat/rooms/delete.js';
export * as 'chat/rooms/join' from './endpoints/chat/rooms/join.js';
export * as 'chat/rooms/leave' from './endpoints/chat/rooms/leave.js';
export * as 'chat/rooms/mute' from './endpoints/chat/rooms/mute.js';
export * as 'chat/rooms/show' from './endpoints/chat/rooms/show.js';
export * as 'chat/rooms/owned' from './endpoints/chat/rooms/owned.js';
export * as 'chat/rooms/joining' from './endpoints/chat/rooms/joining.js';
export * as 'chat/rooms/update' from './endpoints/chat/rooms/update.js';
export * as 'chat/rooms/members' from './endpoints/chat/rooms/members.js';
export * as 'chat/rooms/invitations/create' from './endpoints/chat/rooms/invitations/create.js';
export * as 'chat/rooms/invitations/ignore' from './endpoints/chat/rooms/invitations/ignore.js';
export * as 'chat/rooms/invitations/inbox' from './endpoints/chat/rooms/invitations/inbox.js';
export * as 'chat/history' from './endpoints/chat/history.js';
export * as 'v2/admin/emoji/list' from './endpoints/v2/admin/emoji/list.js';
