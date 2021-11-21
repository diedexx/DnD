import { MigrationInterface, QueryRunner } from "typeorm";

export class characterClasses1632238956764 implements MigrationInterface {
	public async up( queryRunner: QueryRunner ): Promise<void> {
		await queryRunner.query( "INSERT INTO `dnd`.`character_class` (`name`, `description`, `hitDie`) VALUES ('Barbarian', 'A fierce warrior of primitive background who can enter a battle rage.', 12);" );
		await queryRunner.query( "INSERT INTO `dnd`.`character_class` (`name`, `description`, `hitDie`) VALUES ('Bard', 'An inspiring magician whose power echoes the music of creation', 8);" );
		await queryRunner.query( "INSERT INTO `dnd`.`character_class` (`name`, `description`, `hitDie`) VALUES ('Cleric', 'A priestly champion who wields divine magic in service of a higher power', 8);" );
		await queryRunner.query( "INSERT INTO `dnd`.`character_class` (`name`, `description`, `hitDie`) VALUES ('Druid', 'A priest of the Old Faith, wielding the powers of nature and adopting animal forms', 8);" );
		await queryRunner.query( "INSERT INTO `dnd`.`character_class` (`name`, `description`, `hitDie`) VALUES ('Fighter', 'A master of martial combat, skilled with a variety of weapons and armor', 10);" );
		await queryRunner.query( "INSERT INTO `dnd`.`character_class` (`name`, `description`, `hitDie`) VALUES ('Monk', 'A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection', 8);" );
		await queryRunner.query( "INSERT INTO `dnd`.`character_class` (`name`, `description`, `hitDie`) VALUES ('Paladin', 'A holy warrior bound to a sacred oath', 10);" );
		await queryRunner.query( "INSERT INTO `dnd`.`character_class` (`name`, `description`, `hitDie`) VALUES ('Ranger', 'A warrior who combats threats on the edges of civilization', 10);" );
		await queryRunner.query( "INSERT INTO `dnd`.`character_class` (`name`, `description`, `hitDie`) VALUES ('Rogue', 'A scoundrel who uses stealth and trickery to overcome obstacles and enemies', 8);" );
		await queryRunner.query( "INSERT INTO `dnd`.`character_class` (`name`, `description`, `hitDie`) VALUES ('Sorcerer', 'A spellcaster who draws on inherent magic from a gift or bloodline', 6);" );
		await queryRunner.query( "INSERT INTO `dnd`.`character_class` (`name`, `description`, `hitDie`) VALUES ('Warlock', 'A wielder of magic that is derived from a bargain with an extraplanar entity', 8);" );
		await queryRunner.query( "INSERT INTO `dnd`.`character_class` (`name`, `description`, `hitDie`) VALUES ('Wizard', 'A scholarly magic-user capable of manipulating the structures of reality', 6);" );
		await queryRunner.query( "INSERT INTO `dnd`.`character_class` (`name`, `description`, `hitDie`) VALUES ('Artificer', 'Masters of invention, artificers use ingenuity and magic to unlock extraordinary capabilities in objects.', 8);" );
		await queryRunner.query( "INSERT INTO `dnd`.`character_class` (`name`, `description`, `hitDie`) VALUES ('Blood Hunter', 'A fanatical slayer that embraces dark knowledge to destroy evil', 10);" );
	}

	public async down( queryRunner: QueryRunner ): Promise<void> {
		await queryRunner.query( "DELETE FROM `dnd`.`character_class` WHERE `name` IN ('Barbarian','Bard','Cleric','Druid','Fighter','Monk','Paladin','Ranger','Rogue','Sorcerer','Warlock','Wizard','Artificer','Blood Hunter');" );
	}
}
