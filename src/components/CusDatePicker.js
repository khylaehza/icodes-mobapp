import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import CusText from './CusText';

import {
	FormControlHelper,
	FormControlError,
	FormControlErrorText,
	FormControlHelperText,
	FormControlLabel,
	FormControl,
	FormControlLabelText,
	HStack,
	Box,
	Button,
} from '@gluestack-ui/themed';
import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
const CusDatePicker = ({ selectedDate, setSelectedDate, icon, mode }) => {
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date) => {
		setSelectedDate(date);
		hideDatePicker();
	};

	return (
		<>
			<FormControl isRequired>
				<HStack
					justifyContent='space-between'
					alignItems='center'
				>
					{icon}

					<Button
						onPress={showDatePicker}
						w={250}
						variant='outline'
						borderColor='#a9a9ac'
					>
						<CusText
							text={
								selectedDate
									? `Date: ${moment(selectedDate).format(
											'MM/DD/YYYY'
									  )}`
									: 'Please select date'
							}
							type={'PRIMARY'}
						/>
					</Button>
					<DateTimePickerModal
						isVisible={isDatePickerVisible}
						mode={mode}
						onConfirm={handleConfirm}
						onCancel={hideDatePicker}
					/>
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
		</>
	);
};

export default CusDatePicker;
