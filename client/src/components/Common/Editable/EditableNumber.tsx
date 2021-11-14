import { ChangeEventHandler, FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import "./EditableNumber.css";

export type EditableNumberProps = {
	onChange: ( value: number ) => void;
	defaultDisplayValue: number;
	defaultEditValue: number;
	minValue: number;
	maxValue: number;
}

/**
 * A number that can be modified.
 *
 * @param {EditableNumberProps} props The props.
 *
 * @return {JSX.Element} The editable number.
 */
const EditableNumber: FunctionComponent<EditableNumberProps> = (
	{ onChange, defaultEditValue, defaultDisplayValue, minValue, maxValue }: EditableNumberProps,
): JSX.Element => {
	const [ editing, setEditing ] = useState( false );
	const inputRef = useRef<HTMLInputElement>();

	const toggleEditing = useCallback( () => setEditing( ! editing ), [ editing, setEditing ] );
	const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
		( event ) => onChange( parseInt( event.target.value, 10 ) ),
		[ onChange ],
	);

	useEffect( () => {
		if ( editing ) {
			inputRef.current.focus();
		}
	}, [ editing ] );

	if ( editing ) {
		return <span className="editable-number" onBlur={ toggleEditing }>
			<input
				className="editable-number__input"
				type={ "number" }
				onChange={ handleChange }
				defaultValue={ defaultEditValue }
				min={ minValue }
				max={ maxValue }
				ref={ inputRef }
			/>
		</span>;
	}

	return <span
		className="editable-number value"
		onFocus={ toggleEditing }
		tabIndex={ 0 }
		role={ "form" }
	>
		{ defaultDisplayValue }
	</span>;
};

export default EditableNumber;
