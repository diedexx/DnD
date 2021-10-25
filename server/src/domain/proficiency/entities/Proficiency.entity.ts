import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import BaseEntity from "../../../Base.entity";
import Category from "../../category/entity/Category.entity";
import Character from "../../character/entities/Character.entity";
import ProficiencyBonus from "../values/ProficiencyBonus.value";

@Entity()
@ObjectType()
export default class Proficiency extends BaseEntity {
	/**
	 * Gets the description of the proficiency.
	 *
	 * @return {string} The description.
	 */
	get description(): string {
		return "Proficiency bonus: " + this.affectedCategoryName;
	}

	/**
	 * Gets the proficiency bonus value.
	 *
	 * @return {ProficiencyBonus} The proficiency bonus value.
	 */
	get bonus(): ProficiencyBonus {
		return this.owner.proficiencyBonus;
	}

	@ManyToOne( () => Category )
	public affectedCategory: Category;

	@Column()
	@RelationId( ( proficiency: Proficiency ) => proficiency.affectedCategory )
	@Field()
	public readonly affectedCategoryName: string;

	@ManyToOne( () => Character, ( character: Character ) => character.proficiencies, { eager: true } )
	public owner: Character;

	@Column()
	@RelationId( ( proficiency: Proficiency ) => proficiency.owner )
	public readonly ownerId: number;
}
