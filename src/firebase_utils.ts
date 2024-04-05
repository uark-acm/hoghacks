import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyAG_oIwQBGpiDMlrvcCwd6pCO6TuL09Xv8',
    authDomain: 'hoghacks-fdf54.firebaseapp.com',
    projectId: 'hoghacks-fdf54',
    storageBucket: 'hoghacks-fdf54.appspot.com',
    messagingSenderId: '792520881676',
    appId: '1:792520881676:web:326c6b4d210a2e0af32029'
};

const app = initializeApp(firebaseConfig);

export default app;