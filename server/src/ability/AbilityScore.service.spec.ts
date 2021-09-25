import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Character from "../character/entities/Character.entity";
import AbilityScoreService from "./AbilityScore.service";
import Ability from "./entities/Ability.entity";
import Mocked = jest.Mocked;

describe( "The AbilityScoreService", () => {
	let abilityScoreService: AbilityScoreService;

	const abilityRepositoryMock: Partial<Mocked<Repository<Ability>>> = {
		findOne: jest.fn(),
	};

	beforeEach( async () => {
		const app: TestingModule = await Test.createTestingModule( {
			providers: [
				AbilityScoreService,
				{
					provide: getRepositoryToken( Ability ),
					useValue: abilityRepositoryMock,
				},
			],
		} ).compile();

		abilityScoreService = app.get<AbilityScoreService>( AbilityScoreService );
	} );

	describe( "createAbilityScore function", () => {
		it( "creates an AbilityScore object", async () => {
			const ability = new Ability();
			ability.id = 32;
			ability.name = "Strength";
			abilityRepositoryMock.findOne.mockResolvedValueOnce( ability );

			const actual = await abilityScoreService.createAbilityScore( {
				character: new Character(),
				abilityId: 32,
				baseScore: 10,
				modifier: 3,
			} );

			expect( abilityRepositoryMock.findOne ).toHaveBeenCalledTimes( 1 );
			expect( abilityRepositoryMock.findOne ).toBeCalledWith( 32 );

			expect( actual ).toMatchInlineSnapshot( `
        AbilityScore {
          "ability": Ability {
            "id": 32,
            "name": "Strength",
          },
          "baseScore": 10,
          "character": Character {},
          "modifier": AbilityScoreModifier {
            "modifier": 3,
          },
        }
      ` );
		} );
	} );
} );
