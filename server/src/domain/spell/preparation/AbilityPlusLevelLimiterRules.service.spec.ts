import { Test, TestingModule } from "@nestjs/testing";
import AbilityPlusLevelLimiterRules from "./AbilityPlusLevelLimiterRules.service";

describe( "The AbilityPlusLevelLimiterRulesRules service", () => {
	let abilityPlusLevelLimiterRules: AbilityPlusLevelLimiterRules;

	beforeEach( async () => {
		const app: TestingModule = await Test.createTestingModule( {
			providers: [
				AbilityPlusLevelLimiterRules,
			],
		} ).compile();

		abilityPlusLevelLimiterRules = app.get<AbilityPlusLevelLimiterRules>( AbilityPlusLevelLimiterRules );
	} );

	describe( "getRule function", () => {
		it.each( [
			{
				className: "Wizard",
				expected: { className: "Wizard", abilityName: "Intelligence", levelMultiplier: 1 },
			},
			{
				className: "Cleric",
				expected: { className: "Cleric", abilityName: "Wisdom", levelMultiplier: 1 },
			},
			{
				className: "Druid",
				expected: { className: "Druid", abilityName: "Wisdom", levelMultiplier: 1 },
			},
			{
				className: "Paladin",
				expected: { className: "Paladin", abilityName: "Charisma", levelMultiplier: 0.5 },
			},
		] )( "gets rules for defined classes", async ( { className, expected } ) => {
			expect( abilityPlusLevelLimiterRules.getRule( className ) ).toStrictEqual( expected );
		} );

		it( "throws on unknown classNames", () => {
			expect(
				() => abilityPlusLevelLimiterRules.getRule( "test class" ),
			).toThrow( "No class rules are configured" );
		} );
	} );
} );
