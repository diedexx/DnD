import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import AbilityScoreService from "../ability/AbilityScore.service";
import AbilityScore from "../ability/entities/AbilityScore.entity";
import AbilityScoreValue from "../ability/values/AbilityScore.value";
import { ModifierOrchestratorService } from "../modifier/ModifierOrchestrator.service";
import ModificationType from "../modifier/types/ModificationType.type";
import ExternalModifier from "../modifier/values/ExternalModifier.value";
import Modifier from "../modifier/values/Modifier.value";
import CharacterService from "./Character.service";
import Character from "./entities/Character.entity";
import CharacterClass from "./entities/CharacterClass.entity";
import Mocked = jest.Mocked;

describe( "The CharacterService", () => {
	let characterService: CharacterService;

	const abilityScoreServiceMock: Partial<Mocked<AbilityScoreService>> = {
		createAbilityScore: jest.fn(),
	};

	const characterRepositoryMock: Partial<Mocked<Repository<Character>>> = {};
	const characterClassRepositoryMock: Partial<Mocked<Repository<CharacterClass>>> = {
		findOne: jest.fn(),
	};

	const modifierOrchestratorServiceMock: Partial<Mocked<ModifierOrchestratorService>> = {
		applyEquipmentModifiers: jest.fn(),
	};

	beforeEach( async () => {
		const app: TestingModule = await Test.createTestingModule( {
			providers: [
				CharacterService,
				{ provide: AbilityScoreService, useValue: abilityScoreServiceMock },
				{ provide: ModifierOrchestratorService, useValue: modifierOrchestratorServiceMock },
				{ provide: getRepositoryToken( Character ), useValue: characterRepositoryMock },
				{ provide: getRepositoryToken( CharacterClass ), useValue: characterClassRepositoryMock },
			],
		} ).compile();

		characterService = app.get<CharacterService>( CharacterService );
	} );

	describe( "createCharacter function", () => {
		it( "creates a character object", async () => {
			const score1 = new AbilityScore();
			const score2 = new AbilityScore();
			score1.score = new AbilityScoreValue( 1 );
			score2.score = new AbilityScoreValue( 2 );
			abilityScoreServiceMock.createAbilityScore
				.mockResolvedValueOnce( score1 )
				.mockResolvedValueOnce( score2 );

			const actual = await characterService.createCharacter( {
				ideals: "Ideals",
				alignment: "Alignment",
				bonds: "Bonds",
				background: "Background",
				classId: 6,
				flaws: "Flaws",
				race: "Race",
				name: "Name",
				maxHealth: 23,
				personalityTraits: "personalityTraits",
				abilityScores: [
					{
						abilityId: 1,
						score: 10,
						modifier: 2,
					},
					{
						abilityId: 2,
						score: 11,
						modifier: 1,
					},
				],
			} );

			expect( abilityScoreServiceMock.createAbilityScore ).toBeCalledTimes( 2 );
			expect( abilityScoreServiceMock.createAbilityScore ).toBeCalledWith( {
				abilityId: 1,
				score: 10,
				modifier: 2,
				character: expect.anything(),
			} );
			expect( abilityScoreServiceMock.createAbilityScore ).toBeCalledWith( {
				abilityId: 2,
				score: 11,
				modifier: 1,
				character: expect.anything(),
			} );

			expect( actual ).toMatchInlineSnapshot( `
Character {
  "abilityScores": Array [
    AbilityScore {
      "score": AbilityScoreValue {
        "value": 1,
      },
    },
    AbilityScore {
      "score": AbilityScoreValue {
        "value": 2,
      },
    },
  ],
  "alignment": "Alignment",
  "background": "Background",
  "bonds": "Bonds",
  "class": undefined,
  "flaws": "Flaws",
  "health": Health {
    "currentHealth": 23,
    "maxHealth": 23,
  },
  "ideals": "Ideals",
  "name": "Name",
  "personalityTraits": "personalityTraits",
  "race": "Race",
}
` );
		} );
	} );

	describe( "the getArmorClassModifier function", () => {
		it( "should apply equipment modifiers to the character's base AC", async () => {
			expect.assertions( 2 );

			const character = new Character();
			character.baseArmorClass = 18;
			const expectedResult: Modifier = new Modifier(
				18,
				[
					new ExternalModifier(
						"shield",
						ModificationType.ARMOR_CLASS,
						new Modifier( 1 ),
						false,
					),
				],
			);

			modifierOrchestratorServiceMock.applyEquipmentModifiers.mockResolvedValueOnce( expectedResult );

			const actual = await characterService.getArmorClassModifier( character );

			expect( modifierOrchestratorServiceMock.applyEquipmentModifiers ).toBeCalledWith(
				new Modifier( 18 ),
				character,
				ModificationType.ARMOR_CLASS,
			);
			expect( actual ).toBe( expectedResult );
		} );
	} );

	describe( "the getInitiativeModifier function", () => {
		it( "should apply initiative modifiers to the character's base initiative", async () => {
			expect.assertions( 2 );

			const character = new Character();
			character.baseInitiative = 2;
			const expectedResult: Modifier = new Modifier(
				2,
				[
					new ExternalModifier(
						"super stopwatch",
						ModificationType.INITIATIVE,
						new Modifier( 1 ),
						false,
					),
				],
			);

			modifierOrchestratorServiceMock.applyEquipmentModifiers.mockResolvedValueOnce( expectedResult );

			const actual = await characterService.getInitiativeModifier( character );

			expect( modifierOrchestratorServiceMock.applyEquipmentModifiers ).toBeCalledWith(
				new Modifier( 2 ),
				character,
				ModificationType.INITIATIVE,
			);
			expect( actual ).toBe( expectedResult );
		} );
	} );

	describe( "the getSpeedModifier function", () => {
		it( "should apply speed modifiers to the character's base speed", async () => {
			expect.assertions( 2 );

			const character = new Character();
			character.baseSpeed = 25;
			const expectedResult: Modifier = new Modifier(
				25,
				[
					new ExternalModifier(
						"fancy loafers",
						ModificationType.SPEED,
						new Modifier( 5 ),
						false,
					),
				],
			);

			modifierOrchestratorServiceMock.applyEquipmentModifiers.mockResolvedValueOnce( expectedResult );

			const actual = await characterService.getSpeedModifier( character );

			expect( modifierOrchestratorServiceMock.applyEquipmentModifiers ).toBeCalledWith(
				new Modifier( 25 ),
				character,
				ModificationType.SPEED,
			);
			expect( actual ).toBe( expectedResult );
		} );
	} );
} );
