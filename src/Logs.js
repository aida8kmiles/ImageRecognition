import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as myActions from './MyAction.js';
import MyGuage from './MyGuage.js';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from './MyFirebase.js';
import './Effect.css';


class Logs extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			logs: [],
			val: ''
		};
		
		//var url2 = FirebaseConstant.log2Path;
		//firebaseDatabase.ref(url2).set(null);
	}
	c1(e) {
		e.preventDefault();
		var url2 = FirebaseConstant.log2Path;
		let obj = {
			text: this.state.val, 
			current: firebase.database.ServerValue.TIMESTAMP
		};
		firebaseDatabase.ref(url2).push(obj);	
	}
	componentDidMount() {	
		this.props.callChangeTab('monitor');
		var url = FirebaseConstant.logPath;
		var ref = firebaseDatabase.ref(url);
		ref.on('value', (snapshot) => {
			var result = snapshot.val();
			if (this.props.myReducer.monitor_bandwidth !== result.bandwidth) {
				this.props.callSetBandwidth(result.bandwidth);				
			}
			if (this.props.myReducer.monitor_cpu !== result.cpu) {
				this.props.callSetCpu(result.cpu);				
			}
			if (this.props.myReducer.monitor_disk !== result.disk) {
				this.props.callSetDisk(result.disk);				
			}
			if (this.props.myReducer.monitor_memory !== result.memory) {
				this.props.callSetMemory(result.memory);				
			}
		});	
		var url2 = FirebaseConstant.log2Path;
		var ref2 = firebaseDatabase.ref(url2);
		ref2.on('child_added', (snapshot) => {
			var result = snapshot.val();
			let obj = {};
			obj.current = result.current;
			obj.text = result.text;
			let arr2 = JSON.parse(JSON.stringify(this.state.logs));
			arr2.unshift(obj);
			this.setState({logs: arr2});
		});	
	}
	

	render() {
		const arr = this.state.logs;
		let arr2 = []
		if (arr.length > 0) {
			for (let i = 0; i < arr.length; i++) {
				var d = new Date(arr[i].current);
				var d2 = d.toUTCString();
				var d3 = d.toString();
				arr2.push(<li key={i}>[{d2}] <br /><b>{arr[i].text}</b></li>);	
			}
		}
		return (
			<div className="my-container2 logs2">
				<div className="monitor-logs header-text">Monitor Logs</div>
				<div className="row log-holder">
					{
						arr.length > 0 ?
						<ul className="sub-logs">{arr2}
						</ul>
						:
						<div className="sub-logs">No Logs Found.
						</div>
					}
				</div>
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
		callSetBandwidth: (num) => {
			dispatch(myActions.setBandwidth(num));
		},
		callSetCpu: (num) => {
			dispatch(myActions.setCpu(num));
		},
		callSetDisk: (num) => {
			dispatch(myActions.setDisk(num));
		},
		callSetMemory: (num) => {
			dispatch(myActions.setMemory(num));
		}
	};	
};
export default connect(mapStateToProps, mapDispatchToProps)(Logs);