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
				displayHealth
			}
			abilityScores {
				baseScore
				modifier {
					value
					displayValue
				}
				ability {
					name
				}
			}
			skillScores {
				abilityShortname
				skillName
				modifier {
					value
					displayValue
				}
			}
		}
	}`;
export default getCharacterDetails;
