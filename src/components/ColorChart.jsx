import { Component } from "react";
import '../components/ColorChart.css';
import ColorCard from './ColorCard';

class ColorChart extends Component {
    render() {
        let hexes = this.props.colors.map((color, index) => {
            return color.w3c.hex
        });
        return(
            <div className="color-chart-page">
                <h3 className="color-page-title" style={{background: 'linear-gradient(to right,' + hexes + ')'}}>We found this theme!</h3>
                <div className="card-container">
                {
                    this.props.colors.map((color, index) => {
                        return (<ColorCard color={color.w3c}/>)
                    })
                }
                </div>
            </div>
        )
    }
}

export default ColorChart;