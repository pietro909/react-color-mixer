import React from 'react';
import ColorPicker from './ColorPicker.jsx';
import ColorGradient from './ColorGradient.jsx';

const App = React.createClass({

    getInitialState: function() {
        return {
            colors: [
                {
                    name: 'A',
                    color: '#000000'
                },
                {
                    name: "B",
                    color: '#FFFFFF'
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
            }
            return previousState;
        });
    },

    render: function() {
        var onColor = this.onColor;
        var debug = this.state.colors.map(function(element) {
            return <p key={element.name}>{element.name}: {element.color}</p>
        });
        var selectors = this.state.colors.map(function(element) {
            return <ColorPicker
                key={element.name}
                name={element.name}
                onColor={onColor}
            />;
        });
        var gradient = {
            start: this.state.colors[0].color,
            end: this.state.colors[1].color
        };
        return (
            <article>
                <section>
                    <h1>Color mixer</h1>
                    { debug }
                </section>
                <section>
                    { selectors }
                </section>
                <section>
                    <ColorGradient start={gradient.start} end={gradient.end}></ColorGradient>
                </section>
            </article>
        );
    }
});

export default App;
