import { Injectable } from "@nestjs/common";
import Character from "../character/entities/Character.entity";
import ModifierApplierInterface from "./interfaces/ModifierApplier.interface";
import ModificationTypesType from "./types/ModificationTypes.type";

@Injectable()
export class ModifierCollectorService {
	public async gatherGearModifiers( character: Character ): Promise<ModifierApplierInterface[]> {
		// this.equipmentModifierService.gatherModifiers(), This does query to
		return [
			{
				source: "Chest plate of destruction",
				type: ModificationTypesType.ARMOR_CLASS,
				modifier: 1,
				situational: false,
			},
		];
	}

	public async gatherWeaponModifiers( weapon: any ): Promise<ModifierApplierInterface[]> {
		// this.equipmentModifierService.gatherModifiers(), This does query to database
		return [
			{
				source: "Fancy halbard",
				type: ModificationTypesType.ATTACK_ROLL,
				modifier: 2,
				situational: true,
				description: "Deal extra dmg to undead targets"
			}
		]
	}



	// todo Idee; Ala builder - applyGearModifiers(character).applyWeaponModifier(weapon).filterType(ATTACK_ROLL)
}
