import {MigrationInterface, QueryRunner} from "typeorm";

export class CompanyUser21603993267301 implements MigrationInterface {
    name = 'CompanyUser21603993267301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company_user" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "companyId" integer NOT NULL, "points" integer NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_879141ebc259b4c0544b3f1ea4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "company_user" ADD CONSTRAINT "FK_b886c13768760ebda801512000b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_user" ADD CONSTRAINT "FK_92e4bc953bf0ca4c707f29b0ff8" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_user" DROP CONSTRAINT "FK_92e4bc953bf0ca4c707f29b0ff8"`);
        await queryRunner.query(`ALTER TABLE "company_user" DROP CONSTRAINT "FK_b886c13768760ebda801512000b"`);
        await queryRunner.query(`DROP TABLE "company_user"`);
    }

}
