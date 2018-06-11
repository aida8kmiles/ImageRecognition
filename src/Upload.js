import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as myActions from './MyAction.js';
import {getList} from './AWS.js';

import DoUpload from './DoUpload.js';
/*
const config = {
    bucketName: 'aws-rek-images',
    albumName: '',
    region: 'us-east-2',
    accessKeyId: 'AKIAJKY2QQLW2GFYVTQA',
    secretAccessKey: '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',
}*/

class Upload extends Component {
	componentDidMount() {
		this.props.callChangeTab('upload');
		this.props.callGetList();
	}

	render() {
		return (
			<div className="my-container2 upload">
				
				<DoUpload isMultiple={true} />
				<br /><br />
				
				<div className="row">
					<div className="col-md-4 request-list">
						<div className="row request-row">
							<div  className="request-header">Uploaded Image</div>
							{
								this.props.myReducer.list && 
									this.props.myReducer.list.map((value, key) => {
										return <div className="col-xs-4 col-md-4 col-sm-4 col-lg-4 request-column" key={key}>
											{
												this.props.myReducer.images[value.Key] && 
													<a href="" className="thumbnail">
														<img src={this.props.myReducer.images[value.Key]} alt={value.Key} />
													</a>
											}
											</div>
									})
							}
						</div>
					</div>
					<div className="col-md-8">
						<div className="request-header">title/description of selected Request ID to be displayed here</div>
						<div className="request-big-column"></div>
					</div>
				</div>
				
				<img className="img-responsive" src="/img/screenshot1.1.png" alt="upload" />
				
				
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
		callGetList: () => {
			dispatch(getList(dispatch));	
		}
	};	
};
export default connect(mapStateToProps, mapDispatchToProps)(Upload);