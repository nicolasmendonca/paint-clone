import React, { useState, useRef } from 'react';
import './FiltrosDagger.css';
import $ from 'jquery';
import { PhotoshopPicker } from 'react-color';

const FiltrosDagger = props => {
	var translatedY = 0;
	let intervalDown;
	const [currImage, setCurrImage] = useState('');
	const carousel = useRef(null);
	const innerCarousel = useRef(null);
	const [color, setColor] = useState('#000000');
	const [size, setSize] = useState(5);
	const [colorPicker, setColorPicker] = useState(false);
	const images = [
		'https://lh3.googleusercontent.com/proxy/8SdbHCVsp6Hh2FgbeFP6VLxLaj2mzFtgXbQiiEMulnXXqWufw1bnTUi_5RTvjt5S-mGCHoc6kXLe-6YbHPV6k6GJ4OgwI4IAoL38giDM',
		'https://www.ecured.cu/images/6/68/Pein-amegakure-2.jpg',
		'https://vignette.wikia.nocookie.net/naruto/images/5/50/Valle_del_Fin_Anime.png/revision/latest?cb=20131124172845&path-prefix=es',
		'https://i.pinimg.com/originals/18/1d/b0/181db01c23b2e58058f317d28240719d.jpg',
		'https://forum-narutoes.oasgames.com/api/editor/get-img?img_name=editor%252F2017-07-01%252Fc331b3b579271ab4be1bdcca28521c31',
		'https://lh3.googleusercontent.com/proxy/8SdbHCVsp6Hh2FgbeFP6VLxLaj2mzFtgXbQiiEMulnXXqWufw1bnTUi_5RTvjt5S-mGCHoc6kXLe-6YbHPV6k6GJ4OgwI4IAoL38giDM',
		'https://www.ecured.cu/images/6/68/Pein-amegakure-2.jpg',
		'https://vignette.wikia.nocookie.net/naruto/images/5/50/Valle_del_Fin_Anime.png/revision/latest?cb=20131124172845&path-prefix=es',
		'https://i.pinimg.com/originals/18/1d/b0/181db01c23b2e58058f317d28240719d.jpg',
		'https://forum-narutoes.oasgames.com/api/editor/get-img?img_name=editor%252F2017-07-01%252Fc331b3b579271ab4be1bdcca28521c31',
	];

	function arrowUp() {
		let intervalUp;
		if (carousel.current.scrollTop > 0) {
			$('.filtros-carousel').animate(
				{ scrollTop: carousel.current.scrollTop - 320 },
				'slow'
			);
		} else if (carousel.current.scrollTop == 0) {
			$('.filtros-carousel').animate(
				{ scrollTop: carousel.current.scrollHeight },
				'slow'
			);
		}
	}

	function arrowDown() {
		let intervalUp;
		if (
			carousel.current.scrollTop >= 0 &&
			carousel.current.scrollTop + carousel.current.clientHeight !=
				carousel.current.scrollHeight
		) {
			$('.filtros-carousel').animate(
				{ scrollTop: carousel.current.scrollTop + 320 },
				'slow'
			);
		} else if (
			carousel.current.scrollTop + carousel.current.clientHeight ==
			carousel.current.scrollHeight
		) {
			$('.filtros-carousel').animate({ scrollTop: 0 }, 'slow');
		}
	}

	function add() {
		setSize(size + 1);
	}

	function rest() {
		if (size > 0) {
			setSize(size - 1);
		}
	}

	const dragStart = src => {
		setCurrImage(src);
	};

	const dragStop = e => {
		var left = e.pageX;
		var top = e.pageY;
		props.onImageClick(currImage, left, top);
	};

	return (
		<div className="filtros-holder">
			{colorPicker ? (
				<div className="color-picker">
					<PhotoshopPicker
						color={color}
						onChangeComplete={color => {
							setColor(color.hex);
							setColorPicker(false);
						}}
					/>
				</div>
			) : (
				''
			)}
			<div className="icon-holder">
				<button onClick={() => setColorPicker(!colorPicker)}>
					<i className="fas fa-paint-brush"></i>
				</button>
				<div className="color-block" style={{ backgroundColor: color }}></div>
				<div className="brush-size">
					<button onClick={rest}>
						<i className="fas fa-minus"></i>
					</button>

					<span className="brush-size-value">{size}</span>
					<button onClick={add}>
						<i className="fas fa-plus"></i>
					</button>
				</div>
			</div>
			<div className="filtros-carousel-holder">
				<button onClick={arrowUp} className="arrow-up-holder">
					<i className="fas fa-arrow-up"></i>
				</button>
				<div className="filtros-carousel" ref={carousel}>
					<div className="filtros-items-holder" ref={innerCarousel}>
						{images.map((image, i) => {
							return (
								<div key={`${image}-${i}`} className="filtro">
									<img
										draggable="true"
										onDragStart={e => dragStart(image)}
										onDragEnd={e => dragStop(e)}
										src={image}
										alt=""
									/>
								</div>
							);
						})}
					</div>
				</div>
				<button className="arrow-up-holder" onClick={arrowDown}>
					<i className="fas fa-arrow-down"></i>
				</button>
			</div>
		</div>
	);
};

export default FiltrosDagger;
