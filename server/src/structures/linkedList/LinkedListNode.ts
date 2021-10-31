export default class LinkedListNode<T> {
	public next: LinkedListNode<T> | null = null;
	public prev: LinkedListNode<T> | null = null;

	/**
	 * The constructor.
	 *
	 * @param {T} data The data to store in the node.
	 */
	constructor( public data: T ) {
	}
}

