import React, { useReducer } from 'react';
import CartContext from './cart-context';

// cart reducer
const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === 'ADD') {
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;

		// 기존 항목에 이미 추가할 아이템이 들어있는지 확인
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);

		const existingCartItem = state.items[existingCartItemIndex];
		let updatedItems;

		if (existingCartItem) {
			// 이미 존재하는 아이템이면 amount 추가하기
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};
			// 기존 state 복사 후 업데이트
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			// 처음 추가되는 아이템이면
			updatedItems = state.items.concat(action.item);
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	if (action.type === 'REMOVE') {
		// 기존 항목에 아이템이 들어있는지 확인
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.id
		);

		const existingCartItem = state.items[existingCartItemIndex];
		const updatedTotalAmount = state.totalAmount - existingCartItem.price;
		let updatedItems;

		if (existingCartItem.amount === 1) {
			// 기존 아이템의 개수의 1개라면 항목 지우기
			updatedItems = state.items.filter((item) => item.id !== action.id);
		} else {
			// 아니면 아이템 개수만 -1
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount - 1,
			};

			// 기존 state 복사 후 업데이트
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	return defaultCartState;
};

function CartProvider(props) {
	// cart reducer 사용
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);
	const addItemToCart = (item) => {
		dispatchCartAction({ type: 'ADD', item: item });
	};
	const removeItemToCart = (id) => {
		dispatchCartAction({ type: 'REMOVE', id: id });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCart,
		removeItem: removeItemToCart,
	};
	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
}

export default CartProvider;
