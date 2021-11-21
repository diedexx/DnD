import {MigrationInterface, QueryRunner} from "typeorm";

export class addSavingThrow1634151974124 implements MigrationInterface {
    name = 'addSavingThrow1634151974124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`dnd\`.\`saving_throw\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isProficient\` tinyint NOT NULL DEFAULT 0, \`abilityId\` int NOT NULL, \`characterId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`saving_throw\` ADD CONSTRAINT \`FK_0d3b86f1cfbc213006845eb8672\` FOREIGN KEY (\`abilityId\`) REFERENCES \`dnd\`.\`ability\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`saving_throw\` ADD CONSTRAINT \`FK_b8b788fc8e5730213554c799636\` FOREIGN KEY (\`characterId\`) REFERENCES \`dnd\`.\`character\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`saving_throw\` DROP FOREIGN KEY \`FK_b8b788fc8e5730213554c799636\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`saving_throw\` DROP FOREIGN KEY \`FK_0d3b86f1cfbc213006845eb8672\``);
        await queryRunner.query(`DROP TABLE \`dnd\`.\`saving_throw\``);
    }

}
