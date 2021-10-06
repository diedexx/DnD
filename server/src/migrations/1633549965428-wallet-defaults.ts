import {MigrationInterface, QueryRunner} from "typeorm";

export class walletDefaults1633549965428 implements MigrationInterface {
    name = 'walletDefaults1633549965428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`wallet\` CHANGE \`copper\` \`copper\` float NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`wallet\` CHANGE \`silver\` \`silver\` float NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`wallet\` CHANGE \`electrum\` \`electrum\` float NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`wallet\` CHANGE \`gold\` \`gold\` float NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`wallet\` CHANGE \`platinum\` \`platinum\` float NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` ADD CONSTRAINT \`FK_e90528173d25d119e39479c0d7e\` FOREIGN KEY (\`walletId\`) REFERENCES \`dnd\`.\`wallet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` DROP FOREIGN KEY \`FK_e90528173d25d119e39479c0d7e\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`wallet\` CHANGE \`platinum\` \`platinum\` float(12) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`wallet\` CHANGE \`gold\` \`gold\` float(12) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`wallet\` CHANGE \`electrum\` \`electrum\` float(12) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`wallet\` CHANGE \`silver\` \`silver\` float(12) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`wallet\` CHANGE \`copper\` \`copper\` float(12) NOT NULL`);
    }

}
