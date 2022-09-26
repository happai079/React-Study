import React, { useCallback, useMemo, useState } from 'react';

import './App.css';
import DemoList from './components/Demo/DemoList';
import DemoOutput from './components/Demo/DemoOutput';
import Button from './components/UI/Button/Button';

function App() {
	// const [showParagraph, setShowParagraph] = useState(false);
	// const [allowToggle, setAllowToggle] = useState(false);

	// const toggleParagraphHandler = useCallback(() => {
	// 	if (allowToggle) {
	// 		setShowParagraph((prev) => !prev);
	// 	}
	// }, [allowToggle]);

	// const allowToggleHandler = () => {
	// 	setAllowToggle(true);
	// };

	const [listTitle, setListTitle] = useState('My List');

	const changeTitleHandler = useCallback(() => {
		setListTitle('New Title');
	}, []);

	const listItems = useMemo(() => [5, 3, 1, 10, 9], []);

	console.log('APP RUNNING');

	return (
		<div className="app">
			<DemoList title={listTitle} items={listItems} />
			<Button onClick={changeTitleHandler}>Change List Title</Button>
			{/* <h1>Hi there</h1>
			<DemoOutput show={showParagraph} />
			<Button onClick={allowToggleHandler}>Allow Toggling</Button>
			<Button onClick={toggleParagraphHandler}>Toggle Paragraph</Button> */}
		</div>
	);
}

export default App;
