export const commandHistoryBodyQuery = `
			name
			description
			isUndone
			executedAt`;

const getCommandHistory =
	`query commandHistory($characterId: Int!) {
		commandHistory(characterId: $characterId) { 
			${commandHistoryBodyQuery} 
		}
	}`;
export default getCommandHistory;
