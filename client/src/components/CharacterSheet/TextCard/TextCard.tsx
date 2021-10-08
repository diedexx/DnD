import { FunctionComponent } from "react";

export type TextCardProps = {
	label: string;
	text: string;
}

/**
 * Gets a card containing a text value.
 *
 * @param {string} label The label to display.
 * @param {string} text The text to display.
 *
 * @return {JSX.Element} The TextCard.
 */
const TextCard: FunctionComponent<TextCardProps> = ( { label, text }: TextCardProps ): JSX.Element => {
	return <div className="card">
		<h3>{ label }</h3>
		<p className="value">
			{ text }
		</p>
	</div>;
};

export default TextCard;
