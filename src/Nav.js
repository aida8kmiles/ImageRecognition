import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as myActions from './MyAction.js';
import {withRouter} from 'react-router';
import {firebaseDatabase, FirebaseConstant} from './MyFirebase.js';
import {getList, getOnlyList, setImageName, imageMatchCustom, imageHigResClear} from './AWS.js';

import Logo from './Icons/Logo.js';

class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			initialized: false	
		};
	}
	componentDidMount() {
		
		const urls = {
			learn: '/learn',
			search: '/search',
			upload: '/upload',
			request: '/request',
			monitor: '/monitor',
			toast: '/toast'
		};
		var url = FirebaseConstant.basePath;
		var ref = firebaseDatabase.ref(url);
		ref.on('value', (snapshot) => {
			var result = snapshot.val();		
			
			//image_name on fb
			if (this.props.myReducer.image_name !== result.image_name) {
				console.log('changing search to pending');
				this.props.callSetImageName(result.image_name);	
				this.props.callImageMatchCustom();
				this.props.callImageHigResClear();
				//firebaseDatabase.ref(url).child('search').set('pending');
				firebaseDatabase.ref(url).child('search2').set('pending');
			}

			//image on fb
			this.props.callSetImage(result.image);
			if (result.image === 'started') {
				myActions.notify('New Image Received', 5);
				firebaseDatabase.ref(url).child('image').set('completed');
			}
			
			let learn = result.learn;
			if (learn !== 'completed') {
				localStorage.removeItem('list');	
			}
			if (this.props.myReducer.learn !== learn) {
				console.log('learn is ', learn);
				this.props.callChangeLearnStatus(learn);
				if (learn === 'completed') {	
					this.props.callGetList();
				}
			}
			if (learn === 'pending' && !this.state.initialized) {
				myActions.notify('Images Ready for Processing', 5, 1);
				this.setState({initialized: true});
			}
			
			if (!this.props.myReducer.list && learn === 'started') {
				this.props.callGetList();
			}
				
			
			let srch = result.search2;
			if (srch === 'started') {
				this.props.callImageHigResClear();
			}
			if (this.props.myReducer.search !== srch) {
				console.log('srch is ', srch);
				this.props.callChangeSearchStatus(srch);
			}
			let tab = result.tab.current;
			if (this.props.myReducer.tab !== tab) {
				console.log('tab is ', tab);
				this.props.callChangeTab(tab);
				var tabUrl = (urls[tab]) ? urls[tab] : '/';
				this.props.history.push(tabUrl);
			}
		});		
	}
	
	clickTab(tab, e) {
		e.preventDefault();
		var url = FirebaseConstant.basePath;
		firebaseDatabase.ref(url).child('tab').child('current').set(tab);
		//this.props.callChangeTab(tab);
		//let tabUrl = '/' + tab;
		//this.props.history.push(tabUrl);
	}
	
	resetFb(e) {
		e.preventDefault();
		console.log('resetting');
		var url = FirebaseConstant.basePath;
		firebaseDatabase.ref(url).child('tab').child('current').set('home');
		firebaseDatabase.ref(url).child('learn').set('started');
		//firebaseDatabase.ref(url).child('search').set('pending');
		firebaseDatabase.ref(url).child('search2').set('pending');
		firebaseDatabase.ref(url).child('image').set('pending');
		firebaseDatabase.ref(url).child('image_name').set('pending');
		window.location.href = "/";
	}

	render() {
		const tab = this.props.myReducer.tab;

		let tabs = {
			learn: (tab === 'learn') ? 'active' : '',
			search: (tab === 'search') ? 'active' : '',
			upload: (tab === 'upload') ? 'active' : '',
			request: (tab === 'request') ? 'active' : '',
			monitor: (tab === 'monitor') ? 'active' : '',
		};
		return (
			<div>
				<img src="/img2/poweredbygreenbg.png" className="img-responsive img-logo2" alt="8K Miles" />
				<nav className="navbar navbar-inverse navbar-static-top">
				  <div className="container">
					<div className="navbar-header">
					  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					  </button>
					  <a className="navbar-brand" href="" onClick={this.resetFb.bind(this)}><Logo /> <span className="logo-header-txt">AIDA</span></a>
					</div>
					<div id="navbar" className="collapse navbar-collapse">
					  <ul className="nav navbar-nav">
						<li><a className="logo-header2-txt">Image Analytics</a></li>
					  </ul>
					  <ul className="nav navbar-nav navbar-right">
						<li></li>
					  </ul>
					</div>
				  </div>
				</nav>		
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
		},
		callChangeLearnStatus: (val) => {
			dispatch(myActions.changeLearnStatus(val));	
		},
		callChangeSearchStatus: (val) => {
			dispatch(myActions.changeSearchStatus(val));	
		},
		callGetList: () => {
			dispatch(getList(dispatch));	
		},
		callGetOnlyList: () => {
			dispatch(getOnlyList(dispatch));	
		},
		callSetImageName: (name) => {
			dispatch(setImageName(dispatch, name));	
		},
		callSetImage: (status) => {
			dispatch(myActions.setImage(status));
		},
		callImageMatchCustom: () => {
			dispatch(imageMatchCustom());	
		},
		callImageHigResClear: () => {
			dispatch(imageHigResClear());	
		}
	};	
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));