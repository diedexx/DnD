import { FunctionComponent } from "react";
import useResolvingSelect, { useRefreshResolver } from "../../functions/useResolvingSelect";
import CharacterDetailsInterface from "../../interfaces/CharacterDetails.interface";
import BigValueDisplay from "../BigValueDisplay/BigValueDisplay";
import HeadingCard from "../Card/HeadingCard";
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

	return <div>
		<div className="controls">
			<button className="btn-refresh" disabled={ isLoading } onClick={ refresh }>
				<i className="fa fa-refresh" />
			</button>
		</div>
		{ ( isLoading || ! startedLoading ) && <Spinner type="fullscreen" /> }
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

					<HeadingCard heading="Current HP">
						<Health health={ characterDetails.health } />
					</HeadingCard>

					<div className="columns--fill">
						<HeadingCard heading="Hit dice" className="card--full-width">
							<BigValueDisplay value={ characterDetails.hitDice.displayValue } />
						</HeadingCard>
						<HeadingCard heading="Death saves" className="card--full-width">
							<DeathSave deathSave={ characterDetails.deathSave } />
						</HeadingCard>
					</div>

					<HeadingCard heading="Weapons">
						<Weapons weapons={ characterDetails.weapons } />
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
	</div>;
};

export default CharacterSheet;
