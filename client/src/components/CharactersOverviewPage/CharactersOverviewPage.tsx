import { Fragment, FunctionComponent } from "react";
import { Link } from "react-router-dom";
import useResolvingSelect, { useRefreshResolver } from "../../functions/useResolvingSelect";
import CharacterSummaryInterface from "../../interfaces/CharacterSummary.interface";
import CharacterSummaryList from "../CharacterSummaryList/CharacterSummaryList";
import Spinner from "../Spinner/Spinner";
import "./CharactersOverviewPage.css";

/**
 * An summarized overview of all characters.
 *
 * @return {JSX.Element} The character overview.
 */
const CharactersOverviewPage: FunctionComponent = (): JSX.Element => {
	const { data, isLoading, startedLoading } = useResolvingSelect<CharacterSummaryInterface[]>( "getCharacterSummaries" );
	const refresh = useRefreshResolver( "getCharacterSummaries" );

	return <Fragment>
		<div className="controls">
			<button className="btn-refresh" disabled={ isLoading } onClick={ refresh }>
				<i className="fa fa-refresh" />
			</button>
		</div>
		{ ( isLoading || ! startedLoading ) && <Spinner type={ "inline" } /> }
		<CharacterSummaryList characterSummaries={ data } />
		<Link className="card card--clickable btn--fullSize" to="/new-character">Create new character</Link>
	</Fragment>;
};

export default CharactersOverviewPage;
