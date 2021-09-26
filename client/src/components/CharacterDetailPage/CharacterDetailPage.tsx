import { FunctionComponent } from "react";
import useSelect from "../../functions/useSelect";
import { CharacterDetails } from "../../interfaces/CharacterDetails";
import Spinner from "../Spinner";
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
	} = useSelect<CharacterDetails>( "getCharacterDetails", [], characterId );

	if ( isLoading || ! startedLoading ) {
		return <Spinner />;
	}
	return <div>
		{ characterDetails.name }
	</div>;
};

export default CharacterDetailPage;
