import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import AnnouncementScreen from './src/screens/AnnouncementScreen';
import ServicesTabs from './src/layouts/ServicesTab';
import ProfileScreen from './src/screens/ProfileScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import AmenitiesScreen from './src/screens/AmenitiesScreen';
import MaintenanceScreen from './src/screens/MaintenanceScreen';
import VisitorsScreen from './src/screens/VisitorsScreen';
import OwnerInfo from './src/screens/OwnerInfo';
import UnitInfo from './src/screens/UnitInfo';
import FilesInfo from './src/screens/FilesInfo';
import LoginScreen from './src/screens/LoginScreen';
import UserType from './src/screens/UserType';
import OwnerLogScreen from './src/screens/OwnerLogScreen';
import ReportScreen from './src/screens/ReportScreen';
import TransactionScreen from './src/screens/TransactionScreen';
import AgentLogScreen from './src/screens/AgentLogScreen';
import AgentHomeScreen from './src/screens/AgentHomeScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import BuyersScreen from './src/screens/BuyersScreen';
import AgentProfileScreen from './src/screens/AgentProfileScreen';
import AgentServicesTab from './src/layouts/AgentServicesTab';
import FinderScreen from './src/layouts/FinderScreen';
import DesignerScreen from './src/layouts/DesignerScreen';
import InteractiveScreen from './src/screens/InteractiveScreen';
import QuestionsScreen from './src/screens/QuestionsScreen';
import DataProvider from './DataContext';
import { useData } from './DataContext';
import { VStack } from '@gluestack-ui/themed';
import ResultScreen from './src/screens/ResultScreen';
import CusText from './src/components/CusText';
import UnitSuitable from './src/screens/UnitSuitable';
const Stack = createNativeStackNavigator();
function Home({ navigation }) {
	const [expanded, setExpanded] = useState(false);
	const {
		curUser,
		unitInfo,
		anncmnts,
		mrequest,
		visitors,
		amenities,
		bookings,
		reports,
	} = useData();

	const _renderIcon = (routeName, selectedTab) => {
		let icon = '';
		let name = '';

		switch (routeName) {
			case 'Homepage':
				icon = 'home';
				name = 'Home';
				break;
			case 'Announcements':
				icon = 'announcement';
				name = 'Announcements';
				break;
			case 'Payments':
				icon = 'payment';
				name = 'SOA';
				break;
			case 'Profile':
				icon = 'person';
				name = 'Profile';
				break;
		}

		return (
			<VStack alignItems='center'>
				<MaterialIcons
					name={icon}
					size={25}
					color={routeName === selectedTab ? '#FFF' : '#B4C4D6'}
				/>
				<CusText
					text={name}
					type={'PRIMARY'}
					style={
						routeName === selectedTab
							? { color: '#FFF', fontSize: 9 }
							: { color: '#8e8e8e', fontSize: 9 }
					}
				/>
			</VStack>
		);
	};
	const renderTabBar = ({ routeName, selectedTab, navigate }) => {
		return (
			<TouchableOpacity
				onPress={(e) => {
					navigate(routeName);
					setExpanded(false);
				}}
				style={styles.items}
			>
				{_renderIcon(routeName, selectedTab)}
			</TouchableOpacity>
		);
	};

	return (
		<CurvedBottomBarExpo.Navigator
			type='DOWN'
			// style={styles.bottomBar}
			shadowStyle={styles.shadow}
			height={55}
			circleWidth={50}
			bgColor='#0f2f52'
			initialRouteName='Homepage'
			borderTopLeftRight
			renderCircle={({ selectedTab, navigate }) => (
				<Animated.View style={styles.btnCircleUp}>
					<ServicesTabs
						navigate={navigate}
						setExpanded={setExpanded}
						expanded={expanded}
					/>
				</Animated.View>
			)}
			tabBar={renderTabBar}
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
			}}
		>
			<CurvedBottomBarExpo.Screen
				name='Homepage'
				component={() => <HomeScreen setExpanded={setExpanded} />}
				position='LEFT'
			/>
			<CurvedBottomBarExpo.Screen
				name='Announcements'
				component={() => (
					<AnnouncementScreen
						setExpanded={setExpanded}
						anncmnts={anncmnts}
						curUser={curUser}
					/>
				)}
				position='LEFT'
			/>
			<CurvedBottomBarExpo.Screen
				name='Maintenance'
				component={() => (
					<MaintenanceScreen
						setExpanded={setExpanded}
						curUser={curUser}
						mrequest={mrequest}
					/>
				)}
			/>
			<CurvedBottomBarExpo.Screen
				name='Visitors'
				component={() => (
					<VisitorsScreen
						setExpanded={setExpanded}
						curUser={curUser}
						visitors={visitors}
					/>
				)}
			/>
			<CurvedBottomBarExpo.Screen
				name='Amenities'
				component={() => (
					<AmenitiesScreen
						setExpanded={setExpanded}
						curUser={curUser}
						amenities={amenities}
						bookings={bookings}
					/>
				)}
			/>
			<CurvedBottomBarExpo.Screen
				name='FilesInfo'
				component={() => (
					<FilesInfo
						setExpanded={setExpanded}
						navigation={navigation}
						curUser={curUser}
					/>
				)}
			/>
			<CurvedBottomBarExpo.Screen
				name='OwnerInfo'
				component={() => (
					<OwnerInfo
						setExpanded={setExpanded}
						navigation={navigation}
						curUser={curUser}
					/>
				)}
			/>

			<CurvedBottomBarExpo.Screen
				name='Reports'
				component={() => (
					<ReportScreen
						setExpanded={setExpanded}
						navigation={navigation}
						curUser={curUser}
						reports={reports}
					/>
				)}
			/>
			<CurvedBottomBarExpo.Screen
				name='UnitInfo'
				component={() => (
					<UnitInfo
						setExpanded={setExpanded}
						navigation={navigation}
						curUser={curUser}
						unitInfo={unitInfo}
					/>
				)}
			/>
			<CurvedBottomBarExpo.Screen
				name='Payments'
				component={() => (
					<PaymentScreen
						setExpanded={setExpanded}
						curUser={curUser}
					/>
				)}
				position='RIGHT'
			/>
			<CurvedBottomBarExpo.Screen
				name='Transactions'
				component={() => (
					<TransactionScreen
						setExpanded={setExpanded}
						curUser={curUser}
					/>
				)}
			/>
			<CurvedBottomBarExpo.Screen
				name='Profile'
				component={() => (
					<ProfileScreen
						setExpanded={setExpanded}
						navigation={navigation}
						curUser={curUser}
					/>
				)}
				position='RIGHT'
			/>
		</CurvedBottomBarExpo.Navigator>
	);
}

