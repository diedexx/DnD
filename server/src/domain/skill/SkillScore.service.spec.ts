import { Test, TestingModule } from "@nestjs/testing";
import AbilityScoreService from "../ability/AbilityScore.service";
import RelationLoaderService from "../../infrastructure/database/RelationLoader.service";
import { ModifierOrchestratorService } from "../modifier/ModifierOrchestrator.service";
import Modifier from "../modifier/values/Modifier.value";
import SkillScore from "./entities/SkillScore.entity";
import SkillScoreService from "./SkillScore.service";
import Mocked = jest.Mocked;

describe( "The SkillScoreService", () => {
	let instance: SkillScoreService;
	const relationLoaderServiceMock: Partial<Mocked<RelationLoaderService>> = { loadRelations: jest.fn() };
	const modifierOrchestratorServiceMock: Partial<Mocked<ModifierOrchestratorService>> = { applySkillScoreModifiers: jest.fn() };
	const abilityScoreServiceMock: Partial<Mocked<AbilityScoreService>> = { getAbilityScoreModifier: jest.fn() };

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [
				SkillScoreService,
				{ provide: RelationLoaderService, useValue: relationLoaderServiceMock },
				{ provide: ModifierOrchestratorService, useValue: modifierOrchestratorServiceMock },
				{ provide: AbilityScoreService, useValue: abilityScoreServiceMock },
			],
		} ).compile();

		instance = module.get<SkillScoreService>( SkillScoreService );
	} );

	describe( "getSkillScoreModifier function", () => {
		it( "Uses 0 as the skill's modifier base", async () => {
			const skillScore: SkillScore = new SkillScore();

			modifierOrchestratorServiceMock.applySkillScoreModifiers.mockImplementationOnce( async ( x ) => x );

			const actualModifier: Modifier = await instance.getSkillScoreModifier( skillScore );
			expect( actualModifier.value ).toBe( 0 );
		} );
	} );
} );
