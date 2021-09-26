import { FunctionComponent } from "react";
import CharacterListItem from "./CharacterListItem";
import "./CharacterList.css";

export type CharacterListProps = {
	characterIds: number[];
}

/**
 * Gets a list with characters summaries.
 *
 * @param {number[]} characterIds The ids of the characters to display.
 *
 * @return {JSX.Element} The list.
 */
const CharacterList: FunctionComponent<CharacterListProps> = ( { characterIds } ): JSX.Element  => {
	return <ul className="characterList">
		{ characterIds.map( getListItem ) }
	</ul>;
};

/**
 * Gets a single character summary list item.
 *
 * @param {number} characterId The character id to get the list item for.
 *
 * @return {JSX.Element} The character summary list item.
 */
function getListItem( characterId: number ) {
	return <CharacterListItem key={ characterId } characterId={ characterId } />;
}

export default CharacterList;
