import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, RelationId } from "typeorm";
import AbilityScore from "../../ability/entities/AbilityScore.entity";
import BaseEntity from "../../Base.entity";
import DeathSave from "../../damage/values/DeathSave.value";
import DeathSaveTransformer from "../../damage/transformers/DeathSave.transformer";
import Dice from "../../die/values/Dice.value";
import DiceTransformer from "../../die/transformers/Dice.transformer";
import Equipment from "../../equipment/entities/Equipment.entity";
import Wallet from "../../money/entities/Wallet.entity";
import Proficiency from "../../proficiency/entities/Proficiency.entity";
import ProficiencyBonus from "../../proficiency/values/ProficiencyBonus.value";
import SavingThrow from "../../savingthrow/entities/SavingThrow.entity";
import SkillScore from "../../skill/entities/SkillScore.entity";
import Spell from "../../spell/entities/Spell.entity";
import { Weapon } from "../../weapon/entities/Weapon.entity";
import Health from "../values/Health.value";
import HealthTransformer from "../transformers/Health.transformer";
import CharacterClass from "./CharacterClass.entity";

// https://www.dndbeyond.com/races
export type CharacterRace = string;

// https://www.dndbeyond.com/backgrounds
export type CharacterBackground = string;

// https://www.dndbeyond.com/sources/basic-rules/personality-and-background#Alignment
export type CharacterAlignment = string;

@Entity()
@ObjectType()
export default class Character extends BaseEntity {
	@Column()
	@Field()
	public name: string;

	@Column( { "default": 1 } )
	@Field( () => Int )
	public level: number;

	@Column( { "default": 0 } )
	@Field( () => Int )
	public experience: number;

	@Column()
	@Field()
	public race: CharacterRace;

	@Column()
	@Field()
	public background: CharacterBackground;

	@Column()
	@Field()
	public alignment: CharacterAlignment;

	@Column( { type: "varchar", transformer: new DiceTransformer() } )
	@Field()
	public hitDice: Dice;

	@Column( {
		type: "varchar",
		length: 50,
		transformer: new HealthTransformer(),
		comment: "The current and total health formatted like current/total (9/10)",
	} )
	@Field()
	public health: Health;

	@Column( "text" )
	@Field()
	public personalityTraits: string;

	@Column( "text" )
	@Field()
	public ideals: string;

	@Column( "text" )
	@Field()
	public bonds: string;

	@Column( "text" )
	@Field()
	public flaws: string;

	@Column()
	@Field()
	public baseArmorClass: number;

	@Column()
	@Field()
	public baseInitiative: number;

	@Column()
	@Field()
	public baseSpeed: number;

	@Column( {
		type: "varchar",
		length: 50,
		"default": "0|0",
		transformer: new DeathSaveTransformer(),
		comment: "The amount of successful and failed death saves formatted like success|failures (2|1)",
	} )
	@Field( () => DeathSave )
	public readonly deathSave: DeathSave;

	@OneToOne( () => Wallet, ( wallet: Wallet ) => wallet.owner, {
		nullable: false,
		cascade: [ "insert", "update" ],
	} )
	@Field()
	public wallet: Wallet;

	@Column()
	@RelationId( ( character: Character ) => character.wallet )
	@Field( () => Int )
	public readonly walletId: number;

	@ManyToOne( () => CharacterClass, { nullable: false } )
	@Field()
	public class: CharacterClass;

	@Column( "int" )
	@RelationId( ( character: Character ) => character.class )
	@Field( () => Int )
	public readonly classId: number;

	@OneToMany( () => AbilityScore, ( abilityScore: AbilityScore ) => abilityScore.character, { cascade: [ "insert", "update" ] } )
	@Field( () => [ AbilityScore ] )
	public abilityScores: AbilityScore[];

	@OneToMany( () => SkillScore, ( skillScore: SkillScore ) => skillScore.character, { cascade: [ "insert", "update" ] } )
	@Field( () => [ SkillScore ] )
	public skillScores: SkillScore[];

	@OneToMany( () => SavingThrow, ( skillScore: SavingThrow ) => skillScore.character, { cascade: [ "insert", "update" ] } )
	@Field( () => [ SavingThrow ] )
	public savingThrows: SavingThrow[];

	@OneToMany( () => Proficiency, ( proficiency: Proficiency ) => proficiency.owner )
	@Field( () => [ Proficiency ] )
	public proficiencies: Proficiency[];

	@OneToMany( () => Weapon, ( weapon: Weapon ) => weapon.owner, { cascade: [ "insert", "update" ] } )
	@Field( () => [ Weapon ] )
	public weapons: Weapon[];

	@OneToMany( () => Equipment, ( equipment: Equipment ) => equipment.owner, { cascade: [ "insert", "update" ] } )
	@Field( () => [ Equipment ] )
	public equipment: Equipment[];

	@OneToMany( () => Spell, ( spell: Spell ) => spell.owner, { cascade: [ "insert", "update" ] } )
	@Field( () => [ Spell ] )
	public spells: Spell[];

	/**
	 * Gets the proficiencyBonus of the character.
	 *
	 * @return {ProficiencyBonus} The proficiency bonus.
	 */
	@Field()
	get proficiencyBonus(): ProficiencyBonus {
		return ProficiencyBonus.forLevel( this.level );
	}
}
