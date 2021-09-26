const getCharacterSummaries =
	`{
		characters {
			id
			name
			race
			class {
				name
			}
			health {
				currentHealth
				maxHealth
			}
		}
	}`;
export default getCharacterSummaries;
