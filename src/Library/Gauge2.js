import React, {Component} from 'react';
import './Gauge2.css';

class Gauge2 extends Component {
	render() {
		return (
			<div className="gauge2">
				<div className="container">
					<div className="gauge-a"></div>
					<div className="gauge-b"></div>
					<div className="gauge-c"></div>
					<div className="gauge-data">
						<h1 id="percent">20%</h1>
					</div>
				</div>

			</div>
		);
	}
}

export default Gauge2;