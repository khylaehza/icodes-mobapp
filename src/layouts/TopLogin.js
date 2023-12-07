import { View, StyleSheet, ImageBackground } from 'react-native';

function TopLogin() {
	return (
		<View style={styles.topView}>
			<ImageBackground
				source={require('../../assets/imgs/bg.jpg')}
				resizeMode='cover'
				style={styles.background}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	background: {
		height: '100%',
		width: '100%',
	},

	topView: {
		width: '100%',
		height: '50%',
	},
});

export default TopLogin;
