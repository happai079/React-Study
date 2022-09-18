import React, { useState } from 'react';
import './Expense.css';
import Card from './../UI/Card';
import ExpenseFilter from './ExpenseFilter';
import ExpenseList from './ExpenseList';
import ExpenseChart from './ExpenseChart';

const Expense = (props) => {
	const [filter, setFilter] = useState('2020');

	const handleFilter = (selectedYear) => {
		setFilter(selectedYear);
	};

	const filteredExpenses = props.items.filter(
		(it) => it.date.getFullYear() === parseInt(filter)
	);

	return (
		<div>
			<Card className="expenses">
				<ExpenseFilter onChangeFilter={handleFilter} selected={filter} />
				<ExpenseChart expenses={filteredExpenses} />
				<ExpenseList item={filteredExpenses} />
			</Card>
		</div>
	);
};
export default Expense;
