import BaseEntity from "./Base.entity";

describe( "The BaseEntity class", () => {
	describe( "isSameEntity function", () => {
		it.each(
			[
				[ 2, 2, true ],
				[ 2, 3, false ],
				[ 3, 2, false ],
				[ null, 2, false ],
				[ 2, null, false ],
				[ null, null, false ],
			],
		)( "compares ids to verify that it's the same object", ( id1, id2, expected ) => {
			const entity1 = new BaseEntity();
			entity1.id = id1;
			const entity2 = new BaseEntity();
			entity2.id = id2;
			expect( entity1.isSameEntity( entity2 ) ).toBe( expected );
		} );
	} );
} );
