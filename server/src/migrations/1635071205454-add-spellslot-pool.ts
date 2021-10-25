import {MigrationInterface, QueryRunner} from "typeorm";

export class addSpellslotPool1635071205454 implements MigrationInterface {
    name = 'addSpellslotPool1635071205454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`spell_slot_pool\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`firstLevelSpells\` int NOT NULL, \`firstLevelSpellLimit\` int NOT NULL, \`secondLevelSpells\` int NOT NULL, \`secondLevelSpellLimit\` int NOT NULL, \`thirdLevelSpells\` int NOT NULL, \`thirdLevelSpellLimit\` int NOT NULL, \`fourthLevelSpells\` int NOT NULL, \`fourthLevelSpellLimit\` int NOT NULL, \`fifthLevelSpells\` int NOT NULL, \`fifthLevelSpellLimit\` int NOT NULL, \`sixthLevelSpells\` int NOT NULL, \`sixthLevelSpellLimit\` int NOT NULL, \`seventhLevelSpells\` int NOT NULL, \`seventhLevelSpellLimit\` int NOT NULL, \`eightLevelSpells\` int NOT NULL, \`eightLevelSpellLimit\` int NOT NULL, \`ninthLevelSpells\` int NOT NULL, \`ninthLevelSpellLimit\` int NOT NULL, \`ownerId\` int NOT NULL, UNIQUE INDEX \`REL_a6e84c2ae54750228bf54672ac\` (\`ownerId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`spell_slot_pool\` ADD CONSTRAINT \`FK_a6e84c2ae54750228bf54672ac6\` FOREIGN KEY (\`ownerId\`) REFERENCES \`character\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO \`spell_slot_pool\` (ownerId, firstLevelSpells, firstLevelSpellLimit, secondLevelSpells, secondLevelSpellLimit, thirdLevelSpells, thirdLevelSpellLimit, fourthLevelSpells, fourthLevelSpellLimit, fifthLevelSpells, fifthLevelSpellLimit, sixthLevelSpells, sixthLevelSpellLimit, seventhLevelSpells, seventhLevelSpellLimit, eightLevelSpells, eightLevelSpellLimit, ninthLevelSpells, ninthLevelSpellLimit) SELECT id, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 FROM \`character\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`spell_slot_pool\` DROP FOREIGN KEY \`FK_a6e84c2ae54750228bf54672ac6\``);
        await queryRunner.query(`DROP INDEX \`REL_a6e84c2ae54750228bf54672ac\` ON \`spell_slot_pool\``);
        await queryRunner.query(`DROP TABLE \`spell_slot_pool\``);
    }

}
