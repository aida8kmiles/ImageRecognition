import * as firebase from 'firebase';


export const FirebaseConstant = {
	basePath: '/project2/demo',
	logPath: '/project2/logs',
	log2Path: '/project2/logs2',
	configFb: configFb
};

export const firebaseApp = firebase.initializeApp(configFb);

export const firebaseDatabase = firebase.database();
