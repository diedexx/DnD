import { characterDetailsQuery } from "./getCharacterDetails";

const updateTextField =
	`mutation UpdateTextField( $characterId: Int!, $property: String! $newValue: String!) {
		updateTextField( characterId: $characterId, fieldName: $property, value: $newValue) {
			${ characterDetailsQuery }
		}
	}`;
export default updateTextField;
