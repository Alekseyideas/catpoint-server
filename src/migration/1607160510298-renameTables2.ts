import {MigrationInterface, QueryRunner} from "typeorm";

export class renameTables21607160510298 implements MigrationInterface {
    name = 'renameTables21607160510298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies_users" ADD CONSTRAINT "FK_51740ab80d49793e999ff14a463" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies_users" DROP CONSTRAINT "FK_51740ab80d49793e999ff14a463"`);
    }

}
