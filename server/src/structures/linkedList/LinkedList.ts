import LinkedListInterface from "./LinkedList.interfance";
import LinkedListNode from "./LinkedListNode";

export default class LinkedList<T> implements LinkedListInterface<T> {
	private firstNode: LinkedListNode<T> | null = null;

	/**
	 * Inserts a new node to the back of the list.
	 *
	 * @param {T} data The data of the node to add.
	 *
	 * @return {LinkedListNode<T>} The added node.
	 */
	public append( data: T ): LinkedListNode<T> {
		const newWode = new LinkedListNode( data );
		if ( this.firstNode ) {
			const getLast = ( node: LinkedListNode<T> ): LinkedListNode<T> => {
				return node.next ? getLast( node.next ) : node;
			};

			const lastLinkedListNode = getLast( this.firstNode );
			newWode.prev = lastLinkedListNode;
			lastLinkedListNode.next = newWode;
		} else {
			this.firstNode = newWode;
		}
		return newWode;
	}

	/**
	 * Inserts a new node in front of the list.
	 *
	 * @param {T} data The data of the node to add.
	 *
	 * @return {LinkedListNode<T>} The added node.
	 */
	public prepend( data: T ): LinkedListNode<T> {
		const node = new LinkedListNode( data );
		if ( this.firstNode ) {
			this.firstNode.prev = node;
			node.next = this.firstNode;
			this.firstNode = node;
		} else {
			this.firstNode = node;
		}
		return node;
	}

	/**
	 * Deletes a single node from the list.
	 *
	 * @param {LinkedListNode<T>} node The node to delete.
	 *
	 * @return {void}
	 */
	public deleteNode( node: LinkedListNode<T> ): void {
		if ( node.prev ) {
			const prevLinkedListNode = node.prev;
			prevLinkedListNode.next = node.next;
		} else {
			this.firstNode = node.next;
		}
	}

	/**
	 * Search the list for a single entry based on a comparator function.
	 *
	 * @param {Function} comparator The comparison function.
	 *
	 * @return {LinkedListNode<T> | null} The found node or null.
	 */
	public search( comparator: ( data: T ) => boolean ): LinkedListNode<T> | null {
		const checkNext = ( node: LinkedListNode<T> ): LinkedListNode<T> | null => {
			if ( comparator( node.data ) ) {
				return node;
			}
			return node.next ? checkNext( node.next ) : null;
		};

		return this.firstNode ? checkNext( this.firstNode ) : null;
	}

	/**
	 * Get a traversable array of the list.
	 *
	 * @return {T[]} An array representation of the list.
	 */
	public traverse(): T[] {
		const array: T[] = [];
		if ( ! this.firstNode ) {
			return array;
		}

		const addToArray = ( node: LinkedListNode<T> ): T[] => {
			array.push( node.data );
			return node.next ? addToArray( node.next ) : array;
		};
		return addToArray( this.firstNode );
	}

	/**
	 * Get the number of elements in the list.
	 *
	 * @return {number} The number of elements in the list.
	 */
	public size(): number {
		return this.traverse().length;
	}
}
