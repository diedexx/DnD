import { FunctionComponent } from "react";

export type TextValueDisplayProps = {
	text: string;
}

/**
 * Displays a long piece of text.
 *
 * @param {string} text The text to display.
 *
 * @return {JSX.Element} The TextCard.
 */
const TextValueDisplay: FunctionComponent<TextValueDisplayProps> = ( { text }: TextValueDisplayProps ): JSX.Element => {
	return <div>
		<p className="value">
			{ text }
		</p>
	</div>;
};

export default TextValueDisplay;
