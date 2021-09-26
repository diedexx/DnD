import { FunctionComponent } from "react";
import "./CharacterListItem.css";
import KeyValuePair from "./KeyValuePair";

export type CharacterListItemProps = {
	characterId: number;
}

/**
 * A single character summary list item.
 *
 * @param {number} characterId The character id to get the summary list item for.
 *
 * @return {JSX.Element} The character summary list item.
 */
const CharacterListItem: FunctionComponent<CharacterListItemProps> = ( { characterId }: CharacterListItemProps ): JSX.Element => {
	return <li className="card characterListItem">
		<KeyValuePair valueKey="Name" value="Diede" />
		<KeyValuePair valueKey="Level" value="4" />
		<KeyValuePair valueKey="Exp" value="-" />
		<KeyValuePair valueKey="Race" value="Dwarf" />
		<KeyValuePair valueKey="Class" value="Paladin" />
		<KeyValuePair valueKey="Health" value="10/20" />
	</li>;
};

export default CharacterListItem;
