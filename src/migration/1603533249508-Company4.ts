import {MigrationInterface, QueryRunner} from "typeorm";

export class Company41603533249508 implements MigrationInterface {
    name = 'Company41603533249508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" RENAME COLUMN "pnone" TO "phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" RENAME COLUMN "phone" TO "pnone"`);
    }

}
