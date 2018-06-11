import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as myActions from './MyAction.js';

class Home extends Component {
	componentDidMount() {
		this.props.callChangeTab('home');
	}
	render() {
		return (
			<div className="my-container-home">
			
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		myReducer: state.MyReducer
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {
		callChangeTab: (tab) => {
			dispatch(myActions.changeTab(tab));
		}
	};	
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);