import {MigrationInterface, QueryRunner} from "typeorm";

export class renameAmountToNumber1633801225939 implements MigrationInterface {
    name = 'renameAmountToNumber1633801225939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`equipment\` CHANGE \`amount\` \`number\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`equipment\` CHANGE \`number\` \`amount\` int NOT NULL`);
    }

}
