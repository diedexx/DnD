import { useDispatch } from "@wordpress/data";
import { debounce } from "lodash";
import { FunctionComponent, useContext, useEffect, useMemo } from "react";
import AbilityScoreInterface from "../../../interfaces/AbilityScore.interface";
import EditableNumber from "../../Common/Editable/EditableNumber";
import { CharacterContext } from "../CharacterSheet";
import "./AbilityScore.css";

export type AbilitiesProps = {
	abilityScore: AbilityScoreInterface;
}

/**
 * An ability score.
 *
 * @return {JSX.Element} An ability score.
 */
const AbilityScore: FunctionComponent<AbilitiesProps> = ( { abilityScore }: AbilitiesProps ): JSX.Element => {
	const { characterId } = useContext( CharacterContext );

	const { updateAbilityScore: dispatchUpdateAbilityScore } = useDispatch( "app" );

	const debouncedUpdateAbilityScore = useMemo(
		() => debounce( ( value: number ) => {
			dispatchUpdateAbilityScore( characterId, abilityScore.id, value );
		}, 400 ),
		[ dispatchUpdateAbilityScore, abilityScore, characterId ],
	);

	useEffect( () => {
		// Perform the debounced action when the component is unmounted.
		return () => debouncedUpdateAbilityScore.flush();
	}, [ debouncedUpdateAbilityScore ] );

	return <div className="ability-score">
		<div className="ability-score__name">{ abilityScore.ability.name }</div>
		<div className="ability-score__modifier">{ abilityScore.modifier.displayValue }</div>
		<div className="ability-score__baseScore">
			<EditableNumber
				onChange={ debouncedUpdateAbilityScore }
				defaultDisplayValue={ abilityScore.score.value }
				defaultEditValue={ abilityScore.score.value }
				maxValue={ 20 }
				minValue={ 8 }
			/>
		</div>
	</div>;
};

export default AbilityScore;
