import React, { PropTypes }  from 'react';

const ColorGradient = React.createClass({

    propTypes: {
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
        direction: PropTypes.string
    },

    render: function() {
        var direction = 'to left';
        switch (this.props.direction) {
            case 'right':
                direction = 'to right';
                break;
            case 'top':
                direction = 'to top';
                break;
            case 'bottom':
                direction = 'to bottom';
                break;
        }
        var style =  {
            background: `linear-gradient(${direction},  ${this.props.start} 0%, ${this.props.end} 100%)`
        };
        return (
            <div style={style} className="color-gradient"></div>
        )
    }
});

export default ColorGradient;
