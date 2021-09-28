import { FunctionComponent } from "react";
import CharacterDetailsInterface from "../../../interfaces/CharacterDetails.interface";
import KeyValuePair from "../../KeyValuePair/KeyValuePair";
import "./CharacterSummary.css";

export type CharacterSummaryProps = {
	characterDetails: CharacterDetailsInterface;
}

/**
 * Get a summary of the character for the character sheet.
 *
 * @param {CharacterDetailsInterface} characterDetails The character details.
 *
 * @return {JSX.Element} The character summary.
 */
const CharacterSummary: FunctionComponent<CharacterSummaryProps> = ( { characterDetails }: CharacterSummaryProps ): JSX.Element => {
	return <div className="character-summary card">
		<KeyValuePair valueKey="Character name" value={ characterDetails.name } />
		<div className="character-summary__table">
			<KeyValuePair valueKey="class" value={ characterDetails.class.name } />
			<KeyValuePair valueKey="race" value={ characterDetails.race } />
			<KeyValuePair valueKey="level" value={ characterDetails.level.toString() } />
			<KeyValuePair valueKey="Exp" value={ characterDetails.experience.toString() } />
			<KeyValuePair valueKey="alignment" value={ characterDetails.alignment } />
			<KeyValuePair valueKey="background" value={ characterDetails.background } />
		</div>
	</div>;
};

export default CharacterSummary;
