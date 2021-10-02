import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Ability from "../ability/entities/Ability.entity";
import AbilityScore from "../ability/entities/AbilityScore.entity";
import RelationLoaderService from "../database/RelationLoader.service";
import Modifier from "../modifier/models/Modifier.valueobject";
import { ModifierOrchestratorService } from "../modifier/ModifierOrchestrator.service";
import Skill from "./entities/Skill.entity";
import SkillScore from "./entities/SkillScore.entity";
import SkillScoreService from "./SkillScore.service";
import Mocked = jest.Mocked;

describe( "The SkillScoreService", () => {
	let instance: SkillScoreService;
	const abilityScoreRepositoryMock: Partial<Mocked<Repository<AbilityScore>>> = { findOne: jest.fn() };
	const relationLoaderServiceMock: Partial<Mocked<RelationLoaderService>> = { loadRelations: jest.fn() };
	const modifierOrchestratorServiceMock: Partial<Mocked<ModifierOrchestratorService>> = { applySkillScoreModifiers: jest.fn() };

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [
				SkillScoreService,
				{ provide: getRepositoryToken( AbilityScore ), useValue: abilityScoreRepositoryMock },
				{ provide: RelationLoaderService, useValue: relationLoaderServiceMock },
				{ provide: ModifierOrchestratorService, useValue: modifierOrchestratorServiceMock },
			],
		} ).compile();

		instance = module.get<SkillScoreService>( SkillScoreService );
	} );

	describe( "getSkillScoreModifier function", () => {
		it( "Uses the skill's ability modifier as a base", async () => {
			const skillScore: SkillScore = new SkillScore();

			relationLoaderServiceMock.loadRelations.mockImplementationOnce( async ( targetSkillScore: SkillScore ) => {
				targetSkillScore.skill = new Skill();
				targetSkillScore.skill.ability = new Ability();
				targetSkillScore.skill.ability.id = 3;

				return targetSkillScore;
			} );

			const abilityScore: AbilityScore = new AbilityScore();
			abilityScore.score = 14;
			abilityScoreRepositoryMock.findOne.mockResolvedValueOnce( abilityScore );

			modifierOrchestratorServiceMock.applySkillScoreModifiers.mockImplementationOnce( async ( x ) => x );

			const actualModifier: Modifier = await instance.getSkillScoreModifier( skillScore );
			expect( actualModifier.value ).toBe( 2 );
		} );
	} );
} );
