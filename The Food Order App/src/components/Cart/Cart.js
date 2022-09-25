import React, { useContext } from 'react';
import classes from './Cart.module.css';
import Modal from './../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

function Cart(props) {
	const cartContext = useContext(CartContext);

	const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;

	const addCartItemHandler = (item) => {
		cartContext.addItem({ ...item, amount: 1 });
	};
	const removeCartItemHandler = (id) => {
		cartContext.removeItem(id);
	};

	return (
		<Modal onClose={props.onClose}>
			<ul className={classes['cart-items']}>
				{cartContext.items.map((item) => (
					<CartItem
						key={item.id}
						{...item}
						onAdd={addCartItemHandler.bind(null, item)}
						onRemove={removeCartItemHandler.bind(null, item.id)}
					/>
				))}
			</ul>
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button className={classes['button--alt']} onClick={props.onClose}>
					Close
				</button>
				{cartContext.items.length > 0 && (
					<button className={classes.button}>Order</button>
				)}
			</div>
		</Modal>
	);
}

export default Cart;
