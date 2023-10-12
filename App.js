import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { RootSiblingParent } from 'react-native-root-siblings';
import {
	useFonts,
	Sora_400Regular,
	Sora_500Medium,
	Sora_700Bold,
	Sora_300Light,
} from '@expo-google-fonts/sora';
import { config } from './gluestack-ui.config';
import UserType from './src/screens/UserType';
import Navigator from './Navigator';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
// import InteractiveScreen from './src/screens/InteractiveScreen';
export default function App() {
	let [fontsLoaded, fontError] = useFonts({
		Sora_500Medium,
		Sora_700Bold,
		Sora_300Light,
		Sora_400Regular,
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<RootSiblingParent>
			<GluestackUIProvider config={config}>
				<SafeAreaProvider style={[styles.container]}>
					<Navigator />
					{/* <InteractiveScreen /> */}
					<StatusBar style='auto' />
				</SafeAreaProvider>
			</GluestackUIProvider>
		</RootSiblingParent>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// padding: 20,
		fontFamily: 'Sora_300Light',
		// backgroundColor: '#fffee6',
	},
});
