import React, { PropTypes }  from 'react';

const ColorGradient = React.createClass({

    propTypes: {
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired
    },

    render: function() {
        var style =  {
            background: `linear-gradient(to left,  ${this.props.start} 0%, ${this.props.end} 100%)`,
            width: '400px',
            height: '80px'
        };
        return (
            <div style={style}></div>
        )
    }
});

export default ColorGradient;
