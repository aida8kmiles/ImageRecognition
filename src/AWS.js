import AWS from 'aws-sdk';

AWS.config.update({
        accessKeyId : 'AKIAJHDTHNHJWE43OXWQ',
        secretAccessKey : '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'
    });
AWS.config.region = 'us-east-1';

const mimes = {
	jpeg: 'data:image/jpeg;base64,',
	png: 'data:image/png;base64,',
	gif: 'data:image/gif;base64,'
};

const bucket = new AWS.S3({params: {Bucket: 'nvs-poc-alexa'}});
//const bucket = new AWS.S3({params: {Bucket: 'aws-rek-images'}});
//const bucket_lowres = new AWS.S3({params: {Bucket: 'aws-rek-images-lowres'}});



const encode = (data) => {
  let str = data.reduce(function(a,b){ return a+String.fromCharCode(b) },'');
  return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
};

export const setImageAll = (images) => {
	return {
		type: 'GET_AWS_IMAGE_ALL',
		payload: images
	};	
};

const getUrlByFileName = (fileName, mimeType) => {
	return {
		type: 'GET_AWS_IMAGE',
		payload: new Promise((resolve, reject) => {
			bucket.getObject({Key: fileName}, function (err, file) {
				if (!file) {
					reject(null);
					return;
				}
				if (!file.Body) {
					reject(null);
					return;
				}
			  let result =  mimeType + encode(file.Body);
			  let data = {
					name: fileName,
					data: result
				};
			  resolve(data);
		  });
		})
	};
};

export const setImageAWS = (fileName, result) => {
	return {
		type: 'GET_AWS_IMAGE',
		payload: {
					name: fileName,
					data: result
				}
	};
};

export const getUrlByFileNameSelf = (fileName, callback=null) => {
	let mimeType = '';
	let subs = fileName.substr(-3);
	let subs2 = fileName.substr(-4);
	subs = subs.toLowerCase();
	subs2 = subs2.toLowerCase();
	if (subs === 'png') {
		mimeType = mimes.png;
	} else if (subs === 'gif') {
		mimeType = mimes.gif;
	} else if (subs === 'jpg' || subs2 === 'jpeg') {
		mimeType = mimes.jpeg;
	}
	return {
		type: 'GET_AWS_IMAGE',
		payload: new Promise((resolve, reject) => {
			bucket.getObject({Key: fileName}, function (err, file) {
				let data = {
					name: fileName,
					data: '/img/noImage.gif'
				};
				if (callback) {
					callback(file);	
				}
				if (!file) {
					reject(data);
					return;
				}
				if (!file.Body) {
					reject(data);
					return;
				}
			  let result =  mimeType + encode(file.Body);
			  data = {
					name: fileName,
					data: result
				};
			  resolve(data);
		  });
		})
	};
};


export const setImageName = (dispatch, fileName) => {
	if (!fileName) return null;
	let file = fileName;
	let subs = fileName.substr(-3);
	let subs2 = fileName.substr(-4);
	subs = subs.toLowerCase();
	subs2 = subs2.toLowerCase();
	if (!(subs === 'png' || subs === 'gif' || subs === 'jpg' || subs2 === 'jpeg')) {
		file = null;
	}
	
	if (file) {
		dispatch(getUrlByFileNameSelfHigh(file));
		dispatch(imageDirectMatchNoImage(dispatch, file));
	}

	return {
		type: 'SET_IMAGE_NAME',
		payload: file
	}
}

export const getUrlByFileNameSelfHigh = (fileName, callback=null) => {
	let mimeType = '';
	let subs = fileName.substr(-3);
	let subs2 = fileName.substr(-4);
	subs = subs.toLowerCase();
	subs2 = subs2.toLowerCase();
	if (subs === 'png') {
		mimeType = mimes.png;
	} else if (subs === 'gif') {
		mimeType = mimes.gif;
	} else if (subs === 'jpg' || subs2 === 'jpeg') {
		mimeType = mimes.jpeg;
	}
	return {
		type: 'GET_AWS_IMAGE_HIGH',
		payload: new Promise((resolve, reject) => {
			bucket.getObject({Key: fileName}, function (err, file) {
				let data = {
					name: fileName,
					data: '/img/noImage.gif'
				};
				if (callback) {
					callback(file);	
				}
				if (!file) {
					reject(data);
					return;
				}
				if (!file.Body) {
					reject(data);
					return;
				}
			  let result =  mimeType + encode(file.Body);
			  data = {
					name: fileName,
					data: result
				};
			  resolve(data);
		  });
		})
	};
};
/*
const openInNewTab = (url) => {
	let redirectWindow = window.open(url, '_blank');
    redirectWindow.location;
};*/

export const getList = (dispatch) => {
	return {
		type: 'GET_AWS_LIST',
		payload: new Promise((resolve, reject) => {
			
			bucket.listObjects(function (err, data) {
				console.log('getList data is ', data);
				let result = data.Contents;
				if (result.length > 0) {
					for (let i = 0; i < result.length; i++) {
						let subs = result[i].Key.substr(-3);
						let subs2 = result[i].Key.substr(-4);
						subs = subs.toLowerCase();
						subs2 = subs2.toLowerCase();
						if (subs === 'png') {
							dispatch(getUrlByFileName(result[i].Key, mimes.png));
						} else if (subs === 'gif') {
							dispatch(getUrlByFileName(result[i].Key, mimes.gif));
						} else if (subs === 'jpg' || subs2 === 'jpeg') {
							dispatch(getUrlByFileName(result[i].Key, mimes.jpeg));
						}
					}
				}
				if (err) {
				  reject(err);
				} else {
				  resolve(data.Contents);
				}
			});
		})
	};
};


