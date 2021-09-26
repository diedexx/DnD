import {MigrationInterface, QueryRunner} from "typeorm";

export class addExpAndLevel1632689443107 implements MigrationInterface {
    name = 'addExpAndLevel1632689443107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` ADD \`level\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` ADD \`experience\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`skill\` DROP FOREIGN KEY \`FK_244daeab521b8148f99a0c1cbb5\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`skill\` CHANGE \`abilityId\` \`abilityId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` DROP FOREIGN KEY \`FK_d85bffacbe031ac710f9462a218\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` DROP FOREIGN KEY \`FK_cf865a77fc2bb797400adb554e3\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` CHANGE \`characterId\` \`characterId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` CHANGE \`abilityId\` \`abilityId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`skill\` ADD CONSTRAINT \`FK_244daeab521b8148f99a0c1cbb5\` FOREIGN KEY (\`abilityId\`) REFERENCES \`dnd\`.\`ability\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` ADD CONSTRAINT \`FK_d85bffacbe031ac710f9462a218\` FOREIGN KEY (\`characterId\`) REFERENCES \`dnd\`.\`character\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` ADD CONSTRAINT \`FK_cf865a77fc2bb797400adb554e3\` FOREIGN KEY (\`abilityId\`) REFERENCES \`dnd\`.\`ability\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` DROP FOREIGN KEY \`FK_cf865a77fc2bb797400adb554e3\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` DROP FOREIGN KEY \`FK_d85bffacbe031ac710f9462a218\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`skill\` DROP FOREIGN KEY \`FK_244daeab521b8148f99a0c1cbb5\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` CHANGE \`abilityId\` \`abilityId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` CHANGE \`characterId\` \`characterId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` ADD CONSTRAINT \`FK_cf865a77fc2bb797400adb554e3\` FOREIGN KEY (\`abilityId\`) REFERENCES \`dnd\`.\`ability\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`ability_score\` ADD CONSTRAINT \`FK_d85bffacbe031ac710f9462a218\` FOREIGN KEY (\`characterId\`) REFERENCES \`dnd\`.\`character\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`skill\` CHANGE \`abilityId\` \`abilityId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`skill\` ADD CONSTRAINT \`FK_244daeab521b8148f99a0c1cbb5\` FOREIGN KEY (\`abilityId\`) REFERENCES \`dnd\`.\`ability\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` DROP COLUMN \`experience\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` DROP COLUMN \`level\``);
    }

}
