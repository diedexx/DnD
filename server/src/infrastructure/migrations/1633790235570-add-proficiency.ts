import {MigrationInterface, QueryRunner} from "typeorm";

export class addProficiency1633790235570 implements MigrationInterface {
    name = 'addProficiency1633790235570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`dnd\`.\`category\` (\`name\` varchar(255) NOT NULL, PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dnd\`.\`proficiency\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`affectedCategoryName\` varchar(255) NOT NULL, \`ownerId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dnd\`.\`weapon_categories_category\` (\`weaponId\` int NOT NULL, \`categoryName\` varchar(255) NOT NULL, INDEX \`IDX_dba0e2a09d3421e3eb1cf71a62\` (\`weaponId\`), INDEX \`IDX_23fb2ed5c07ca6c5f1f8376efc\` (\`categoryName\`), PRIMARY KEY (\`weaponId\`, \`categoryName\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`proficiency\` ADD CONSTRAINT \`FK_52bb2fc685e682ee689adde82b3\` FOREIGN KEY (\`affectedCategoryName\`) REFERENCES \`dnd\`.\`category\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`proficiency\` ADD CONSTRAINT \`FK_927a91d36d7c03cda25ca1843be\` FOREIGN KEY (\`ownerId\`) REFERENCES \`dnd\`.\`character\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`weapon_categories_category\` ADD CONSTRAINT \`FK_dba0e2a09d3421e3eb1cf71a62b\` FOREIGN KEY (\`weaponId\`) REFERENCES \`dnd\`.\`weapon\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`weapon_categories_category\` ADD CONSTRAINT \`FK_23fb2ed5c07ca6c5f1f8376efcf\` FOREIGN KEY (\`categoryName\`) REFERENCES \`dnd\`.\`category\`(\`name\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`weapon_categories_category\` DROP FOREIGN KEY \`FK_23fb2ed5c07ca6c5f1f8376efcf\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`weapon_categories_category\` DROP FOREIGN KEY \`FK_dba0e2a09d3421e3eb1cf71a62b\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`proficiency\` DROP FOREIGN KEY \`FK_927a91d36d7c03cda25ca1843be\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`proficiency\` DROP FOREIGN KEY \`FK_52bb2fc685e682ee689adde82b3\``);
        await queryRunner.query(`DROP INDEX \`IDX_23fb2ed5c07ca6c5f1f8376efc\` ON \`dnd\`.\`weapon_categories_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_dba0e2a09d3421e3eb1cf71a62\` ON \`dnd\`.\`weapon_categories_category\``);
        await queryRunner.query(`DROP TABLE \`dnd\`.\`weapon_categories_category\``);
        await queryRunner.query(`DROP TABLE \`dnd\`.\`proficiency\``);
        await queryRunner.query(`DROP TABLE \`dnd\`.\`category\``);
    }

}
