import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons/faRedoAlt";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons/faSyncAlt";
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons/faUndoAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import ControlGroup from "../../Common/Controls/ControlGroup";
import Controls from "../../Common/Controls/Controls";

export type CharacterSheetControlsProps = {
	readonly isLoading: boolean;
	readonly undoAction: () => void;
	readonly redoAction: () => void;
	readonly refresh: () => void;
	readonly toggleHistory: () => void;
}

/**
 * A component containing the controls for a character sheet.
 *
 * @param {CharacterSheetControlsProps} props The props.
 *
 * @return {JSX.Element} The controls for a character sheet.
 */
const CharacterSheetControls: FunctionComponent<CharacterSheetControlsProps> = ( props: CharacterSheetControlsProps ): JSX.Element => {
	return <Controls>
		<ControlGroup>
			<button disabled={ props.isLoading } onClick={ props.undoAction }>
				<FontAwesomeIcon icon={ faUndoAlt } size={ "lg" } />
			</button>
			<button disabled={ props.isLoading } onClick={ props.redoAction }>
				<FontAwesomeIcon icon={ faRedoAlt } size={ "lg" } />
			</button>
			<button onClick={ props.toggleHistory }>
				<FontAwesomeIcon icon={ faHistory } size={ "lg" } />
			</button>
		</ControlGroup>
		<button disabled={ props.isLoading } onClick={ props.refresh }>
			<FontAwesomeIcon icon={ faSyncAlt } spin={ props.isLoading } size={ "lg" } />
		</button>
	</Controls>;
};

export default CharacterSheetControls;
