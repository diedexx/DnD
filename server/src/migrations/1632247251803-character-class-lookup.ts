import { MigrationInterface, QueryRunner } from "typeorm";

export class characterClassLookup1632247251803 implements MigrationInterface {
    name = "characterClassLookup1632247251803"

    public async up( queryRunner: QueryRunner ): Promise<void> {
    	await queryRunner.query( "ALTER TABLE `dnd`.`character` CHANGE `class` `classId` varchar(255) NOT NULL" );
    	await queryRunner.query( "ALTER TABLE `dnd`.`character` DROP COLUMN `classId`" );
    	await queryRunner.query( "ALTER TABLE `dnd`.`character` ADD `classId` int NOT NULL" );
    	await queryRunner.query( "ALTER TABLE `dnd`.`character` ADD CONSTRAINT `FK_a94ac46b7a3d853ac1a8c6a8b82` FOREIGN KEY (`classId`) REFERENCES `dnd`.`character_class`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION" );
    }

    public async down( queryRunner: QueryRunner ): Promise<void> {
    	await queryRunner.query( "ALTER TABLE `dnd`.`character` DROP FOREIGN KEY `FK_a94ac46b7a3d853ac1a8c6a8b82`" );
    	await queryRunner.query( "ALTER TABLE `dnd`.`character` DROP COLUMN `classId`" );
    	await queryRunner.query( "ALTER TABLE `dnd`.`character` ADD `classId` varchar(255) NOT NULL" );
    	await queryRunner.query( "ALTER TABLE `dnd`.`character` CHANGE `classId` `class` varchar(255) NOT NULL" );
    }
}
