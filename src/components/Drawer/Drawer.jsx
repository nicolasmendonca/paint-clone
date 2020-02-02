import React from 'react';
import PropTypes from 'prop-types';
import './Drawer.scss';

class Drawer extends React.Component {
	constructor(props) {
		super(props);

		this.canvasRef = React.createRef();
		this.state = {
			isDrawing: false,
			context: null,
		};
	}

	setCanvasRef = ref => {
		this.canvasRef = ref;
		ref.addEventListener('mousedown', this.startDrawing);
		ref.addEventListener('mouseup', this.stopDrawing);
		ref.addEventListener('mousemove', this.addStroke);
		this.setState({ context: ref.getContext('2d') });
	};

	addStroke = event => {
		if (!this.state.isDrawing || !this.state.context) return;
		const { context } = this.state;

		context.lineWidth = this.props.lineWidth;
		context.strokeStyle = this.props.color;
		context.lineCap = 'round';
		context.lineTo(event.x, event.y);
		context.stroke();
		context.beginPath();
		context.moveTo(event.x, event.y);
	};

	startDrawing = e => {
		this.setState({ isDrawing: true });
		this.addStroke(e);
	};

	stopDrawing = () => {
		this.setState({ isDrawing: false });
		this.state.context.beginPath();
	};

	render() {
		return (
			<div className="Drawer">
				<canvas ref={this.setCanvasRef} width={800} height={600} />
			</div>
		);
	}
}

Drawer.propTypes = {
	lineWidth: PropTypes.number,
};

Drawer.defaultProps = {
	lineWidth: 5,
	color: '#000000',
};

export default Drawer;
