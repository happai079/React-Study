import React, { useState } from 'react';

import './App.css';
import DemoOutput from './components/Demo/DemoOutput';
import Button from './components/UI/Button/Button';

function App() {
	const [showParagraph, setShowParagraph] = useState(false);

	const toggleParagraphHandler = () => {
		setShowParagraph((prev) => !prev);
	};

	console.log('APP RUNNING');
	return (
		<div className="app">
			<h1>Hi there</h1>
			<DemoOutput show={showParagraph} />
			<Button onClick={toggleParagraphHandler}>Toggle Paragraph</Button>
		</div>
	);
}

export default App;
