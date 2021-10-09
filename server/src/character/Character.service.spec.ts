import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import AbilityScoreService from "../ability/AbilityScore.service";
import AbilityScore from "../ability/entities/AbilityScore.entity";
import Character from "./entities/Character.entity";
import CharacterService from "./Character.service";
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

	beforeEach( async () => {
		const app: TestingModule = await Test.createTestingModule( {
			providers: [
				CharacterService,
				{ provide: AbilityScoreService, useValue: abilityScoreServiceMock },
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
			score1.score = 1;
			score2.score = 2;
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
      "score": 1,
    },
    AbilityScore {
      "score": 2,
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
} );
