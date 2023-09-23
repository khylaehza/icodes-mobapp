import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
	Center,
	Box,
	HStack,
	Button,
	Image,
	Divider,
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

	return (
		<TouchableWithoutFeedback onPress={() => setExpanded(false)}>
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
						{anncmnts.map((purp, key) => (
							<Button
								key={key}
								size='xs'
								rounded={25}
								bgColor={
									purp.Purpose == type ? '$white300' : null
								}
								shadowColor={
									purp.Purpose == type ? '$blue100' : null
								}
								hardShadow={purp.Purpose == type ? 4 : null}
								onPress={() => setType(purp.Purpose)}
							>
								<CusText
									type={[
										purp.Purpose == type
											? 'SECONDARY'
											: 'PRIMARY',
									]}
									text={purp.Purpose}
									style={{
										color:
											purp.Purpose == type
												? '#000'
												: '#FFF',
									}}
								/>
							</Button>
						))}
					</HStack>
				</Center>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Center mb={80}>
						{anncmnts.map((data, key) => (
							<View key={key}>
								{curUser.units.map((element, key) => {
									console.log(data);
									const date = data.DatePosted
										? data.DatePosted.seconds * 1000
										: '';
									if (
										data.For.slice(-3, -1) ==
										element.toString().slice(0, 2)
									) {
										if (data.Purpose == type) {
											return (
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
															text={
																data.Description
															}
															style={{
																textTransform:
																	'uppercase',
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

															<Divider
																orientation='vertical'
																bg='$yellow100'
																mx={2.5}
															/>

															<CusText
																type={'PRIMARY'}
																style={{
																	textAlign:
																		'justify',
																	fontSize: 12,
																}}
																text={`Author: ${data.Author}`}
															/>
														</HStack>

														<CusText
															type={'PRIMARY'}
															style={{
																textAlign:
																	'justify',
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
																type={
																	'SECONDARY'
																}
																style={{
																	fontSize: 12,
																}}
																text={
																	'Find out more.'
																}
																color={
																	'$blue300'
																}
															/>
														</Button>
													</Box>
												</Box>
											);
										}
									}
								})}
							</View>
						))}
					</Center>
				</ScrollView>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default AnnouncementScreen;
