import React, { useRef, useEffect } from 'react';
import './Drawer.scss';

const DrawerComponent = ({ lineWidth, color }) => {
	const canvasRef = useRef(null);
	let context = useRef(null);
	let isDrawing = useRef(false);

	useEffect(() => {
		/** @param {MouseEvent} e */
		const draw = e => {
			if (!isDrawing.current || !context.current) return;

			context.current.lineWidth = lineWidth;
			context.current.strokeStyle = color;
			context.current.lineCap = 'round';
			context.current.lineTo(e.x, e.y);
			context.current.stroke();
			context.current.beginPath();
			context.current.moveTo(e.x, e.y);
		};

		/** @param {MouseEvent} e */
		const startDrawing = e => {
			isDrawing.current = true;
			draw(e);
		};

		const stopDrawing = () => {
			if (!context) return;
			isDrawing.current = false;
			context.current.beginPath();
		};

		if (!canvasRef.current) return;
		let currentCanvasRef = canvasRef.current;
		context.current = canvasRef.current.getContext('2d');
		currentCanvasRef.addEventListener('mousedown', startDrawing);
		currentCanvasRef.addEventListener('mouseup', stopDrawing);
		currentCanvasRef.addEventListener('mousemove', draw);

		return () => {
			if (!currentCanvasRef) return;
			currentCanvasRef.removeEventListener('mousedown', startDrawing);
			currentCanvasRef.removeEventListener('mouseup', stopDrawing);
			currentCanvasRef.removeEventListener('mousemove', draw);
		};
	}, [canvasRef, color, lineWidth]);

	return (
		<div className="Drawer">
			<canvas ref={canvasRef} width={800} height={600} />
		</div>
	);
};

export default DrawerComponent;
