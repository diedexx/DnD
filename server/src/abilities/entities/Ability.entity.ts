import { Column, Entity, OneToMany } from "typeorm";
import BaseEntity from "../../entities/Base.entity";
import Skill from "./Skill.entity";

@Entity()
export default class Ability extends BaseEntity {
	@Column()
	public name: string;

	@Column()
	public shortName: string;

	@Column( { type: "text" } )
	public description: string;

	@OneToMany( () => Skill, ( skill: Skill ) => skill.ability, { cascade: [ "insert" ] } )
	public skills: Skill[];
}
