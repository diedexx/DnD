import { FunctionComponent } from "react";
import useResolvingSelect, { useRefreshResolver } from "../../functions/useResolvingSelect";
import CharacterDetails from "../../interfaces/CharacterDetails";
import Spinner from "../Spinner/Spinner";
import AbilityScores from "./AbilityScores/AbilityScores";
import "./CharacterSheet.css";
import CharacterSummary from "./CharacterSummary/CharacterSummary";

export type CharacterDetailPageProps = {
	characterId: number;
}

/**
 * The character detail page component.
 *
 * @param {number} characterId The id of the character.
 *
 * @return {JSX.Element} The character detail page component.
 */
const CharacterSheet: FunctionComponent<CharacterDetailPageProps> = ( { characterId }: CharacterDetailPageProps ): JSX.Element => {
	const {
		data: characterDetails,
		isLoading,
		startedLoading,
	} = useResolvingSelect<CharacterDetails>( "getCharacterDetails", characterId );

	const refresh = useRefreshResolver( "getCharacterDetails", characterId );

	return <div>
		<div className="controls">
			<button className="btn-refresh" disabled={ isLoading } onClick={ refresh }><i className="fa fa-refresh" />
			</button>
		</div>
		{ ( isLoading || ! startedLoading ) && <Spinner type="fullscreen" /> }
		<div className="character-sheet">
			<CharacterSummary characterDetails={ characterDetails } />
			<AbilityScores abilityScores={ characterDetails.abilityScores } />
		</div>
	</div>;
};

export default CharacterSheet;
