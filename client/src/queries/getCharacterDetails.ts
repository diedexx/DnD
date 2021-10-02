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
				score
				modifier {
					value
					displayValue
				}
				ability {
					name
					shortName
					skills {
						name
					}
				}
			}
			skillScores {
				skill {
					name
					ability {
						name
						shortName
					}
				}
				isProficient
				modifier {
					displayValue
					base
					externalModifiers {
						source
						modifier {
							displayValue
							value
						}
						situational
						description
					}
				}
			}
		}
	}`;
export default getCharacterDetails;
