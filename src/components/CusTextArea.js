import { Textarea, TextareaInput } from '@gluestack-ui/themed';
import {
	Select,
	SelectTrigger,
	SelectInput,
	SelectPortal,
	SelectBackdrop,
	SelectContent,
	SelectItem,
	FormControlHelper,
	FormControlError,
	FormControlErrorText,
	FormControlHelperText,
	FormControlLabel,
	FormControl,
	FormControlLabelText,
	HStack,
	Box,
} from '@gluestack-ui/themed';
import { Controller } from 'react-hook-form';
import CusText from './CusText';
const CusTextArea = ({
	control,
	name,
	rules = {},
	placeholder,
	icon,
	stack = false,
	disabled = false,
	required,
	//w = 238,
	w = '90%',
}) => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<>
					<FormControl isRequired={required}>
						{stack && <FormControlLabel>{icon}</FormControlLabel>}

						<HStack
							justifyContent='space-between'
							alignItems='flex-start'
						>
							{!stack && (
								<FormControlLabel>{icon}</FormControlLabel>
							)}
							<Textarea
								w={required ? w : 250}
								ml={10}
								isReadOnly={disabled}
							>
								<TextareaInput
									placeholder={placeholder}
									fontFamily='Sora_300Light'
									fontSize={15}
									color='#000'
									value={value}
									onChangeText={onChange}
								/>
							</Textarea>
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

export default CusTextArea;
