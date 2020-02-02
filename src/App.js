import React, { useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import FiltrosDragger from './components/filtros-dragger/FiltrosDragger';

function App() {
	const contenido = useRef(null);
	const handleImageClicked = (image, xPos, yPos) => {
		const newImage = document.createElement('img');
		newImage.setAttribute('src', image);
		yPos += 'px';
		xPos += 'px';
		newImage.setAttribute(
			'style',
			`position:absolute;top:${yPos};left:${xPos};width:300px;transform:translate3D(-50%,-50%,0);z-index: -5;`
		);
		// document.getElementById('asdsa').append
		contenido.current.append(newImage);
		// contenido.current.append(`
		//   <img src="${image}" style="position:absolute;top:${yPos};left:${xPos};width:300px;"/>
		// `);
	};
	return (
		<div className="App" ref={contenido}>
			<FiltrosDragger onImageClick={handleImageClicked} />
		</div>
	);
}

export default App;
