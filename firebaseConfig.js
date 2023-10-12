// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAQOk3qcOzuEHCcjJzIr7e67v2dN7QgFw8',
	authDomain: 'db-icodes-thesis.firebaseapp.com',
	projectId: 'db-icodes-thesis',
	storageBucket: 'db-icodes-thesis.appspot.com',
	messagingSenderId: '909723058588',
	appId: '1:909723058588:web:327efef65a96d54d6f0859',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
