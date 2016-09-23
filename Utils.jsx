import React from 'react';

export const makeFloatingSelector = (component) =>
    (color, onClick, onMouseLeave) => {
        const currentHexColor = color.hexString();
        const sampleStyle = {
            backgroundColor: currentHexColor
        };
        return <div onMouseLeave={onMouseLeave}>
            <span style={sampleStyle} className="selection-sample"/>
            <p className="color-name">{currentHexColor}</p>
            <div>
                <span style={{width: '30px', height: '30px', backgroundColor: currentHexColor}}/>
                <button onClick={onClick.bind(component, 'A',currentHexColor)}>Set to A</button>
                <button onClick={onClick.bind(component, 'B',currentHexColor)}>Set to B</button>
            </div>
        </div>
    };
