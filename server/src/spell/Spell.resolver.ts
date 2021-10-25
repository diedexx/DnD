import { Int, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import BaseResolver from "../Base.resolver";
import Spell from "./entities/Spell.entity";

@Resolver( () => Spell )
export default class SpellResolver extends BaseResolver( Spell, "spell", "spells" ) {
	/**
	 * The constructor.
	 *
	 * @param {Repository<Spell>} spellRepository The Spell repo.
	 */
	public constructor(
		@InjectRepository( Spell )
		private readonly spellRepository: Repository<Spell>,
	) {
		super( spellRepository );
	}

	/**
	 * Gets the spell level.
	 *
	 * @param {Spell} spell The spell to get the level for.
	 *
	 * @return {number} The level of the spell.
	 */
	@ResolveField( "level", () => Int )
	public getLevel( @Parent() spell: Spell ): number {
		return spell.spellLevel.value;
	}
}
