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
import { Entypo } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import CusText from './CusText';
const CusSelect = ({
	control,
	name,
	rules = {},
	placeholder,
	icon,
	item,
	variant = 'underlined',
	textAlign = 'left',
	w = '90%',
	bgColor = '$white100',
	disabled = false,
	required,
	softShadow = 0,
	shadowColor = null,
	hasDropdown = true,
}) => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<>
					<FormControl isRequired={required}>
						<HStack
							justifyContent='space-between'
							alignItems='center'
						>
							<FormControlLabel>{icon}</FormControlLabel>

							<Select
								w={w}
								selectedValue={value}
								// onValueChange={(value, index) =>
								// 	setValue(value)
								// }
								onValueChange={onChange}
								ml={10}
							>
								<SelectTrigger
									variant={variant}
									bgColor={bgColor}
									softShadow={softShadow}
									shadowColor={shadowColor}
									disabled={disabled}
								>
									<SelectInput
										placeholder={placeholder}
										style={{
											fontFamily: 'Sora_300Light',
											fontSize: 15,
											color: '#000',
										}}
										textAlign={textAlign}
									/>

									{hasDropdown && (
										<Entypo
											name='chevron-small-down'
											size={15}
											color='black'
											style={{ marginRight: 10 }}
										/>
									)}
								</SelectTrigger>
								<SelectPortal>
									<SelectBackdrop />
									<SelectContent
										// ml={40}
										// mr={40}
										// mt={40}
										// borderBottomLeftRadius={20}
										// borderBottomRightRadius={20}
										// borderTopLeftRadius={20}
										// borderTopRightRadius={20}

										w={'100%'}
									>
										<ScrollView
											showsVerticalScrollIndicator={false}
											style={{ width: '100%' }}
										>
											{item.map((label, key) => (
												<SelectItem
													label={label}
													value={label}
													key={key}
												/>
											))}
										</ScrollView>
									</SelectContent>
								</SelectPortal>
							</Select>
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

export default CusSelect;
