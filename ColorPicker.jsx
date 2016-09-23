import React, { PropTypes }  from 'react';

const ColorPicker = React.createClass({

    propTypes: {
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        color: PropTypes.string,
        onColor: PropTypes.func.isRequired
    },

    onColorChange: function(event) {
        this.props.onColor(this.props.name, event.target.value);
    },

    render: function() {
        return (
            <div className="color-picker">
                <label>{this.props.label}</label>
                <input
                    type="color"
                    value={this.props.color}
                    onChange={this.onColorChange}/>
                <p style={{ color: this.props.color }}>
                    {this.props.color}
                </p>
            </div>
        )
    }
});

export default ColorPicker;
