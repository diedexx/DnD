import { FunctionComponent } from "react";
import CharacterSummaryInterface from "../../interfaces/CharacterSummary.interface";
import CharacterSummaryListItem from "./CharacterSummaryListItem";
import "./CharacterSummaryList.css";

export type CharacterListProps = {
	characterSummaries: CharacterSummaryInterface[];
}

/**
 * Gets a list with characters summaries.
 *
 * @param {number[]} characterIds The ids of the characters to display.
 *
 * @return {JSX.Element} The list.
 */
const CharacterSummaryList: FunctionComponent<CharacterListProps> = ( { characterSummaries } ): JSX.Element  => {
	return <ul className="characterSummaryList">
		{ characterSummaries.map( getListItem ) }
	</ul>;
};

/**
 * Gets a single characterSummary list item.
 *
 * @param {Object} characterSummary The characterSummary to get the list item for.
 *
 * @return {JSX.Element} The characterSummary summary list item.
 */
function getListItem( characterSummary: any ) {
	return <CharacterSummaryListItem key={ characterSummary.id } characterSummary={ characterSummary } />;
}

export default CharacterSummaryList;
