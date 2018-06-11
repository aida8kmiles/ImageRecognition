import * as firebase from 'firebase';

var configFb = {
    apiKey: "AIzaSyDlPAInKrjzRSzJJ_wCGmA7Xrj3p6k82Ts",
    authDomain: "eightkmiles-a9417.firebaseapp.com",
    databaseURL: "https://eightkmiles-a9417.firebaseio.com",
    projectId: "eightkmiles-a9417",
    storageBucket: "eightkmiles-a9417.appspot.com",
    messagingSenderId: "368615065189"
  };


//FirebaseConstant.configFb.apiKey
export const FirebaseConstant = {
	basePath: '/project2/demo',
	logPath: '/project2/logs',
	log2Path: '/project2/logs2',
	configFb: configFb
};

export const firebaseApp = firebase.initializeApp(configFb);

export const firebaseDatabase = firebase.database();
