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

const CusSelect = ({
	label,
	placeholder,
	icon,
	item,
	value,
	setValue,
	variant = 'underlined',
	textAlign = 'left',
	w = 250,
	bgColor = '$white300',
}) => {
	return (
		<FormControl isRequired>
			<HStack
				justifyContent='space-between'
				alignItems='center'
			>
				{icon}

				<Select
					w={w}
					selectedValue={value}
					onValueChange={(value, index) => setValue(value)}
				>
					<SelectTrigger
						variant={variant}
						bgColor={bgColor}
						softShadow={2}
						shadowColor='$blue300'
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

						<Entypo
							name='chevron-small-down'
							size={15}
							color='black'
							style={{ marginRight: 10 }}
						/>
					</SelectTrigger>
					<SelectPortal>
						<SelectBackdrop />
						<SelectContent
							ml={40}
							mr={40}
							mt={40}
							borderBottomLeftRadius={20}
							borderBottomRightRadius={20}
							borderTopLeftRadius={20}
							borderTopRightRadius={20}
						>
							{item.map((label, key) => (
								<SelectItem
									label={label}
									value={label}
									key={key}
								/>
							))}
						</SelectContent>
					</SelectPortal>
				</Select>
			</HStack>

			{/* <FormControlHelper>
				<FormControlHelperText>
					You can only select one option
				</FormControlHelperText>
			</FormControlHelper>
			<FormControlError>
				<FormControlErrorIcon as={AlertCircleIcon} />
				<FormControlErrorText>Mandatory field</FormControlErrorText>
			</FormControlError> */}
		</FormControl>
	);
};

export default CusSelect;
