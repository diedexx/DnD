export default class Health {
	/**
	 * The constructor.
	 *
	 * @param {number} maxHealth The maximum number of hit points.
	 * @param {number} currentHealth The current number of hit points.
	 */
	public constructor( public readonly maxHealth: number, public readonly currentHealth?: number ) {
		if ( ! this.currentHealth ) {
			this.currentHealth = this.maxHealth;
		}

		this.maxHealth = Math.max( this.maxHealth, 1 );
		this.currentHealth = this.ensureValueBetween( 0, this.maxHealth, this.currentHealth );
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
