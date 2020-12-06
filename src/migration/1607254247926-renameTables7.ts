import {MigrationInterface, QueryRunner} from "typeorm";

export class renameTables71607254247926 implements MigrationInterface {
    name = 'renameTables71607254247926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_visits_history" DROP CONSTRAINT "FK_f4f770ba50ba308249e06d9b57c"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_visits_history" ADD CONSTRAINT "FK_f4f770ba50ba308249e06d9b57c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
