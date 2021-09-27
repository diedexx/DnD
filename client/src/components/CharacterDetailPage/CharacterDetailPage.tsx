import { FunctionComponent } from "react";
import useResolvingSelect, { useRefreshResolver } from "../../functions/useResolvingSelect";
import CharacterDetails from "../../interfaces/CharacterDetails";
import AbilityScores from "../AbilityScores/AbilityScores";
import Spinner from "../Spinner/Spinner";
import "./CharacterDetailPage.css";

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
const CharacterDetailPage: FunctionComponent<CharacterDetailPageProps> = ( { characterId }: CharacterDetailPageProps ): JSX.Element => {
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
			{ characterDetails.name }
			<AbilityScores abilityScores={ characterDetails.abilityScores } />
		</div>
	</div>;
};

export default CharacterDetailPage;
