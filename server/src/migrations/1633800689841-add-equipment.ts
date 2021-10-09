import { MigrationInterface, QueryRunner } from "typeorm";

export class addEquipment1633800689841 implements MigrationInterface {
	name = "addEquipment1633800689841";

	public async up( queryRunner: QueryRunner ): Promise<void> {
		await queryRunner.query( `CREATE TABLE \`dnd\`.\`equipment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`equippable\` tinyint NOT NULL, \`equipped\` tinyint NOT NULL, \`amount\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB` );
		await queryRunner.query( `CREATE TABLE \`dnd\`.\`equipment_categories_category\` (\`equipmentId\` int NOT NULL, \`categoryName\` varchar(255) NOT NULL, INDEX \`IDX_56fb2550af43d2954436779b5c\` (\`equipmentId\`), INDEX \`IDX_d01bfeba7e4ea1eab21323f5f4\` (\`categoryName\`), PRIMARY KEY (\`equipmentId\`, \`categoryName\`)) ENGINE=InnoDB` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`equipment_categories_category\` ADD CONSTRAINT \`FK_56fb2550af43d2954436779b5c9\` FOREIGN KEY (\`equipmentId\`) REFERENCES \`dnd\`.\`equipment\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`equipment_categories_category\` ADD CONSTRAINT \`FK_d01bfeba7e4ea1eab21323f5f46\` FOREIGN KEY (\`categoryName\`) REFERENCES \`dnd\`.\`category\`(\`name\`) ON DELETE CASCADE ON UPDATE CASCADE` );
	}

	public async down( queryRunner: QueryRunner ): Promise<void> {
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`equipment_categories_category\` DROP FOREIGN KEY \`FK_d01bfeba7e4ea1eab21323f5f46\`` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`equipment_categories_category\` DROP FOREIGN KEY \`FK_56fb2550af43d2954436779b5c9\`` );
		await queryRunner.query( `DROP INDEX \`IDX_d01bfeba7e4ea1eab21323f5f4\` ON \`dnd\`.\`equipment_categories_category\`` );
		await queryRunner.query( `DROP INDEX \`IDX_56fb2550af43d2954436779b5c\` ON \`dnd\`.\`equipment_categories_category\`` );
		await queryRunner.query( `DROP TABLE \`dnd\`.\`equipment_categories_category\`` );
		await queryRunner.query( `DROP TABLE \`dnd\`.\`equipment\`` );
	}
}
