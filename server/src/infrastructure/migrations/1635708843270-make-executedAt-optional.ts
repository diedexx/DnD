import {MigrationInterface, QueryRunner} from "typeorm";

export class makeExecutedAtOptional1635708843270 implements MigrationInterface {
    name = 'makeExecutedAtOptional1635708843270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`command\` CHANGE \`executedAt\` \`executedAt\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`command\` CHANGE \`executedAt\` \`executedAt\` datetime NOT NULL`);
    }

}
