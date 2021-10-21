import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Ability from "./entities/Ability.entity";

export default class AbilityService {
	/**
	 * The constructor.
	 */
	public constructor(
		@InjectRepository( Ability )
		private readonly abilityRepository: Repository<Ability>,
	) {
	}

	/**
	 * Finds an ability by a given name.
	 *
	 * @param {string} name The name.
	 *
	 * @return {Promise<Ability>} The found ability.
	 */
	public async findAbilityByName( name: string ): Promise<Ability> {
		return await this.abilityRepository.findOneOrFail( { where: { name } } );
	}
}
