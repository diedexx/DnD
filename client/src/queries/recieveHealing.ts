import { characterDetailsQuery } from "./getCharacterDetails";

const receiveHealing =
	`mutation ReceiveHealing( $characterId: Int!, $healing: Int! ) {
		receiveHealing( characterId: $characterId, healing: $healing) {
			${ characterDetailsQuery }
		}
	}`;
export default receiveHealing;
