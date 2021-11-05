const getCommandHistory =
	`query commandHistory($characterId: Int!) {
		commandHistory(characterId: $characterId) {
			name
			description
			isUndone
			executedAt
		}
	}`;
export default getCommandHistory;
