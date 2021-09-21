import {MigrationInterface, QueryRunner} from "typeorm";

export class camelcaseCreatedUpdateAt1632250844285 implements MigrationInterface {
    name = 'camelcaseCreatedUpdateAt1632250844285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`skill\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`skill\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character_class\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character_class\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`skill\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`skill\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character_class\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character_class\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character_class\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character_class\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`skill\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`skill\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character_class\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character_class\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`skill\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`skill\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
