import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";
import Die from "../../dice/models/Die";
import DieTransformer from "../../dice/transformers/Die.transformer";
import BaseEntity from "../../entities/Base.entity";

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
	@Field( () => Die )
	public hitDie: Die;
}
