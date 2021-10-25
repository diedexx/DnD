import { Field, Int } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import BaseEntity from "../../../Base.entity";
import Character from "../../character/entities/Character.entity";
import SpellLevel from "../values/SpellLevel.value";
import SpellSlot from "../values/SpellSlot.value";
import SpellSlotPoolValue from "../values/SpellSlotPool.value";

@Entity()
export default class SpellSlotPool extends BaseEntity {
	@Column()
	private firstLevelSpells: number;
	@Column()
	private firstLevelSpellLimit: number;

	@Column()
	private secondLevelSpells: number;
	@Column()
	private secondLevelSpellLimit: number;

	@Column()
	private thirdLevelSpells: number;
	@Column()
	private thirdLevelSpellLimit: number;

	@Column()
	private fourthLevelSpells: number;
	@Column()
	private fourthLevelSpellLimit: number;

	@Column()
	private fifthLevelSpells: number;
	@Column()
	private fifthLevelSpellLimit: number;

	@Column()
	private sixthLevelSpells: number;
	@Column()
	private sixthLevelSpellLimit: number;

	@Column()
	private seventhLevelSpells: number;
	@Column()
	private seventhLevelSpellLimit: number;

	@Column()
	private eightLevelSpells: number;
	@Column()
	private eightLevelSpellLimit: number;

	@Column()
	private ninthLevelSpells: number;
	@Column()
	private ninthLevelSpellLimit: number;

	@OneToOne( () => Character, ( character: Character ) => character.spellSlotPool )
	@Field( () => Character )
	@JoinColumn()
	public owner: Character;

	@Column()
	@RelationId( ( spellSlotPool: SpellSlotPool ) => spellSlotPool.owner )
	@Field( () => Int )
	public readonly ownerId: number;

	/**
	 * Gets the value object for the SpellSlotPool.
	 *
	 * @return {SpellSlotPool} The value object.
	 */
	@Field()
	public get value(): SpellSlotPoolValue {
		return new SpellSlotPoolValue(
			[
				new SpellSlot( new SpellLevel( 1 ), this.firstLevelSpellLimit, this.firstLevelSpells ),
				new SpellSlot( new SpellLevel( 2 ), this.secondLevelSpellLimit, this.secondLevelSpells ),
				new SpellSlot( new SpellLevel( 3 ), this.thirdLevelSpellLimit, this.thirdLevelSpells ),
				new SpellSlot( new SpellLevel( 4 ), this.fourthLevelSpellLimit, this.fourthLevelSpells ),
				new SpellSlot( new SpellLevel( 5 ), this.fifthLevelSpellLimit, this.fifthLevelSpells ),
				new SpellSlot( new SpellLevel( 6 ), this.sixthLevelSpellLimit, this.sixthLevelSpells ),
				new SpellSlot( new SpellLevel( 7 ), this.seventhLevelSpellLimit, this.seventhLevelSpells ),
				new SpellSlot( new SpellLevel( 8 ), this.eightLevelSpellLimit, this.eightLevelSpells ),
				new SpellSlot( new SpellLevel( 9 ), this.ninthLevelSpellLimit, this.ninthLevelSpells ),
			],
		);
	}

	/**
	 * Update the entity value based on the value object.
	 *
	 * @param {SpellSlotPool} value The value object.
	 */
	public set value( value: SpellSlotPoolValue ) {
		const levels: Map<number, string> = new Map( [
			[ 1, "first" ],
			[ 2, "second" ],
			[ 3, "third" ],
			[ 4, "fourth" ],
			[ 5, "fifth" ],
			[ 6, "sixth" ],
			[ 7, "seventh" ],
			[ 8, "eight" ],
			[ 9, "ninth" ],
		] );
		for ( const [ level, propertyPrefix ] of levels ) {
			this.updateSpellSlot( value.getSpellSlot( new SpellLevel( level ) ), propertyPrefix );
		}
	}

	/**
	 * Updates the properties for a particular spell slot.
	 *
	 * @param {SpellSlot} spellSlot The spell slot to update the values for.
	 * @param {string} propertyPrefix The prefix of the properties that store information about the spellslot.
	 *
	 * @return {void}
	 *
	 * @private
	 */
	private updateSpellSlot( spellSlot: SpellSlot, propertyPrefix: string ): void {
		this[ propertyPrefix + "LevelSpells" ] = spellSlot.remaining;
		this[ propertyPrefix + "LevelSpellLimit" ] = spellSlot.limit;
	}
}
