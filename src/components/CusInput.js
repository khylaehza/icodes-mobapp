import {
	FormControl,
	Input,
	HStack,
	InputField,
	FormControlHelper,
	FormControlError,
	FormControlErrorText,
	FormControlHelperText,
	FormControlLabel,
	FormControlLabelText,
	FormControlErrorIcon,
} from '@gluestack-ui/themed';
import { Controller } from 'react-hook-form';
import CusText from './CusText';

// const CusInput = ({
// 	icon,
// 	type,
// 	readOnly = false,
// 	keyboard = 'default',
// 	value,
// 	setValue,
// 	onChangeText,
// 	setEditingValue,
// 	editValue,
// }) => {
// 	const handleChange = (text) => {
// 		setValue(text);
// 	};

// 	const handleDone = (text) => {
// 		setValue(text);
// 	};
// 	return (
// 		<FormControl isRequired>
// 			<HStack
// 				justifyContent='space-between'
// 				alignItems='center'
// 			>
// 				{icon}
// 				<Input
// 					variant='underlined'
// 					size='md'
// 					isReadOnly={readOnly}
// 					w={250}
// 				>
// 					<InputField
// 						placeholder={type}
// 						fontFamily='Sora_300Light'
// 						fontSize={15}
// 						color='#000'
// 						keyboardType={keyboard}
// 						value={editValue}
// 						onChangeText={(val) => setEditingValue(val)}
// 						onEndEditing={handleChange}
// 					/>
// 				</Input>
// 			</HStack>
// 		</FormControl>
// 	);
// };

const CusInput = ({
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
	icon,
	readOnly = false,
	keyboard = 'default',
	w = 250,
}) => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<>
					<FormControl isRequired>
						<HStack
							justifyContent='space-between'
							alignItems='center'
						>
							<FormControlLabel>{icon}</FormControlLabel>

							<Input
								variant='underlined'
								size='md'
								isReadOnly={readOnly}
								w={w}
								ml={10}
							>
								<InputField
									fontFamily='Sora_300Light'
									fontSize={15}
									color='#000'
									keyboardType={keyboardType}
									value={value}
									onChangeText={onChange}
									placeholder={placeholder}
									type={type}
									maxLength={maxLength}
									autoCapitalize={autoCapitalize}
								/>
							</Input>
						</HStack>
						{error && (
							<CusText
								text={error.message || 'Error'}
								type={'PRIMARY'}
								style={{
									textAlign: 'left',
									marginLeft: 45,
									marginTop: -2,
									fontSize: 12,
									color: '#B91E23',
								}}
							/>
						)}
					</FormControl>
				</>
			)}
		/>
	);
};

export default CusInput;
