import { Field, Int, ObjectType } from "@nestjs/graphql";
import InvalidDeathSave from "../exceptions/InvalidDeathSave.exception";

@ObjectType()
export default class DeathSave {
	@Field( () => Int )
	public readonly failures: number;

	@Field( () => Int )
	public readonly successes: number;

	/**
	 * The constructor.
	 *
	 * @param {number} successes The number of successful saving throws.
	 * @param {number} failures The number of failed saving throws.
	 */
	public constructor(
		successes: number,
		failures: number,
	) {
		this.failures = failures;
		this.successes = successes;
		this.assertValid();
	}

	/**
	 * Checks if the object is valid.
	 *
	 * @return {void}
	 *
	 * @private
	 */
	private assertValid(): void {
		if ( this.failures < 0 ) {
			throw InvalidDeathSave.becauseFailuresCantBeNegative( this.failures );
		}
		if ( this.failures > 3 ) {
			throw InvalidDeathSave.becauseCanOnlyFailThreeTimes( this.failures );
		}
		if ( this.successes < 0 ) {
			throw InvalidDeathSave.becauseSuccessesCantBeNegative( this.successes );
		}
		if ( this.successes > 3 ) {
			throw InvalidDeathSave.becauseCanOnlySucceedThreeTimes( this.successes );
		}
	}
}
