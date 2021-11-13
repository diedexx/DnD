import { ChangeEventHandler, FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import "./EditableNumber.css";

export type EditableProps = {
	onChange: ( value: number ) => void;
	defaultDisplayValue: number;
	defaultEditValue: number;
	minValue: number;
	maxValue: number;
}

/**
 * A number that can be modified.
 *
 * @param {EditableProps} props The props.
 *
 * @return {JSX.Element} The editable number.
 */
const EditableNumber: FunctionComponent<EditableProps> = (
	{ onChange, defaultEditValue, defaultDisplayValue, minValue, maxValue }: EditableProps,
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
		return <span
			className="editable-number"
			onBlur={ toggleEditing }
		>
			<input
				className="editable-number__input"
				defaultValue={ defaultEditValue }
				min={ minValue }
				max={ maxValue }
				onChange={ handleChange }
				type={ "number" }
				ref={ inputRef }
			/>
		</span>;
	}

	return <span
		className="editable-number"
		onFocus={ toggleEditing }
		tabIndex={ 0 }
		role={ "form" }
	>
		{ defaultDisplayValue }
	</span>;
};

export default EditableNumber;
