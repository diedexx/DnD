import { useSelect } from "@wordpress/data";
import { FunctionComponent } from "react";
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
	const { characterDetails, loading } = useSelect( select => {
		return {
			characterDetails: select( "app" ).getCharacterDetails( characterId ),
			loading: select( "app" ).isResolving( "getCharacterDetails", [ characterId ] ),
		};
	}, [ characterId ] );

	if ( loading ) {
		return <Spinner />;
	}
	return <div>
		{ characterDetails.name }
	</div>;
};

export default CharacterDetailPage;
