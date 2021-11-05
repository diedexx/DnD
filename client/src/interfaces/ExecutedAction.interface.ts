interface ExecutedActionInterface {
	readonly name: string;
	readonly description: string;
	readonly isUndone: boolean;
	readonly executedAt: Date;
}

export default ExecutedActionInterface;
