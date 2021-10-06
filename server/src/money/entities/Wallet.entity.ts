import { Field, Float, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";
import BaseEntity from "../../Base.entity";

@Entity()
@ObjectType()
export default class Wallet extends BaseEntity {
	@Column( "float", { "default": 0 } )
	@Field( () => Float )
	private readonly copper: number;

	@Column( "float", { "default": 0 } )
	@Field( () => Float )
	private readonly silver: number;

	@Column( "float", { "default": 0 } )
	@Field( () => Float )
	private readonly electrum: number;

	@Column( "float", { "default": 0 } )
	@Field( () => Float )
	private readonly gold: number;

	@Column( "float", { "default": 0 } )
	@Field( () => Float )
	private readonly platinum: number;
}