export const getOnlyList = (dispatch) => {
	return {
		type: 'GET_AWS_LIST',
		payload: new Promise((resolve, reject) => {
			
			bucket.listObjects(function (err, data) {
				if (err) {
				  reject(err);
				} else {
				  resolve(data.Contents);
				}
			});
		})
	};
};
//https://github.com/react-component/progress
export const progressBar = (perc, key) => {
	return {
		type: 'GET_AWS_PROGRESS_BAR',
		payload: {perc: perc, key: key}
	};
};

export const uploadedFiles = (files) => {
	return {
		type: 'UPLOADED_FILES',
		payload: files
	}
};

export const imageMatch = (dispatch, file) => {
	//dispatch(getUrlByFileNameSelfHigh(file.name));
	let url = 'http://54.244.174.63:4000/match?name=' + file.name;
	console.log('url is ', url);
	return {
		type: 'GET_AWS_IMAGE_MATCH',
		payload: new Promise((resolve, reject) => {
			fetch(url, {
				method: 'GET'	  
			})
			.then((response) => {
				return response.text();	   
			})
			.then((record) => {
				if (!record) resolve(null);
				let arr = record.split(',');
				let arr2 = [];
				let emptyObj = {};
				//emptyObj[file.name] = true;
				for (let i = 0; i < arr.length; i++) {
					if (!arr[i]) continue;
					arr2.push(arr[i]);
					if (!emptyObj[arr[i]]) {
						dispatch(getUrlByFileNameSelfHigh(arr[i]));
						emptyObj[arr[i]] = true;
					}
				}
				resolve(arr2);   
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});			  
		})
	}
}

export const searchProgress = (val) => {
	return {
		type: 'SEARCH_PROGRESS',
		payload: val
	};
};

export const imageMatchNoImage = (dispatch, file) => {
	let url = 'http://54.244.174.63:4000/match?name=' + file.name;
	console.log('url is ', url);
	return {
		type: 'GET_AWS_IMAGE_MATCH',
		payload: new Promise((resolve, reject) => {
			fetch(url, {
				method: 'GET'	  
			})
			.then((response) => {
				return response.text();	   
			})
			.then((record) => {
				if (!record) resolve(null);
				let arr = record.split(',');
				let arr2 = [];
				for (let i = 0; i < arr.length; i++) {
					if (!arr[i]) continue;
					arr2.push(arr[i]);
				}
				resolve(arr2);   
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});			  
		})
	}
}


export const imageDirectMatchNoImage = (dispatch, file) => {
	let url = 'http://54.244.174.63:4000/match?name=' + file;
	console.log('url is ', url);
	return {
		type: 'GET_AWS_IMAGE_MATCH',
		payload: new Promise((resolve, reject) => {
			fetch(url, {
				method: 'GET'	  
			})
			.then((response) => {
				return response.text();	   
			})
			.then((record) => {
				if (!record) resolve(null);
				let arr = record.split(',');
				let arr2 = [];
				for (let i = 0; i < arr.length; i++) {
					if (!arr[i]) continue;
					arr2.push(arr[i]);
				}
				resolve(arr2);   
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});			  
		})
	}
}

export const imageHigResClear = () => {
	return {
		type: 'GET_AWS_IMAGE_HIGH_CLEAR',
		payload: {}
	};
};

export const imageMatchCustom = () => {
	return {
		type: 'GET_AWS_IMAGE_MATCH_CUSTOM',
		payload: null
	};	
};

export const uploadFile = (dispatch, file, key, callback=null) => {
	return {
		type: 'GET_AWS_UPLOAD_FILE',
		payload: new Promise((resolve, reject) => {
			let params = {Key: file.name, ContentType: file.type, Body: file};
			/*bucket.upload(params, (err, data) => {
				if (err) reject(err);
				else resolve(data);
			});*/
			
			bucket.upload(params).on('httpUploadProgress', (evt) => {
				console.log("Uploaded :: " + file.name + " / " + parseInt((evt.loaded * 100) / evt.total, 10)+'%');
				let perc = parseInt((evt.loaded * 100) / evt.total, 10);
				dispatch(progressBar(perc, key));
				if (callback && perc === 100) {
					dispatch(searchProgress(false));
					dispatch(callback(dispatch, file));
				}
			}).send((err, data) => {
				if (err) reject(err);
				else resolve(data);
			});
		})
	};
}

export const uploadFiles = (dispatch, files, callback=null) => {
	dispatch(uploadedFiles(files));
	return {
		type: 'GET_AWS_UPLOAD',
		payload: new Promise((resolve, reject) => {
			if (!files.length) {
				return;
			}
			
			for (let i = 0; i < files.length; i++) {
				var file = files[i];
				uploadFile(dispatch, file, i, callback);
			}
		})
	};
};