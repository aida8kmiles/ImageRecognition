import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as myActions from './MyAction.js';
import MyGuage from './MyGuage.js';

class GuageTest extends Component {
	componentDidMount() {
		this.props.callChangeTab('home');
	}
	render() {
		return (
			<div className="my-container-home">
				<br /><br /><br /><br /><br /><br /><br />
				<MyGuage />
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
export default connect(mapStateToProps, mapDispatchToProps)(GuageTest);