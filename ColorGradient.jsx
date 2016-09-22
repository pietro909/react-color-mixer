import React, { PropTypes }  from 'react';

const ColorGradient = React.createClass({

    context: null,

    propTypes: {
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
        direction: PropTypes.string,
        title: PropTypes.string,
        onPixelSelected: PropTypes.func,
        onMouseUp: PropTypes.func
    },

    drawGradient: function() {
        var ctx = this.context;
        var gradient = ctx.createLinearGradient(0,100,200,100);
        gradient.addColorStop(0, this.props.start);
        gradient.addColorStop(1, this.props.end);
        ctx.fillStyle = gradient;
        ctx.fillRect(10,10,200,100);
    },

    onMouseDown: function(e) {
        var ctx = this.context;
        var x = e.nativeEvent.offsetX;
        var y = e.nativeEvent.offsetY;
        var pixelData = ctx.getImageData(x, y, 1, 1);
        if (typeof this.props.onPixelSelected === 'function') {
            this.props.onPixelSelected(e, pixelData);
        }
        console.log(`${x}, ${y}`);
    },

    componentDidMount: function() {
        var canvas = this.refs.canvas;
        this.context = canvas.getContext('2d');
        this.drawGradient();
    },

    componentDidUpdate: function() {
        var canvas = this.refs.canvas;
        this.context = canvas.getContext('2d');
        this.drawGradient();
    },

    render: function() {
        // var direction = 'to left';
        var height = 200, width = 200;
        // switch (this.props.direction) {
        //     case 'top':
        //         direction = 'to top';
        //         style.height = '16rem';
        //         break;
        //     case 'bottom':
        //         direction = 'to bottom';
        //         style.height = '16rem';
        //         break;
        //     case 'right':
        //         direction = 'to right';
        //         style.height = '4rem';
        //         break;
        //     default:
        //         style.height = '4rem';
        // }

        // todo: put a DIV as elastic container, then measure it and append a CANVAS with right size

        var title = this.props.title ? <h3>{this.props.title}</h3> : '';
        var component = this;
        return (
            <div className="color-gradient">
                {title}
                <canvas
                    width={width}
                    height={height}
                    ref="canvas"
                    onMouseDown={component.onMouseDown}
                    onMouseUp={component.props.onMouseUp}
                />
            </div>
        )
    }
});

export default ColorGradient;
