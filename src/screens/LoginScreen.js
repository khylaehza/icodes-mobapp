import { View, StyleSheet } from 'react-native';
import LogoLogin from '../layouts/LogoLogin';
import BottomLogin from '../layouts/BottomLogin';
import TopLogin from '../layouts/TopLogin';
import { Box, Button } from '@gluestack-ui/themed';
import CusText from '../components/CusText';
const LoginScreen = ({ navigation }) => {
	// if (unitOwners) {
	return (
		<View style={styles.container}>
			<TopLogin />
			<LogoLogin />
			<BottomLogin
				navigation={navigation}
				// unitOwners={unitOwners}
			/>
		</View>
	);
	// }
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
	},
});
export default LoginScreen;
