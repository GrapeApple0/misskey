<!--
SPDX-FileCopyrightText: syuilo and misskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<MkModal
	ref="modal"
	:preferType="'dialog'"
	@click="onBgClick()"
	@closed="onModalClosed()"
	@esc="onEsc"
>
	<MkPostForm
		ref="form"
		:class="$style.form"
		v-bind="props"
		autofocus
		freezeAfterPosted
		:updateMode="updateMode"
		@posted="onPosted"
		@cancel="_close()"
		@esc="_close()"
	/>
</MkModal>
</template>

<script lang="ts" setup>
import { useTemplateRef } from 'vue';
import type { PostFormProps } from '@/types/post-form.js';
import MkModal from '@/components/MkModal.vue';
import MkPostForm from '@/components/MkPostForm.vue';

const props = withDefaults(defineProps<PostFormProps & {
	instant?: boolean;
	fixed?: boolean;
	autofocus?: boolean;
	updateMode?: boolean;
}>(), {
	initialLocalOnly: undefined,
});

const emit = defineEmits<{
	(ev: 'closed'): void;
}>();

const modal = useTemplateRef('modal');
const form = useTemplateRef('form');

function onPosted() {
	modal.value?.close({
		useSendAnimation: true,
	});
}

async function _close() {
	const canClose = await form.value?.canClose();
	if (!canClose) return;
	modal.value?.close();
}

function onEsc(ev: KeyboardEvent) {
	_close();
}

function onBgClick() {
	_close();
}

function onModalClosed() {
	emit('closed');
}
</script>

<style lang="scss" module>
.form {
	max-height: 100%;
	margin: 0 auto auto auto;
}
</style>
