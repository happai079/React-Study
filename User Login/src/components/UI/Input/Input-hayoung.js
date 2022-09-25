import React, { useImperativeHandle, useRef } from 'react';
import classes from './Input.module.css';

function Input(props, ref) {
	const inputRef = useRef();

	const activate = () => {
		inputRef.current.focus();
	};

	// useImperativeHandle: 부모 컴포넌트에서 사용하는 ref를 커스텀할 수 있다.
	useImperativeHandle(ref, () => {
		return {
			focus: activate,
		};
	});

	return (
		<div
			className={`${classes.control} ${
				props.isValid === false ? classes.invalid : ''
			}`}
		>
			<label htmlFor={props.id}>{props.label}</label>
			<input
				ref={inputRef}
				type={props.id}
				id={props.id}
				value={props.value}
				onChange={props.onChange}
				onBlur={props.onBlur}
			/>
		</div>
	);
}

export default React.forwardRef(Input);
