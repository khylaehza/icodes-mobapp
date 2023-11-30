import { View, Text, StyleSheet } from 'react-native';

import { useForm } from 'react-hook-form';
import CusInput from '../components/CusInput';
import { Button } from '@gluestack-ui/themed';
import CusText from '../components/CusText';
import CusInput1 from '../components/CusInput1';
import { useData } from '../../DataContext';
function BottomLogin({ navigation }) {
	const { Login, AgentLogin, setError, error } = useData();

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

		if (username.includes('AG')) {
			AgentLogin(username, userpass, navigation);
		} else if (username.includes('Owner')) {
			Login(username, userpass, navigation);
		}

		reset();
	};

	return (
		<View style={style.container}>
			<CusText
				style={[style.introTxt]}
				text={'Manage your transaction with ease.'}
				type={'HEADING'}
			/>

			<CusText
				style={[style.introTxt, { fontSize: 11 }]}
				text={"Congressional Town Center's Unit Owners & Agents."}
				type={'PRIMARY'}
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

			{error !== 'none' && (
				<>
					{!watch('uname') && (
						<CusText
							text={error}
							type={'SECONDARY'}
							style={{ color: 'red', fontSize: 11 }}
						/>
					)}
				</>
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
	);
}
const style = StyleSheet.create({
	container: {
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

	introTxt: {
		// fontSize: 24,
		textAlign: 'center',
		lineHeight: 30,
		textTransform: 'uppercase',
	},

	infoTxt: {
		fontSize: 10,
		textAlign: 'center',
		textTransform: 'uppercase',
		marginBottom: 30,
		fontFamily: 'sf-ui-display-semibold',
	},
});
export default BottomLogin;
