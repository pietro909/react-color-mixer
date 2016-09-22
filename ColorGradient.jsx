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
        var ctx = this.context;
        var gradient = ctx.createLinearGradient(0,height/2,width,height/2);
        gradient.addColorStop(0, this.props.start);
        gradient.addColorStop(1, this.props.end);
        ctx.fillStyle = gradient;
        ctx.fillRect(0,0,width, height);
    },

    onMouseDown: function(e) {
        var ctx = this.context;
        var x = e.nativeEvent.offsetX;
        var y = e.nativeEvent.offsetY;
        var pixelData = ctx.getImageData(x, y, 1, 1);
        if (typeof this.props.onMouseDown === 'function') {
            this.props.onMouseDown(e, pixelData);
        }
        console.log(`${x}, ${y}`);
    },

    onMouseUp: function(e) {
        console.log('UP');
        if (typeof this.props.onMouseUp === 'function') {
            this.props.onMouseUp(e);
        }
    },

    updateCanvas: function() {
        var canvas = this.refs.canvas;
        var height = canvas.clientHeight;
        var width = canvas.clientWidth;
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        this.context = canvas.getContext('2d');
        return {
            width: width,
            height: height
        };
    },

    componentDidMount: function() {
        var sizes = this.updateCanvas();
        this.drawGradient(sizes.width, sizes.height);
    },

    componentDidUpdate: function() {
        var sizes = this.updateCanvas();
        this.drawGradient(sizes.width, sizes.height);
    },

    render: function() {
        var title = this.props.title ? <h3>{this.props.title}</h3> : '';
        var component = this;
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
