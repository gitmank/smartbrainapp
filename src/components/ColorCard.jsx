import React from "react";
import '../components/ColorChart.css';

const ColorCard = (color) => {
    let { name, hex } = color.color;
    return(
        <div className="color-card" style={{backgroundColor: hex}}>
            <h3 className="color-name">{name}</h3>
            <h4 className="color-hex">{hex}</h4>
        </div>
    )
}

export default ColorCard;