/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class Pgroonga1703417579791 {
    name = 'Pgroonga1703417579791'

    async up(queryRunner) {
			await queryRunner.query(`CREATE INDEX "IDX_f27f5d88941e57442be75ba9c8" ON "note" USING "pgroonga" ("text")`);
			await queryRunner.query(`CREATE INDEX "IDX_065d4d8f3b5adb4a08841eae3c" ON "user" USING "pgroonga" ("name" pgroonga_varchar_full_text_search_ops_v2)`);
			await queryRunner.query(`CREATE INDEX "IDX_fcb770976ff8240af5799e3ffc" ON "user_profile" USING "pgroonga" ("description" pgroonga_varchar_full_text_search_ops_v2) `);

    }

    async down(queryRunner) {
			await queryRunner.query(`DROP INDEX "public"."IDX_f27f5d88941e57442be75ba9c8"`);
			await queryRunner.query(`DROP INDEX "public"."IDX_065d4d8f3b5adb4a08841eae3c"`);
			await queryRunner.query(`DROP INDEX "public"."IDX_fcb770976ff8240af5799e3ffc"`);
		}
}
