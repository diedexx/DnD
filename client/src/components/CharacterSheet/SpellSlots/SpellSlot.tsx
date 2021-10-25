import { FunctionComponent } from "react";
import SpellSlotInterface from "src/interfaces/SpellSlot.interface";
import Bar from "../../Bar/Bar";
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
	return <div className="spell-slot-level">
		Level { spellSlot.level.value }
		<div className="spell-slot-level--remaining">
			<Bar progress={ spellSlot.remaining } limit={ spellSlot.limit } />
		</div>
	</div>;
};

export default SpellSlot;
