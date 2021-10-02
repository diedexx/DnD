import {MigrationInterface, QueryRunner} from "typeorm";

export class abilityScoreInsteadOfModifier1633167516298 implements MigrationInterface {
    name = 'abilityScoreInsteadOfModifier1633167516298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`dnd\`.\`modification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` DROP COLUMN \`baseScore\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` DROP COLUMN \`modifier\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` ADD \`score\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` DROP COLUMN \`score\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` ADD \`modifier\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` ADD \`baseScore\` int NOT NULL`);
        await queryRunner.query(`DROP TABLE \`dnd\`.\`modification\``);
    }

}
