const getCharacterSummaries =
	`{
		characters {
			id
			name
			level
			experience
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
