import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as myActions from './MyAction.js';
import MyGuage from './MyGuage.js';
import * as firebase from 'firebase';
import {firebaseDatabase, FirebaseConstant} from './MyFirebase.js';
import './Effect.css';


class Monitor extends Component {
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
		ref2.on('value', (snapshot) => {
			var result = snapshot.val();
			if (!result) return;
			let arr = [];
			for (let i in result) {
				arr.push(result[i]);
			}
			this.setState({logs: arr});			
		});	
	}

	render() {
		const arr = this.state.logs;
		let arr2 = []
		if (arr.length > 0) {
			for (let i = 0; i < arr.length; i++) {
				arr2.push(<div key={i}>{arr[i].text}</div>);	
			}
		}
		return (
			<div className="my-container2 monitor">
				<div className="row guage">
					<div className="col-md-12 text-center list-guage">
						<MyGuage label="Memory Usage" value={this.props.myReducer.monitor_memory}  min={0} max={16} symbol=" GB" color="#ff9900" />
					</div>
					<div className="col-md-12 text-center list-guage">
						<MyGuage label="Bandwidth Usage" value={this.props.myReducer.monitor_bandwidth}  min={0} max={100} symbol=" Mbps" color="#F06677" />
					</div>
					<div className="col-md-12 text-center list-guage">
						<MyGuage label="Disk I/O Usage" value={this.props.myReducer.monitor_disk}  min={0} max={100} symbol=" Mbps" color="#009688" />
					</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Monitor);