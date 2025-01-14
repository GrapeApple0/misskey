/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Inject, Injectable } from '@nestjs/common';
import { Endpoint } from '@/server/api/endpoint-base.js';
import type { AccessTokensRepository } from '@/models/_.js';
import { DI } from '@/di-symbols.js';

export const meta = {
	requireCredential: true,

	secure: true,

	res: {
		type: 'array',
		items: {
			type: 'object',
			properties: {
				id: {
					type: 'string',
					optional: false,
					format: 'misskey:id',
				},
				name: {
					type: 'string',
					optional: true,
				},
				createdAt: {
					type: 'string',
					optional: false,
					format: 'date-time',
				},
				lastUsedAt: {
					type: 'string',
					optional: true,
					format: 'date-time',
				},
				permission: {
					type: 'array',
					optional: false,
					uniqueItems: true,
					items: {
						type: 'string',
					},
				},
			},
		},
	},
} as const;

export const paramDef = {
	type: 'object',
	properties: {
		sort: { type: 'string', enum: ['+createdAt', '-createdAt', '+lastUsedAt', '-lastUsedAt'] },
	},
	required: [],
} as const;

@Injectable()
export default class extends Endpoint<typeof meta, typeof paramDef> { // eslint-disable-line import/no-default-export
	constructor(
		@Inject(DI.accessTokensRepository)
		private accessTokensRepository: AccessTokensRepository,
	) {
		super(meta, paramDef, async (ps, me) => {
			const query = this.accessTokensRepository.createQueryBuilder('token')
				.where('token.userId = :userId', { userId: me.id })
				.leftJoinAndSelect('token.app', 'app');

			switch (ps.sort) {
				case '+createdAt': query.orderBy('token.createdAt', 'DESC'); break;
				case '-createdAt': query.orderBy('token.createdAt', 'ASC'); break;
				case '+lastUsedAt': query.orderBy('token.lastUsedAt', 'DESC'); break;
				case '-lastUsedAt': query.orderBy('token.lastUsedAt', 'ASC'); break;
				default: query.orderBy('token.id', 'ASC'); break;
			}

			const tokens = await query.getMany();

			return await Promise.all(tokens.map(token => ({
				id: token.id,
				name: token.name ?? token.app?.name,
				createdAt: token.createdAt,
				lastUsedAt: token.lastUsedAt,
				permission: token.app ? token.app.permission : token.permission,
			})));
		});
	}
}
