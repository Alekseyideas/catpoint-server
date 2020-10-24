import {MigrationInterface, QueryRunner} from "typeorm";

export class Company1603381180732 implements MigrationInterface {
    name = 'Company1603381180732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "image" character varying, "name" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1" UNIQUE ("email"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "company"`);
    }

}
