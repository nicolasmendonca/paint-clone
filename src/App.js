import React from 'react';
import './App.css';
import Drawer from './components/Drawer/Drawer';

function App() {
	const [color, setColor] = React.useState('#000000');
	const [size, setSize] = React.useState(5);
	const changeColor = e => {
		setColor(e.target.value);
	};
	return (
		<div className="App">
			<Drawer color={color} lineWidth={size} />
			<button onClick={() => setSize(size + 1)}>+</button>
			<button onClick={() => setSize(Math.max(1, size - 1))}>-</button>
			<input type="color" onChange={changeColor} />
		</div>
	);
}

export default App;
