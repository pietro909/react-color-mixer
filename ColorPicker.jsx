import React, { PropTypes }  from 'react';

const ColorPicker = React.createClass({

    propTypes: {
        name: PropTypes.string.isRequired,
        color: PropTypes.string,
        onColor: PropTypes.func.isRequired
    },

    onColorChange: function(event) {
        this.props.onColor(this.props.name, event.target.value);
    },

    render: function() {
        return (
            <div className="color-picker">
                <label>{this.props.name}</label>
                <input
                    type="color"
                    value={this.props.color}
                    onChange={this.onColorChange}/>
            </div>
        )
    }
});

export default ColorPicker;
