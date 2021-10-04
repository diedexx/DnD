import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import BaseEntity from "../../Base.entity";
import Character from "../../character/entities/Character.entity";
import Modifier from "../../modifier/models/Modifier.valueobject";
import Skill from "./Skill.entity";

@ObjectType()
@Entity()
export default class SkillScore extends BaseEntity {
	@Column( { "default": false } )
	@Field()
	public isProficient: boolean;

	@ManyToOne( () => Skill, { cascade: [ "insert" ] } )
	@Field( () => Skill )
	public skill: Skill;

	@Column( "int" )
	@RelationId( ( skillScore: SkillScore ) => skillScore.skill )
	@Field( () => Int )
	public readonly skillId: string;

	@ManyToOne( () => Character, ( character: Character ) => character.abilityScores )
	@Field( () => Character )
	public character: Character;

	@Column( "int" )
	@RelationId( ( skillScore: SkillScore ) => skillScore.character )
	@Field( () => Int )
	public readonly characterId: string;

	@Field( () => Modifier )
	public readonly modifier: Modifier;
}
