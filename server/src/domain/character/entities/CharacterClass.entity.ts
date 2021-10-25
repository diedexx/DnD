import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";
import BaseEntity from "../../../Base.entity";
import Die from "../../die/values/Die.value";
import DieTransformer from "../../die/transformers/Die.transformer";

@Entity()
@ObjectType()
/**
 * @see https://www.dndbeyond.com/classes
 */
export default class CharacterClass extends BaseEntity {
	@Column()
	@Field()
	public name: string;

	@Column( { type: "text" } )
	@Field()
	public description: string;

	@Column( { type: "integer", transformer: new DieTransformer() } )
	@Field()
	public hitDie: Die;
}
