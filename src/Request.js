import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as myActions from './MyAction.js';

/*
class RequestItem extends Component {
	render() {
		return (
			<div className="request-item ">
				<div className="heading">Request ID</div>
				<div className="body">Description of the request comes in here in one or two lines of text</div>
			</div>
		);
	}
}*/

class Request extends Component {
	componentDidMount() {
		this.props.callChangeTab('request');
	}
	render() {
		return (
			<div className="my-container">
				<img className="img-responsive" src="/img/screenshot2.1.png" alt="request" />
				{/*
				<div className="row">
					<div className="col-md-4">
						<span>Requests</span>
						<span className="pull-right"><input type="text" placeholder="Search" /></span>
					</div>
				</div>
				<div className="row">
					<div className="col-md-4 request-list">
						<RequestItem />
						<RequestItem />
						<RequestItem />
						<RequestItem />
						<RequestItem />
						<RequestItem />
						<RequestItem />	
					</div>
					<div className="col-md-8">
						<div className="request-header">title/description of selected Request ID to be displayed here</div>
						<div className="row request-row">
							<div className="col-md-2 request-column"></div>
							<div className="col-md-2 request-column"></div>
							<div className="col-md-2 request-column"></div>
							<div className="col-md-2 request-column"></div>
							<div className="col-md-2 request-column"></div>
							<div className="col-md-2 request-column"></div>
							<div className="col-md-2 request-column"></div>
							<div className="col-md-2 request-column"></div>
							<div className="col-md-2 request-column"></div>
							<div className="col-md-2 request-column"></div>
							<div className="col-md-2 request-column"></div>
							<div className="col-md-2 request-column"></div>
						</div>
						<div className="request-big-column"></div>
					</div>
				</div>
				*/}
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
export default connect(mapStateToProps, mapDispatchToProps)(Request);