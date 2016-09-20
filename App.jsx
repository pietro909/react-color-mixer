import React from 'react';
import ColorPicker from './ColorPicker.jsx';
import ColorGradient from './ColorGradient.jsx';
import Color from 'color';

const App = React.createClass({

    getInitialState: function() {
        var colorA = Color('#FF0000');
        var colorB = Color('#00FF00');

        return {
            colors: [
                {
                    name: 'A',
                    color: colorA.hexString(),
                    complementary: colorA.rotate(180).hexString()
                },
                {
                    name: "B",
                    color: colorB.hexString(),
                    complementary: colorB.rotate(180).hexString()
                }
            ]
        }
    },

    onColor: function(name, color) {
        this.setState(function(previousState, currentProps) {
            var element = previousState.colors.find(function (obj) {
                return obj.name === name;
            });
            if (element) {
                element.color = color;
                element.complementary = Color(color).rotate(180).hexString();
            }
            return previousState;
        });
    },

    render: function() {
        var onColor = this.onColor;
        var debug = this.state.colors.map(function(element) {
            var s = { color: element.complementary };
            return <p style={s} key={element.name}>{element.name}: {element.color}</p>
        });
        var selectors = this.state.colors.map(function(element) {
            return <ColorPicker
                key={element.name}
                name={element.name}
                color={element.color}
                onColor={onColor}
            />;
        });
        var tintsAndShades = this.state.colors.map(function(element) {
            return <div key={element.name} className="color-variations">
                <ColorGradient start={element.color} end="#ffffff" direction="top" />
                <ColorGradient start={element.color} end="#000000" direction="top" />
            </div>;
        });
        var gradient = {
            start: this.state.colors[0].color,
            end: this.state.colors[1].color
        };
        return (
            <article>
                <section>
                    <h1>Color mixer</h1>
                    {debug}
                </section>
                <section>
                    {selectors}
                </section>
                <section>
                    <ColorGradient start={gradient.start} end={gradient.end} direction="right"/>
                </section>
                <section className="tints-and-shades">
                    {tintsAndShades}
                </section>
            </article>
        );
    }
});

export default App;
