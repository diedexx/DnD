import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons/faRedoAlt";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons/faSyncAlt";
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons/faUndoAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "@wordpress/data";
import { FunctionComponent, useCallback } from "react";
import useResolvingSelect, { useRefreshResolver } from "../../../functions/useResolvingSelect";
import ExecutedActionInterface from "../../../interfaces/ExecutedAction.interface";
import ControlGroup from "../../Common/Controls/ControlGroup";
import Controls from "../../Common/Controls/Controls";

export type CharacterSheetControlsProps = {
	readonly toggleHistory: () => void;
	readonly characterId: number;
}

/**
 * A component containing the controls for a character sheet.
 *
 * @param {CharacterSheetControlsProps} props The props.
 *
 * @return {JSX.Element} The controls for a character sheet.
 */
const CharacterSheetControls: FunctionComponent<CharacterSheetControlsProps> = (
	{ characterId, toggleHistory }: CharacterSheetControlsProps,
): JSX.Element => {
	const { undoAction: dispatchUndoAction, redoAction: dispatchRedoAction } = useDispatch( "app" );
	const { isLoading: isLoadingCharacter } = useResolvingSelect( "getCharacterDetails", characterId );

	const {
		isLoading: isLoadingActionHistory,
		data: actionHistory,
	} = useResolvingSelect<ExecutedActionInterface[]>( "getActionHistory", characterId );

	const refresh = useRefreshResolver( "getCharacterDetails", characterId );
	const undoAction = useCallback( () => dispatchUndoAction( characterId ), [ dispatchUndoAction, characterId ] );
	const redoAction = useCallback( () => dispatchRedoAction( characterId ), [ dispatchRedoAction, characterId ] );

	const hasUndoableActions = actionHistory.some( ( action ) => ! action.isUndone );
	const hasReDoableActions = actionHistory.some( ( action ) => action.isUndone );

	return <Controls>
		<ControlGroup>
			<button disabled={ isLoadingActionHistory || ! hasUndoableActions } onClick={ undoAction }>
				<FontAwesomeIcon icon={ faUndoAlt } size={ "lg" } />
			</button>

			<button disabled={ isLoadingActionHistory || ! hasReDoableActions } onClick={ redoAction }>
				<FontAwesomeIcon icon={ faRedoAlt } size={ "lg" } />
			</button>

			<button onClick={ toggleHistory }>
				<FontAwesomeIcon icon={ faHistory } size={ "lg" } />
			</button>
		</ControlGroup>

		<button disabled={ isLoadingCharacter } onClick={ refresh }>
			<FontAwesomeIcon icon={ faSyncAlt } spin={ isLoadingCharacter } size={ "lg" } />
		</button>
	</Controls>;
};

export default CharacterSheetControls;
