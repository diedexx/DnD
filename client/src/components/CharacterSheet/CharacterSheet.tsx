import "@fortawesome/fontawesome-svg-core/styles.css";
import { faListAlt } from "@fortawesome/free-solid-svg-icons/faListAlt";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons/faRedoAlt";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons/faSyncAlt";
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons/faUndoAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent, useCallback, useState } from "react";
import useResolvingSelect, { useRefreshResolver } from "../../functions/useResolvingSelect";
import CharacterDetailsInterface from "../../interfaces/CharacterDetails.interface";
import ActionHistory from "../ActionHistory/ActionHistory";
import BigValueDisplay from "../BigValueDisplay/BigValueDisplay";
import HeadingCard from "../Card/HeadingCard";
import ControlGroup from "../Controls/ControlGroup";
import Controls from "../Controls/Controls";
import Spinner from "../Spinner/Spinner";
import TextValueDisplay from "../TextValueDisplay/TextValueDisplay";
import AbilityScores from "./AbilityScores/AbilityScores";
import "./CharacterSheet.css";
import CharacterSummary from "./CharacterSummary/CharacterSummary";
import DeathSave from "./DeathSave/DeathSave";
import Equipment from "./Equipment/Equipment";
import Health from "./Health/Health";
import ModifierBreakdownTooltip from "./ModifierBreakdown/ModifierBreakdownTooltip";
import SavingThrows from "./SavingThrows/SavingThrows";
import SkillScores from "./SkillScores/SkillScores";
import Spells from "./Spell/Spell";

import SpellSlots from "./SpellSlots/SpellSlots";
import Wallet from "./Wallet/Wallet";
import Weapons from "./Weapons/Weapons";

export type CharacterDetailPageProps = {
	characterId: number;
}

/**
 * The character detail page component.
 *
 * @param {number} characterId The id of the character.
 *
 * @return {JSX.Element} The character detail page component.
 */
const CharacterSheet: FunctionComponent<CharacterDetailPageProps> = ( { characterId }: CharacterDetailPageProps ): JSX.Element => {
	const {
		data: characterDetails,
		isLoading,
		startedLoading,
	} = useResolvingSelect<CharacterDetailsInterface>( "getCharacterDetails", characterId );

	const refresh = useRefreshResolver( "getCharacterDetails", characterId );

	const [ showHistory, setShowHistory ] = useState( false );

	const toggleHistory = useCallback(
		() => setShowHistory( ! showHistory ),
		[ showHistory, setShowHistory ],
	);

	return <div>
		<Controls>
			<ControlGroup>
				<button disabled={ isLoading } onClick={ refresh }>
					<FontAwesomeIcon icon={ faUndoAlt } size={ "lg" } />
				</button>
				<button disabled={ isLoading } onClick={ refresh }>
					<FontAwesomeIcon icon={ faRedoAlt } size={ "lg" } />
				</button>
				<button onClick={ toggleHistory }>
					<FontAwesomeIcon icon={ faListAlt } size={ "lg" } />
				</button>
			</ControlGroup>
			<button disabled={ isLoading } onClick={ refresh }>
				<FontAwesomeIcon icon={ faSyncAlt } spin={ isLoading } size={ "lg" } />
			</button>
		</Controls>

		{ ( isLoading || ! startedLoading ) && <Spinner type="fullscreen" /> }
		<div className="columns">
			{ showHistory && <ActionHistory characterId={ characterId } /> }
			<div className="character-sheet">
				<CharacterSummary characterDetails={ characterDetails } />
				<div className="columns">

					<div className="column">

						<div className="columns">
							<HeadingCard heading="Ability scores">
								<AbilityScores abilityScores={ characterDetails.abilityScores } />
							</HeadingCard>
							<div>
								<HeadingCard heading="Saving throws">
									<SavingThrows savingThrows={ characterDetails.savingThrows } />
								</HeadingCard>
								<HeadingCard heading="Skill scores">
									<SkillScores skillScores={ characterDetails.skillScores } />
								</HeadingCard>
							</div>
						</div>

						<HeadingCard heading="Wallet">
							<Wallet wallet={ characterDetails.wallet } />
						</HeadingCard>

						<HeadingCard heading="Proficiencies">
							<TextValueDisplay
								text={ characterDetails.proficiencies.map( x => x.affectedCategoryName ).join( ", " ) }
							/>
						</HeadingCard>

					</div>

					<div className="column">

						<div className="columns--fill">
							<HeadingCard heading="Proficiency bonus" className="card--full-width">
								<BigValueDisplay>{ characterDetails.proficiencyBonus.displayValue }</BigValueDisplay>
							</HeadingCard>
							<HeadingCard heading="Armor class" className="card--full-width">
								<BigValueDisplay>
									<ModifierBreakdownTooltip modifier={ characterDetails.armorClassModifier }>
										{ characterDetails.armorClassModifier.value }
									</ModifierBreakdownTooltip>
								</BigValueDisplay>
							</HeadingCard>
							<HeadingCard heading="Initiative" className="card--full-width">
								<BigValueDisplay>
									<ModifierBreakdownTooltip modifier={ characterDetails.initiativeModifier }>
										{ characterDetails.initiativeModifier.displayValue }
									</ModifierBreakdownTooltip>
								</BigValueDisplay>
							</HeadingCard>

							<HeadingCard heading="Speed" className="card--full-width">
								<BigValueDisplay>
									<ModifierBreakdownTooltip modifier={ characterDetails.speedModifier }>
										{ characterDetails.speedModifier.value } ft.
									</ModifierBreakdownTooltip>
								</BigValueDisplay>
							</HeadingCard>
						</div>


						<div className="columns--fill">
							<HeadingCard heading="Hit dice" className="card--full-width">
								<BigValueDisplay value={ characterDetails.hitDice.displayValue } />
							</HeadingCard>
							<HeadingCard heading="Current HP" className="card--full-width">
								<Health health={ characterDetails.health } />
							</HeadingCard>
							<HeadingCard heading="Death saves" className="card--full-width">
								<DeathSave deathSave={ characterDetails.deathSave } />
							</HeadingCard>
						</div>

						<HeadingCard heading="Weapons">
							<Weapons weapons={ characterDetails.weapons } />
						</HeadingCard>

						<HeadingCard heading={ "Spell slots" } className="card">
							<SpellSlots spellSlotPool={ characterDetails.spellSlotPool } />
						</HeadingCard>

						<HeadingCard heading="Spells">
							<Spells spells={ characterDetails.spells } />
						</HeadingCard>

						<HeadingCard heading="Equipment">
							<Equipment equipment={ characterDetails.equipment } />
						</HeadingCard>

					</div>

					<div className="column--shrink">

						<HeadingCard heading="Personality traits">
							<TextValueDisplay text={ characterDetails.personalityTraits } />
						</HeadingCard>
						<HeadingCard heading="Ideals">
							<TextValueDisplay text={ characterDetails.ideals } />
						</HeadingCard>
						<HeadingCard heading="Bonds">
							<TextValueDisplay text={ characterDetails.bonds } />
						</HeadingCard>
						<HeadingCard heading="Flaws">
							<TextValueDisplay text={ characterDetails.flaws } />
						</HeadingCard>

					</div>
				</div>
			</div>
		</div>
	</div>;
};

export default CharacterSheet;
