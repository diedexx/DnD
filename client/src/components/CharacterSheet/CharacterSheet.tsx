import { FunctionComponent } from "react";
import useResolvingSelect, { useRefreshResolver } from "../../functions/useResolvingSelect";
import CharacterDetailsInterface from "../../interfaces/CharacterDetails.interface";
import Spinner from "../Spinner/Spinner";
import AbilityScores from "./AbilityScores/AbilityScores";
import "./CharacterSheet.css";
import CharacterSummary from "./CharacterSummary/CharacterSummary";
import Health from "./Health/Health";
import SkillScores from "./SkillScores/SkillScores";
import TextCard from "./TextCard/TextCard";
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
						<AbilityScores abilityScores={ characterDetails.abilityScores } />
						<SkillScores skillScores={ characterDetails.skillScores } />
					</div>
					<Wallet wallet={ characterDetails.wallet } />
				</div>
				<div className="column">
					<Health health={ characterDetails.health } />
					<Weapons weapons={ characterDetails.weapons } />
				</div>
				<div className="column">
					<TextCard label="Personality traits" text={ characterDetails.personalityTraits } />
					<TextCard label="ideals" text={ characterDetails.ideals } />
					<TextCard label="bonds" text={ characterDetails.bonds } />
					<TextCard label="flaws" text={ characterDetails.flaws } />
				</div>
			</div>
		</div>
	</div>;
};

export default CharacterSheet;
