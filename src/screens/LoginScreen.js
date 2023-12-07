import { View, StyleSheet } from 'react-native';
import LogoLogin from '../layouts/LogoLogin';
import BottomLogin from '../layouts/BottomLogin';
import TopLogin from '../layouts/TopLogin';
import { Box, Button } from '@gluestack-ui/themed';
import CusText from '../components/CusText';
const LoginScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<TopLogin />
			<LogoLogin />
			<BottomLogin navigation={navigation} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		height: '100%',
		justifyContent: 'center',
	},
});
export default LoginScreen;
