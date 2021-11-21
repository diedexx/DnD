import { Column, Entity, JoinColumn, ManyToOne, OneToOne, RelationId } from "typeorm";
import BaseEntity from "../../Base.entity";
import Character from "../../../domain/character/entities/Character.entity";
import CommandReference from "../interfaces/CommandReference.interface";

@Entity()
export default class Command extends BaseEntity {
	@Column()
	public type: string;

	@Column( "json" )
	public data: Record<string, any>;

	@Column( { nullable: true } )
	public executedAt: Date;

	@Column( { "default": false } )
	public undone: boolean;

	@ManyToOne( () => Character )
	public character: Character;

	@Column()
	@RelationId( ( command: Command ) => command.character )
	public readonly characterId: number;

	@OneToOne( () => Command, { cascade: true, nullable: true } )
	@JoinColumn()
	public undoCommand?: Command;

	@Column( { nullable: true } )
	@RelationId( ( command: Command ) => command.undoCommand )
	public readonly undoCommandId?: number;

	/**
	 * Constructs a command from a commandReference.
	 *
	 * @param {CommandReference} commandReference The commandReference that represents the command you want.
	 * @param {Character} character The character the command is for.
	 *
	 * @return {Command} The command.
	 */
	public static createFromReference( commandReference: CommandReference, character: Character ) {
		const command = new Command();
		command.type = commandReference.type;
		command.data = commandReference.data;
		command.undone = false;
		command.character = character;
		return command;
	}
}

