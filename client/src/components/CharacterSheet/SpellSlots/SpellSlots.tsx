import { FunctionComponent } from "react";
import SpellSlotPool from "../../../interfaces/SpellSlotPool.interface";
import SpellSlot from "./SpellSlot";
import "./SpellSlots.css";

export type SpellSlotsProps = {
	spellSlotPool: SpellSlotPool;
}

/**
 * Displays available spellslots.
 *
 * @param {SpellSlotPool} spellSlotPool The spellslot pool to display.
 *
 * @return {JSX.Element} The component.
 */
const SpellSlots: FunctionComponent<SpellSlotsProps> = ( { spellSlotPool }: SpellSlotsProps ): JSX.Element => {
	const spellSlots = spellSlotPool.spellSlots
		.sort( ( s1, s2 ) => s1.level.value - s2.level.value )
		.filter( s => s.limit > 0 );

	if ( spellSlots.length === 0 ) {
		return <div className={ "spell-slots" }>No spell slots.</div>;
	}

	return <div className={ "spell-slots" }>
		{ spellSlots.map( ( spellSlot ) => <SpellSlot key={ spellSlot.level.value } spellSlot={ spellSlot } /> ) }
	</div>;
};

export default SpellSlots;
