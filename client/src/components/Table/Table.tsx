import { get } from "lodash";
import { FunctionComponent } from "react";
import "./Table.css";

export type Heading = { field: string, name: string };
export type Object = Record<string, any>;
export type TableProps = {
	headings: Heading[];
	objects: Object[];
	defaultValue: string,
}

/**
 * Renders a table.
 *
 * @param {TableProps} props The table props.
 *
 * @return {JSX.Element} The table
 */
const Table: FunctionComponent<TableProps> = ( props: TableProps ): JSX.Element => {
	const headings = [];
	for ( const [ key, heading ] of Object.entries( props.headings ) ) {
		headings.push( <th key={ key }>{ heading.name }</th> );
	}
	const rows = [];
	for ( const [ objectKey, object ] of Object.entries( props.objects ) ) {
		const columns = [];
		for ( const [ headingKey, heading ] of Object.entries( props.headings ) ) {
			columns.push(
				<td key={ objectKey + headingKey }>
					{ get( object, heading.field, props.defaultValue ) }
				</td>,
			);
		}
		rows.push(
			<tr key={ objectKey }>
				{ columns }
			</tr>,
		);
	}

	return <table className="table">
		<thead>
			<tr>
				{ headings }
			</tr>
		</thead>
		<tbody>
			{ rows }
		</tbody>
	</table>;
};

export default Table;
