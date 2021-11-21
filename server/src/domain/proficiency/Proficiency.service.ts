import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Category from "../category/entity/Category.entity";
import RelationLoaderService from "../../infrastructure/database/RelationLoader.service";
import { Weapon } from "../weapon/entities/Weapon.entity";
import Proficiency from "./entities/Proficiency.entity";
import NotProficient from "./exceptions/NotProficient.exception";

@Injectable()
export class ProficiencyService {
	/**
	 * The constructor.
	 */
	public constructor(
		@InjectRepository( Proficiency )
		private readonly proficiencyRepository: Repository<Proficiency>,
		private readonly relationLoaderService: RelationLoaderService,
	) {
	}

	/**
	 * Gets the weapon proficiency object.
	 *
	 * @param {Weapon} weapon The weapon to check.
	 *
	 * @return {Promise<Proficiency>} The weapon proficiency object.
	 *
	 * @throws NotProficient If the character is not proficient with the weapon.
	 */
	public async getWeaponProficiency( weapon: Weapon ): Promise<Proficiency> {
		const {
			owner,
			categories,
		} = await this.relationLoaderService.loadRelations( weapon, [ "owner.proficiencies", "categories" ] );

		const weaponCategoryNames = categories.map( ( category: Category ) => category.name );
		for ( const proficiency of owner.proficiencies ) {
			if ( weaponCategoryNames.includes( proficiency.affectedCategoryName ) ) {
				return proficiency;
			}
		}
		throw NotProficient.withWeapon( weapon.name );
	}
}
