import { Column, Entity, ManyToOne } from "typeorm";
import BaseEntity from "../../entities/Base.entity";
import Ability from "./Ability.entity";

@Entity()
export default class Skill extends BaseEntity {
	@Column()
	public name: string;

	@Column( { type: "text" } )
	public description: string;

	@ManyToOne( () => Ability, ( ability: Ability ) => ability.skills, { eager: true, cascade: [ "insert" ] } )
	public ability: Ability;
}
