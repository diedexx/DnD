import { Args, Int, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import BaseResolver from "../../Base.resolver";
import CommandService from "../../command/Command.service";
import { SetTextFieldData, TYPE as SetTextFieldCommandType } from "../../command/commands/SetTextFieldCommand";
import CommandReference from "../../command/interfaces/CommandReference.interface";
import RelationLoaderService from "../../database/RelationLoader.service";
import AbilityScore from "../ability/entities/AbilityScore.entity";
import Equipment from "../equipment/entities/Equipment.entity";
import Modifier from "../modifier/values/Modifier.value";
import Wallet from "../money/entities/Wallet.entity";
import Proficiency from "../proficiency/entities/Proficiency.entity";
import SavingThrow from "../savingthrow/entities/SavingThrow.entity";
import SkillScore from "../skill/entities/SkillScore.entity";
import Spell from "../spell/entities/Spell.entity";
import SpellSlotPool from "../spell/values/SpellSlotPool.value";
import { Weapon } from "../weapon/entities/Weapon.entity";
import CharacterService from "./Character.service";
import Character from "./entities/Character.entity";
import CharacterClass from "./entities/CharacterClass.entity";
import CreateAbilityScoreInputType from "./inputtypes/CreateAbilityScore.inputtype";
import CreateCharacterInputType from "./inputtypes/CreateCharacter.inputtype";
import CreateCharacterType from "./types/CreateCharacter.type";

@Resolver( Character )
export default class CharacterResolver extends BaseResolver( Character, "character", "characters" ) {
	/**
	 * The constructor.
	 *
	 * @param {Repository<CharacterClass>} characterRepository The Character repo.
	 * @param {CharacterService} characterService A service that manages characters.
	 * @param {RelationLoaderService} relationLoaderService A service that resolves entity relations.
	 * @param {CommandService} commandService A service that executes commands.
	 */
	constructor(
		@InjectRepository( Character )
		private readonly characterRepository: Repository<Character>,
		private readonly characterService: CharacterService,
		private readonly relationLoaderService: RelationLoaderService,
		private readonly commandService: CommandService,
	) {
		super( characterRepository );
	}

	/**
	 * Resolve the class relationship.
	 *
	 * @param {Character} character The character to get the class for.
	 *
	 * @return {Promise<CharacterClass>} The characterClass of the character.
	 */
	@ResolveField( "class", () => CharacterClass )
	public async getCharacterClass( @Parent() character: Character ): Promise<CharacterClass> {
		return ( await this.relationLoaderService.loadRelations( character, [ "class" ] ) ).class;
	}

	/**
	 * Resolve the abilityScores relationship.
	 *
	 * @param {Character} character The character to get the abilityScores for.
	 *
	 * @return {Promise<CharacterClass>} The abilityScores of the character.
	 */
	@ResolveField( "abilityScores", () => [ AbilityScore ] )
	public async getAbilityScores( @Parent() character: Character ): Promise<AbilityScore[]> {
		return ( await this.relationLoaderService.loadRelations( character, [ "abilityScores" ] ) ).abilityScores;
	}

	/**
	 * Resolves the skillScores relationship.
	 *
	 * @param {Character} character The character to get skillScores for.
	 *
	 * @return {Promise<SkillScore[]>} The skillScores of the character.
	 */
	@ResolveField( "skillScores", () => [ SkillScore ] )
	public async getSkillScores( @Parent() character: Character ): Promise<SkillScore[]> {
		return ( await this.relationLoaderService.loadRelations( character, [ "skillScores" ] ) ).skillScores;
	}

	/**
	 * Resolves the savingThrows relationship.
	 *
	 * @param {Character} character The character to get savingThrows for.
	 *
	 * @return {Promise<SkillScore[]>} The savingThrows of the character.
	 */
	@ResolveField( "savingThrows", () => [ SavingThrow ] )
	public async getSavingThrows( @Parent() character: Character ): Promise<SavingThrow[]> {
		return ( await this.relationLoaderService.loadRelations( character, [ "savingThrows" ] ) ).savingThrows;
	}

	/**
	 * Resolves the weapons relationship.
	 *
	 * @param {Character} character The character to get weapons for.
	 *
	 * @return {Promise<Weapon[]>} The weapons of the character.
	 */
	@ResolveField( "weapons", () => [ Weapon ] )
	public async getWeapons( @Parent() character: Character ): Promise<Weapon[]> {
		return ( await this.relationLoaderService.loadRelations( character, [ "weapons" ] ) ).weapons;
	}

	/**
	 * Resolves the equipment relationship.
	 *
	 * @param {Character} character The character to get equipment for.
	 *
	 * @return {Promise<Equipment[]>} The equipment of the character.
	 */
	@ResolveField( "equipment", () => [ Equipment ] )
	public async getEquipment( @Parent() character: Character ): Promise<Equipment[]> {
		return ( await this.relationLoaderService.loadRelations( character, [ "equipment" ] ) ).equipment;
	}

	/**
	 * Resolves the spells relationship.
	 *
	 * @param {Character} character The character to get spells for.
	 *
	 * @return {Promise<Spell[]>} The spells of the character.
	 */
	@ResolveField( "spells", () => [ Spell ] )
	public async getSpells( @Parent() character: Character ): Promise<Spell[]> {
		return ( await this.relationLoaderService.loadRelations( character, [ "spells" ] ) ).spells;
	}

	/**
	 * Resolves the spellSlotPool relationship.
	 *
	 * @param {Character} character The character to get spells for.
	 *
	 * @return {Promise<Spell[]>} The spells of the character.
	 */
	@ResolveField( "spellSlotPool", () => SpellSlotPool )
	public async getSpellSlotPool( @Parent() character: Character ): Promise<SpellSlotPool> {
		return ( await this.relationLoaderService.loadRelations( character, [ "spellSlotPool" ] ) ).spellSlotPool.value;
	}

	/**
	 * Resolves the wallet relationship.
	 *
	 * @param {Character} character The character to get wallet for.
	 *
	 * @return {Promise<Wallet>} The wallet of the character.
	 */
	@ResolveField( "wallet", () => Wallet )
	public async getWallet( @Parent() character: Character ): Promise<Wallet> {
		return ( await this.relationLoaderService.loadRelations( character, [ "wallet" ] ) ).wallet;
	}

	/**
	 * Resolves the proficiencies relationship.
	 *
	 * @param {Character} character The character to get proficiencies for.
	 *
	 * @return {Promise<Proficiency[]>} The proficiencies of the character.
	 */
	@ResolveField( "proficiencies", () => [ Proficiency ] )
	public async getProficiencies( @Parent() character: Character ): Promise<Proficiency[]> {
		return ( await this.relationLoaderService.loadRelations( character, [ "proficiencies" ] ) ).proficiencies;
	}

	/**
	 * Get the armorClass modifier.
	 *
	 * @param {Character} character The character to get the modifier for.
	 *
	 * @return {Promise<SkillScore>} The armorClass modifier for the character.
	 */
	@ResolveField( "armorClassModifier", () => Modifier )
	public async getArmorClassModifier( @Parent() character: Character ): Promise<Modifier> {
		return this.characterService.getArmorClassModifier( character );
	}

	/**
	 * Get the initiative modifier.
	 *
	 * @param {Character} character The character to get the modifier for.
	 *
	 * @return {Promise<SkillScore>} The initiative modifier for the character.
	 */
	@ResolveField( "initiativeModifier", () => Modifier )
	public async getInitiativeModifier( @Parent() character: Character ): Promise<Modifier> {
		return this.characterService.getInitiativeModifier( character );
	}

	/**
	 * Get the speed modifier.
	 *
	 * @param {Character} character The character to get the modifier for.
	 *
	 * @return {Promise<SkillScore>} The speed modifier for the character.
	 */
	@ResolveField( "speedModifier", () => Modifier )
	public async getSpeedModifier( @Parent() character: Character ): Promise<Modifier> {
		return this.characterService.getSpeedModifier( character );
	}

	/**
	 * Creates a new character.
	 * @param {CreateCharacterInputType} characterInput The character information.
	 * @param {CreateAbilityScoreInputType[]} abilityScoreInput The ability score information.
	 *
	 * @return {Promise<Character>} The new character.
	 */
	@Mutation( () => Character )
	public async createCharacter(
		@Args( "character", { type: () => CreateCharacterInputType } ) characterInput: CreateCharacterInputType,
		@Args( "abilityScores", { type: () => [ CreateAbilityScoreInputType ] } ) abilityScoreInput: CreateAbilityScoreInputType[],
	): Promise<Character> {
		const args: CreateCharacterType = { ...characterInput, ...{ abilityScores: abilityScoreInput } };

		const character = await this.characterService.createCharacter( args );
		return this.characterRepository.save( character );
	}

	/**
	 * Updates a text field on the character.
	 *
	 * @param {number} characterId The id of the character to update.
	 * @param {string} fieldName The name of the field to update.
	 * @param {string} value The new value of the text field.
	 *
	 * @return {Promise<Character>} The updated character.
	 */
	@Mutation( () => Character )
	public async updateTextField(
		@Args( "characterId", { type: () => Int } ) characterId: number,
		@Args( "fieldName", { type: () => String } ) fieldName: string,
		@Args( "value", { type: () => String } ) value: string,
	): Promise<Character> {
		const commandReference: CommandReference<SetTextFieldData> = {
			data: { field: fieldName, newText: value },
			type: SetTextFieldCommandType,
		};
		const character = await this.characterRepository.findOneOrFail( characterId );
		const command = await this.commandService.createCommand( commandReference, character );
		await this.commandService.executeCommand( command );

		// Refresh character.
		return await this.characterRepository.findOneOrFail( characterId );
	}
}
