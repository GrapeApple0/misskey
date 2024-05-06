<!--
SPDX-FileCopyrightText: syuilo and misskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<TransitionGroup
	:enterActiveClass="defaultStore.state.animation ? $style.transition_x_enterActive : ''"
	:leaveActiveClass="defaultStore.state.animation ? $style.transition_x_leaveActive : ''"
	:enterFromClass="defaultStore.state.animation ? $style.transition_x_enterFrom : ''"
	:leaveToClass="defaultStore.state.animation ? $style.transition_x_leaveTo : ''"
	:moveClass="defaultStore.state.animation ? $style.transition_x_move : ''"
	tag="div" :class="$style.root"
>
	<XReaction v-for="[reaction, count] in reactions" :key="reaction" :reaction="reaction" :count="count" :isInitial="initialReactions.has(reaction)" :note="note" @reactionToggled="onMockToggleReaction"/>
	<button v-if="hasMoreReactions" class="_button" :class="$style.showMore" @click="showMoreReactions">
		<span>{{ i18n.ts.more }}</span>
	</button>
</TransitionGroup>
</template>

<script lang="ts" setup>
import * as Misskey from 'misskey-js';
import { i18n } from '@/i18n.js';
import { inject, watch, ref } from 'vue';
import XReaction from '@/components/MkReactionsViewer.reaction.vue';
import { defaultStore } from '@/store.js';

const props = withDefaults(defineProps<{
	note: Misskey.entities.Note;
	maxNumber?: number;
}>(), {
	maxNumber: Infinity,
});
const mock = inject<boolean>('mock', false);
const max = ref(props.maxNumber);
const emit = defineEmits<{
	(ev: 'mockUpdateMyReaction', emoji: string, delta: number): void;
}>();

const initialReactions = new Set(Object.keys(props.note.reactions));

const reactions = ref<[string, number][]>([]);
const hasMoreReactions = ref(false);

if (props.note.myReaction && !Object.keys(reactions.value).includes(props.note.myReaction)) {
	reactions.value[props.note.myReaction] = props.note.reactions[props.note.myReaction];
}

function showMoreReactions() {
	max.value = Infinity;
}

function onMockToggleReaction(emoji: string, count: number) {
	if (!mock) return;

	const i = reactions.value.findIndex((item) => item[0] === emoji);
	if (i < 0) return;

	emit('mockUpdateMyReaction', emoji, (count - reactions.value[i][1]));
}

watch(() => props.maxNumber, () => {
	max.value = props.maxNumber;
}, { immediate: true, deep: true });

watch([() => props.note.reactions, () => max.value], ([newSource, maxNumber]) => {
	let newReactions: [string, number][] = [];
	hasMoreReactions.value = Object.keys(newSource).length > maxNumber;

	for (let i = 0; i < reactions.value.length; i++) {
		const reaction = reactions.value[i][0];
		if (reaction in newSource && newSource[reaction] !== 0) {
			reactions.value[i][1] = newSource[reaction];
			newReactions.push(reactions.value[i]);
		}
	}

	const newReactionsNames = newReactions.map(([x]) => x);
	newReactions = [
		...newReactions,
		...Object.entries(newSource)
			.sort(([, a], [, b]) => b - a)
			.filter(([y], i) => i < maxNumber && !newReactionsNames.includes(y)),
	];

	newReactions = newReactions.slice(0, maxNumber);

	if (props.note.myReaction && !newReactions.map(([x]) => x).includes(props.note.myReaction)) {
		newReactions.push([props.note.myReaction, newSource[props.note.myReaction]]);
	}

	reactions.value = newReactions;
}, { immediate: true, deep: true });
</script>

<style lang="scss" module>
.transition_x_move,
.transition_x_enterActive,
.transition_x_leaveActive {
	transition: opacity 0.2s cubic-bezier(0,.5,.5,1), transform 0.2s cubic-bezier(0,.5,.5,1) !important;
}
.transition_x_enterFrom,
.transition_x_leaveTo {
	opacity: 0;
	transform: scale(0.7);
}
.transition_x_leaveActive {
	position: absolute;
}

.root {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	margin: 4px -2px 0 -2px;

	&:empty {
		display: none;
	}
}

.showMore {
	display: inline-flex;
	height: 42px;
	margin: 2px;
	padding: 0 6px;
	font-size: 1.5em;
	border-radius: 6px;
	align-items: center;
	justify-content: center;
	border-style: dotted;
	border: 1px;
	border-radius: 6px;
	height: 42px;
	margin: 2px;
	background: var(--buttonBg);

	span {
		font-size: 0.7em;
		line-height: 42px;
		margin: 0 0 0 4px;
	}
}
</style>
