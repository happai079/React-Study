import React, { useCallback, useState } from 'react';

import './App.css';
import DemoOutput from './components/Demo/DemoOutput';
import Button from './components/UI/Button/Button';

function App() {
	const [showParagraph, setShowParagraph] = useState(false);
	const [allowToggle, setAllowToggle] = useState(false);

	const toggleParagraphHandler = useCallback(() => {
		if (allowToggle) {
			setShowParagraph((prev) => !prev);
		}
	}, [allowToggle]);

	const allowToggleHandler = () => {
		setAllowToggle(true);
	};

	console.log('APP RUNNING');
	return (
		<div className="app">
			<h1>Hi there</h1>
			<DemoOutput show={showParagraph} />
			<Button onClick={allowToggleHandler}>Allow Toggling</Button>
			<Button onClick={toggleParagraphHandler}>Toggle Paragraph</Button>
		</div>
	);
}

export default App;
