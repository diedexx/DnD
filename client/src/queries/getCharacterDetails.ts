const getCharacterDetails =
	`query CharacterDetails($id: Int!) {
		character(id: $id) {
			id
			name
			level
			experience
			race
			background
			alignment
			personalityTraits
			bonds
			flaws
			class {
				name
			}
			health {
				currentHealth
				maxHealth
			}
			abilityScores {
				baseScore
				modifier {
					value
				}
				ability {
					name
					shortName
					skills {
						name
					}
				}
			}
		}
	}`;
export default getCharacterDetails;
