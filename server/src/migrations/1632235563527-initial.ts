import { MigrationInterface, QueryRunner } from "typeorm";

export class inital1632235563527 implements MigrationInterface {
    name = "inital1632235563527"

    public async up( queryRunner: QueryRunner ): Promise<void> {
    	await queryRunner.query( "CREATE TABLE `dnd`.`skill` (`id` int NOT NULL AUTO_INCREMENT, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `description` text NOT NULL, `abilityId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB" );
    	await queryRunner.query( "CREATE TABLE `dnd`.`ability` (`id` int NOT NULL AUTO_INCREMENT, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `shortName` varchar(255) NOT NULL, `description` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB" );
    	await queryRunner.query( "CREATE TABLE `dnd`.`character` (`id` int NOT NULL AUTO_INCREMENT, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `class` varchar(255) NOT NULL, `race` varchar(255) NOT NULL, `background` varchar(255) NOT NULL, `alignment` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB" );
    	await queryRunner.query( "CREATE TABLE `dnd`.`ability_score` (`id` int NOT NULL AUTO_INCREMENT, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `baseScore` int NOT NULL, `modifier` int NOT NULL, `characterId` int NULL, `abilityId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB" );
    	await queryRunner.query( "CREATE TABLE `dnd`.`character_class` (`id` int NOT NULL AUTO_INCREMENT, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `description` text NOT NULL, `hitDie` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB" );
    	await queryRunner.query( "ALTER TABLE `dnd`.`skill` ADD CONSTRAINT `FK_244daeab521b8148f99a0c1cbb5` FOREIGN KEY (`abilityId`) REFERENCES `dnd`.`ability`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION" );
    	await queryRunner.query( "ALTER TABLE `dnd`.`ability_score` ADD CONSTRAINT `FK_d85bffacbe031ac710f9462a218` FOREIGN KEY (`characterId`) REFERENCES `dnd`.`character`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION" );
    	await queryRunner.query( "ALTER TABLE `dnd`.`ability_score` ADD CONSTRAINT `FK_cf865a77fc2bb797400adb554e3` FOREIGN KEY (`abilityId`) REFERENCES `dnd`.`ability`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION" );
    }

    public async down( queryRunner: QueryRunner ): Promise<void> {
    	await queryRunner.query( "ALTER TABLE `dnd`.`ability_score` DROP FOREIGN KEY `FK_cf865a77fc2bb797400adb554e3`" );
    	await queryRunner.query( "ALTER TABLE `dnd`.`ability_score` DROP FOREIGN KEY `FK_d85bffacbe031ac710f9462a218`" );
    	await queryRunner.query( "ALTER TABLE `dnd`.`skill` DROP FOREIGN KEY `FK_244daeab521b8148f99a0c1cbb5`" );
    	await queryRunner.query( "DROP TABLE `dnd`.`character_class`" );
    	await queryRunner.query( "DROP TABLE `dnd`.`ability_score`" );
    	await queryRunner.query( "DROP TABLE `dnd`.`character`" );
    	await queryRunner.query( "DROP TABLE `dnd`.`ability`" );
    	await queryRunner.query( "DROP TABLE `dnd`.`skill`" );
    }
}
