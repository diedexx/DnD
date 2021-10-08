import { FunctionComponent } from "react";
import DeathSaveInterface from "../../../interfaces/DeathSave.interface";
import Checkbox from "../../Checkbox/Checkbox";
import "./DeathSave.css";

export type DeathSaveProps = {
	deathSave: DeathSaveInterface
}

/**
 * Show the current status of a possible death save.
 *
 * @param {DeathSaveInterface} deathSave The death save to show.
 *
 * @return {JSX.Element} The component.
 */
const DeathSave: FunctionComponent<DeathSaveProps> = ( { deathSave }: DeathSaveProps ): JSX.Element => {
	return <div>
		<div className="death-save__type">
			<span>Successes</span>
			<div className="death-save__checkboxes">
				<Checkbox checked={ deathSave.successes >= 1 } />
				<Checkbox checked={ deathSave.successes >= 2 } />
				<Checkbox checked={ deathSave.successes >= 3 } />
			</div>
		</div>

		<div className="death-save__type">
			<span>Failures</span>
			<div className="death-save__checkboxes">
				<Checkbox checked={ deathSave.failures >= 1 } />
				<Checkbox checked={ deathSave.failures >= 2 } />
				<Checkbox checked={ deathSave.failures >= 3 } />
			</div>
		</div>
	</div>;
};

export default DeathSave;
