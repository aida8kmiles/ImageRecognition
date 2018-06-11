import React, { Component } from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Toastify/Toast.css';

import Nav from './Nav.js';
import * as myActions from './MyAction.js';
import Home from './Home.js';
import Upload from './Upload.js';
import Request from './Request.js';
import Monitor from './Monitor.js';
import Logs from './Logs.js';
import Learn from './Learn.js';
import Search from './Search.js';
import Toast from './Toastify/Toast.js';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faComment from '@fortawesome/fontawesome-free-regular/faComment';

class App extends Component {


  render() {
	  let status = 0;
	  if (this.props.myReducer.learn === 'started') {
		status = 1;  
	  }
	  if (this.props.myReducer.search === 'started') {
		status = 2;  
	  }
    return (
	  <Router>
		  <div>
			<Nav />
		  	<div className="container-app2 container-app-custom">
				<div className="row mytable">
					<div className="col-md-3 left-column mycell">
						{
							status === 1 && 
							<div className="alexa-command header-text">
								<div className="fade-in">"Alexa Learn Images"</div>
								<div className="sub-text fade-in">processing images to learning</div>
							</div>
						}
						{
							status === 0 && 
							<div className="alexa-command">
								<div className="header-text">Awaiting Voice Command <span className="dotAnimate"><span>.</span><span>.</span><span>.</span></span> <span className="comments"><FontAwesomeIcon icon={faComment} /></span></div>
								<div className="sub-text"></div>
							</div>
						}
						{
							status === 2 && 
							<div className="alexa-command header-text">
								<div className="fade-in">"Alexa, identify who is in the image"</div>
								<div className="sub-text fade-in">performing face match</div>
							</div>
						}
						<Logs />
					</div>
					<div className="col-md-7 center-column mycell"><Search /></div>
					<div className="col-md-2 right-column mycell">
						<Learn />
						<Monitor />
					</div>
				</div>
			</div>
			<ToastContainer />
		  </div>
	  </Router>
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
		callExample: (obj) => {
			dispatch(myActions.example(obj));
		},
		callChangeTab: (tab) => {
			dispatch(myActions.changeTab(tab));
		}
	};	
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
