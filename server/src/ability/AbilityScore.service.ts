import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Ability from "./entities/Ability.entity";
import AbilityScore from "./entities/AbilityScore.entity";
import CreateAbilityScoreType from "./types/CreateAbilityScore.type";

export default class AbilityScoreService {
	/**
	 * The constructor.
	 */
	public constructor(
		@InjectRepository( Ability ) private readonly abilityRepository: Repository<Ability>,
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
}
