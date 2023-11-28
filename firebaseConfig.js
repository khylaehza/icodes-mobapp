// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
// 	apiKey: 'AIzaSyA2WYfFqJR8_mPr73onUSxCHe7zIyIJ_10',
// 	authDomain: 'icodes-ctc-db.firebaseapp.com',
// 	projectId: 'icodes-ctc-db',
// 	storageBucket: 'icodes-ctc-db.appspot.com',
// 	messagingSenderId: '1051781258891',
// 	appId: '1:1051781258891:web:2dad91823aa7886091fe8e',
// };

const firebaseConfig = {
	apiKey: 'AIzaSyA68zDtDVQ8N-ru5QEkdAgWaHCuY017wbc',
	authDomain: 'icodes-ctc-db1.firebaseapp.com',
	projectId: 'icodes-ctc-db1',
	storageBucket: 'icodes-ctc-db1.appspot.com',
	messagingSenderId: '663159201855',
	appId: '1:663159201855:web:d2b4b2a8b2ef19c004988a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
