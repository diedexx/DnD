import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import Ability from "../../ability/entities/Ability.entity";
import BaseEntity from "../../../Base.entity";
import Character from "../../character/entities/Character.entity";

@ObjectType()
@Entity()
export default class SavingThrow extends BaseEntity {
	@Column( { "default": false } )
	@Field()
	public isProficient: boolean;

	@ManyToOne( () => Ability )
	@Field()
	public ability: Ability;

	@Column( "int" )
	@RelationId( ( savingThrow: SavingThrow ) => savingThrow.ability )
	@Field( () => Int )
	public readonly abilityId: number;

	@ManyToOne( () => Character, ( character: Character ) => character.savingThrows )
	@Field( () => Character )
	public character: Character;

	@Column( "int" )
	@RelationId( ( skillScore: SavingThrow ) => skillScore.character )
	@Field( () => Int )
	public readonly characterId: number;
}
