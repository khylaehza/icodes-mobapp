import { StyleSheet } from 'react-native';
import { Text } from '@gluestack-ui/themed';
const CusText = ({ type, text, style, color }) => {
	return (
		<Text
			color={color}
			style={[styles[`text_${type}`], style]}
		>
			{text}
		</Text>
	);
};

const styles = StyleSheet.create({
	text_HEADING: {
		fontFamily: 'Sora_700Bold',
		fontSize: 28,
		paddingTop: 10,
		textAlign: 'left',
		color: '#0A2542',
	},

	text_PRIMARY: {
		fontFamily: 'Sora_300Light',
		fontSize: 15,
		textAlign: 'center',
		color: '#000',
	},
	text_SECONDARY: {
		fontFamily: 'Sora_500Medium',
		fontSize: 15,
		textAlign: 'center',
		color: '#000',
	},

	text_TERTIARY: {
		fontFamily: 'Sora_700Bold',
		fontSize: 18,
		textAlign: 'left',
		color: '#0A2542',
	},
	text_HEADNO: {
		fontFamily: 'Sora_700Bold',
		fontSize: 45,
		paddingTop: 30,
		textAlign: 'left',
		color: '#0A2542',
	},
});

export default CusText;
