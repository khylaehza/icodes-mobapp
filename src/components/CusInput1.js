import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';
import { useState } from 'react';
import color from '../themes/Color';
import { FontAwesome5 } from '@expo/vector-icons';
import { Button, HStack, InputIcon } from '@gluestack-ui/themed';
import CusText from './CusText';
const CusInput1 = ({
	control,
	name,
	rules = {},
	placeholder,
	secureTextEntry,
	keyboardType,
	type,
	maxLength,
	autoCapitalize,
	value,
}) => {
	const [bgColor, setBgColor] = useState(false);
	const [showPassword, setShowPassword] = useState(true);
	const handleState = () => {
		!secureTextEntry;
		setShowPassword((showState) => {
			return !showState;
		});
	};
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<>
					<View
						style={[
							styles.container,
							{
								borderColor: error ? color.r100 : color.b100,
								backgroundColor: bgColor
									? color.b100
									: color.w200,
							},
						]}
					>
						{type == 'password' ? (
							<HStack
								justifyContent='space-between'
								alignItems='center'
							>
								<TextInput
									value={value}
									onChangeText={onChange}
									placeholder={placeholder}
									style={[styles.input]}
									secureTextEntry={showPassword}
									keyboardType={keyboardType}
									onFocus={() => setBgColor(true)}
									onBlur={() => setBgColor(false)}
									type={type}
									maxLength={maxLength}
									autoCapitalize={autoCapitalize}
									width={'100%'}
								/>
								<Button
									variant='link'
									onPress={handleState}
									h={15}
									ml={-30}
								>
									{showPassword ? (
										<FontAwesome5
											name='eye-slash'
											size={15}
											color='gray'
										/>
									) : (
										<FontAwesome5
											name='eye'
											size={15}
											color='black'
										/>
									)}
								</Button>
							</HStack>
						) : (
							<TextInput
								value={value}
								onChangeText={onChange}
								placeholder={placeholder}
								style={[styles.input]}
								secureTextEntry={secureTextEntry}
								keyboardType={keyboardType}
								onFocus={() => setBgColor(true)}
								onBlur={() => setBgColor(false)}
								type={type}
								maxLength={maxLength}
								autoCapitalize={autoCapitalize}
							/>
						)}
					</View>
					{error && (
						<Text style={styles.error}>
							{error.message || 'Error'}
						</Text>
					)}
				</>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: color.w200,
		width: '100%',
		borderColor: color.b100,
		borderWidth: 1,
		borderRadius: 5,
		padding: 8,
		marginVertical: 5,
		alignSelf: 'center',
	},
	input: {
		color: color.b300,
		fontFamily: 'Sora_400Regular',
		fontSize: 14,
	},
	error: {
		color: color.r100,
		alignSelf: 'stretch',
		top: -5,
		left: 3,
		fontSize: 12.2,
	},
});
export default CusInput1;
