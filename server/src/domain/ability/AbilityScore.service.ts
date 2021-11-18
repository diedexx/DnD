import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Ability from "./entities/Ability.entity";
import AbilityScore from "./entities/AbilityScore.entity";
import CreateAbilityScoreType from "./types/CreateAbilityScore.type";
import AbilityScoreValue from "./values/AbilityScore.value";
import AbilityScoreModifier from "./values/AbilityScoreModifier.value";

export default class AbilityScoreService {
	/**
	 * The constructor.
	 */
	public constructor(
		@InjectRepository( Ability )
		private readonly abilityRepository: Repository<Ability>,
		@InjectRepository( AbilityScore )
		private readonly abilityScoreRepository: Repository<AbilityScore>,
	) {
	}

	/**
	 * Creates a new AbilityScore object.
	 *
	 * @param {CreateAbilityScoreType} args The arguments.
	 *
	 * @return {Promise<AbilityScore>} The ability score object.
	 */
	public async createAbilityScore( args: CreateAbilityScoreType ): Promise<AbilityScore> {
		const abilityScore: AbilityScore = new AbilityScore();
		abilityScore.ability = await this.abilityRepository.findOne( args.abilityId );
		abilityScore.character = args.character;
		abilityScore.score = new AbilityScoreValue( args.score );

		return abilityScore;
	}

	/**
	 * Gets the abilityScore modifier for an ability of a character.
	 *
	 * @param {number} abilityId The id of the ability to get the modifier for.
	 * @param {number} characterId The id of the character to get the ability modifier for.
	 *
	 * @return {Promise<AbilityScoreModifier>} The abilityScore modifier.
	 */
	public async getAbilityScoreModifier( abilityId: number, characterId: number ): Promise<AbilityScoreModifier> {
		const abilityScore: AbilityScore = await this.abilityScoreRepository.findOneOrFail( {
			where: {
				abilityId,
				characterId,
			},
		} );
		return abilityScore.modifier;
	}

	/**
	 * Update the value of an ability score.
	 *
	 * @param {number} abilityScoreId The id of the ability score to update.
	 * @param {number} newValue The new value.
	 *
	 * @return {Promise<AbilityScore>} The updated ability score.
	 */
	public async updateAbilityScore( abilityScoreId: number, newValue: number ): Promise<AbilityScore> {
		const abilityScore: AbilityScore = await this.abilityScoreRepository.findOneOrFail( abilityScoreId );
		abilityScore.score = new AbilityScoreValue( newValue );
		return this.abilityScoreRepository.save( abilityScore );
	}
}
