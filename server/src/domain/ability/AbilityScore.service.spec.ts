import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Character from "../character/entities/Character.entity";
import AbilityScoreService from "./AbilityScore.service";
import Ability from "./entities/Ability.entity";
import AbilityScore from "./entities/AbilityScore.entity";
import AbilityScoreValue from "./values/AbilityScore.value";
import Mocked = jest.Mocked;

describe( "The AbilityScoreService", () => {
	let abilityScoreService: AbilityScoreService;

	const abilityRepositoryMock: Partial<Mocked<Repository<Ability>>> = {
		findOne: jest.fn(),
	};
	const abilityScoreRepositoryMock: Partial<Mocked<Repository<AbilityScore>>> = {
		findOne: jest.fn(),
		findOneOrFail: jest.fn(),
		save: jest.fn(),
	};

	const character1 = new Character();

	const ability1 = new Ability();
	ability1.id = 32;
	ability1.name = "Strength";

	const abilityScore1 = new AbilityScore();
	abilityScore1.score = new AbilityScoreValue( 14 );

	beforeEach( async () => {
		const app: TestingModule = await Test.createTestingModule( {
			providers: [
				AbilityScoreService,
				{ provide: getRepositoryToken( Ability ), useValue: abilityRepositoryMock },
				{ provide: getRepositoryToken( AbilityScore ), useValue: abilityScoreRepositoryMock },
			],
		} ).compile();

		abilityScoreService = app.get<AbilityScoreService>( AbilityScoreService );
	} );

	describe( "createAbilityScore function", () => {
		it( "creates an AbilityScore object", async () => {
			abilityRepositoryMock.findOne.mockResolvedValueOnce( ability1 );

			const actual = await abilityScoreService.createAbilityScore( {
				character: character1,
				abilityId: 32,
				score: 10,
			} );

			expect( abilityRepositoryMock.findOne ).toHaveBeenCalledTimes( 1 );
			expect( abilityRepositoryMock.findOne ).toBeCalledWith( 32 );

			expect( actual ).toMatchInlineSnapshot( `
AbilityScore {
  "ability": Ability {
    "id": 32,
    "name": "Strength",
  },
  "character": Character {},
  "score": AbilityScoreValue {
    "value": 10,
  },
}
` );
		} );
	} );

	describe( "the getAbilityScoreModifier function", () => {
		it( "should return the modifier of the requested abilityScore", async () => {
			expect.assertions( 2 );
			abilityScoreRepositoryMock.findOneOrFail.mockResolvedValueOnce( abilityScore1 );
			const actual = await abilityScoreService.getAbilityScoreModifier( 32, 2 );

			expect( actual ).toStrictEqual( abilityScore1.modifier );
			expect( abilityScoreRepositoryMock.findOneOrFail ).toBeCalledWith( {
				where: {
					abilityId: 32,
					characterId: 2,
				},
			} );
		} );
	} );

	describe( "the updateAbilityScore function", () => {
		it( "should change overwrite the abilityScoreValue of an existing abilityScore", async () => {
			expect.assertions( 1 );
			abilityScoreRepositoryMock.findOneOrFail.mockResolvedValueOnce( abilityScore1 );

			await abilityScoreService.updateAbilityScore( 1, 20 );

			expect( abilityScoreRepositoryMock.save ).toBeCalledWith( {
				...abilityScore1,
				score: new AbilityScoreValue( 20 ),
			} );
		} );
	} );
} );
