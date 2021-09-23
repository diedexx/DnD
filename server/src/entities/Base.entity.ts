import { Field } from "@nestjs/graphql";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export default class BaseEntity {
	@PrimaryGeneratedColumn()
	@ApiModelProperty( { type: "number" } )
	@Field()
	public id: number;

	@CreateDateColumn()
	@ApiModelProperty( { type: "string", format: "date-time" } )
	public createdAt: Date;

	@UpdateDateColumn()
	@ApiModelProperty( { type: "string", format: "date-time" } )
	public updatedAt: Date;

	/**
	 * Checks if two entities share a database reference.
	 * Unsaved entries are never considered the same.
	 *
	 * @param {BaseEntity} entity The entity to check against.
	 *
	 * @returns {boolean} True if the references match.
	 */
	public isSameEntity( entity: BaseEntity ) {
		return !! ( this.id || entity.id ) && this.id === entity.id;
	}
}
