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

const CusTextArea = ({ placeholder, icon }) => {
	return (
		<FormControl isRequired>
			{/* <FormControlLabel>
				<FormControlLabelText>Write with me</FormControlLabelText>
			</FormControlLabel> */}
			<HStack
				justifyContent='space-between'
				alignItems='flex-start'
			>
				{icon}
				<Textarea w={250}>
					<TextareaInput
						placeholder={placeholder}
						fontFamily='Sora_300Light'
						fontSize={15}
						color='#000'
					/>
				</Textarea>
			</HStack>
		</FormControl>
	);
};

export default CusTextArea;
