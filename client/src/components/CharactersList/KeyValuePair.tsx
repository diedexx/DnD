import { FunctionComponent } from "react";
import "./KeyValuePair.css";

export type KeyValuePairProps = {
	valueKey: string,
	value: string,
}

/**
 * Displays a key-value pair.
 *
 * @param {string} valueKey The key.
 * @param {string} value The value.
 *
 * @return {JSX.Element} The key value pair.
 */
const KeyValuePair: FunctionComponent<KeyValuePairProps> = ( { valueKey, value }: KeyValuePairProps ): JSX.Element => {
	return <div className="keyValuePair">
		<span className="keyValuePair_key">{ valueKey }</span>
		<span className="keyValuePair_value">{ value }</span>
	</div>;
};
export default KeyValuePair;
