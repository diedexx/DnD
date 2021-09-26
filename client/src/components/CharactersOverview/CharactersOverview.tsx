import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import CharacterList from "../CharactersList/CharacterList";

/**
 * An summarized overview of all characters.
 *
 * @return {JSX.Element} The character overview.
 */
const CharactersOverview: FunctionComponent = (): JSX.Element  => {
	return <div className="page--narrow">
		<CharacterList characterIds={ [ 1, 2, 3 ] } />
		<Link className="card card--clickable btn--fullSize" to="/new-character">Create new character</Link>
	</div>;
};

export default CharactersOverview;
