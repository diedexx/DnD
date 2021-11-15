import { useDispatch } from "@wordpress/data";
import { FunctionComponent, useCallback, useContext, useMemo, useRef } from "react";
import HealthInterface from "../../../interfaces/Health.interface";
import BigValueDisplay from "../../Common/BigValueDisplay/BigValueDisplay";
import { CharacterContext } from "../CharacterSheet";
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
	const { takeDamage: dispatchTakeDamage, receiveHealing: dispatchReceiveHealing } = useDispatch( "app" );
	const { characterId } = useContext( CharacterContext );
	const inputRef = useRef<HTMLInputElement>();

	const takeDamage = useCallback( () => {
		dispatchTakeDamage( characterId, parseInt( inputRef.current.value, 10 ) );
	}, [ dispatchTakeDamage, characterId, inputRef ] );

	const receiveHealing = useCallback( () => {
		dispatchReceiveHealing( characterId, parseInt( inputRef.current.value, 10 ) );
	}, [ dispatchReceiveHealing, characterId, inputRef ] );

	const healthIsLow = useMemo( () => {
		return health.currentHealth / health.maxHealth <= lowHealthThreshold;
	}, [ health ] );

	const healthIsHigh = useMemo( () => {
		return health.currentHealth / health.maxHealth >= highHealthThreshold;
	}, [ health ] );

	const classSuffix = useMemo( () => {
		if ( healthIsLow ) {
			return "--low";
		}
		if ( healthIsHigh ) {
			return "--high";
		}
		return "";
	}, [ healthIsLow, healthIsHigh ] );

	return <div className="health">
		<input type="number" min={ 0 } max={ health.maxHealth * 2 } ref={ inputRef } />
		<button onClick={ receiveHealing }>Heal</button>
		<button onClick={ takeDamage }>Damage</button>
		<BigValueDisplay>
			<span className="health-display">
				<span className={ "health-display__current-value" + classSuffix }>
					{ health.currentHealth }
				</span>
				/
				<span>
					{ health.maxHealth }
				</span>
			</span>
		</BigValueDisplay>
	</div>;
};

export default Health;
