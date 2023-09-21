import { View, StyleSheet, Image } from 'react-native';

function LogoLogin() {
	return (
		<View style={[style.container]}>
			<Image
				source={require('../../assets/imgs/icodes-logo.png')}
				style={style.logo}
			/>
		</View>
	);
}

const style = StyleSheet.create({
	logo: {
		objectFit: 'scale-down',
		height: 50,
		width: 50,
	},

	container: {
		backgroundColor: '#fff',
		borderRadius: 100,
		padding: 15,
		position: 'absolute',
		zIndex: 3,
		elevation: 10,
		bottom: 240,
	},
});
export default LogoLogin;
