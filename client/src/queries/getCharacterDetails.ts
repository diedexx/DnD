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
			ideals
			bonds
			flaws
			hitDice {
				displayValue
			}
			class {
				name
			}
			health {
				currentHealth
				maxHealth
				displayHealth
			}
			proficiencyBonus { ${ modifierQuery } }
			armorClassModifier { ${ modifierQuery } }
			initiativeModifier { ${ modifierQuery } }
			speedModifier { ${ modifierQuery } }
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
				equipped
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
			equipment {
				name
				description
				equippable
				equipped
				number
			}
			wallet {
				copper
				silver
				electrum
				gold
				platinum
			}
			deathSave {
				successes
				failures
			}
		}
	}`;
export default getCharacterDetails;
