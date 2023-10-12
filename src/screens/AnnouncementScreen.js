import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
	Center,
	Box,
	HStack,
	Button,
	Image,
	Divider,
	VStack,
} from '@gluestack-ui/themed';
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Header from '../layouts/Header';
import CusText from '../components/CusText';
import { useState } from 'react';
import DateChecker from '../utilities/DateChecker';
const AnnouncementScreen = ({ setExpanded, anncmnts, curUser }) => {
	const insets = useSafeAreaInsets();

	const purpose = ['Events', 'Maintenance', 'News', 'Others'];
	const [type, setType] = useState('Events');

	var hasMatch =
		anncmnts.filter((element) => {
			return (
				element.Purpose == type &&
				curUser.tower == element.For.slice(-3, -1)
			);
		}).length > 0;

	return (
		// <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
		<View
			style={{
				flex: 1,
				paddingTop: insets.top,
			}}
		>
			<Center
				p={20}
				m={20}
				alignContent='flex-start'
				justifyContent='flex-start'
				h={270}
			>
				<Header
					img={require('../../assets/gifs/announcement.gif')}
					title={'Announcements'}
					description={
						'Stay up to date for news, events, and activities happening inside the Congressional Town Center.'
					}
				/>

				<HStack
					flexDirection='row'
					justifyContent='space-between'
					bgColor='$blue300'
					p={3}
					m={25}
					borderRadius={25}
					borderWidth={1}
					borderColor='$blue200'
					softShadow={4}
				>
					{purpose.map((purp, key) => (
						<Button
							key={key}
							size='xs'
							rounded={25}
							bgColor={purp == type ? '$white300' : null}
							shadowColor={purp == type ? '$blue100' : null}
							hardShadow={purp == type ? 4 : null}
							onPress={() => setType(purp)}
						>
							<CusText
								type={[purp == type ? 'SECONDARY' : 'PRIMARY']}
								text={purp}
								style={{
									color: purp == type ? '#000' : '#FFF',
								}}
							/>
						</Button>
					))}
				</HStack>
			</Center>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Center mb={80}>
					{!hasMatch && (
						<VStack
							h={'100%'}
							w={'100%'}
							alignItems='center'
							gap={10}
							p={80}
						>
							<Image
								source={require('../../assets/imgs/documents.png')}
								resizeMode='center'
								size='xl'
								mt={20}
							/>

							<CusText
								type={'SECONDARY'}
								text={`There is no announcement for ${type}.`}
								style={{
									textAlign: 'center',
								}}
							/>
						</VStack>
					)}
					{anncmnts
						.filter((element) => {
							return (
								element.Purpose == type &&
								curUser.tower == element.For.slice(-3, -1) &&
								element.Status == 'Active'
							);
						})
						.map((data, key) => {
							const date = data.DatePosted
								? data.DatePosted.seconds * 1000
								: '';
							return (
								<View key={key}>
									<Box
										ml={20}
										mr={20}
										padding={10}
										rounded={15}
										bgColor='$white300'
										mb={15}
										gap={2}
										hardShadow={5}
										shadowColor='$blue200'
										key={key}
									>
										<Image
											source={{
												uri: data.AnncmntImg,
											}}
											height={150}
											rounded={5}
											objectFit='cover'
										/>
										<Box
											p={5}
											gap={10}
										>
											<CusText
												type={'TERTIARY'}
												text={data.Description}
												style={{
													textTransform: 'uppercase',
												}}
											/>
											<HStack
												justifyContent='flex-start'
												gap={4}
												mt={-8}
											>
												<CusText
													type={'PRIMARY'}
													style={{
														textAlign: 'justify',
														fontSize: 12,
													}}
													text={
														<DateChecker
															dateToCheck={
																new Date(date)
															}
														/>
													}
												/>

												<Divider
													orientation='vertical'
													bg='$yellow100'
													mx={2.5}
												/>

												<CusText
													type={'PRIMARY'}
													style={{
														textAlign: 'justify',
														fontSize: 12,
													}}
													text={`Author: ${data.Author}`}
												/>
											</HStack>

											<CusText
												type={'PRIMARY'}
												style={{
													textAlign: 'justify',
												}}
												text={
													'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nontellus orci ac auctor augue. Facilisi nullam vehicula ipsum a arcu cursus.'
												}
											/>

											<Button
												variant='link'
												justifyContent='flex-start'
											>
												<CusText
													type={'SECONDARY'}
													style={{
														fontSize: 12,
													}}
													text={'Find out more.'}
													color={'$blue300'}
												/>
											</Button>
										</Box>
									</Box>
								</View>
							);
						})}
				</Center>
			</ScrollView>
		</View>
		// </TouchableWithoutFeedback>
	);
};

export default AnnouncementScreen;
