import SpellLevel from "../values/SpellLevel.value";
import SpellSlot from "../values/SpellSlot.value";
import SpellSlotPool from "./SpellSlotPool.entity";
import SpellSlotPoolValue from "../values/SpellSlotPool.value";

describe( "The SpellSlotPool entity", () => {
	describe( "value getter", () => {
		it( "transforms the entity into a value", () => {
			const instance: SpellSlotPool = Object.assign( new SpellSlotPool(), {
				firstLevelSpells: 3,
				firstLevelSpellLimit: 3,
				secondLevelSpells: 2,
				secondLevelSpellLimit: 3,
				thirdLevelSpells: 2,
				thirdLevelSpellLimit: 2,
				fourthLevelSpells: 2,
				fourthLevelSpellLimit: 2,
				fifthLevelSpells: 2,
				fifthLevelSpellLimit: 2,
				sixthLevelSpells: 0,
				sixthLevelSpellLimit: 1,
				seventhLevelSpells: 0,
				seventhLevelSpellLimit: 0,
			} );
			expect( instance.value ).toMatchInlineSnapshot( `
SpellSlotPool {
  "spellSlots": Array [
    SpellSlot {
      "level": SpellLevel {
        "value": 1,
      },
      "limit": 3,
      "remaining": 3,
    },
    SpellSlot {
      "level": SpellLevel {
        "value": 2,
      },
      "limit": 3,
      "remaining": 2,
    },
    SpellSlot {
      "level": SpellLevel {
        "value": 3,
      },
      "limit": 2,
      "remaining": 2,
    },
    SpellSlot {
      "level": SpellLevel {
        "value": 4,
      },
      "limit": 2,
      "remaining": 2,
    },
    SpellSlot {
      "level": SpellLevel {
        "value": 5,
      },
      "limit": 2,
      "remaining": 2,
    },
    SpellSlot {
      "level": SpellLevel {
        "value": 6,
      },
      "limit": 1,
      "remaining": 0,
    },
    SpellSlot {
      "level": SpellLevel {
        "value": 7,
      },
      "limit": 0,
      "remaining": 0,
    },
    SpellSlot {
      "level": SpellLevel {
        "value": 8,
      },
      "limit": 0,
      "remaining": 0,
    },
    SpellSlot {
      "level": SpellLevel {
        "value": 9,
      },
      "limit": 0,
      "remaining": 0,
    },
  ],
}
` );
		} );
	} );

	describe( "value setter", () => {
	    it( "updates the entity values based on a valueobject", () => {
	        const instance = new SpellSlotPool();
			instance.value = new SpellSlotPoolValue(
				[
					new SpellSlot( new SpellLevel( 2 ), 5, 5 ),
					new SpellSlot( new SpellLevel( 1 ), 5, 5 ),
					new SpellSlot( new SpellLevel( 3 ), 20, 4 ),
					new SpellSlot( new SpellLevel( 4 ), 1, 1 ),
					new SpellSlot( new SpellLevel( 5 ), 1, 0 ),
					new SpellSlot( new SpellLevel( 6 ), 1, 0 ),
					new SpellSlot( new SpellLevel( 7 ), 0, 0 ),
					new SpellSlot( new SpellLevel( 8 ), 0, 0 ),
					new SpellSlot( new SpellLevel( 9 ), 0, 0 ),
				],
			);
			 expect( instance ).toMatchInlineSnapshot( `
SpellSlotPool {
  "eightLevelSpellLimit": 0,
  "eightLevelSpells": 0,
  "fifthLevelSpellLimit": 1,
  "fifthLevelSpells": 0,
  "firstLevelSpellLimit": 5,
  "firstLevelSpells": 5,
  "fourthLevelSpellLimit": 1,
  "fourthLevelSpells": 1,
  "ninthLevelSpellLimit": 0,
  "ninthLevelSpells": 0,
  "secondLevelSpellLimit": 5,
  "secondLevelSpells": 5,
  "seventhLevelSpellLimit": 0,
  "seventhLevelSpells": 0,
  "sixthLevelSpellLimit": 1,
  "sixthLevelSpells": 0,
  "thirdLevelSpellLimit": 20,
  "thirdLevelSpells": 4,
}
` );
	    } );
	} );
} );
