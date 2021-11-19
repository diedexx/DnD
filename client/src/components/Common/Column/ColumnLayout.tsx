import { FunctionComponent, ReactNode } from "react";
import "./ColumnLayout.css";

export type ColumnLayoutProps = {
	children: ReactNode;
	wrap?: boolean;
	center?: boolean;
	className?: string;
}

/**
 * A layout consisting of multiple columns.
 *
 * @param {ReactNode} children The column elements.
 * @param {string | undefined} className An optional className.
 * @param {boolean | undefined} wrap Whether the columns should wrap if the container is too small.
 * @param {boolean | undefined} center Whether to center this container.
 *
 * @return {JSX.Element} The column layout container.
 */
const ColumnLayout: FunctionComponent<ColumnLayoutProps> = (
	{ className, children, wrap, center }: ColumnLayoutProps,
): JSX.Element => {
	const classes = [ "column-layout", className ];
	if ( wrap ) {
		classes.push( "column-layout--wrapped" );
	}
	if ( center ) {
		classes.push( "column-layout--center" );
	}
	return <div className={ classes.join( " " ) }>
		{ children }
	</div>;
};

ColumnLayout.defaultProps = {
	wrap: false,
	center: false,
	className: "",
};

export default ColumnLayout;

export type ColumnProps = {
	children: ReactNode;
	grow?: boolean;
	big?: boolean;
}

/**
 * A single column.
 *
 * @param {ReactNode} children The content of the column.
 * @param {boolean | undefined} grow Whether the column should grow if there is room to grow.
 * @param {boolean | undefined} big Whether to grow more than its siblings.
 *
 * @return {JSX.Element} The column.
 */
export const Column: FunctionComponent<ColumnProps> = ( { children, grow, big }: ColumnProps ): JSX.Element => {
	const classes = [ "column-layout__column" ];
	if ( grow ) {
		classes.push( "column-layout__column--grow" );
	}
	if ( big ) {
		classes.push( "column-layout__column--big" );
	}
	return <div className={ classes.join( " " ) }>
		{ children }
	</div>;
};

Column.defaultProps = {
	grow: true,
	big: false,
};
