import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Line } from 'rc-progress';
import {uploadFiles, progressBar, setImageAWS, imageMatchNoImage, searchProgress} from './AWS.js';

class DoUploadSearch extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			files: []
		};
	}
	
	selectFile(e) {
		let sfiles = [];
		var files = document.getElementById('photoupload').files;
		if (!files) return;
		if (!files[0]) return;
		this.props.callSearchProgress(true);
		if( files && files.length >= 1 ) {
			for (let i = 0; i < files.length; i++) {
				sfiles.push(files[i]);
				this.props.callProgressBar(0, i);
			}
		}
		var reader = new FileReader();
		reader.onload = (e) => {
			this.props.callSetImageAWS(files[0].name, e.target.result);
		};
		reader.readAsDataURL(files[0]);
		this.setState({files: sfiles});
	}
	
	submitFrm() {
		var files = document.getElementById('photoupload').files;

		if (!files.length) {
			return alert('Please choose a file to upload first.');
		}
		this.props.callUploadFiles(files, imageMatchNoImage);
		
	}
	render() {
		const isMultiple = this.props.isMultiple ? true : false;
		console.log('searchProgress: ', this.props.myReducer.searchProgress);
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="upload-frm">
						<div className="form-group">
							{
								isMultiple ?
								<input type="file" className="form-control inputfile" id="photoupload" onChange={this.selectFile.bind(this)} multiple /> : 
								<input type="file" className="form-control inputfile" id="photoupload" onChange={this.selectFile.bind(this)} />
							}
							<label htmlFor="photoupload"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg> <span>Browse Files&hellip;</span> <button type="submit" className="btn btn-primary btn-upload" onClick={this.submitFrm.bind(this)}>Upload</button>
						</label> 
						{
							(this.props.myReducer.searchProgress && this.state.files.length > 0) && 
							<div><br />
								{
									this.state.files.map((value, key) => {
										let val = this.props.myReducer.progress_bar[key] ? this.props.myReducer.progress_bar[key] : 0;
										return <div key={key}>{value.name}<br /><Line percent={val} strokeWidth="2" strokeColor="#00965F" /><br /><br /></div>					  
									})	
								}
							</div>
						}
						</div>
						
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
		callUploadFiles: (files, callback) => {
			dispatch(uploadFiles(dispatch, files, callback));
		},
		callProgressBar: (val, key) => {
			dispatch(progressBar(val, key));	
		},
		callSetImageAWS: (fileName, result) => {
			dispatch(setImageAWS(fileName, result));
		},
		callSearchProgress: (val) => {
			dispatch(searchProgress(val));	
		}
	};	
};
export default connect(mapStateToProps, mapDispatchToProps)(DoUploadSearch);