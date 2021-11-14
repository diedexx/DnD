import { ChangeEventHandler, FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export type EditableTextProps = {
	onSave: ( value: string ) => void;
	defaultDisplayValue: string;
	defaultEditValue?: string;
}

/**
 * A text that can be modified.
 *
 * @param {EditableTextProps} props The props.
 *
 * @return {JSX.Element} The editable text.
 */
const EditableText: FunctionComponent<EditableTextProps> = (
	{ onSave, defaultEditValue, defaultDisplayValue }: EditableTextProps,
): JSX.Element => {
	const [ editing, setEditing ] = useState( false );
	const [ value, setValue ] = useState( defaultEditValue || defaultDisplayValue );
	const textareaRef = useRef<HTMLTextAreaElement>();

	const toggleEditing = useCallback( () => {
		if ( editing ) {
			onSave( value );
		}
		setEditing( ! editing );
	}, [ editing, onSave, value ] );

	const handleChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
		( event ) => setValue( event.target.value ),
		[ setValue ],
	);

	useEffect( () => {
		if ( editing ) {
			textareaRef.current.focus();
		}
	}, [ editing ] );

	if ( editing ) {
		return <div className="editable-text" onBlur={ toggleEditing }>
			<TextareaAutosize
				className="editable-text__textarea"
				onChange={ handleChange }
				defaultValue={ defaultEditValue || defaultDisplayValue }
				ref={ textareaRef }
			/>
		</div>;
	}

	return <div
		className="editable-text value"
		onFocus={ toggleEditing }
		tabIndex={ 0 }
		role={ "form" }
	>
		{ defaultDisplayValue }
	</div>;
};

export default EditableText;
