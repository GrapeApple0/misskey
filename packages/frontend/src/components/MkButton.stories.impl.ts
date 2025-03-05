/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/no-default-export */
<<<<<<< HEAD
/* eslint-disable import/no-duplicates */
import { StoryObj } from '@storybook/vue3';
=======
import { action } from '@storybook/addon-actions';
import type { StoryObj } from '@storybook/vue3';
>>>>>>> 2025.3.0-beta.0
import MkButton from './MkButton.vue';
export const Default = {
	render(args) {
		return {
			components: {
				MkButton,
			},
			setup() {
				return {
					args,
				};
			},
			computed: {
				props() {
					return {
						...this.args,
					};
				},
			},
			template: '<MkButton v-bind="props">Text</MkButton>',
		};
	},
	parameters: {
		layout: 'centered',
	},
} satisfies StoryObj<typeof MkButton>;
