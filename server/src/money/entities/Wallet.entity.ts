import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import BaseEntity from "../../Base.entity";
import Character from "../../character/entities/Character.entity";

@Entity()
@ObjectType()
export default class Wallet extends BaseEntity {
	@Column( "float", { "default": 0 } )
	@Field( () => Float )
	public readonly copper: number;

	@Column( "float", { "default": 0 } )
	@Field( () => Float )
	public readonly silver: number;

	@Column( "float", { "default": 0 } )
	@Field( () => Float )
	public readonly electrum: number;

	@Column( "float", { "default": 0 } )
	@Field( () => Float )
	public readonly gold: number;

	@Column( "float", { "default": 0 } )
	@Field( () => Float )
	public readonly platinum: number;

	@OneToOne( () => Character, ( character: Character ) => character.wallet )
	@JoinColumn()
	@Field( () => Character )
	public owner: Character;

	@Column()
	@RelationId( ( wallet: Wallet ) => wallet.owner )
	@Field( () => Int )
	public readonly ownerId: number;
}
