import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import CharacterSummary from "../../interfaces/CharacterSummary";
import { routes } from "../../routes";
import "./CharacterSummaryListItem.css";
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
	return <Link to={ routes.characterDetails.path.replace( ":id", String( characterSummary.id ) ) }>
		<li className="card characterSummaryListItem">
			<KeyValuePair valueKey="Name" value={ characterSummary.name } />
			<KeyValuePair valueKey="Level" value={ characterSummary.level.toString() } />
			<KeyValuePair valueKey="Exp" value={ characterSummary.experience.toString() } />
			<KeyValuePair valueKey="Race" value={ characterSummary.race } />
			<KeyValuePair valueKey="Class" value={ characterSummary.class.name } />
			<KeyValuePair valueKey="Health" value={ characterSummary.health.displayHealth } />
		</li>
	</Link>;
};

export default CharacterSummaryListItem;
