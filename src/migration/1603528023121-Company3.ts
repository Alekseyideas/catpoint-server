import {MigrationInterface, QueryRunner} from "typeorm";

export class Company31603528023121 implements MigrationInterface {
    name = 'Company31603528023121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "adress"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "address" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ADD "pnone" character varying(15) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "pnone"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "adress" character varying(255) NOT NULL`);
    }

}
