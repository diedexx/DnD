import { FunctionComponent } from "react";
import "./CharacterSummaryListItem.css";
import { CharacterSummary } from "../../interfaces/CharacterSummary";
import KeyValuePair from "./KeyValuePair";

export type CharacterListItemProps = {
	characterSummary: CharacterSummary;
}

/**
 * A single character summary list item.
 *
 * @param {number} characterId The character id to get the summary list item for.
 *
 * @return {JSX.Element} The character summary list item.
 */
const CharacterSummaryListItem: FunctionComponent<CharacterListItemProps> = ( { characterSummary }: CharacterListItemProps ): JSX.Element => {
	return <li className="card characterSummaryListItem">
		<KeyValuePair valueKey="Name" value={ characterSummary.name } />
		<KeyValuePair valueKey="Level" value={ characterSummary.level } />
		<KeyValuePair valueKey="Exp" value={ characterSummary.experience } />
		<KeyValuePair valueKey="Race" value={ characterSummary.race } />
		<KeyValuePair valueKey="Class" value={ characterSummary.class.name } />
		<KeyValuePair valueKey="Health" value={ characterSummary.health.currentHealth + "/" + characterSummary.health.maxHealth } />
	</li>;
};

export default CharacterSummaryListItem;
