/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Inject, Injectable } from '@nestjs/common';
import { MiFlash } from '@/models/Flash.js';
import type { FlashsRepository } from '@/models/_.js';
import { Endpoint } from '@/server/api/endpoint-base.js';
import { FlashEntityService } from '@/core/entities/FlashEntityService.js';
import { DI } from '@/di-symbols.js';
import { ApiError } from '../../error.js';
import { IsNull } from 'typeorm';

export const meta = {
	tags: ['flashs'],

	requireCredential: false,

	res: {
		type: 'object',
		optional: false, nullable: false,
		ref: 'Flash',
	},

	errors: {
		noSuchFlash: {
			message: 'No such flash.',
			code: 'NO_SUCH_FLASH',
			id: 'f0d34a1a-d29a-401d-90ba-1982122b5630',
		},
	},
} as const;

export const paramDef = {
	type: 'object',
	properties: {
		flashId: { type: 'string', format: 'misskey:id' },
		username: { type: 'string' },
	},
	anyOf: [
		{ required: ['flashId'] },
		{ required: ['username'] },
	],
} as const;

@Injectable()
export default class extends Endpoint<typeof meta, typeof paramDef> {
	usersRepository: any; // eslint-disable-line import/no-default-export
	constructor(
		@Inject(DI.flashsRepository)
		private flashsRepository: FlashsRepository,

		private flashEntityService: FlashEntityService,
	) {
		super(meta, paramDef, async (ps, me) => {
			let flash: MiFlash | null = null;
			if (ps.flashId) {
				flash = await this.flashsRepository.findOneBy({ id: ps.flashId });
			}
			else if (ps.username) {
				const author = await this.usersRepository.findOneBy({
					host: IsNull(),
					usernameLower: ps.username.toLowerCase(),
				});
				if (author) {
					flash = await this.flashsRepository.findOneBy({
						userId: author.id,
					});
				}
			}

			if (flash == null) {
				throw new ApiError(meta.errors.noSuchFlash);
			}

			return await this.flashEntityService.pack(flash, me);
		});
	}
}
