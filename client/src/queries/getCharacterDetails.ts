const modifierQuery = `
					value
					base
					situationalValue
					displayValue
					displayBaseValue
					displaySituationalValue
					externalModifiers {
						source
						type
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

const damageQuery = `
					displayValue
					dice {
						displayValue
					}
					modifier {
						${ modifierQuery }
					}
					type`;

const externalModifierQuery = `
					source
					type
					modifier {
						${ modifierQuery }
					}
					situational
					description
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
			proficiencies {
				affectedCategoryName
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
			savingThrows {
				isProficient
				ability {
					name
					shortName
				}
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
				damageRoll { ${ damageQuery } }
				bonuses { ${ externalModifierQuery } }
			}
			equipment {
				name
				description
				equippable
				equipped
				number
				bonuses { ${ externalModifierQuery } }
			}
			spells {
				name
				description
				level
				unlockLevel
				damage { ${ damageQuery } }
				prepared
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
