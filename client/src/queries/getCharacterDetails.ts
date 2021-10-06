const modifierQuery = `
					value
					base
					situationalValue
					displayValue
					displayBaseValue
					displaySituationalValue
					externalModifiers {
						source
						modifier {
							value
							base
							situationalValue
							displayValue
							displayBaseValue
							displaySituationalValue
						}
						situational
						description
					}
				`;

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
					${ modifierQuery }
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
					${ modifierQuery }
				}
			}
			weapons {
				name
				description
				attackRollModifier {
					${ modifierQuery }
				}
				damageRoll {
					displayValue
					dice {
						displayValue
					}
					modifier {
						${ modifierQuery }
					}
					type
				}
			}
			wallet {
				copper
				silver
				electrum
				gold
				platinum
			}
		}
	}`;
export default getCharacterDetails;
