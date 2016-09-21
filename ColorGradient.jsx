import React, { PropTypes }  from 'react';

const ColorGradient = React.createClass({

    propTypes: {
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
        direction: PropTypes.string,
        title: PropTypes.string
    },

    render: function() {
        var direction = 'to left';
        var style = {};
        switch (this.props.direction) {
            case 'top':
                direction = 'to top';
                style.height = '16rem';
                break;
            case 'bottom':
                direction = 'to bottom';
                style.height = '16rem';
                break;
            case 'right':
                direction = 'to right';
                style.height = '4rem';
                break;
            default:
                style.height = '4rem';
        }
        style.background = `linear-gradient(${direction},  ${this.props.start} 0%, ${this.props.end} 100%)`;
        var title = this.props.title ? <h3>{this.props.title}</h3> : '';
        return (
            <div className="color-gradient">
                {title}
                <div style={style}></div>
            </div>
        )
    }
});

export default ColorGradient;
