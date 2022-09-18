import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = (props) => {
	const [isClicked, setIsClicked] = useState(false);

	const saveExpenseDataHandler = (enteredExpenseData) => {
		const expenseData = {
			...enteredExpenseData,
			id: Math.random().toString(),
		};
		props.onAddExpense(expenseData);
	};

	return (
		<div className="new-expense">
			{isClicked ? (
				<ExpenseForm
					onSaveExpenseData={saveExpenseDataHandler}
					setIsClicked={setIsClicked}
				/>
			) : (
				<button onClick={() => setIsClicked(true)}>Add New Expense</button>
			)}
		</div>
	);
};

export default NewExpense;
