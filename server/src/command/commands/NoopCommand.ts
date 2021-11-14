import { Injectable } from "@nestjs/common";
import CommandReference from "../interfaces/CommandReference.interface";
import { AbstractCommand } from "./AbstractCommand";

@Injectable()
export class NoopCommand extends AbstractCommand {
	/**
	 * @inheritDoc
	 */
	protected validateData(): boolean {
		return true;
	}

	/**
	 * @inheritDoc
	 */
	public async getName(): Promise<string> {
		return "Nothing";
	}

	/**
	 * @inheritDoc
	 */
	public async getDescription(): Promise<string> {
		return "...";
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
