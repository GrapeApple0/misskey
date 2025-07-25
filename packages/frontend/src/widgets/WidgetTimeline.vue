<!--
SPDX-FileCopyrightText: syuilo and misskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<MkContainer :showHeader="widgetProps.showHeader" :style="`height: ${widgetProps.height}px;`" :scrollable="true" data-cy-mkw-timeline class="mkw-timeline">
	<template #icon>
		<i v-if="isBasicTimeline(widgetProps.src)" :class="basicTimelineIconClass(widgetProps.src)"></i>
		<i v-else-if="widgetProps.src === 'list'" class="ti ti-list"></i>
		<i v-else-if="widgetProps.src === 'antenna'" class="ti ti-antenna"></i>
	</template>
	<template #header>
		<button class="_button" @click="choose">
			<span>{{ headerTitle }}</span>
			<i :class="menuOpened ? 'ti ti-chevron-up' : 'ti ti-chevron-down'" style="margin-left: 8px;"></i>
		</button>
	</template>

	<div v-if="isBasicTimeline(widgetProps.src) && !isAvailableBasicTimeline(widgetProps.src)" :class="$style.disabled">
		<p :class="$style.disabledTitle">
			<i class="ti ti-minus"></i>
			{{ i18n.ts._disabledTimeline.title }}
		</p>
		<p :class="$style.disabledDescription">{{ i18n.ts._disabledTimeline.description }}</p>
	</div>
	<div v-else>
		<MkStreamingNotesTimeline
			:key="widgetProps.src === 'list' ? `list:${widgetProps.list?.id}` : widgetProps.src === 'antenna' ? `antenna:${widgetProps.antenna?.id}` : widgetProps.src"
			:src="widgetProps.src"
			:list="widgetProps.list ? widgetProps.list.id : undefined"
			:antenna="widgetProps.antenna ? widgetProps.antenna.id : undefined"
		/>
	</div>
</MkContainer>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import * as Misskey from 'misskey-js';
import { useWidgetPropsManager } from './widget.js';
import type { WidgetComponentEmits, WidgetComponentExpose, WidgetComponentProps } from './widget.js';
import type { FormWithDefault, GetFormResultType } from '@/utility/form.js';
import * as os from '@/os.js';
import { misskeyApi } from '@/utility/misskey-api.js';
import MkContainer from '@/components/MkContainer.vue';
import MkStreamingNotesTimeline from '@/components/MkStreamingNotesTimeline.vue';
import { i18n } from '@/i18n.js';
import { availableBasicTimelines, isAvailableBasicTimeline, isBasicTimeline, basicTimelineIconClass, basicTimelineTypes } from '@/timelines.js';
import type { MenuItem } from '@/types/menu.js';

const name = 'timeline';

type TlSrc = typeof basicTimelineTypes[number] | 'list' | 'antenna';

const widgetPropsDef = {
	showHeader: {
		type: 'boolean',
		default: true,
	},
	height: {
		type: 'number',
		default: 300,
	},
	src: {
		type: 'string',
		default: 'home' as TlSrc,
		hidden: true,
	},
	antenna: {
		type: 'object',
		default: null as Misskey.entities.Antenna | null,
		hidden: true,
	},
	list: {
		type: 'object',
		default: null as Misskey.entities.UserList | null,
		hidden: true,
	},
} satisfies FormWithDefault;

type WidgetProps = GetFormResultType<typeof widgetPropsDef>;

const props = defineProps<WidgetComponentProps<WidgetProps>>();
const emit = defineEmits<WidgetComponentEmits<WidgetProps>>();

const { widgetProps, configure, save } = useWidgetPropsManager(name,
	widgetPropsDef,
	props,
	emit,
);

const menuOpened = ref(false);

const headerTitle = computed<string>(() => {
	if (widgetProps.src === 'list' && widgetProps.list != null) {
		return widgetProps.list.name;
	} else if (widgetProps.src === 'antenna' && widgetProps.antenna != null) {
		return widgetProps.antenna.name;
	} else {
		return i18n.ts._timelines[widgetProps.src];
	}
});

const setSrc = (src: TlSrc) => {
	widgetProps.src = src;
	save();
};

const choose = async (ev: MouseEvent) => {
	menuOpened.value = true;
	const [antennas, lists] = await Promise.all([
		misskeyApi('antennas/list'),
		misskeyApi('users/lists/list'),
	]);
	const antennaItems = antennas.map(antenna => ({
		text: antenna.name,
		icon: 'ti ti-antenna',
		action: () => {
			widgetProps.antenna = antenna;
			setSrc('antenna');
		},
	}));
	const listItems = lists.map(list => ({
		text: list.name,
		icon: 'ti ti-list',
		action: () => {
			widgetProps.list = list;
			setSrc('list');
		},
	}));

	const menuItems: MenuItem[] = [];

	menuItems.push(...availableBasicTimelines().map(tl => ({
		text: i18n.ts._timelines[tl],
		icon: basicTimelineIconClass(tl),
		action: () => { setSrc(tl); },
	})));

	if (antennaItems.length > 0) {
		menuItems.push({ type: 'divider' });
		menuItems.push(...antennaItems);
	}

	if (listItems.length > 0) {
		menuItems.push({ type: 'divider' });
		menuItems.push(...listItems);
	}

	os.popupMenu(menuItems, ev.currentTarget ?? ev.target).then(() => {
		menuOpened.value = false;
	});
};

defineExpose<WidgetComponentExpose>({
	name,
	configure,
	id: props.widget ? props.widget.id : null,
});
</script>

<style lang="scss" module>
.disabled {
	text-align: center;
}

.disabledTitle {
	margin: 16px;
}

.disabledDescription {
	font-size: 90%;
}
</style>
