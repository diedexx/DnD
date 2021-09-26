import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import useSelect from "../../functions/useSelect";
import { CharacterSummary } from "../../interfaces/CharacterSummary";
import CharacterSummaryList from "../CharacterSummaryList/CharacterSummaryList";
import Spinner from "../Spinner";

/**
 * An summarized overview of all characters.
 *
 * @return {JSX.Element} The character overview.
 */
const CharactersOverviewPage: FunctionComponent = (): JSX.Element => {
	const { data, isLoading, startedLoading } = useSelect<CharacterSummary[]>( "getCharacterSummaries" );

	if ( isLoading || ! startedLoading ) {
		return <Spinner />;
	}

	return <div className="page--narrow">
		<CharacterSummaryList characterSummaries={ data } />
		<Link className="card card--clickable btn--fullSize" to="/new-character">Create new character</Link>
	</div>;
};

export default CharactersOverviewPage;
