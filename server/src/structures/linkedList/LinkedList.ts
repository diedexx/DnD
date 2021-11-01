import LinkedListInterface from "./LinkedList.interfance";
import LinkedListNode from "./LinkedListNode";

/**
 * @template T
 */
export default class LinkedList<T> implements LinkedListInterface<T> {
	private firstNode: LinkedListNode<T> | null = null;
	private lastNode: LinkedListNode<T> | null = null;

	/**
	 * Gets the first element.
	 *
	 * @return {LinkedListNode<T>} The first element.
	 */
	public getFirst(): LinkedListNode<T> {
		return this.firstNode;
	}

	/**
	 * Gets the last element.
	 *
	 * @return {LinkedListNode<T>} The last element.
	 */
	public getLast(): LinkedListNode<T> {
		return this.lastNode;
	}

	/**
	 * Inserts a new node to the back of the list.
	 *
	 * @param {T} data The data of the node to add.
	 *
	 * @return {LinkedListNode<T>} The added node.
	 */
	public append( data: T ): LinkedListNode<T> {
		const newNode = new LinkedListNode( data );
		if ( this.firstNode ) {
			newNode.prev = this.lastNode;
			this.lastNode.next = newNode;
		} else {
			this.firstNode = newNode;
		}
		this.lastNode = newNode;
		return newNode;
	}

	/**
	 * Inserts a new node in front of the list.
	 *
	 * @param {T} data The data of the node to add.
	 *
	 * @return {LinkedListNode<T>} The added node.
	 */
	public prepend( data: T ): LinkedListNode<T> {
		const newNode = new LinkedListNode( data );
		if ( this.firstNode ) {
			this.firstNode.prev = newNode;
			newNode.next = this.firstNode;
		} else {
			this.lastNode = newNode;
		}
		this.firstNode = newNode;
		return newNode;
	}

	/**
	 * Deletes a single node from the list.
	 *
	 * @param {LinkedListNode<T>} node The node to delete.
	 *
	 * @return {void}
	 */
	public deleteNode( node: LinkedListNode<T> ): void {
		if ( ! node.next ) {
			this.lastNode = node.prev || null;
		}
		if ( ! node.prev ) {
			this.firstNode = node.next || null;
		}

		if ( node.next ) {
			node.next.prev = node.prev || null;
		}
		if ( node.prev ) {
			node.prev.next = node.next || null;
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
