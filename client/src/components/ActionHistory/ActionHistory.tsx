import moment from "moment";
import { FunctionComponent } from "react";
import useResolvingSelect from "../../functions/useResolvingSelect";
import ExecutedActionInterface from "../../interfaces/ExecutedAction.interface";
import Spinner from "../Spinner/Spinner";
import "./ActionHistory.css";

export type ActionHistoryProps = {
	characterId: number;
}

/**
 * A overview of the actions that were taken at some point.
 *
 * @param {number} characterId The id of the user who performed the actions.
 *
 * @return {JSX.Element} The action history overview.
 */
const ActionHistory: FunctionComponent<ActionHistoryProps> = ( { characterId }: ActionHistoryProps ): JSX.Element => {
	const {
		data: history,
		isLoading,
		startedLoading,
	} = useResolvingSelect<ExecutedActionInterface[]>( "getActionHistory", characterId );

	const actions = history.map( action => {
		const relativeExecutionDate = moment( action.executedAt ).fromNow();

		const className = action.isUndone ? "action-history__list-item--undone" : "action-history__list-item";

		return <li className={ className } key={ action.executedAt.getTime() }>
			<span className="action-history__name">{ action.name || "Update Flaws" }</span>
			<p className="action-history__description">{ action.description }</p>
			<span
				className="action-history__date"
				  title={ action.executedAt.toDateString() }
			>{ relativeExecutionDate }</span>
		</li>;
	} );

	return <div className="card no-padding action-history">
		{ ( isLoading || ! startedLoading ) && <Spinner type="inline" /> }
		<ul className="action-history__list">
			{ actions }
		</ul>
	</div>;
};

export default ActionHistory;
