import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class Category {
	@PrimaryColumn()
	public name: string;
}
