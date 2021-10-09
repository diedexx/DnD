import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";
import BaseEntity from "../../Base.entity";

@Entity()
@ObjectType()
export default class Property extends BaseEntity {
	@Column( "text" )
	@Field()
	private readonly name: string;

	@Column( "text" )
	@Field()
	private readonly description: string;
}
