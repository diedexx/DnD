import { commandHistoryBodyQuery } from "./getCommandHistory";

const undoLastCommand =
	`mutation UndoLastCommand($characterId: Int!) {
		undoLastCommand(characterId: $characterId) {
			${commandHistoryBodyQuery}
		}
	}`;
export default undoLastCommand;
