import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getList, setImageAll, getUrlByFileNameSelf} from './AWS.js';
import {firebaseDatabase, FirebaseConstant} from './MyFirebase.js';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCaretLeft from '@fortawesome/fontawesome-free-solid/faCaretLeft';
import faCaretRight from '@fortawesome/fontawesome-free-solid/faCaretRight';

class Learn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStatus: null,
			list: [],
			show: [],
			tmpList: [],
			current: null,
			counter: 0,
			loader: -1
		};
		
		this.myVar = '';
	}
	
	componentWillMount() {
		//var url = FirebaseConstant.basePath;
		//var ref = firebaseDatabase.ref(url).child('learn').set('pending');
	}
	
	changeCurrent(list, counter, e) {
		e.preventDefault();
		if (counter < 0) return;
		if (counter >= list.length) return;
		let val = list[counter];
		this.setState({current: val, counter: counter});
	}
		
	fixStatus(props) {
		if (props.myReducer.learn === 'completed') {
			let str = localStorage.getItem('list');
			if (str) {
				let obj = JSON.parse(str);
				this.setState({list: obj, show: obj});
				for (let i = 0; i < obj.length; i++) {
					if (!this.props.myReducer.images[obj[i].Key]) {
						this.props.callGetImage(obj[i].Key);
					}
				}
				this.setState({current: obj[obj.length - 1], loader: obj.length - 1});
			}
		}
	}
	
	componentDidMount() {
		if (this.props.myReducer.learn === 'completed') {
			this.setState({currentStatus: this.props.myReducer.learn, counter: this.props.myReducer.list.length - 1});	
			this.fixStatus(this.props);
		}
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.myReducer.learn !== this.state.currentStatus && nextProps.myReducer.list) {
			this.setState({currentStatus: nextProps.myReducer.learn, counter: nextProps.myReducer.list.length - 1});	
			this.fixStatus(nextProps);
		}
		if (nextProps.myReducer.list && nextProps.myReducer.list.length > 0 && nextProps.myReducer.list.length !== this.state.list.length) {
			//console.log('next props: ', nextProps.myReducer.list);
			if (nextProps.myReducer.learn === 'completed') {
				this.setState({list: nextProps.myReducer.list, show: nextProps.myReducer.list, counter: nextProps.myReducer.list.length - 1});
			}
			if (nextProps.myReducer.learn === 'started') {
				this.setState({list: nextProps.myReducer.list, show: [], counter: 0}, () => {
					this.myVar = setInterval(() => {
						console.log('counter is ', this.state.counter);

						if (!this.state.list[this.state.counter]) {
							clearInterval(this.myVar);	
							var url = FirebaseConstant.basePath;
							firebaseDatabase.ref(url).child('learn').set('completed');
							localStorage.setItem('list', JSON.stringify(this.state.list));
							return;	
						}
						if (!this.state.list[this.state.counter].Key) return;
						this.setState({loader: this.state.counter});
						if (!nextProps.myReducer.images[this.state.list[this.state.counter].Key]) {
							return;	
						}
						//let list = JSON.parse(JSON.stringify(this.state.tmpList));
						let current = this.state.list[this.state.counter]; //list.shift();
						let xshow = this.state.show;
						xshow.push(current);
						this.setState({current: current, show: xshow, counter: this.state.counter + 1 });
					}, 1000);																	  
				});		
				
			}// if started
		}
	}
	componentWillUnmount() {
		clearInterval(this.myVar);
	}

	render() {
		//console.log('sli: ', this.state);
		return (
			<div className="my-container2 learn">
				<div className="row heading text-center">
					<div className="col-md-12">
						<div  className="header-text">Learning Images</div>
					</div>
				</div>
				
				{
					(this.props.myReducer.learn === 'started' || this.props.myReducer.learn === 'pending' || this.state.current) &&
						<div className="row middle-row">
							<div className="col-md-12  middle-column ">
								{
									(this.props.myReducer.learn === 'started' || (this.state.current && this.props.myReducer.learn !== 'pending')) &&
									<div className="">
									{
										(this.state.current && this.state.current.Key && this.props.myReducer.images[this.state.current.Key]) ?
										<img src={this.props.myReducer.images[this.state.current.Key]} alt={this.state.current.Key}  className="" /> :
										<img src="/img/shutterstock_712068100.jpg" className="img-responsive" alt="loading1" />
									}
									</div>
								}
								{
									this.props.myReducer.learn === 'pending' && 
									<div className="">
										<img src="/img/shutterstock_712068100.jpg" className="img-responsive" alt="loading1" />
									</div>
								}
							</div>
						
						</div>
				}
				<div className="row second-row text-center">
						{
							this.props.myReducer.learn === 'started' && 
							<span className="sub-details"><img src="/img/greenloaderBar2.gif" className="img-responsive " alt="loading1" /></span>
						}
						
						{
							this.props.myReducer.learn === 'completed' && 
								<div className="col-md-12">
								
									<div className="row">
										<div className="col-md-2">
											<a href="" className="prev" onClick={(e) => {
												this.changeCurrent(this.state.list, this.state.counter - 1, e);
											}}><FontAwesomeIcon icon={faCaretLeft}/></a>
										</div>
										<div className="col-md-8">
											{this.state.counter + 1} of {this.state.list.length}
										</div>
										<div className="col-md-2">
											<a href="" className="next" onClick={(e) => {
											this.changeCurrent(this.state.list, this.state.counter + 1, e);
											}}><FontAwesomeIcon icon={faCaretRight}/></a>
										</div>
									</div>
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
		callGetList: () => {
			dispatch(getList(dispatch));	
		},
		callSetImageAll: (images) => {
			dispatch(setImageAll(images));	
		},
		callGetImage: (fn) => {
			dispatch(getUrlByFileNameSelf(fn));	
		}
	};	
};
export default connect(mapStateToProps, mapDispatchToProps)(Learn);