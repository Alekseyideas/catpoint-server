import {MigrationInterface, QueryRunner} from "typeorm";

export class renameTables31607161570136 implements MigrationInterface {
    name = 'renameTables31607161570136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "UQ_320d9af6f64b97168b73f783dcf"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "UQ_3a5fe9d44cd092b21aa9c7e70a0"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "UQ_3a5fe9d44cd092b21aa9c7e70a0" UNIQUE ("position")`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "UQ_320d9af6f64b97168b73f783dcf" UNIQUE ("firstName")`);
    }

}
