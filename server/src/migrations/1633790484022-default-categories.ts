import { MigrationInterface, QueryRunner } from "typeorm";

export class defaultCategories1633790484022 implements MigrationInterface {

	public async up( queryRunner: QueryRunner ): Promise<void> {
		await queryRunner.query( `INSERT INTO \`dnd\`.\`category\` (\`name\`) values
		("Light armor"),
		("Medium armor"),
		("Heavy armor"),
		("Shield"),
		("Simple weapon"),
		("Martial weapon"),
		("Hand crossbow"),
		("Light crossbow"),
		("Longsword"),
		("Short sword"),
		("Rapier"),
		("Club"),
		("Dagger"),
		("Dart"),
		("Javelin"),
		("Mace"),
		("Quarterstaff"),
		("Scimitar"),
		("Sickle"),
		("Sling"),
		("Spear");
		` );
	}

	public async down( queryRunner: QueryRunner ): Promise<void> {
		await queryRunner.query( `DELETE FROM \`dnd\`.\`category\` WHERE \`name\` IN ("Light armor", "Medium armor", "Heavy armor", "Shield", "Simple weapon", "Martial weapon", "Hand crossbow", "Light crossbow", "Longsword", "Short sword", "Rapier", "Club", "Dagger", "Dart", "Javelin", "Mace", "Quarterstaff", "Scimitar", "Sickle", "Sling", "Spear")` );
	}
}
