import React, {Component} from 'react';

class Icon extends Component {
	render() {
		const {children, className, height, viewbox, width} = this.props;
		return (
			<svg className={`icon ${className}`}
			  viewBox={viewbox || '0 0 36 36'}
			  width={width || 36}
			  height={height || 36}>
			  {children}
			</svg>
		);
	}
}

export default Icon;