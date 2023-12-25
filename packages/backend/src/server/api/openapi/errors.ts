/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export const errors = {
	'400': {
		'INVALID_PARAM': {
			value: {
				message: 'Invalid param.',
				code: 'INVALID_PARAM',
				id: '3d81ceae-475f-4600-b2a8-2bc116157532',
			},
		},
	},
	'401': {
		'CREDENTIAL_REQUIRED': {
			value: {
				message: 'Credential required.',
				code: 'CREDENTIAL_REQUIRED',
				id: '1384574d-a912-4b81-8601-c7b1c4085df1',
			},
		},
	},
	'403': {
		'AUTHENTICATION_FAILED': {
			value: {
				message: 'Authentication failed. Please ensure your token is correct.',
				code: 'AUTHENTICATION_FAILED',
				id: 'b0a7f5f8-dc2f-4171-b91f-de88ad238e14',
			},
		},
	},
	'418': {
		'I_AM_AI': {
			value: {
				message: 'You sent a request to Ai-chan, Misskey\'s showgirl, instead of the server.',
				code: 'I_AM_AI',
				id: '60c46cd1-f23a-46b1-bebe-5d2b73951a84',
			},
		},
	},
	'429': {
		'RATE_LIMIT_EXCEEDED': {
			value: {
				message: 'Rate limit exceeded. Please try again later.',
				code: 'RATE_LIMIT_EXCEEDED',
				id: 'd5826d14-3982-4d2e-8011-b9e9f02499ef',
			},
		},
	},
	'500': {
		'INTERNAL_ERROR': {
			value: {
				message: 'Internal error occurred. Please contact us if the error persists.',
				code: 'INTERNAL_ERROR',
				id: '5d37dbcb-891e-41ca-a3d6-e690c97775ac',
			},
		},
	},
};
