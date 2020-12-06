import {MigrationInterface, QueryRunner} from "typeorm";

export class renameTables61607253546010 implements MigrationInterface {
    name = 'renameTables61607253546010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_visits_history" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, "companyId" integer NOT NULL, "point" integer NOT NULL, CONSTRAINT "PK_51d47bd0667d295ad404097c976" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users_visits_history" ADD CONSTRAINT "FK_f4f770ba50ba308249e06d9b57c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_visits_history" ADD CONSTRAINT "FK_a958f61605f739016a5b41f26ef" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_visits_history" DROP CONSTRAINT "FK_a958f61605f739016a5b41f26ef"`);
        await queryRunner.query(`ALTER TABLE "users_visits_history" DROP CONSTRAINT "FK_f4f770ba50ba308249e06d9b57c"`);
        await queryRunner.query(`DROP TABLE "users_visits_history"`);
    }

}
