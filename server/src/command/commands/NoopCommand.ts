import CommandInterface from "../interfaces/Command.interface";
import CommandReference from "../interfaces/CommandReference.interface";
import { AbstractCommand } from "./AbstractCommand";

export class NoopCommand extends AbstractCommand implements CommandInterface {
	/**
	 * @inheritDoc
	 */
	protected validateData(): boolean {
		return true;
	}

	/**
	 * @inheritDoc
	 */
	public async getDescription(): Promise<string> {
		return "Nothing";
	}

	/**
	 * @inheritDoc
	 */
	public getType(): string {
		return "no-operation";
	}

	/**
	 * @inheritDoc
	 */
	protected async perform( data: Record<string, any> ): Promise<CommandReference> {
		return {
			type: this.getType(),
			data: data,
		};
	}
}
