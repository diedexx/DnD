import { commandHistoryBodyQuery } from "./getCommandHistory";

const redoLastUndoneCommand =
	`mutation RedoLastUndoneCommand($characterId: Int!) {
		redoLastUndoneCommand(characterId: $characterId) {
			${commandHistoryBodyQuery}
		}
	}`;
export default redoLastUndoneCommand;
