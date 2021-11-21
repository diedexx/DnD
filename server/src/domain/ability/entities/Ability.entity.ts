import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany } from "typeorm";
import BaseEntity from "../../../infrastructure/Base.entity";
import Skill from "../../skill/entities/Skill.entity";

@Entity()
@ObjectType()
export default class Ability extends BaseEntity {
	@Column()
	@Field()
	public name: string;

	@Column()
	@Field()
	public shortName: string;

	@Column( { type: "text" } )
	@Field()
	public description: string;

	@OneToMany( () => Skill, ( skill: Skill ) => skill.ability, { cascade: [ "insert" ] } )
	@Field( () => [ Skill ] )
	public skills: Skill[];
}
