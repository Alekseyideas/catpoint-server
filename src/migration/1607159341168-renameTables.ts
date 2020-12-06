import {MigrationInterface, QueryRunner} from "typeorm";

export class renameTables1607159341168 implements MigrationInterface {
    name = 'renameTables1607159341168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "appId" character varying NOT NULL, "email" character varying NOT NULL, "image" character varying, "lastName" character varying NOT NULL, "firstName" character varying NOT NULL, CONSTRAINT "UQ_b8984f46717fbc12312c6c5bf3e" UNIQUE ("appId"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies_users" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, "companyId" integer NOT NULL, "totalCount" integer NOT NULL DEFAULT 0, "points" integer NOT NULL, CONSTRAINT "PK_42fb5216b69a8ed84b263590fbb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "firstName" character varying(255) NOT NULL, "position" character varying(255) NOT NULL, "address" character varying(255) NOT NULL, "image" character varying, "name" character varying(255) NOT NULL, "phone" character varying(15) NOT NULL, "password" character varying NOT NULL, "totalPoints" integer NOT NULL DEFAULT 5, "isActive" boolean NOT NULL DEFAULT false, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d0af6f5866201d5cb424767744a" UNIQUE ("email"), CONSTRAINT "UQ_320d9af6f64b97168b73f783dcf" UNIQUE ("firstName"), CONSTRAINT "UQ_3a5fe9d44cd092b21aa9c7e70a0" UNIQUE ("position"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "companies_users" ADD CONSTRAINT "FK_9cf284271193c6c27212d18e746" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies_users" ADD CONSTRAINT "FK_51740ab80d49793e999ff14a463" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies_users" DROP CONSTRAINT "FK_51740ab80d49793e999ff14a463"`);
        await queryRunner.query(`ALTER TABLE "companies_users" DROP CONSTRAINT "FK_9cf284271193c6c27212d18e746"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "companies_users"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
