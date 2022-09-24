import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

function Backdrop(props) {
	return <div className={classes.backdrop} onClick={props.onClose} />;
}

function ModalOverlay(props) {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{props.children}</div>
		</div>
	);
}

function Modal(props) {
	const portalElement = document.getElementById('overlays');
	return (
		<React.Fragment>
			{ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
			{ReactDOM.createPortal(
				<ModalOverlay>{props.children}</ModalOverlay>,
				portalElement
			)}
		</React.Fragment>
	);
}

export default Modal;
