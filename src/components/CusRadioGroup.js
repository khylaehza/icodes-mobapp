import {
	RadioGroup,
	HStack,
	Radio,
	RadioIndicator,
	RadioLabel,
	RadioIcon,
	CircleIcon,
	FormControl,
	FormControlLabel,
} from '@gluestack-ui/themed';
import { useState } from 'react';
import CusText from './CusText';
import { Controller } from 'react-hook-form';

const CusRadioGroup = ({
	control,
	name,
	rules = {},
	placeholder,
	required,
	icon,
	readOnly = false,
	radioLabels,
	w = 250,
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
							justifyContent='flex-start'
							alignItems='center'
						>
							<FormControlLabel>{icon}</FormControlLabel>
							<RadioGroup
								value={value ? value : ''}
								onChange={onChange}
							>
								<HStack
									space='lg'
									ml={30}
								>
									{radioLabels.map((label, key) => (
										<Radio
											value={label}
											key={key}
										>
											<RadioIndicator mr={4}>
												<RadioIcon as={CircleIcon} />
											</RadioIndicator>
											<CusText
												text={label}
												type={'PRIMARY'}
											/>
										</Radio>
									))}
								</HStack>
							</RadioGroup>
						</HStack>
					</FormControl>
				</>
			)}
		/>
	);
};

export default CusRadioGroup;
