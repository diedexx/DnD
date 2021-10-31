interface CommandReference<T extends Record<string, any> = Record<string, any>> {
	type: string;
	data: T;
}

export default CommandReference;
