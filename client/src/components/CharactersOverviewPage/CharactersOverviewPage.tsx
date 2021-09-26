import { useSelect } from "@wordpress/data";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { CharacterSummary } from "../../interfaces/CharacterSummary";
import CharacterSummaryList from "../CharacterSummaryList/CharacterSummaryList";

/**
 * An summarized overview of all characters.
 *
 * @return {JSX.Element} The character overview.
 */
const CharactersOverviewPage: FunctionComponent = (): JSX.Element => {
	const characterSummaries: CharacterSummary[] = useSelect(
		( select ) => select( "app" ).getCharacterSummaries(),
		[],
	);

	return <div className="page--narrow">
		<CharacterSummaryList characterSummaries={ characterSummaries } />
		<Link className="card card--clickable btn--fullSize" to="/new-character">Create new character</Link>
	</div>;
};

export default CharactersOverviewPage;
