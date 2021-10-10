import { Inject, Injectable } from "@nestjs/common";
import Character from "../../character/entities/Character.entity";
import PreparationLimiterInterface from "./PreparationLimiter.interface";

@Injectable()
export default class PreparationLimiterFactory {
	/**
	 * The constructor.
	 */
	public constructor(
		@Inject( "PreparationLimiters" )
		private readonly limiters: PreparationLimiterInterface[],
		@Inject( "FallbackPreparationLimiter" )
		private readonly fallback: PreparationLimiterInterface,
	) {
	}

	/**
	 * Gets the spell preparation limiter for a character's class.
	 *
	 * @param {Character} character The character to get the limiter for.
	 *
	 * @return {Promise<PreparationLimiterInterface>} The limiter.
	 */
	public async getPreparationLimiter( character: Character ): Promise<PreparationLimiterInterface> {
		const limiterSupportList: { limiter: PreparationLimiterInterface, supports: boolean }[] = await Promise.all( this.limiters.map(
			async ( limiter ) => {
				return {
					limiter,
					supports: await limiter.supports( character ),
				};
			},
		) );

		const { limiter } = limiterSupportList.find( ( limiterSupport ) => limiterSupport.supports );
		if ( ! limiter ) {
			return this.fallback;
		}
		return limiter;
	}
}
