import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import BaseEntity from "../../Base.entity";
import Character from "../../domain/character/entities/Character.entity";

@Entity()
export default class Command extends BaseEntity {
	@Column()
	public type: string;

	@Column( "json" )
	public data: Record<string, any>;

	@Column()
	public executedAt: Date;

	@Column( { "default": false } )
	public undone: boolean;

	@ManyToOne( () => Character )
	public character: Character;

	@Column()
	@RelationId( ( command: Command ) => command.character )
	public readonly characterId: number;

	@OneToOne( () => Command, { cascade: true, nullable: true } )
	public undoCommand?: Command;

	@Column( { nullable: true } )
	@RelationId( ( command: Command ) => command.undoCommand )
	public readonly undoCommandId?: number;
}

