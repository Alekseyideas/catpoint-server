import {MigrationInterface, QueryRunner} from "typeorm";

export class renameTables81607254799572 implements MigrationInterface {
    name = 'renameTables81607254799572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_visits_history" RENAME COLUMN "point" TO "points"`);
        await queryRunner.query(`ALTER TABLE "users_visits_history" ADD CONSTRAINT "FK_f4f770ba50ba308249e06d9b57c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_visits_history" DROP CONSTRAINT "FK_f4f770ba50ba308249e06d9b57c"`);
        await queryRunner.query(`ALTER TABLE "users_visits_history" RENAME COLUMN "points" TO "point"`);
    }

}
