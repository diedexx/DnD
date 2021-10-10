import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import BaseEntity from "../../Base.entity";
import Character from "../../character/entities/Character.entity";
import { DamageRoll } from "../../damage/models/DamageRoll.valueobject";
import DamageRollTransformer from "../../damage/transformers/DamageRollTransformer";
import SpellLevel from "../models/SpellLevel.valueobject";
import SpellLevelTransformer from "../transformers/SpellLevel.transformer";

@Entity()
@ObjectType()
export default class Spell extends BaseEntity {
	@Column()
	@Field()
	public name: string;

	@Column( "text" )
	@Field()
	public description: string;

	@Column( "int", { transformer: new SpellLevelTransformer() } )
	public spellLevel: SpellLevel;

	@Column()
	@Field()
	public unlockLevel: number;

	@Column( "varchar", { transformer: new DamageRollTransformer(), comment: "Example: 2d8 +3 Fire" } )
	@Field()
	public damage: DamageRoll;

	@Column()
	@Field()
	public prepared: boolean;

	@ManyToOne( () => Character, ( character: Character ) => character.spells )
	@Field( () => Character )
	public owner: Character;

	@Column()
	@RelationId( ( spell: Spell ) => spell.owner )
	@Field( () => Int )
	public readonly ownerId: number;
}
