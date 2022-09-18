import React from 'react';
import './ExpenseList.css';
import ExpenseItem from './ExpenseItem';

const ExpenseList = (props) => {
	if (props.item.length === 0) {
		return <h2 className="expenses-list__fallback">Found no expneses.</h2>;
	}

	return (
		<ul className="expenses-list">
			{props.item.map((it) => (
				<ExpenseItem key={it.id} {...it} />
			))}
		</ul>
	);
};

export default ExpenseList;
