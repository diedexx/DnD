import { Test, TestingModule } from "@nestjs/testing";
import AbilityScoreService from "../ability/AbilityScore.service";
import Modifier from "../modifier/models/Modifier.valueobject";
import { ModifierOrchestratorService } from "../modifier/ModifierOrchestrator.service";
import SavingThrow from "./entities/SavingThrow.entity";
import SavingThrowService from "./SavingThrow.service";
import Mocked = jest.Mocked;

describe( "The SavingThrowService", () => {
	let instance: SavingThrowService;
	const modifierOrchestratorServiceMock: Partial<Mocked<ModifierOrchestratorService>> = { applySavingThrowModifiers: jest.fn() };
	const abilityScoreServiceMock: Partial<Mocked<AbilityScoreService>> = { getAbilityScoreModifier: jest.fn() };

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [
				SavingThrowService,
				{ provide: ModifierOrchestratorService, useValue: modifierOrchestratorServiceMock },
				{ provide: AbilityScoreService, useValue: abilityScoreServiceMock },
			],
		} ).compile();

		instance = module.get<SavingThrowService>( SavingThrowService );
	} );

	describe( "getSavingThrowModifier function", () => {
		it( "Uses the ability modifier as a base", async () => {
			const savingThrow = new SavingThrow();
			Object.assign( savingThrow, { abilityId: 12 } );

			abilityScoreServiceMock.getAbilityScoreModifier.mockResolvedValueOnce( new Modifier( 4 ) );
			modifierOrchestratorServiceMock.applySavingThrowModifiers.mockImplementationOnce( async ( x ) => x );

			const actualModifier: Modifier = await instance.getSavingThrowModifier( savingThrow );
			expect( actualModifier.value ).toBe( 4 );
		} );
	} );
} );
