import {
	Center,
	VStack,
	Avatar,
	Image,
	Box,
	HStack,
	Button,
	Divider,
} from '@gluestack-ui/themed';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CusText from '../components/CusText';
import CusPager from '../components/CusPager';
import DateChecker from '../utilities/DateChecker';
const UnitInfo = ({ navigation, curUser, unitInfo }) => {
	const insets = useSafeAreaInsets();

	const info = [
		{
			name: 'Unit Name',
			data: 'T1 - 5031',
			acquired: 'May, 2, 2028',
			status: 'Fully-Paid',
			img: [
				require('../../assets/gifs/avatar.gif'),
				require('../../assets/imgs/Conference.jpg'),
			],
		},
		{
			name: 'Unit Name',
			data: 'T1 - 5031',
			acquired: 'May, 2, 2028',
			status: 'On Processing',
			img: [
				require('../../assets/imgs/Conference.jpg'),
				require('../../assets/gifs/avatar.gif'),
			],
		},
		{
			name: 'Unit Name',
			data: 'T1 - 5031',
			acquired: 'May, 2, 2028',
			status: 'Partly Paid',
			img: [
				require('../../assets/gifs/avatar.gif'),
				require('../../assets/imgs/Conference.jpg'),
			],
		},
	];
	return (
		<View
			style={{
				flex: 1,
				paddingTop: insets.top,
				padding: 20,
			}}
		>
			<Center
				p={20}
				m={20}
				alignContent='flex-start'
				justifyContent='flex-start'
				mt={50}
				mb={30}
			>
				<ScrollView showsVerticalScrollIndicator={false}>
					<VStack
						space='sm'
						justifyContent='center'
						alignItems='center'
					>
						<Avatar size='2xl'>
							{/* <AvatarFallbackText>John Doe</AvatarFallbackText> */}
							<Image
								source={require('../../assets/gifs/avatar.gif')}
								resizeMode='contain'
							/>
						</Avatar>

						<CusText
							type={'HEADING'}
							text={'Khyla Ehza Hondrade'}
							style={{ fontSize: 24 }}
						/>

						<CusText
							type={'PRIMARY'}
							text={'Owner_93272'}
							style={{ marginTop: -8 }}
						/>
					</VStack>
					<Box
						bgColor='$blue200'
						rounded={5}
						hardShadow={4}
						shadowColor='$blue200'
						alignItems='center'
						p={10}
						mt={20}
						w={'100%'}
					>
						<CusText
							type={'SECONDARY'}
							text={'Unit Information'}
						/>
					</Box>

					{unitInfo.map((data) => (
						<>
							{data.units.map((un) => {
								if (curUser.units.includes(un)) {
									const date = data.createdDate
										? data.createdDate.seconds * 1000
										: '';
								
									return (
										<Box
											padding={10}
											rounded={15}
											bgColor='$white300'
											gap={2}
											hardShadow={5}
											shadowColor='$blue200'
											w={'100%'}
											mt={20}
										>
											<CusPager
												item={Array(data.typeImage)}
											/>
											<Box
												p={5}
												alignItems='center'
											>
												<CusText
													type={'TERTIARY'}
													text={curUser.units.toString()}
												/>

												<HStack>
													<CusText
														type={'SECONDARY'}
														style={{
															textAlign:
																'justify',
															fontSize: 12,
														}}
														text={
															'Purchased Date: '
														}
													/>
													<CusText
														type={'SECONDARY'}
														style={{
															textAlign:
																'justify',
															fontSize: 12,
														}}
														text={
															<DateChecker
																dateToCheck={
																	new Date(
																		date
																	)
																}
															/>
														}
													/>
												</HStack>

												<CusText
													type={'SECONDARY'}
													style={{
														textAlign: 'justify',
														fontSize: 12,
													}}
													text={`Size: ${data.unitSize} sq. meters`}
												/>
												<CusText
													type={'SECONDARY'}
													style={{
														textAlign: 'justify',
														fontSize: 12,
													}}
													text={`Type: ${data.typeName}`}
												/>
											</Box>
										</Box>
									);
								}
							})}
						</>
					))}
				</ScrollView>
			</Center>
		</View>
	);
};

export default UnitInfo;
