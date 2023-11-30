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
	Image,
	Box,
} from '@gluestack-ui/themed';
import { View, ScrollView } from 'react-native';
import { useState } from 'react';
import CusText from './CusText';
import { Controller } from 'react-hook-form';

const CusDssCheckbox = ({
	setAme,
	ame,
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
	amenities,
}) => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<>
					<FormControl isRequired={required}>
						<CheckboxGroup
							value={ame}
							onChange={(keys) => {
								setAme(keys);
							}}
						>
							<VStack gap={20}>
								<ScrollView
									horizontal
									showsHorizontalScrollIndicator={false}
								>
									{amenities && (
										<>
											{amenities.map((check, ckey) => (
												<HStack
													flexDirection='row'
													justifyContent='center'
													p={10}
													gap={10}
													h={180}
													alignItems='center'
													mt={10}
													key={ckey}
												>
													<Box
														gap={5}
														bgColor='$blue100'
														p={15}
														borderTopLeftRadius={15}
														borderTopRightRadius={
															15
														}
													>
														<Image
															source={{
																uri: check.AmenityImg,
															}}
															width={200}
															h={120}
															borderTopLeftRadius={
																15
															}
															borderTopRightRadius={
																15
															}
															objectFit='contain'
														/>
														<Checkbox
															value={
																check.AmenityName
																	? check.AmenityName
																	: ' '
															}
															aria-label={
																check.AmenityName
															}
														>
															<CheckboxIndicator mr='$2'>
																<CheckboxIcon
																	as={
																		CheckIcon
																	}
																	aria-label='check'
																/>
															</CheckboxIndicator>
															<CusText
																text={
																	check.AmenityName
																}
																type={'PRIMARY'}
															/>
														</Checkbox>
													</Box>
												</HStack>
											))}
										</>
									)}
								</ScrollView>
							</VStack>
						</CheckboxGroup>
					</FormControl>
				</>
			)}
		/>
	);
};

export default CusDssCheckbox;
