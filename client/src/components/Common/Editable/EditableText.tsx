import { ChangeEventHandler, FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import "./EditableText.css";

export type EditableTextProps = {
	onSave: ( value: string ) => void;
	defaultEditValue: string;
	defaultDisplayValue?: string;
	saveUnchanged?: boolean;
}

/**
 * A text that can be modified.
 *
 * @param {EditableTextProps} props The props.
 *
 * @return {JSX.Element} The editable text.
 */
const EditableText: FunctionComponent<EditableTextProps> = (
	{ onSave, defaultEditValue, defaultDisplayValue, saveUnchanged }: EditableTextProps,
): JSX.Element => {
	const [ editing, setEditing ] = useState( false );
	const [ value, setValue ] = useState( "" );

	const textareaRef = useRef<HTMLTextAreaElement>();

	const toggleEditing = useCallback( () => {
		if ( ! editing ) {
			setValue( defaultEditValue );
		}
		if ( editing ) {
			const valueChanged = value !== defaultEditValue;
			if ( valueChanged || saveUnchanged ) {
				onSave( value );
			}
		}
		setEditing( ! editing );
	}, [ defaultEditValue, editing, onSave, saveUnchanged, value ] );

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
		return <div className="editable-text">
			<TextareaAutosize
				onBlur={ toggleEditing }
				className="editable-text__textarea value"
				onChange={ handleChange }
				defaultValue={ value }
				ref={ textareaRef }
			/>
		</div>;
	}

	return <div
		className="editable-text value editable-text__display"
		onFocus={ toggleEditing }
		tabIndex={ 0 }
		role={ "form" }
	>
		{ defaultDisplayValue || defaultEditValue }
	</div>;
};

EditableText.defaultProps = {
	saveUnchanged: false,
};

export default EditableText;
