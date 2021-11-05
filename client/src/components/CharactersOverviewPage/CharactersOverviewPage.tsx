import { faSyncAlt } from "@fortawesome/free-solid-svg-icons/faSyncAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
	const {
		data,
		isLoading,
		startedLoading,
	} = useResolvingSelect<CharacterSummaryInterface[]>( "getCharacterSummaries" );
	const refresh = useRefreshResolver( "getCharacterSummaries" );

	return <Fragment>
		<div className="controls">
			<button disabled={ isLoading } onClick={ refresh }>
				<FontAwesomeIcon icon={ faSyncAlt } spin={ isLoading } size={ "lg" } />
			</button>
		</div>
		{ ( isLoading || ! startedLoading ) && <Spinner type={ "inline" } /> }
		<CharacterSummaryList characterSummaries={ data } />
		<Link className="card card--clickable btn--fullSize" to="/new-character">Create new character</Link>
	</Fragment>;
};

export default CharactersOverviewPage;
