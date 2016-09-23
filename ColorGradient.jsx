import React, { PropTypes }  from 'react';

const ColorGradient = React.createClass({

    context: null,

    propTypes: {
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
        direction: PropTypes.string,
        title: PropTypes.string,
        onMouseDown: PropTypes.func,
        onMouseUp: PropTypes.func
    },

    drawGradient: function(width, height) {
        const ctx = this.context;
        const gradient = ctx.createLinearGradient(0,height/2,width,height/2);
        gradient.addColorStop(0, this.props.start);
        gradient.addColorStop(1, this.props.end);
        ctx.fillStyle = gradient;
        ctx.fillRect(0,0,width, height);
    },

    onMouseDown: function(e) {
        const ctx = this.context;
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        const pixelData = ctx.getImageData(x, y, 1, 1);
        if (typeof this.props.onMouseDown === 'function') {
            this.props.onMouseDown(e, pixelData);
        }
    },

    onMouseUp: function(e) {
        if (typeof this.props.onMouseUp === 'function') {
            this.props.onMouseUp(e);
        }
    },

    updateCanvas: function() {
        const canvas = this.refs.canvas;
        const height = canvas.clientHeight;
        const width = canvas.clientWidth;
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        this.context = canvas.getContext('2d');
        return {
            width: width,
            height: height
        };
    },

    componentDidMount: function() {
        const sizes = this.updateCanvas();
        this.drawGradient(sizes.width, sizes.height);
    },

    componentDidUpdate: function() {
        const sizes = this.updateCanvas();
        this.drawGradient(sizes.width, sizes.height);
    },

    render: function() {
        const title = this.props.title ? <h3>{this.props.title}</h3> : '';
        const component = this;
        return (
            <div className="color-gradient">
                {title}
                <canvas
                    ref="canvas"
                    onMouseDown={component.onMouseDown}
                    onMouseUp={component.onMouseUp}
                />
            </div>
        )
    }
});

export default ColorGradient;
