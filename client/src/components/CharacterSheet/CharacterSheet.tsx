import "@fortawesome/fontawesome-svg-core/styles.css";
import { createContext, FunctionComponent, useCallback, useState } from "react";
import useResolvingSelect from "../../functions/useResolvingSelect";
import CharacterDetailsInterface from "../../interfaces/CharacterDetails.interface";
import BigValueDisplay from "../Common/BigValueDisplay/BigValueDisplay";
import HeadingCard from "../Common/Card/HeadingCard";
import Spinner from "../Common/Spinner/Spinner";
import TextValueDisplay from "../Common/TextValueDisplay/TextValueDisplay";
import AbilityScores from "./AbilityScores/AbilityScores";
import ActionHistory from "./ActionHistory/ActionHistory";
import "./CharacterSheet.css";
import CharacterSheetControls from "./CharacterSheetControls/CharacterSheetControls";
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

export const CharacterSheetContext = createContext( null );

/**
 * The character detail page component.
 *
 * @param {number} characterId The id of the character.
 *
 * @return {JSX.Element} The character detail page component.
 */
const CharacterSheet: FunctionComponent<CharacterDetailPageProps> = ( { characterId }: CharacterDetailPageProps ): JSX.Element => {
	const [ showHistory, setShowHistory ] = useState( false );

	const toggleHistory = useCallback( () => setShowHistory( ! showHistory ), [ showHistory, setShowHistory ] );

	const {
		data: characterDetails,
		isLoading,
		startedLoading,
	} = useResolvingSelect<CharacterDetailsInterface>( "getCharacterDetails", characterId );

	const context = { characterId };

	return <CharacterSheetContext.Provider value={ context }>
		<CharacterSheetControls characterId={ characterId } toggleHistory={ toggleHistory } />
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
	</CharacterSheetContext.Provider>;
};

export default CharacterSheet;
