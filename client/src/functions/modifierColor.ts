import ColorHash from "color-hash";
import ExternalModifierInterface from "../interfaces/ExternalModifier.interface";

/**
 * Gets a generated color for a string value. Gets the same result every time.
 *
 * @param {ExternalModifierInterface} modifier The modifier to get the color for.
 *
 * @return {string} The color hex code.
 */
export default function getModifierColor( modifier: ExternalModifierInterface ): string {
	return new ColorHash().hex( modifier.source );
}
