import React, {Component} from 'react';

import OwlCarousel from 'react-owl-carousel';
import './Carousel.css';

class Carousel extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			options: {
				dots: false,
				nav: false,
				loop: false,
				margin: 10,
				autoWidth: true,
				responsive: {
                  0: {
                    items: 1
                  },
                  600: {
                    items: 3
                  },
                  960: {
                    items: 4
                  },
                  1200: {
                    items: 6
                  }
                }
			}
		}
	}
	
	render() {
		if (!this.props.items) {
			return null;	
		}
		
		let items = [];
		for (let i in this.props.items) {
			let value = this.props.items[i];
			let key = parseInt(i, 10);
			let imgs = '';
			let cClass = 'tile__img'
			let content = '';
			if (this.props.loader >= key && this.props.show[key] && this.props.images[value.Key]) {
				imgs = this.props.images[value.Key];
			} else if (this.props.loader + 1 === key) {
				imgs = '/img/circular_loader.gif';	
				cClass = 'tile__img_l';
			}
			if (imgs) {
				content = (<img className={cClass} src={imgs} alt={key} />);	
			}
			items.push(<div className="item row__inner bottom-column-item" key={i}><a href="" onClick={this.props.changeCurrent.bind(this, value)}><div className="tile__media">{content}</div><div className="tile__details"><div className="tile__title"></div></div></a></div>);
		}
		return (
			<div className="show-items-container">
				<div className="left-element"><a className="prev" onClick={(e) => {e.preventDefault(); this.refs[this.props.name].prev(); }}>&#10094;</a></div>
				<div className="center-element">
					<OwlCarousel
						ref={this.props.name}
						className="owl-theme"
						{...this.state.options}
					>
						{items}
					</OwlCarousel>
				</div>
				<div className="right-element"><a className="next" onClick={(e) => {e.preventDefault(); this.refs[this.props.name].next(); }}>&#10095;</a></div>
			</div>
		);
	}
}

export default Carousel;