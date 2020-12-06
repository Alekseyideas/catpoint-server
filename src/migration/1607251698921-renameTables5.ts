import {MigrationInterface, QueryRunner} from "typeorm";

export class renameTables51607251698921 implements MigrationInterface {
    name = 'renameTables51607251698921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies_users" ADD "finishedCount" integer NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies_users" DROP COLUMN "finishedCount"`);
    }

}
