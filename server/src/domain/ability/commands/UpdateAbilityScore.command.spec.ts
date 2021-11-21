import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CommandProviderService from "../../../infrastructure/command/CommandProvider.service";
import RelationLoaderService from "../../../infrastructure/database/RelationLoader.service";
import Character from "../../character/entities/Character.entity";
import AbilityScoreService from "../AbilityScore.service";
import Ability from "../entities/Ability.entity";
import AbilityScore from "../entities/AbilityScore.entity";
import AbilityScoreValue from "../values/AbilityScore.value";
import UpdateAbilityScoreCommand, { UpdateAbilityScoreData } from "./UpdateAbilityScore.command";
import Mocked = jest.Mocked;

describe( "The UpdateAbilityScoreCommand", () => {
	let updateAbilityScoreCommand: UpdateAbilityScoreCommand;

	const abilityScoreRepositoryMock: Partial<Mocked<Repository<AbilityScore>>> = {
		findOneOrFail: jest.fn(),
	};

	const abilityScoreServiceMock: Partial<Mocked<AbilityScoreService>> = {
		updateAbilityScore: jest.fn(),
	};

	const relationLoaderServiceMock: Partial<Mocked<RelationLoaderService>> = {
		loadRelations: jest.fn(),
	};

	const natureAbilityScore: Partial<AbilityScore> = {
		score: new AbilityScoreValue( 5 ),
	};

	const natureAbility: Partial<Ability> = {
		name: "Nature",
	};

	const commandData: UpdateAbilityScoreData = {
		newValue: 7,
		abilityScoreId: 4,
	};

	beforeEach( async () => {
		const app: TestingModule = await Test.createTestingModule( {
			providers: [
				UpdateAbilityScoreCommand,
				{ provide: getRepositoryToken( AbilityScore ), useValue: abilityScoreRepositoryMock },
				{ provide: AbilityScoreService, useValue: abilityScoreServiceMock },
				{ provide: RelationLoaderService, useValue: relationLoaderServiceMock },
				{ provide: CommandProviderService, useValue: null },
			],
		} ).compile();

		updateAbilityScoreCommand = app.get<UpdateAbilityScoreCommand>( UpdateAbilityScoreCommand );
	} );

	describe( "getName function", () => {
		it( "describes the event", async () => {
			const actual = await updateAbilityScoreCommand.getName();
			expect( actual ).toMatchInlineSnapshot( "\"Update ability score\"" );
		} );
	} );

	describe( "getDescription function", () => {
		it( "describes the event in more detail", async () => {
			abilityScoreRepositoryMock.findOneOrFail.mockResolvedValueOnce( natureAbilityScore as AbilityScore );
			relationLoaderServiceMock.loadRelations.mockResolvedValueOnce( {
				...natureAbilityScore,
				ability: natureAbility,
			} );

			const actual = await updateAbilityScoreCommand.getDescription( commandData );
			expect( actual ).toMatchInlineSnapshot( "\"Change Nature to 7.\"" );
		} );
	} );

	describe( "getType function", () => {
		it( "describes the type of event", async () => {
			const actual = updateAbilityScoreCommand.getType();
			expect( actual ).toMatchInlineSnapshot( "\"UPDATE_ABILITY_SCORE\"" );
		} );
	} );

	describe( "execute function", () => {
		it( "should update the ability score", async () => {
			expect.assertions( 2 );

			abilityScoreRepositoryMock.findOneOrFail.mockResolvedValueOnce( natureAbilityScore as AbilityScore );

			await updateAbilityScoreCommand.execute( commandData, new Character() );

			expect( abilityScoreServiceMock.updateAbilityScore ).toHaveBeenCalledTimes( 1 );
			expect( abilityScoreServiceMock.updateAbilityScore ).toHaveBeenCalledWith( 4, 7 );
		} );

		it( "should return a commandReference that can undo the action", async () => {
			expect.assertions( 1 );

			abilityScoreRepositoryMock.findOneOrFail.mockResolvedValueOnce( natureAbilityScore as AbilityScore );

			const actual = await updateAbilityScoreCommand.execute( commandData, new Character() );

			expect( actual ).toEqual( {
				type: "UPDATE_ABILITY_SCORE",
				data: {
					abilityScoreId: 4,
					newValue: 5,
				},
			} );
		} );
	} );
} );
