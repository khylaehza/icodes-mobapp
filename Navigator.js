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
import DataProvider from './DataContext';
import { useData } from './DataContext';
const Stack = createNativeStackNavigator();
function Home({ navigation }) {
	const [expanded, setExpanded] = useState(false);
	const { curUser, unitInfo, anncmnts } = useData();

	const _renderIcon = (routeName, selectedTab) => {
		let icon = '';

		switch (routeName) {
			case 'Homepage':
				icon = 'home';
				break;
			case 'Announcements':
				icon = 'announcement';
				break;
			case 'Payments':
				icon = 'payment';
				break;
			case 'Profile':
				icon = 'person';
				break;
		}

		return (
			<MaterialIcons
				name={icon}
				size={25}
				color={routeName === selectedTab ? '#FFF' : '#B4C4D6'}
			/>
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
					/>
				)}
			/>
			<CurvedBottomBarExpo.Screen
				name='Visitors'
				component={VisitorsScreen}
			/>
			<CurvedBottomBarExpo.Screen
				name='Amenities'
				component={AmenitiesScreen}
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
				component={() => <PaymentScreen setExpanded={setExpanded} />}
				position='RIGHT'
			/>
			<CurvedBottomBarExpo.Screen
				name='Profile'
				component={() => (
					<ProfileScreen
						setExpanded={setExpanded}
						navigation={navigation}
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
						name='Home'
						component={Home}
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
