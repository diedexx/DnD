import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import BaseEntity from "../../Base.entity";
import Ability from "./Ability.entity";

@Entity()
@ObjectType()
export default class Skill extends BaseEntity {
	@Column()
	@Field()
	public name: string;

	@Column( { type: "text" } )
	@Field()
	public description: string;

	@ManyToOne( () => Ability, ( ability: Ability ) => ability.skills, { eager: true, cascade: [ "insert" ] } )
	@Field( () => Ability )
	public ability: Ability;

	@Column( "int" )
	@RelationId( ( skill: Skill ) => skill.ability )
	public readonly abilityId: string;
}
