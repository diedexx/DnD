import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, RelationId } from "typeorm";
import BaseEntity from "../../Base.entity";
import Category from "../../category/entity/Category.entity";
import Character from "../../character/entities/Character.entity";
import { DamageRoll } from "../../damage/models/DamageRoll.valueobject";
import DamageRollTransformer from "../../damage/transformers/DamageRollTransformer";
import Modifier from "../../modifier/models/Modifier.valueobject";
import ModifierTransformer from "../../modifier/transformers/Modifier.transformer";
import Property from "./Property.entity";

@Entity()
@ObjectType()
export class Weapon extends BaseEntity {
	@Column()
	@Field()
	public name: string;

	@Column( "text" )
	@Field()
	public description: string;

	@Column( "int", { transformer: new ModifierTransformer() } )
	@Field()
	public attackRollModifierBase: Modifier;

	@Column( "varchar", { transformer: new DamageRollTransformer(), comment: "Example: 2d8 +3 Piercing" } )
	@Field()
	public damageRoll: DamageRoll;

	@ManyToOne( () => Character, ( character: Character ) => character.weapons )
	@Field( () => Character )
	public owner: Character;

	@Column()
	@RelationId( ( weapon: Weapon ) => weapon.owner )
	@Field( () => Int )
	public readonly ownerId: number;

	@ManyToMany( () => Property, { cascade: [ "insert" ] } )
	@JoinTable( { name: "weapon_property" } )
	public properties: Property[];

	@ManyToMany( () => Category, { cascade: [ "insert" ] } )
	@JoinTable()
	public categories: Category[];
}
