import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class Health {
	@Field( () => Int )
	public readonly maxHealth: number;

	@Field( () => Int )
	public readonly currentHealth: number;

	/**
	 * Gets the human-readable health string.
	 *
	 * @return {string} The human-readable health string.
	 */
	@Field()
	get displayHealth(): string {
		return this.currentHealth + "/" + this.maxHealth;
	}

	/**
	 * The constructor.
	 *
	 * @param {number} maxHealth The maximum number of hit points.
	 * @param {number} currentHealth The current number of hit points.
	 */
	public constructor( maxHealth: number, currentHealth?: number ) {
		this.maxHealth = Math.max( maxHealth, 1 );

		if ( ! currentHealth && currentHealth !== 0 ) {
			currentHealth = this.maxHealth;
		}

		this.currentHealth = this.ensureValueBetween( 0, this.maxHealth, currentHealth );
	}

	/**
	 * Restores health.
	 *
	 * @param {number} healing The number of hit points to restore.
	 *
	 * @return {Health} The new health.
	 */
	public heal( healing: number ): Health {
		return new Health( this.maxHealth, this.currentHealth + healing );
	}

	/**
	 * Deals damage.
	 *
	 * @param {number} damage The number of hit points to take away.
	 *
	 * @return {Health} The new health.
	 */
	public takeDamage( damage: number ): Health {
		return new Health( this.maxHealth, this.currentHealth - damage );
	}

	/**
	 * Ensures that a value is between a min and max boundary.
	 *
	 * @param {number} min The lowest possible value.
	 * @param {number} max The highest possible value.
	 * @param {number} value The value.
	 *
	 * @return {number} The value that is between min and max.
	 *
	 * @private
	 */
	private ensureValueBetween( min: number, max: number, value: number ): number {
		return Math.min( Math.max( value, min ), max );
	}
}
