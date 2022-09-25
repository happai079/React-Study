import React, {
	useContext,
	useEffect,
	useReducer,
	useRef,
	useState,
} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../store/auth-contexxt';
import Input from '../UI/Input/Input';

// email reducer function
const emailReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.includes('@') };
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.includes('@') };
	}
	return { value: '', isValid: false };
};

// password reducer function
const passwordReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.trim().length > 6 };
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.trim().length > 6 };
	}
	return { value: '', isValid: false };
};

const Login = (props) => {
	const [formIsValid, setFormIsValid] = useState(false);

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: null,
	});

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: '',
		isValid: null,
	});

	const authCtx = useContext(AuthContext);

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	// 유효성이 바뀔 때만 effect 발생하도록 isValid만 따로 destructuring
	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsValid } = passwordState;

	// enteredEmail과 enteredPassword가 변동될 때마다 함수 실행
	useEffect(() => {
		// 키 입력 기다렸다가 한번에 검증
		const identifier = setTimeout(() => {
			console.log('Checking form validity!');
			setFormIsValid(emailIsValid && passwordIsValid);
		}, 500);

		// cleanup function: 키 입력이 있을 때마다 위에 설정한 타이머를 clear
		return () => {
			console.log('cleanup');
			clearTimeout(identifier);
		};
	}, [emailIsValid, passwordIsValid]);

	// reducer 사용
	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' });
	};

	const validatePasswordHandler = () => {
		dispatchPassword({ type: 'INPUT_BLUR' });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		if (formIsValid) {
			authCtx.onLogin(emailState.value, passwordState.value);
		} else if (!emailIsValid) {
			emailInputRef.current.focus();
		} else {
			passwordInputRef.current.focus();
		}
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					ref={emailInputRef}
					id="email"
					label="E-Mail"
					isValid={emailIsValid}
					value={emailState.value}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
				/>
				<Input
					ref={passwordInputRef}
					id="password"
					label="Password"
					isValid={passwordIsValid}
					value={passwordState.value}
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}
				/>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
