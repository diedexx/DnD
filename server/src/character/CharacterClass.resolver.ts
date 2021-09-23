import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import RelationLoaderService from "../database/RelationLoader.service";
import CharacterClass from "./entities/CharacterClass.entity";

@Resolver( () => CharacterClass )
export default class CharacterClassResolver {
	/**
	 * The constructor.
	 *
	 * @param {Repository<CharacterClass>} characterClassRepository The CharacterClass repo.
	 * @param {RelationLoaderService} relationLoaderService A service that resolves entity relations.
	 */
	public constructor(
		@InjectRepository( CharacterClass )
		private readonly characterClassRepository: Repository<CharacterClass>,
		private readonly relationLoaderService: RelationLoaderService,
	) {
	}

	/**
	 * Gets a single characterClass.
	 *
	 * @param {number} id The id of the characterClass to retrieve.
	 *
	 * @return {Promise<CharacterClass|null>} The CharacterClass.
	 */
	@Query( () => CharacterClass )
	public async characterClass( @Args( "id", { type: () => Int } ) id: number ): Promise<CharacterClass|null> {
		return this.characterClassRepository.findOne( id );
	}
}
