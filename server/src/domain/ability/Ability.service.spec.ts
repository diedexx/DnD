import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import AbilityService from "./Ability.service";
import Ability from "./entities/Ability.entity";
import Mocked = jest.Mocked;

describe( "The AbilityService", () => {
	let abilityService: AbilityService;

	const abilityRepositoryMock: Partial<Mocked<Repository<Ability>>> = {
		findOneOrFail: jest.fn(),
	};

	beforeEach( async () => {
		const app: TestingModule = await Test.createTestingModule( {
			providers: [
				AbilityService,
				{ provide: getRepositoryToken( Ability ), useValue: abilityRepositoryMock },
			],
		} ).compile();

		abilityService = app.get<AbilityService>( AbilityService );
	} );
	describe( "findAbilityByName", () => {
		it( "should perform a Ability query for the given name", async () => {
			abilityService.findAbilityByName( "The ability name" );
			expect( abilityRepositoryMock.findOneOrFail ).toBeCalledWith( { where: { name: "The ability name" } } );
		} );
	} );
} );
