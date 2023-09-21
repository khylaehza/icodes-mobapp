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

const AnnouncementScreen = ({ setExpanded }) => {
	const insets = useSafeAreaInsets();

	const purpose = ['Events', 'Maintenance', 'News', 'Others'];

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
						{purpose.map((purp, key) => (
							<Button
								key={key}
								size='xs'
								rounded={25}
								bgColor={purp == 'Events' ? '$white300' : null}
								shadowColor={
									purp == 'Events' ? '$blue100' : null
								}
								hardShadow={purp == 'Events' ? 4 : null}
								onPress={() => console.log('press')}
							>
								<CusText
									type={[
										purp == 'Events'
											? 'SECONDARY'
											: 'PRIMARY',
									]}
									text={purp}
									style={{
										color:
											purp == 'Events' ? '#000' : '#FFF',
									}}
								/>
							</Button>
						))}
					</HStack>
				</Center>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Center mb={80}>
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
						>
							<Image
								source={require('../../assets/imgs/Conference.jpg')}
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
									text={'NEW TOWER SOON TO RISE!'}
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
										text={'Today'}
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
										text={'Posted By: Property Management'}
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
										style={{ fontSize: 12 }}
										text={'Find out more.'}
										color={'$blue300'}
									/>
								</Button>
							</Box>
						</Box>
					</Center>
				</ScrollView>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default AnnouncementScreen;
