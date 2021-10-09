import {MigrationInterface, QueryRunner} from "typeorm";

export class addWeaponProperty1633769775707 implements MigrationInterface {
    name = 'addWeaponProperty1633769775707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`dnd\`.\`property\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` text NOT NULL, \`description\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dnd\`.\`weapon_property\` (\`weaponId\` int NOT NULL, \`propertyId\` int NOT NULL, INDEX \`IDX_7425b54ca98c013eb4ca9cdda5\` (\`weaponId\`), INDEX \`IDX_402296c6c9caff4b5085ac0012\` (\`propertyId\`), PRIMARY KEY (\`weaponId\`, \`propertyId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`weapon_property\` ADD CONSTRAINT \`FK_7425b54ca98c013eb4ca9cdda52\` FOREIGN KEY (\`weaponId\`) REFERENCES \`dnd\`.\`weapon\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`weapon_property\` ADD CONSTRAINT \`FK_402296c6c9caff4b5085ac00123\` FOREIGN KEY (\`propertyId\`) REFERENCES \`dnd\`.\`property\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`weapon_property\` DROP FOREIGN KEY \`FK_402296c6c9caff4b5085ac00123\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`weapon_property\` DROP FOREIGN KEY \`FK_7425b54ca98c013eb4ca9cdda52\``);
        await queryRunner.query(`DROP INDEX \`IDX_402296c6c9caff4b5085ac0012\` ON \`dnd\`.\`weapon_property\``);
        await queryRunner.query(`DROP INDEX \`IDX_7425b54ca98c013eb4ca9cdda5\` ON \`dnd\`.\`weapon_property\``);
        await queryRunner.query(`DROP TABLE \`dnd\`.\`weapon_property\``);
        await queryRunner.query(`DROP TABLE \`dnd\`.\`property\``);
    }

}
