const updateAbilityScore =
	`mutation UpdateAbilityScore( $abilityScoreId: Int!, $newValue: Int!) {
		updateAbilityScore( abilityScoreId: $abilityScoreId, newValue: $newValue) {
			score{ value }
		}
	}`;
export default updateAbilityScore;
