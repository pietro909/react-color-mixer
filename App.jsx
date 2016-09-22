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
                element.complementary = Color(color).rotate(180).hexString();
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

    onGradientMouseUp: function(event) {
        this.refs.ufo.style.display = 'none';
    },

    render: function() {
        var component = this;
        var debug = this.state.colors.map(function(element) {
            var s = { color: element.complementary };
            return <p style={s} key={element.name}>{element.name}: {element.color}</p>
        });
        var selectors = this.state.colors.map(function(element) {
            return <ColorPicker
                key={element.name}
                name={element.name}
                color={element.color}
                onColor={component.onColor}
            />;
        });
        var tintsAndShades = this.state.colors.map(function(element) {
            return <div key={element.name} className="color-variations">
                <ColorGradient
                    start={element.color}
                    end="#ffffff"
                    onMouseDown={component.onGradientMouseDown}
                    onMouseUp={component.onGradientMouseUp}
                    title="Tints"/>
                <ColorGradient
                    start={element.color}
                    end="#000000"
                    onMouseDown={component.onGradientMouseDown}
                    onMouseUp={component.onGradientMouseUp}
                    title="Shades"/>
            </div>;
        });
        var gradient = {
            start: this.state.colors[0].color,
            end: this.state.colors[1].color
        };
        var currentSelection, currentHexColor;
        if (this.state.currentSelection.color !== null) {
            currentHexColor = this.state.currentSelection.color.hexString();
            currentSelection =
                <div>
                    <p>{this.state.currentSelection.color.hexString()}</p>
                    <div>
                        <span style={{width: '30px', height: '30px', backgroundColor: currentHexColor}}/>
                        <button onClick={this.onColor.bind(this,'A',currentHexColor)}>Set to A</button>
                        <button onClick={this.onColor.bind(this,'B',currentHexColor)}>Set to B</button>
                    </div>
                </div>
        } else {
            currentSelection = '';
        }

        return (
            <article>
                <header>
                    <h1>Color mixer</h1>
                </header>
                <section>
                    {debug}
                </section>
                <section>
                    {selectors}
                </section>
                <section>
                    <ColorGradient
                        start={gradient.start}
                        end={gradient.end}
                        onMouseDown={component.onGradientMouseDown}
                        onMouseUp={component.onGradientMouseUp}
                    />
                </section>
                <section className="tints-and-shades">
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