function AgentHome({ route, navigation }) {
	const [expanded, setExpanded] = useState(false);
	const {
		curUser,
		manningSched,
		pBuyers,
		unitInfo,
		amounts,
		units,
		Logout,
		amenities,
		towers,
		unitTypes,
	} = useData();

	const _renderIcon = (routeName, selectedTab) => {
		let icon = '';
		let name = '';

		switch (routeName) {
			case 'Homepage':
				icon = 'home';
				name = 'Home';
				break;
			case 'Schedule':
				icon = 'calendar-today';
				name = 'Schedule';
				break;
			case 'Prospective':
				icon = 'supervised-user-circle';
				name = 'Prospective Buyers';
				break;
			case 'Profile':
				icon = 'person';
				name = 'Profile';
				break;
		}

		return (
			<VStack alignItems='center'>
				<MaterialIcons
					name={icon}
					size={25}
					color={routeName === selectedTab ? '#FFF' : '#B4C4D6'}
				/>
				<CusText
					text={name}
					type={'PRIMARY'}
					style={
						routeName === selectedTab
							? { color: '#FFF', fontSize: 9 }
							: { color: '#8e8e8e', fontSize: 9 }
					}
				/>
			</VStack>
		);
	};
	const renderTabBar = ({ routeName, selectedTab, navigate }) => {
		return (
			<TouchableOpacity
				onPress={(e) => {
					navigate(routeName);
					setExpanded(false);
				}}
				style={styles.items}
			>
				{_renderIcon(routeName, selectedTab)}
			</TouchableOpacity>
		);
	};

	const [unitChosen, setUnitChosen] = useState();
	const [unitSize, setUnitSize] = useState();

	const [dssResult, setDssRes] = useState();
	const [pref, setPref] = useState();
	return (
		<CurvedBottomBarExpo.Navigator
			type='DOWN'
			// style={styles.bottomBar}
			shadowStyle={styles.shadow}
			height={55}
			circleWidth={50}
			bgColor='#0f2f52'
			initialRouteName='Homepage'
			borderTopLeftRight
			renderCircle={({ selectedTab, navigate }) => (
				<Animated.View style={styles.btnCircleUp}>
					<AgentServicesTab
						navigate={navigate}
						setExpanded={setExpanded}
						expanded={expanded}
					/>
				</Animated.View>
			)}
			tabBar={renderTabBar}
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
			}}
		>
			<CurvedBottomBarExpo.Screen
				name='Homepage'
				component={() => (
					<AgentHomeScreen
						setExpanded={setExpanded}
						curUser={curUser}
						manningSched={manningSched}
						pBuyers={pBuyers}
					/>
				)}
				position='LEFT'
			/>
			<CurvedBottomBarExpo.Screen
				name='Schedule'
				component={() => (
					<ScheduleScreen
						setExpanded={setExpanded}
						curUser={curUser}
						manningSched={manningSched}
					/>
				)}
				position='LEFT'
			/>
			<CurvedBottomBarExpo.Screen
				name='Finder'
				component={() => (
					<FinderScreen
						setExpanded={setExpanded}
						curUser={curUser}
						navigation={navigation}
					/>
				)}
			/>
			<CurvedBottomBarExpo.Screen
				name='Designer'
				component={() => (
					<DesignerScreen
						setExpanded={setExpanded}
						curUser={curUser}
						navigation={navigation}
						unitInfo={unitInfo}
						setUnitChosen={setUnitChosen}
						setUnitSize={setUnitSize}
					/>
				)}
			/>
			<CurvedBottomBarExpo.Screen
				name='Interactive'
				component={() => (
					<InteractiveScreen
						setExpanded={setExpanded}
						curUser={curUser}
						navigation={navigation}
						route={route}
						unitChosen={unitChosen}
						unitInfo={unitInfo}
						amounts={amounts}
						unitSize={unitSize}
						units={units}
					/>
				)}
			/>
			<CurvedBottomBarExpo.Screen
				name='Questions'
				component={() => (
					<QuestionsScreen
						setExpanded={setExpanded}
						amenities={amenities}
						setDssRes={setDssRes}
						navigation={navigation}
					/>
				)}
			/>
			<CurvedBottomBarExpo.Screen
				name='Result'
				component={() => (
					<ResultScreen
						setExpanded={setExpanded}
						dssResult={dssResult}
						navigation={navigation}
						setPref={setPref}
					/>
				)}
			/>
			<CurvedBottomBarExpo.Screen
				name='Suitable'
				component={() => (
					<UnitSuitable
						setExpanded={setExpanded}
						dssResult={dssResult}
						navigation={navigation}
						pref={pref}
						units={units}
						unitTypes={unitTypes}
						unitData={unitInfo}
						towers={towers}
						amenities={amenities}
					/>
				)}
			/>

			<CurvedBottomBarExpo.Screen
				name='Prospective'
				component={() => (
					<BuyersScreen
						setExpanded={setExpanded}
						curUser={curUser}
						pBuyers={pBuyers}
					/>
				)}
				position='RIGHT'
			/>
			<CurvedBottomBarExpo.Screen
				name='Profile'
				component={() => (
					<AgentProfileScreen
						setExpanded={setExpanded}
						curUser={curUser}
						navigation={navigation}
						Logout={Logout}
					/>
				)}
				position='RIGHT'
			/>
		</CurvedBottomBarExpo.Navigator>
	);
}

const Navigator = () => {
	return (
		<NavigationContainer>
			<DataProvider>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen
						name='Login'
						component={LoginScreen}
					/>
					<Stack.Screen
						name='Type'
						component={UserType}
					/>
					<Stack.Screen
						name='OwnerLog'
						component={OwnerLogScreen}
					/>
					<Stack.Screen
						name='AgentLog'
						component={AgentLogScreen}
					/>
					<Stack.Screen
						name='Home'
						component={Home}
					/>
					<Stack.Screen
						name='AgentHome'
						component={AgentHome}
					/>
				</Stack.Navigator>
			</DataProvider>
		</NavigationContainer>
	);
};

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	shadow: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
	},

	btnCircleUp: {
		width: 60,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#0f2f52',
		bottom: -1,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
	},
	items: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Navigator;
