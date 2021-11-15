import { characterDetailsQuery } from "./getCharacterDetails";

const takeDamage =
	`mutation TakeDamage( $characterId: Int!, $damage: Int! ) {
		takeDamage( characterId: $characterId, damage: $damage) {
			${ characterDetailsQuery }
		}
	}`;
export default takeDamage;
