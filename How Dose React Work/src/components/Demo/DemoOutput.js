import React from 'react';
import MyParagraph from './MyParagraph';

function DemoOutput(props) {
	return <MyParagraph>{props.show && 'This is new!'}</MyParagraph>;
}

export default DemoOutput;
