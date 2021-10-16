import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Ability from "./entities/Ability.entity";
import AbilityScore from "./entities/AbilityScore.entity";
import AbilityScoreModifier from "./models/AbilityScoreModifier.valueobject";
import CreateAbilityScoreType from "./types/CreateAbilityScore.type";

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
		abilityScore.score = args.score;

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
		const abilityScore: AbilityScore = await this.abilityScoreRepository.findOne( { where: { abilityId, characterId } } );
		return abilityScore.modifier;
	}
}
