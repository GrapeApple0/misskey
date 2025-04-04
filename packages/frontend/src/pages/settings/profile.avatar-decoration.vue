<!--
SPDX-FileCopyrightText: syuilo and other misskey contributors
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<div v-if="!loading" class="_gaps">
	<MkInfo>{{ i18n.t('_profile.avatarDecorationMax', { max: $i.policies.avatarDecorationLimit }) }} ({{ i18n.t('remainingN', { n: $i.policies.avatarDecorationLimit - $i.avatarDecorations.length }) }})</MkInfo>

	<div v-if="$i.avatarDecorations.length > 0" v-panel :class="$style.current" class="_gaps_s">
		<div>{{ i18n.ts.inUse }}</div>

		<div :class="$style.decorations">
			<XDecoration
				v-for="(avatarDecoration, i) in $i.avatarDecorations"
				:decoration="avatarDecorations.find(d => d.id === avatarDecoration.id)"
				:angle="avatarDecoration.angle"
				:flipH="avatarDecoration.flipH"
				:offsetX="avatarDecoration.offsetX"
				:offsetY="avatarDecoration.offsetY"
				:active="true"
				@click="openDecoration(avatarDecoration, i)"
			/>
		</div>

		<MkButton danger @click="detachAllDecorations">{{ i18n.ts.detachAll }}</MkButton>
	</div>

	<div :class="$style.decorations">
		<XDecoration
			v-for="avatarDecoration in avatarDecorations"
			:key="avatarDecoration.id"
			:decoration="avatarDecoration"
			@click="openDecoration(avatarDecoration)"
		/>
	</div>
</div>
<div v-else>
	<MkLoading/>
</div>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent } from 'vue';
import * as Misskey from 'misskey-js';
import XDecoration from './profile.avatar-decoration.decoration.vue';
import MkButton from '@/components/MkButton.vue';
import * as os from '@/os.js';
import { misskeyApi } from '@/utility/misskey-api.js';
import { i18n } from '@/i18n.js';
import { ensureSignin } from '@/i.js';
import MkInfo from '@/components/MkInfo.vue';

const $i = ensureSignin();

const loading = ref(true);
const avatarDecorations = ref<Misskey.entities.GetAvatarDecorationsResponse>([]);

misskeyApi('get-avatar-decorations').then(_avatarDecorations => {
	avatarDecorations.value = _avatarDecorations;
	loading.value = false;
});

function openDecoration(avatarDecoration, index?: number) {
	os.popup(defineAsyncComponent(() => import('./profile.avatar-decoration.dialog.vue')), {
		decoration: avatarDecoration,
		usingIndex: index,
	}, {
		'attach': async (payload) => {
			const decoration = {
				id: avatarDecoration.id,
				angle: payload.angle,
				flipH: payload.flipH,
				offsetX: payload.offsetX,
				offsetY: payload.offsetY,
			};
			const update = [...$i.avatarDecorations, decoration];
			await os.apiWithDialog('i/update', {
				avatarDecorations: update,
			});
			$i.avatarDecorations = update;
		},
		'update': async (payload) => {
			const decoration = {
				id: avatarDecoration.id,
				angle: payload.angle,
				flipH: payload.flipH,
				offsetX: payload.offsetX,
				offsetY: payload.offsetY,
			};
			const update = [...$i.avatarDecorations];
			update[index] = decoration;
			await os.apiWithDialog('i/update', {
				avatarDecorations: update,
			});
			$i.avatarDecorations = update;
		},
		'detach': async () => {
			const update = [...$i.avatarDecorations];
			update.splice(index, 1);
			await os.apiWithDialog('i/update', {
				avatarDecorations: update,
			});
			$i.avatarDecorations = update;
		},
	}, 'closed');
}

function detachAllDecorations() {
	os.confirm({
		type: 'warning',
		text: i18n.ts.areYouSure,
	}).then(async ({ canceled }) => {
		if (canceled) return;
		await os.apiWithDialog('i/update', {
			avatarDecorations: [],
		});
		$i.avatarDecorations = [];
	});
}
</script>

<style lang="scss" module>
.current {
	padding: 16px;
	border-radius: var(--radius);
}

.decorations {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
	grid-gap: 12px;
}
</style>
