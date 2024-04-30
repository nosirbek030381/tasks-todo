import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCESiGYPJ8orKE5c-vgeL2ysL_pGf0yllU',
	authDomain: 'todo-12ced.firebaseapp.com',
	projectId: 'todo-12ced',
	storageBucket: 'todo-12ced.appspot.com',
	messagingSenderId: '126153575100',
	appId: '1:126153575100:web:fa58366fd8b5c0359b5eb9',
	measurementId: 'G-P4SHRPXYMN',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db };
