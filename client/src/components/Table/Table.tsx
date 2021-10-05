import { get } from "lodash";
import { FunctionComponent, ReactNode } from "react";
import "./Table.css";

export type Heading = { field?: string, name: string, renderer?: ( subject: any ) => ReactNode };
export type Object = Record<string, any>;
export type TableProps = {
	headings: Heading[];
	objects: Object[];
	defaultValue: string,
}

/**
 * Gets the value of a heading's field for an object.
 *
 * @param {Object} object The object to get the field for.
 * @param {Heading} heading The heading to the value for.
 * @param {string} defaultValue The fallback value.
 *
 * @return {any} The value.
 */
function getFieldValue( object: Object, heading: Heading, defaultValue: string ): any {
	if ( ! heading.field ) {
		return object;
	}
	return get( object, heading.field, defaultValue );
}

/**
 * Renders a table.
 *
 * @param {TableProps} props The table props.
 *
 * @return {JSX.Element} The table
 */
const Table: FunctionComponent<TableProps> = ( { headings, objects, defaultValue }: TableProps ): JSX.Element => {
	const headingElements = [];
	for ( const [ key, heading ] of Object.entries( headings ) ) {
		headingElements.push( <th key={ key }>{ heading.name }</th> );
	}
	const rows = [];
	for ( const [ objectKey, object ] of Object.entries( objects ) ) {
		const columnElements = [];
		for ( const [ headingKey, heading ] of Object.entries( headings ) ) {
			const renderer = heading.renderer || ( x => x );
			columnElements.push(
				<td key={ objectKey + headingKey }>
					{ renderer( getFieldValue( object, heading, defaultValue ) ) }
				</td>,
			);
		}
		rows.push(
			<tr key={ objectKey }>
				{ columnElements }
			</tr>,
		);
	}

	return <table className="table">
		<thead>
			<tr>
				{ headingElements }
			</tr>
		</thead>
		<tbody>
			{ rows }
		</tbody>
	</table>;
};

export default Table;
