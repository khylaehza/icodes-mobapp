import {
	FormControl,
	Input,
	HStack,
	InputField,
	FormControlLabel,
} from '@gluestack-ui/themed';
import { Controller } from 'react-hook-form';
import CusText from './CusText';

const CusInput = ({
	control,
	name,
	rules = {},
	placeholder,
	isRequired = true,
	keyboardType,
	type,
	maxLength,
	autoCapitalize,
	icon,
	readOnly = false,
	w = 250,
}) => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<>
					<FormControl isRequired={isRequired}>
						<HStack
							justifyContent='space-between'
							alignItems='center'
						>
							<FormControlLabel>{icon}</FormControlLabel>

							<Input
								variant='underlined'
								size='md'
								w={w}
								ml={10}
								isReadOnly={readOnly}
							>
								<InputField
									fontFamily='Sora_300Light'
									fontSize={15}
									color={readOnly ? '$gray100' : '#000'}
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
