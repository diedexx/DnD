import LinkedList from "./LinkedList";

describe( "The LinkedList class", () => {
	describe( "fromArray function", () => {
		it( "should construct a linked list in the same order as the array", async () => {
			const instance = LinkedList.fromArray( [ 9, 8, 7 ] );
			expect( instance ).toMatchInlineSnapshot( `
LinkedList {
  "firstNode": LinkedListNode {
    "data": 9,
    "next": LinkedListNode {
      "data": 8,
      "next": LinkedListNode {
        "data": 7,
        "next": null,
        "prev": [Circular],
      },
      "prev": [Circular],
    },
    "prev": null,
  },
  "lastNode": LinkedListNode {
    "data": 7,
    "next": null,
    "prev": LinkedListNode {
      "data": 8,
      "next": [Circular],
      "prev": LinkedListNode {
        "data": 9,
        "next": [Circular],
        "prev": null,
      },
    },
  },
}
` );
		} );
	} );

	describe( "getFirst function", () => {
		it( "should return the first node", () => {
			const instance = LinkedList.fromArray( [ 9, 8, 7 ] );
			expect( instance.getFirst().data ).toBe( 9 );
		} );

		it( "should return null for an empty list", () => {
			const instance = new LinkedList();
			expect( instance.getFirst() ).toBeNull();
		} );
	} );

	describe( "getLast function", () => {
		it( "should return the last added node", () => {
			const instance = LinkedList.fromArray( [ 9, 8, 7 ] );
			expect( instance.getLast().data ).toBe( 7 );
		} );

		it( "should return null for an empty list", () => {
			const instance = new LinkedList();
			expect( instance.getLast() ).toBeNull();
		} );
	} );

	describe( "append function", () => {
		it( "should set the next property of the last node", () => {
			const instance = LinkedList.fromArray( [ 9, 8, 7 ] );
			const oldLastNode = instance.getLast();

			expect( oldLastNode.next ).toBeNull();
			instance.append( 6 );
			expect( oldLastNode.next ).toBe( instance.getLast() );
		} );

		it( "should set the prev property of the node that was added", () => {
			const instance = LinkedList.fromArray( [ 9, 8, 7 ] );
			const oldLastNode = instance.getLast();

			instance.append( 6 );
			expect( instance.getLast().prev ).toBe( oldLastNode );
		} );

		it( "should keep track of the last node in the list", () => {
			const instance = LinkedList.fromArray( [ 9, 8, 7 ] );

			instance.append( 6 );
			expect( instance.getLast().data ).toBe( 6 );
		} );

		it( "should set the first node if the list was empty", () => {
			const instance = new LinkedList();

			instance.append( 6 );
			expect( instance.getFirst().data ).toBe( 6 );
			expect( instance.getLast().data ).toBe( 6 );
		} );

		it( "should not affect the first node if the list is not empty", () => {
			const instance = LinkedList.fromArray( [ 9, 8, 7 ] );

			instance.append( 6 );
			expect( instance.getFirst().data ).toBe( 9 );
			expect( instance.getLast().data ).toBe( 6 );
		} );
	} );

	describe( "prepend function", () => {
		it( "should set the prev property of the first node", () => {
			const instance = LinkedList.fromArray( [ 9, 8, 7 ] );
			const oldFirstNode = instance.getFirst();

			expect( oldFirstNode.prev ).toBeNull();
			instance.prepend( 6 );
			expect( oldFirstNode.prev ).toBe( instance.getFirst() );
		} );

		it( "should set the next property of the node that was added", () => {
			const instance = LinkedList.fromArray( [ 9, 8, 7 ] );
			const oldFirstNode = instance.getFirst();

			instance.prepend( 6 );
			expect( instance.getFirst().next ).toBe( oldFirstNode );
		} );

		it( "should keep track of the first node in the list", () => {
			const instance = LinkedList.fromArray( [ 9, 8, 7 ] );

			instance.prepend( 6 );
			expect( instance.getFirst().data ).toBe( 6 );
		} );

		it( "should set the last node if the list was empty", () => {
			const instance = new LinkedList();

			instance.prepend( 6 );
			expect( instance.getFirst().data ).toBe( 6 );
			expect( instance.getLast().data ).toBe( 6 );
		} );

		it( "should not affect the last node if the list is not empty", () => {
			const instance = LinkedList.fromArray( [ 9, 8, 7 ] );

			instance.prepend( 6 );
			expect( instance.getFirst().data ).toBe( 6 );
			expect( instance.getLast().data ).toBe( 7 );
		} );
	} );

	describe( "deleteNode function", () => {
		it( "should replace the lastNode value if the last node was deleted", () => {
			const instance = LinkedList.fromArray( [ 9, 8, 7, 6 ] );
			instance.deleteNode( instance.getLast() );
			expect( instance.getLast().data ).toBe( 7 );
		} );

		it( "should replace the firstNode value if the first node was deleted", () => {
			const instance = LinkedList.fromArray( [ 9, 8, 7, 6 ] );
			instance.deleteNode( instance.getFirst() );
			expect( instance.getFirst().data ).toBe( 8 );
		} );

		it( "should clear the lastNode if the list is empty", () => {
			const instance = LinkedList.fromArray( [ 9 ] );
			instance.deleteNode( instance.getFirst() );
			expect( instance.getLast() ).toBeNull();
		} );

		it( "should clear the firstNode if the list is empty", () => {
			const instance = LinkedList.fromArray( [ 9 ] );
			instance.deleteNode( instance.getFirst() );
			expect( instance.getFirst() ).toBeNull();
		} );

		it( "should link the nodes around the deleted node together", () => {
			const instance = LinkedList.fromArray( [ 9, 8, 7, 6 ] );
			const node9 = instance.getFirst();
			const node8 = node9.next;
			const node7 = node8.next;
			instance.deleteNode( node8 );
			expect( node7.prev ).toBe( node9 );
			expect( node9.next ).toBe( node7 );
		} );

		it( "should clear the prev value if a node becomes the new first node", () => {
			const instance = LinkedList.fromArray( [ 9, 8, 7, 6 ] );

			instance.deleteNode( instance.getFirst() );
			expect( instance.getFirst().prev ).toBeNull();
		} );

		it( "should clear the next value if a node becomes the new last node", () => {
			const instance = LinkedList.fromArray( [ 9, 8, 7, 6 ] );

			instance.deleteNode( instance.getLast() );
			expect( instance.getLast().next ).toBeNull();
		} );
		it( "should clear the next and prev value if a node becomes the only node in the list", () => {
			const instance = LinkedList.fromArray( [ 9, 8 ] );

			instance.deleteNode( instance.getLast() );
			expect( instance.getLast().next ).toBeNull();
			expect( instance.getLast().prev ).toBeNull();
		} );
	} );

	describe( "search function", () => {
		it( "should find an element in the list based on a callback function", () => {
			const instance = LinkedList.fromArray( [ 9, 8, 7, 6 ] );
			const actual = instance.search( ( data ) => data === 7 );
			expect( actual.data ).toBe( 7 );
		} );
		it( "should return null if it can't find an element", () => {
			const instance = LinkedList.fromArray( [ 9, 8, 7, 6 ] );
			const actual = instance.search( ( data ) => data === 12 );
			expect( actual ).toBeNull();
		} );
		it( "should return null if the list is empty", () => {
			const instance = LinkedList.fromArray( [] );
			const actual = instance.search( ( data ) => data === 12 );
			expect( actual ).toBeNull();
		} );
	} );

	describe( "getArray function", () => {
		it( "should transform a LinkedList into an array", () => {
			const instance = LinkedList.fromArray( [ 9, 8, 7, 6 ] );
			const instance2 = new LinkedList();
			instance2.append( 3 );
			instance2.append( 6 );
			instance2.prepend( 1 );
			instance2.prepend( 7 );

			expect( instance.getArray() ).toStrictEqual( [ 9, 8, 7, 6 ] );
			expect( instance2.getArray() ).toStrictEqual( [ 7, 1, 3, 6 ] );
		} );

		it( "should return an empty array for an empty list", () => {
			const instance = new LinkedList();
			expect( instance.getArray() ).toStrictEqual( [] );
		} );
	} );

	describe( "size function", () => {
		it( "should get the number of elements in the list", async () => {
			const instance = LinkedList.fromArray( [ 9, 8, 7, 6 ] );
			expect( instance.size() ).toBe( 4 );
			instance.append( 6 );
			expect( instance.size() ).toBe( 5 );
		} );
	} );
} );
