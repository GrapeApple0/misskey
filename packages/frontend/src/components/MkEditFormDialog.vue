<!--
SPDX-FileCopyrightText: syuilo and misskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<MkModal ref="modal" :preferType="'dialog'" @click="modal?.close()" @closed="onModalClosed()" @esc="modal?.close()">
	<MkEditForm ref="form" :class="$style.form" v-bind="props" autofocus freezeAfterPosted @posted="onPosted" @cancel="modal?.close()" @esc="modal?.close()"/>
</MkModal>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue';
import * as Misskey from 'misskey-js';
import type { PostFormProps } from '@/types/post-form';
import MkModal from '@/components/MkModal.vue';
import MkEditForm from '@/components/MkEditForm.vue';

const props = withDefaults(defineProps<PostFormProps & {
	target: Misskey.entities.Note;
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

const modal = shallowRef<InstanceType<typeof MkModal>>();
const form = shallowRef<InstanceType<typeof MkEditForm>>();

function onPosted() {
	modal.value?.close({
		useSendAnimation: true,
	});
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
