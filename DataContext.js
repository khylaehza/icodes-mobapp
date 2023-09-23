import React, { useContext, useState, useEffect } from 'react';
import Toast from 'react-native-root-toast';
import { db } from './firebaseConfig';
import { collection, query, onSnapshot } from 'firebase/firestore';
const DataContext = React.createContext();

export function useData() {
	return useContext(DataContext);
}

const DataProvider = ({ children }) => {
	const [unitOwners, setUnitOwners] = useState();
	const [error, setError] = useState(false);
	const [curUser, setCurUser] = useState();
	const [unitInfo, setUnitInfo] = useState();
	const [anncmnts, setAnncmnts] = useState([{}]);
	const [mrequest, setMRequest] = useState([{}]);

	const Login = async (username, userpass, navigation) => {
		await unitOwners.map((data, id) => {
			if (username === data.uName && userpass === data.pw) {
				setCurUser(data);

				navigation.navigate('Home');
			} else {
				setError(true);
			}
		});
	};

	useEffect(() => {
		const q = query(
			collection(db, 'maintenance', 'admin', 'tbl_unitOwners')
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const uo = [];

			querySnapshot.forEach(
				(doc) => {
					uo.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);

			setUnitOwners(uo);
		});
		2;
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const q = query(collection(db, 'maintenance', 'admin', 'tbl_setTypes'));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const unt = [];

			querySnapshot.forEach(
				(doc) => {
					unt.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setUnitInfo(unt);
		});
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const q = query(
			collection(
				db,
				'maintenance',
				'propertymanagement',
				'tbl_Announcements'
			)
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const anncmnts = [];
			querySnapshot.forEach(
				(doc) => {
					anncmnts.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setAnncmnts(anncmnts);
		});
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const q = query(
			collection(db, 'maintenance', 'propertymanagement', 'tbl_MRequest')
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const mrequest = [];
			querySnapshot.forEach(
				(doc) => {
					// if (curUser.uid === doc.data().RequestedBy) {
					// 	mrequest.push({ ...doc.data(), id: doc.id });
					// }

					mrequest.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setMRequest(mrequest);
		});
		return () => unsubscribe();
	}, []);

	const value = {
		Login,
		unitOwners,
		curUser,
		error,
		unitInfo,
		anncmnts,
		mrequest,
	};

	return (
		<DataContext.Provider value={value}>{children}</DataContext.Provider>
	);
};

export default DataProvider;
