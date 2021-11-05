import LinkedListNode from "./LinkedListNode";

interface LinkedListInterface<T> {
	append( data: T ): LinkedListNode<T>;
	prepend( data: T ): LinkedListNode<T>;
	deleteNode( node: LinkedListNode<T> ): void;
	getArray(): T[];
	size(): number;
	search( comparator: ( data: T ) => boolean ): LinkedListNode<T> | null;
}

export default LinkedListInterface;
