import {MigrationInterface, QueryRunner} from "typeorm";

export class renameTables41607250287510 implements MigrationInterface {
    name = 'renameTables41607250287510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies_users" RENAME COLUMN "totalCount" TO "visits"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies_users" RENAME COLUMN "visits" TO "totalCount"`);
    }

}
