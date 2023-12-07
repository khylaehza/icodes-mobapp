import React, { useContext, useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, query, onSnapshot } from 'firebase/firestore';

const DataContext = React.createContext();

export function useData() {
	return useContext(DataContext);
}

const DataProvider = ({ children }) => {
	const [employees, setEmployees] = useState();
	const [unitOwners, setUnitOwners] = useState();
	const [error, setError] = useState('none');
	const [curUser, setCurUser] = useState();
	const [unitInfo, setUnitInfo] = useState();
	const [anncmnts, setAnncmnts] = useState([{}]);
	const [mrequest, setMRequest] = useState([{}]);
	const [reports, setReports] = useState();

	const Login = async (username, userpass, navigation) => {
		var hasMatch =
			unitOwners.filter((data) => {
				return username === data.UName;
			}).length > 0;

		if (!hasMatch) {
			setError('Account does not exist!');
		}

		await unitOwners.map((data, id) => {
			let tower = data.Units.toString().slice(0, 2);
			if (
				username === data.UName &&
				userpass === data.Password &&
				!data.Status
			) {
				setError('Account is currently disabled.');
			} else {
				if (
					username === data.UName &&
					userpass === data.Password &&
					data.Status
				) {
					setCurUser({
						...data,
						Tower: data.Units.toString().slice(0, 2),
						TName: `Tower ${tower.slice(1)} (${tower})`,
					});

					setError('none');
					navigation.navigate('Home');
				} else if (
					username === data.UName &&
					userpass != data.Password
				) {
					setError('Invalid Password.');
				}
			}
		});
	};

	const AgentLogin = async (username, userpass, navigation) => {
		var hasMatch =
			employees.filter((data) => {
				return username === data.UName;
			}).length > 0;

		if (!hasMatch) {
			setError('Account does not exist!');
		}

		await employees.map((data, id) => {
			if (
				username === data.UName &&
				userpass === data.Password &&
				data.Status === false
			) {
				setError('Account is currently disabled.');
			} else {
				if (
					username === data.UName &&
					userpass === data.Password &&
					data.Status === true
				) {
					setCurUser(data);
					navigation.navigate('AgentHome');
				} else if (
					username === data.UName &&
					userpass != data.Password
				) {
					setError('Invalid Password.');
				}
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
		const q = query(collection(db, 'maintenance', 'admin', 'tbl_setUnit'));
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
				'tbl_announcements'
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
			collection(
				db,
				'maintenance',
				'propertymanagement',
				'tbl_maintenance'
			)
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
			collection(db, 'maintenance', 'frontdesk', 'tbl_visitors')
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
			collection(db, 'maintenance', 'frontdesk', 'tbl_bookings')
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

	const [manningSched, setManningSched] = useState([{}]);
	useEffect(() => {
		const q = query(
			collection(
				db,
				'maintenance',
				'salesmanagement',
				'tbl_manningSchedule'
			)
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const schedule = [];
			querySnapshot.forEach(
				(doc) => {
					schedule.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setManningSched(schedule);
		});
		return () => unsubscribe();
	}, []);

	const [pBuyers, setPBuyers] = useState([{}]);
	useEffect(() => {
		const q = query(
			collection(db, 'maintenance', 'salesmanagement', 'tbl_prosBuyers')
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const buyers = [];
			querySnapshot.forEach(
				(doc) => {
					buyers.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setPBuyers(buyers);
		});
		return () => unsubscribe();
	}, []);

	const [amounts, setAmounts] = useState([{}]);
	useEffect(() => {
		const q = query(
			collection(db, 'maintenance', 'admin', 'tbl_setAmount')
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const amt = [];

			querySnapshot.forEach(
				(doc) => {
					amt.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);

			setAmounts(amt);
		});
		return () => unsubscribe();
	}, []);

	const [units, setUnits] = useState([{}]);
	const [unitTowerID, setUnitTowerID] = useState([{}]);
	useEffect(() => {
		const q = query(collection(db, 'maintenance', 'admin', 'tbl_towers'));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const unit = [];
			const unitTID = [];
			querySnapshot.forEach(
				(doc) => {
					unit.push({ ...doc.data().Units });
					unitTID.push({ ...doc.data().Units, id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setUnits(unit);
			setUnitTowerID(unitTID);
		});
		return () => unsubscribe();
	}, []);

	const Logout = async (navigation) => {
		setCurUser();
		setError('none');
		navigation.navigate('Login');
	};

	const [unitTypes, setUnitTypes] = useState([{}]);
	useEffect(() => {
		const q = query(
			collection(db, 'maintenance', 'admin', 'tbl_unitTypes')
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const unTypes = [];
			querySnapshot.forEach(
				(doc) => {
					unTypes.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setUnitTypes(unTypes);
		});
		return () => unsubscribe();
	}, []);

	const [towers, setTowers] = useState([{}]);
	useEffect(() => {
		const q = query(collection(db, 'maintenance', 'admin', 'tbl_towers'));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const towers = [];
			querySnapshot.forEach(
				(doc) => {
					towers.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setTowers(towers);
		});
		return () => unsubscribe();
	}, []);

	const [payterm, setPayterm] = useState([{}]);
	useEffect(() => {
		const q = query(collection(db, 'maintenance', 'admin', 'tbl_payTerms'));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const payterm = [];
			querySnapshot.forEach(
				(doc) => {
					payterm.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setPayterm(payterm);
		});
		return () => unsubscribe();
	}, []);

	const [soa, setSOA] = useState([{}]);
	useEffect(() => {
		const q = query(
			collection(db, 'maintenance', 'accountingmanagement', 'tbl_soa')
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const soa = [];
			querySnapshot.forEach(
				(doc) => {
					soa.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setSOA(soa);
		});
		return () => unsubscribe();
	}, []);

	const [transactions, setTransactions] = useState([{}]);
	useEffect(() => {
		const q = query(
			collection(
				db,
				'maintenance',
				'accountingmanagement',
				'tbl_transactions'
			)
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const transactions = [];
			querySnapshot.forEach(
				(doc) => {
					transactions.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setTransactions(transactions);
		});
		return () => unsubscribe();
	}, []);
	const value = {
		Login,
		AgentLogin,
		unitOwners,
		curUser,
		setError,
		error,
		unitInfo,
		anncmnts,
		mrequest,
		visitors,
		bookings,
		amenities,
		reports,
		manningSched,
		pBuyers,
		amounts,
		units,
		Logout,
		unitTypes,
		towers,
		payterm,
		soa,
		transactions,
	};

	return (
		<DataContext.Provider value={value}>{children}</DataContext.Provider>
	);
};

export default DataProvider;
