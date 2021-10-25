import { FunctionComponent } from "react";
import SpellSlotInterface from "src/interfaces/SpellSlot.interface";
import Checkbox from "../../Checkbox/Checkbox";
import "./SpellSlot.css";

export type SpellSlotProps = {
	spellSlot: SpellSlotInterface;
}

/**
 * A display for the number of remaining spellslots for a level.
 *
 * @param {SpellSlot} spellSlot The spellslot to display.
 *
 * @return {JSX.Element} The component.
 */
const SpellSlot: FunctionComponent<SpellSlotProps> = ( { spellSlot }: SpellSlotProps ): JSX.Element => {
	const availableSlots = [];
	for ( let i = 0; i < spellSlot.limit; i++ ) {
		const spent = spellSlot.remaining > i;
		availableSlots.push( <Checkbox checked={ spent } key={ spellSlot.level.value + i } /> );
	}
	return <div className="spell-slot-level">
		Level { spellSlot.level.value }
		<div className="spell-slot-level--remaining">
			{ availableSlots }
		</div>
	</div>;
};

export default SpellSlot;
