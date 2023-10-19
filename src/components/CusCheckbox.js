import {
	CheckboxGroup,
	VStack,
	Checkbox,
	CheckboxIndicator,
	CheckboxIcon,
	CheckboxLabel,
	CheckIcon,
	FormControlLabel,
	FormControl,
	HStack,
} from '@gluestack-ui/themed';

import { useState } from 'react';
import CusText from './CusText';
import { Controller } from 'react-hook-form';
import CusInput from './CusInput';

const CusCheckbox = ({
	checkLabels,
	control,
	name,
	rules = {},
	placeholder,
	required,
	icon,
	readOnly = false,
	w = 250,
	others,
}) => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<>
					<FormControl isRequired={required}>
						<FormControlLabel>{icon}</FormControlLabel>
						<HStack
							justifyContent='flex-start'
							alignItems='center'
							ml={10}
						>
							<CheckboxGroup
								value={value ? value : ''}
								onChange={onChange}
							>
								{checkLabels.map((check, ckey) => (
									<VStack
										mt={check == 'Others: ' ? 2 : 12}
										key={ckey}
									>
										<Checkbox
											value={check}
											aria-label={check}
										>
											<CheckboxIndicator mr='$2'>
												<CheckboxIcon as={CheckIcon} />
											</CheckboxIndicator>
											<CusText
												text={check}
												type={'PRIMARY'}
											/>

											{check == 'Others: ' && (
												<VStack mt={2}>
													<CusInput
														name={others}
														control={control}
														placeholder={
															'Please specify'
														}
														required={false}
													/>
												</VStack>
											)}
										</Checkbox>
									</VStack>
								))}
							</CheckboxGroup>
						</HStack>
					</FormControl>
				</>
			)}
		/>
	);
};

export default CusCheckbox;
