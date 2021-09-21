import { Column, Entity } from "typeorm";
import Die from "../../dice/models/Die";
import DieTransformer from "../../dice/transformers/Die.transformer";
import BaseEntity from "../../entities/Base.entity";

@Entity()
/**
 * @see https://www.dndbeyond.com/classes
 */
export default class CharacterClass extends BaseEntity {
	@Column()
	public name: string;

	@Column( { type: "text" } )
	public description: string;

	@Column( { type: "integer", transformer: new DieTransformer() } )
	public hitDie: Die;
}
