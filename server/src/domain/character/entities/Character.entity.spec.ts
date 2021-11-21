import Character from "./Character.entity";

describe( "The Character Entity", () => {
	describe( "proficiencyBonus getter", () => {
		it( "should get a proficiencyBonus object that matches the character's level", () => {
			const character = new Character();
			character.level = 3;
			expect( character.proficiencyBonus ).toMatchInlineSnapshot( `
ProficiencyBonus {
  "base": 2,
  "externalModifiers": Array [],
}
` );

			character.level = 10;
			expect( character.proficiencyBonus ).toMatchInlineSnapshot( `
ProficiencyBonus {
  "base": 4,
  "externalModifiers": Array [],
}
` );
		} );
	} );
} );
