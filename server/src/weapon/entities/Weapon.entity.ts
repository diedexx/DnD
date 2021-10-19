import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, RelationId } from "typeorm";
import BaseEntity from "../../Base.entity";
import Category from "../../category/entity/Category.entity";
import Character from "../../character/entities/Character.entity";
import DamageRollTransformer from "../../damage/transformers/DamageRollTransformer";
import { DamageRoll } from "../../damage/values/DamageRoll.value";
import Modification from "../../modifier/entities/Modification.entity";
import ModifierTransformer from "../../modifier/transformers/Modifier.transformer";
import Modifier from "../../modifier/values/Modifier.value";
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

	@Column()
	@Field()
	public equipped: boolean;

	@Column( "int", { transformer: new ModifierTransformer() } )
	@Field()
	public attackRollModifierBase: Modifier;

	@Column( "varchar", { transformer: new DamageRollTransformer(), comment: "Example: 2d8 +3 Piercing" } )
	@Field()
	public damageRoll: DamageRoll;

	@OneToMany( () => Modification, ( modification: Modification ) => modification.sourceWeapon, { cascade: true } )
	public bonuses: Modification[];

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
