import { FunctionComponent, ReactNode } from "react";

export type HeadingCartProps = {
	heading: string;
	className?: string;
	children: ReactNode;
}

/**
 * Adds a heading to a child component.
 * @param {string} heading The heading
 * @param {string | undefined} className The classname for the containing div.
 * @param {ReactNode} children Any child components to render the heading for.
 *
 * @return {JSX.Element} The component.
 */
const HeadingCard: FunctionComponent<HeadingCartProps> = (
	{
		className,
		heading,
		children,
	}: HeadingCartProps ): JSX.Element => {
	return <div className={ className }>
		<h3>{ heading }</h3>
		{ children }
	</div>;
};

HeadingCard.defaultProps = {
	className: "card",
};

export default HeadingCard;
