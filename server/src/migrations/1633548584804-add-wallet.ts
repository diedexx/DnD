import {MigrationInterface, QueryRunner} from "typeorm";

export class addWallet1633548584804 implements MigrationInterface {
    name = 'addWallet1633548584804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`dnd\`.\`wallet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`copper\` float NOT NULL, \`silver\` float NOT NULL, \`electrum\` float NOT NULL, \`gold\` float NOT NULL, \`platinum\` float NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` ADD \`walletId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`weapon\` DROP FOREIGN KEY \`FK_6cf0304c2df8e5cd6dc394daf8e\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`weapon\` CHANGE \`ownerId\` \`ownerId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`weapon\` ADD CONSTRAINT \`FK_6cf0304c2df8e5cd6dc394daf8e\` FOREIGN KEY (\`ownerId\`) REFERENCES \`dnd\`.\`character\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` ADD CONSTRAINT \`FK_e90528173d25d119e39479c0d7e\` FOREIGN KEY (\`walletId\`) REFERENCES \`dnd\`.\`wallet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` DROP FOREIGN KEY \`FK_e90528173d25d119e39479c0d7e\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`weapon\` DROP FOREIGN KEY \`FK_6cf0304c2df8e5cd6dc394daf8e\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`weapon\` CHANGE \`ownerId\` \`ownerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`weapon\` ADD CONSTRAINT \`FK_6cf0304c2df8e5cd6dc394daf8e\` FOREIGN KEY (\`ownerId\`) REFERENCES \`dnd\`.\`character\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` DROP COLUMN \`walletId\``);
        await queryRunner.query(`DROP TABLE \`dnd\`.\`wallet\``);
    }

}
