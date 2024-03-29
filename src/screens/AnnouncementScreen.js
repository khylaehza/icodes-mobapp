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

	const [strLength, setStrLength] = useState(15);
	const [more, setMore] = useState(false);

	function getSpecificNumberOfWords(text, numberOfWords) {
		text = text.trim();

		let words = text.split(/\s+/);

		let selectedWords = words.slice(0, numberOfWords);

		let result = selectedWords.join(' ');

		return result;
	}

	var hasMatch =
		anncmnts.filter((element) => {
			return (
				element.Purpose == type &&
				element.For.includes(curUser.Tower) &&
				element.Status
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
								element.For.includes(curUser.Tower) &&
								element.Status
							);
						})
						.map((data, key) => {
							const date = data.DatePosted
								? data.DatePosted.seconds * 1000
								: '';

							return (
								<View
									key={key}
									style={{ width: '80%' }}
								>
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
										// w={'100%'}
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
												text={data.Subject}
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

											<VStack>
												<CusText
													type={'PRIMARY'}
													style={{
														textAlign: 'justify',
													}}
													text={
														more
															? `${getSpecificNumberOfWords(
																	data.Description,
																	data.Description.trim().split(
																		/\s+/
																	).length
															  )} `
															: `${getSpecificNumberOfWords(
																	data.Description,
																	15
															  )} ...`
													}
												/>
												<Button
													variant={'link'}
													justifyContent='flex-start'
													onPress={() => {
														setMore(!more);

														// if (more) {
														// 	setStrLength(
														// 		data.Description.trim().split(
														// 			/\s+/
														// 		).length
														// 	);
														// } else {
														// 	setStrLength(15);
														// }
													}}
												>
													<CusText
														type={'PRIMARY'}
														text={
															more
																? 'See Less.'
																: 'See More.'
														}
														style={{
															textAlign: 'left',
															color: '#0A2542',
															textDecorationLine:
																'underline',
														}}
													/>
												</Button>
											</VStack>
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
