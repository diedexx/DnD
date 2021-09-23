import Ability from "../../ability/entities/Ability.entity";
import AbilityScore from "../../ability/entities/AbilityScore.entity";
import Skill from "../../ability/entities/Skill.entity";
import AbilityScoreModifier from "../../ability/models/AbilityScoreModifier.valueobject";
import SkillScore from "../../ability/models/SkillScore.valueobject";
import Character from "./Character.entity";

describe( "The Character entity", () => {
	describe( "getSkillScore function", () => {
		const character: Character = new Character();
		character.name = "Steve";

		const strengthAbility: Ability = new Ability();
		strengthAbility.id = 1;
		strengthAbility.name = "Strength";

		const wisdomAbility: Ability = new Ability();
		wisdomAbility.id = 2;
		wisdomAbility.name = "Wisdom";

		const insightSkill: Skill = new Skill();
		insightSkill.name = "insight";
		insightSkill.ability = wisdomAbility;

		const strengthScore: AbilityScore = new AbilityScore();
		strengthScore.ability = strengthAbility;
		strengthScore.modifier = new AbilityScoreModifier( 3 );
		strengthScore.baseScore = 10;

		const wisdomScore: AbilityScore = new AbilityScore();
		wisdomScore.ability = wisdomAbility;
		wisdomScore.modifier = new AbilityScoreModifier( 1 );
		wisdomScore.baseScore = 9;

		it( "finds the abilityScore for the right skill and constructs the skillScore", () => {
			character.abilityScores = [ wisdomScore, strengthScore ];

			expect( character.getSkillScore( insightSkill ) ).toStrictEqual( new SkillScore( insightSkill, wisdomScore ) );
		} );

		it( "throws if the character doesn't have an ability score for the requested skill", () => {
			character.abilityScores = [ strengthScore ];

			expect( () => character.getSkillScore( insightSkill ) ).toThrow( "No Wisdom ability score found for Steve" );
		} );

		it( "throws if the character doesn't have any ability scores", () => {
			character.abilityScores = [];

			expect( () => character.getSkillScore( insightSkill ) ).toThrow( "No Wisdom ability score found for Steve" );
		} );
	} );
} );
