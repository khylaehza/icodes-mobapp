import React, { useContext, useState, useEffect } from 'react';
import Toast from 'react-native-root-toast';
import { db } from './firebaseConfig';
import { collection, query, onSnapshot } from 'firebase/firestore';
const DataContext = React.createContext();

export function useData() {
	return useContext(DataContext);
}

const DataProvider = ({ children }) => {
	const [employees, setEmployees] = useState();
	const [unitOwners, setUnitOwners] = useState();
	const [error, setError] = useState(false);
	const [curUser, setCurUser] = useState();
	const [unitInfo, setUnitInfo] = useState();
	const [anncmnts, setAnncmnts] = useState([{}]);
	const [mrequest, setMRequest] = useState([{}]);
	const [reports, setReports] = useState();

	const Login = async (username, userpass, navigation) => {
		await unitOwners.map((data, id) => {
			if (username === data.uName && userpass === data.pw) {
				// setCurUser(data);

				data.units.map((unit) => {
					setCurUser({ ...data, tower: unit.toString().slice(0, 2) });
				});

				navigation.navigate('Home');
			} else {
				setError(true);
			}
		});
	};

	const AgentLogin = async (username, userpass, navigation) => {
		await employees.map((data, id) => {
			if (
				username === data.uName &&
				userpass === data.password &&
				username.includes('AG')
			) {
				setCurUser(data);
				navigation.navigate('AgentHome');
			}
		});
	};

	useEffect(() => {
		const q = query(
			collection(db, 'maintenance', 'admin', 'tbl_employees')
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const employees = [];
			querySnapshot.forEach(
				(doc) => {
					employees.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setEmployees(employees);
		});
		return () => unsubscribe();
	}, []);

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
					mrequest.push({ ...doc.data(), id: doc.id });
					// }

					// mrequest.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setMRequest(mrequest);
		});
		return () => unsubscribe();
	}, []);

	const [visitors, setVisitors] = useState([{}]);
	useEffect(() => {
		const q = query(
			collection(db, 'maintenance', 'frontdesk', 'tbl_visitor')
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const visitors = [];
			querySnapshot.forEach(
				(doc) => {
					visitors.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setVisitors(visitors);
		});
		return () => unsubscribe();
	}, []);

	const [bookings, setBookings] = useState([{}]);
	useEffect(() => {
		const q = query(
			collection(db, 'maintenance', 'frontdesk', 'tbl_BAmenities')
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const bookings = [];
			querySnapshot.forEach(
				(doc) => {
					bookings.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setBookings(bookings);
		});
		return () => unsubscribe();
	}, []);

	const [amenities, setAmenities] = useState([{}]);
	useEffect(() => {
		const q = query(
			collection(db, 'maintenance', 'admin', 'tbl_amenities')
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const amenities = [];
			querySnapshot.forEach(
				(doc) => {
					amenities.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setAmenities(amenities);
		});
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const q = query(collection(db, 'maintenance', 'admin', 'tbl_reports'));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const report = [];

			querySnapshot.forEach(
				(doc) => {
					report.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setReports(report);
		});
		return () => unsubscribe();
	}, []);

	console.log(curUser);
	const value = {
		Login,
		AgentLogin,
		unitOwners,
		curUser,
		error,
		unitInfo,
		anncmnts,
		mrequest,
		visitors,
		bookings,
		amenities,
		reports,
	};

	return (
		<DataContext.Provider value={value}>{children}</DataContext.Provider>
	);
};

export default DataProvider;
