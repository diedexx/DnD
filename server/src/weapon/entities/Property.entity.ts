import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";
import BaseEntity from "../../Base.entity";

@Entity()
@ObjectType()
export default class Property extends BaseEntity {
	@Column( "text" )
	@Field()
	public readonly name: string;

	@Column( "text" )
	@Field()
	public readonly description: string;
}
