import {MigrationInterface, QueryRunner} from "typeorm";

export class Company21603526321582 implements MigrationInterface {
    name = 'Company21603526321582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "firstName" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "UQ_bb2c0186f517c4c12057b312e28" UNIQUE ("firstName")`);
        await queryRunner.query(`ALTER TABLE "company" ADD "position" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "UQ_e7fdc9cfe6b0003ac335d4dc574" UNIQUE ("position")`);
        await queryRunner.query(`ALTER TABLE "company" ADD "adress" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "email" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "name" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "adress"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "UQ_e7fdc9cfe6b0003ac335d4dc574"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "position"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "UQ_bb2c0186f517c4c12057b312e28"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "firstName"`);
    }

}
