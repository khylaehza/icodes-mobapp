import TopLogin from '../layouts/TopLogin';
import LogoLogin from '../layouts/LogoLogin';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import CusText from '../components/CusText';
import CusInput1 from '../components/CusInput1';
import { useForm } from 'react-hook-form';
import { Button } from '@gluestack-ui/themed';
import { useData } from '../../DataContext';

const AgentLogScreen = ({ navigation }) => {
	const { AgentLogin, error } = useData();
	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
	} = useForm();

	const onLoginPressed = (data) => {
		let username = data['uname'];
		let userpass = data['pass'];

		// let username = 'Owner_111111';
		// let userpass = '1234';

		AgentLogin(username, userpass, navigation);
		reset();
	};

	return (
		<View style={styles.container}>
			<TopLogin />
			<LogoLogin />
			<View style={styles.bottom}>
				<CusText
					text={'AGENT LOGIN'}
					type={'TERTIARY'}
				/>
				<CusInput1
					placeholder={'Username'}
					name='uname'
					control={control}
					rules={{ required: 'Username is required.' }}
					autoCapitalize='words'
				/>
				<CusInput1
					placeholder={'Password'}
					name='pass'
					control={control}
					rules={{ required: 'Password is required.' }}
					type={'password'}
					secureTextEntry
				/>
				{error && (
					<CusText
						text={'Account does not exist.'}
						type={'SECONDARY'}
						style={{ color: 'red', fontSize: 11 }}
					/>
				)}
				<Button
					bgColor='$blue300'
					w={'100%'}
					mt={10}
					onPress={handleSubmit(onLoginPressed)}
				>
					<CusText
						text={'START'}
						style={{ color: '#FFF', fontSize: 16 }}
						type={'SECONDARY'}
					/>
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
	},

	bottom: {
		backgroundColor: '#f8fafa',
		borderRadius: 20,
		width: '100%',
		flex: 1,
		marginTop: -20,
		marginBottom: -20,
		zIndex: 2,
		paddingTop: 50,
		paddingLeft: 25,
		paddingRight: 25,
		alignItems: 'center',
	},
});

export default AgentLogScreen;
