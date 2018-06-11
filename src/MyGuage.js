import React, {Component} from 'react';
import Gauge from 'react-svg-gauge';
import './MyGuage.css';

class MyGuage extends Component {
	render() {
		let className = 'my-guage';
		return (
			<div className={className}>
				<Gauge width={200} height={150} label={this.props.label} value={this.props.value}  min={this.props.min} max={this.props.max} color ={this.props.color} backgroundColor="#D1D1D1" topLabelStyle={{fill: "#000", fontSize: "16px"}} valueLabelStyle={{fill: "#000", fontSize: "18px"}} minMaxLabelStyle={{fill: "black", fontSize: "12px"}} symbol={this.props.symbol} diff={17} />
				{
					this.props.txt1 &&
					<div className="txt1">{this.props.txt1}</div>
				}
				{
					this.props.txt2 &&
					<div className="txt2">{this.props.txt2}</div>
				}
				{
					this.props.txt3 &&
					<div className="txt3">{this.props.txt3}</div>
				}
			</div>
		);
	}
}

export default MyGuage;