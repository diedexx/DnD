import { FunctionComponent, useCallback } from "react";
import HealthInterface from "../../../interfaces/Health.interface";
import "./Health.css";

export type HealthProps = {
	health: HealthInterface;
}

const lowHealthThreshold = 0.1;
const highHealthThreshold = 1;

/**
 * Displays a current/max health value.
 *
 * @param {HealthInterface} health The health to display.
 *
 * @return {JSX.Element} The component.
 */
const Health: FunctionComponent<HealthProps> = ( { health }: HealthProps ): JSX.Element => {
	const healthIsLow = useCallback( () => {
		return health.currentHealth / health.maxHealth <= lowHealthThreshold;
	}, [ health ] );

	const healthIsHigh = useCallback( () => {
		return health.currentHealth / health.maxHealth >= highHealthThreshold;
	}, [ health ] );

	const getClassSuffix = useCallback( () => {
		if ( healthIsLow() ) {
			return "--low";
		}
		if ( healthIsHigh() ) {
			return "--high";
		}
		return "";
	}, [ healthIsLow, healthIsHigh ] );

	return <div className="health card">
		<h3>Current HP</h3>
		<span className="health-display">
			<span className={ "health-display__current-value" + getClassSuffix() }>
				{ health.currentHealth }
			</span>
			/
			<span>
				{ health.maxHealth }
			</span>
		</span>
	</div>;
};

export default Health;
