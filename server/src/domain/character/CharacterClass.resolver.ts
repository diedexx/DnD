import { Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import BaseResolver from "../../infrastructure/Base.resolver";
import RelationLoaderService from "../../infrastructure/database/RelationLoader.service";
import CharacterClass from "./entities/CharacterClass.entity";

@Resolver( CharacterClass )
export default class CharacterClassResolver extends BaseResolver( CharacterClass, "class", "classes" ) {
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
		super( characterClassRepository );
	}
}
