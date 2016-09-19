import React from 'react';
import ColorPicker from './ColorPicker.jsx';

class App extends React.Component {
    render() {
        return (
            <article>
                <section>
                    <h1>Color mixer</h1>
                </section>
                <section>
                    <ColorPicker/>
                    <ColorPicker/>
                </section>
            </article>
        );
    }
}

export default App;
