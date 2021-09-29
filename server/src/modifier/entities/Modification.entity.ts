import { Entity } from "typeorm";
import BaseEntity from "../../Base.entity";

@Entity()
export default class Modification extends BaseEntity {
	public source: string;
	public type: string;
	public modifier: number;
	public situational: boolean;
	public description?: string;
}
