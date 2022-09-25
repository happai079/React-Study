import React, { useContext, useEffect, useState } from 'react';
import classes from './HeaderCartButton.module.css';
import CartIcon from './../Cart/CartIcon';
import CartContext from '../../store/cart-context';

function HeaderCartButton(props) {
	const [btnIsHiglighted, setBtnIsHighlighted] = useState(false);
	const cartContext = useContext(CartContext);

	const numberOfCartItems = cartContext.items.reduce((curNumber, item) => {
		return curNumber + item.amount;
	}, 0);

	// 장바구니 항목수 변경시 버튼에 애니메이션 효과
	const { items } = cartContext;
	const btnClasses = `${classes.button} ${btnIsHiglighted ? classes.bump : ''}`;

	useEffect(() => {
		if (items.length === 0) {
			return;
		}
		setBtnIsHighlighted(true);

		// 애니메이션 끝난 후 클래스 삭제
		const timer = setTimeout(() => {
			setBtnIsHighlighted(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
}

export default HeaderCartButton;
