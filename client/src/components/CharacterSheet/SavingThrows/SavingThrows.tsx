import { FunctionComponent } from "react";
import SavingThrowInterface from "../../../interfaces/SavingThrow.interface";
import SavingThrow from "./SavingThrow";

export type SavingThrowsProps = {
	savingThrows: SavingThrowInterface[];
}

/**
 * Lists all saving throws and their scores.
 *
 * @param {SavingThrowInterface[]} savingThrows The saving throw to list.
 *
 * @return {JSX.Element} The list of saving throws and their scores.
 */
const SavingThrows: FunctionComponent<SavingThrowsProps> = ( { savingThrows } ): JSX.Element => {
	return <div className="saving-throws">
		{ savingThrows.map( renderSavingThrow ) }
	</div>;
};

/**
 * Gets an SavingThrow component for an savingThrow object.
 *
 * @param {SavingThrow} savingThrow The SavingThrow object.
 *
 * @return {JSX.Element} The SavingThrow component.
 */
function renderSavingThrow( savingThrow: SavingThrowInterface ) {
	return <SavingThrow key={ savingThrow.ability.name } savingThrow={ savingThrow } />;
}

export default SavingThrows;
