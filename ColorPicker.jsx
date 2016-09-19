import React, { PropTypes }  from 'react';

const ColorPicker = React.createClass({

    propTypes: {
        name: PropTypes.string.isRequired,
        onColor: PropTypes.func.isRequired
    },

    onColorChange: function(event) {
        this.props.onColor(this.props.name, event.target.value);
    },

    render: function() {
        return (
            <div>
                <label>{this.props.name}</label>
                <input
                    type="color"
                    onChange={this.onColorChange}/>
            </div>
        )
    }
});

export default ColorPicker;
