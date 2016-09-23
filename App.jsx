import React from 'react';
import ColorPicker from './ColorPicker.jsx';
import ColorGradient from './ColorGradient.jsx';
import Color from 'color';
import * as Utils from './Utils.jsx';

const App = React.createClass({

    getInitialState: function() {
        var colorA = Color('#FF0000');
        var colorB = Color('#00FF00');

        return {
            colors: [
                {
                    name: 'A',
                    color: colorA.hexString(),
                    complementary: colorA.rotate(180)
                },
                {
                    name: "B",
                    color: colorB.hexString(),
                    complementary: colorB.rotate(180)
                }
            ],
            currentSelection: {
                color: null
            }
        }
    },

    onColor: function(name, color) {
        this.setState(function(previousState, currentProps) {
            var element = previousState.colors.find(function (obj) {
                return obj.name === name;
            });
            if (element) {
                element.color = color;
                element.complementary = Color(color).rotate(180);
            }
            return previousState;
        });
    },

    onGradientMouseDown: function(event, pixelData) {
        this.setState(function(previousState, currentProps) {
            previousState.currentSelection.color =  Color({
                r: pixelData.data[0],
                g: pixelData.data[1],
                b: pixelData.data[2],
                a: pixelData.data[3]
            })
        });
        this.refs.ufo.style.left = `${event.nativeEvent.pageX}px`;
        this.refs.ufo.style.top = `${event.nativeEvent.pageY}px`;
        this.refs.ufo.style.display = 'flex';
    },

    onGradientMouseUp: function() {
        this.hideFloatingSelector();
    },

    hideFloatingSelector: function () {
        this.refs.ufo.style.display = 'none';
    },

    render: function() {
        const component = this;
        const selectorBuilder = Utils.makeFloatingSelector(this);
        const complementaries = this.state.colors.map(element => {
            const style = { backgroundColor: element.complementary.hexString() };
            return <div key={element.name}>
                <span className="complementary"/>
                <p style={{ color: element.complementary.hexString() }}>
                    {element.color}
                </p>
            </div>;
        });
        const selectors = this.state.colors.map(element =>
            <ColorPicker
                key={element.name}
                name={element.name}
                color={element.color}
                onColor={component.onColor}
            />
        );
        const tintsAndShades = this.state.colors.map(element =>
            <div key={element.name} className="color-variations">
                <ColorGradient
                    start={element.color}
                    end="#ffffff"
                    onMouseDown={component.onGradientMouseDown}
                    onMouseUp={component.onGradientMouseUp}
                />
                <ColorGradient
                    start={element.color}
                    end="#000000"
                    onMouseDown={component.onGradientMouseDown}
                    onMouseUp={component.onGradientMouseUp}
                />
            </div>
        );
        const gradient = {
            start: this.state.colors[0].color,
            end: this.state.colors[1].color
        };
        const currentSelection = (this.state.currentSelection.color !== null)
            ? selectorBuilder(this.state.currentSelection.color, this.onColor, this.hideFloatingSelector)
            : '';

        return (
            <article>
                <header>
                    <h1>Color mixer</h1>
                    <div className="selectors">
                        {selectors}
                    </div>
                    <div className="complementaries">
                        {complementaries}
                    </div>
                </header>
                <section>
                    <ColorGradient
                        start={gradient.start}
                        end={gradient.end}
                        onMouseDown={component.onGradientMouseDown}
                        onMouseUp={component.onGradientMouseUp}
                    />
                </section>
                <section className="tints-and-shades">
                    <div>
                        <h3>Tints</h3>
                        <h3>Shades</h3>>
                    </div>
                    {tintsAndShades}
                </section>
                <div ref="ufo" className="ufo">
                    { currentSelection }
                </div>
            </article>
        );
    }
});

export default App;
