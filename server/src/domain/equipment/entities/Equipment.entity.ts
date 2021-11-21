import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, RelationId } from "typeorm";
import BaseEntity from "../../../infrastructure/Base.entity";
import Category from "../../category/entity/Category.entity";
import Character from "../../character/entities/Character.entity";
import Modification from "../../modifier/entities/Modification.entity";

@Entity()
@ObjectType()
export default class Equipment extends BaseEntity {
	@Column()
	@Field()
	public name: string;

	@Column( "text" )
	@Field()
	public description: string;

	@Column()
	@Field()
	public equippable: boolean;

	@Column()
	@Field()
	public equipped: boolean;

	@Column()
	@Field( () => Int )
	public number: number;

	@OneToMany( () => Modification, ( modification: Modification ) => modification.sourceEquipment, { cascade: true } )
	public bonuses: Modification[];

	@ManyToOne( () => Character, ( character: Character ) => character.equipment )
	@Field( () => Character )
	public owner: Character;

	@Column()
	@RelationId( ( equipment: Equipment ) => equipment.owner )
	@Field( () => Int )
	public readonly ownerId: number;

	@ManyToMany( () => Category, { cascade: [ "insert" ] } )
	@JoinTable()
	public categories: Category[];
}
