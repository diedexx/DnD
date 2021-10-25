import { Test, TestingModule } from "@nestjs/testing";
import Ability from "../../ability/entities/Ability.entity";
import AbilityScore from "../../ability/entities/AbilityScore.entity";
import Character from "../../character/entities/Character.entity";
import CharacterClass from "../../character/entities/CharacterClass.entity";
import RelationLoaderService from "../../../database/RelationLoader.service";
import AbilityPlusLevelLimiter from "./AbilityPlusLevelLimiter.service";
import AbilityPlusLevelLimiterRules from "./AbilityPlusLevelLimiterRules.service";
import Mocked = jest.Mocked;

describe( "The AbilityPlusLevelLimiter service", () => {
	let abilityPlusLevelLimiter: AbilityPlusLevelLimiter;

	const relationLoaderServiceMock: Partial<Mocked<RelationLoaderService>> = {
		loadRelations: jest.fn(),
	};

	const abilityPlusLevelLimiterRulesMock: Partial<Mocked<AbilityPlusLevelLimiterRules>> = {
		getRule: jest.fn(),
	};

	beforeEach( async () => {
		const app: TestingModule = await Test.createTestingModule( {
			providers: [
				AbilityPlusLevelLimiter,
				{ provide: AbilityPlusLevelLimiterRules, useValue: abilityPlusLevelLimiterRulesMock },
				{ provide: RelationLoaderService, useValue: relationLoaderServiceMock },
			],
		} ).compile();

		abilityPlusLevelLimiter = app.get<AbilityPlusLevelLimiter>( AbilityPlusLevelLimiter );
	} );

	describe( "getLimit function", () => {
		it.each( [
			{
				level: 3,
				score: 10,
				rule: { abilityName: "wisdom", levelMultiplier: 1, className: "paladin" },
				expected: 3,
			},
			{
				level: 1,
				score: 5,
				rule: { abilityName: "wisdom", levelMultiplier: 1, className: "Cleric" },
				expected: 1,
			},
			{
				level: 1,
				score: 1,
				rule: { abilityName: "Intelligence", levelMultiplier: 1, className: "Wizard" },
				expected: 1,
			},
			{
				level: 10,
				score: 5,
				rule: { abilityName: "charisma", levelMultiplier: 1, className: "paladin" },
				expected: 7,
			},
			{
				level: 10,
				score: 10,
				rule: { abilityName: "intelligence", levelMultiplier: 1, className: "Wizard" },
				expected: 10,
			},
			{
				level: 10,
				score: 20,
				rule: { abilityName: "charisma", levelMultiplier: 1, className: "paladin" },
				expected: 15,
			},
			{
				level: 10,
				score: 20,
				rule: { abilityName: "something else", levelMultiplier: 0.5, className: "whatever" },
				expected: 10,
			},
		] )( "gives the prepared spell limit based on config %p", async ( { level, rule, score, expected } ) => {
			const character: Character = new Character();
			character.level = level;
			relationLoaderServiceMock.loadRelations.mockImplementationOnce( async ( character1: Character ) => {
				const characterClass = new CharacterClass();
				characterClass.name = rule.className;
				character1.class = characterClass;
				return character1;
			} );
			relationLoaderServiceMock.loadRelations.mockImplementationOnce( async ( character1: Character ) => {
				const abilityScore = new AbilityScore();
				abilityScore.ability = new Ability();
				abilityScore.ability.name = rule.abilityName;
				abilityScore.score = score;
				character1.abilityScores = [ abilityScore ];
				return character1;
			} );

			abilityPlusLevelLimiterRulesMock.getRule.mockReturnValueOnce( rule );

			expect( await abilityPlusLevelLimiter.getPreparationLimit( character ) ).toBe( expected );
		},
		);

		it( "defaults to the lowest abilityScore if the character doesn't have any ability scores", async () => {
			const character: Character = new Character();
			character.level = 10;
			relationLoaderServiceMock.loadRelations.mockImplementationOnce( async ( character1: Character ) => {
				const characterClass = new CharacterClass();
				characterClass.name = "doesn't matter";
				character1.class = characterClass;
				return character1;
			} );
			relationLoaderServiceMock.loadRelations.mockImplementationOnce( async ( character1: Character ) => {
				character1.abilityScores = [];
				return character1;
			} );
			abilityPlusLevelLimiterRulesMock.getRule.mockReturnValueOnce( {
				abilityName: "doesn't have it",
				levelMultiplier: 1,
				className: "doesn't matter",
			} );
			expect( await abilityPlusLevelLimiter.getPreparationLimit( character ) ).toBe( 5 );
		},
		);
	} );
} );
