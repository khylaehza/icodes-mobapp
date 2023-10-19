import {
	View,
	Box,
	HStack,
	Divider,
	Image,
	VStack,
	Center,
	Button,
} from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../layouts/Header';
import { ScrollView } from 'react-native';
import CusText from '../components/CusText';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import moment from 'moment';

const ScheduleScreen = ({ manningSched, curUser }) => {
	const insets = useSafeAreaInsets();
	const today = new Date();

	const currentSched = {};
	const futureSched = {};
	const historySched = {};

	manningSched
		.filter((data) => data.Team == curUser.team)
		.map((data) => {
			const date = new Date(data.SchedDate);

			if (moment(date).format('LL') == moment(today).format('LL')) {
				currentSched['Location'] = data.Location;
				currentSched['Date'] = moment(date).format('LL');
				currentSched['TimeStart'] = data.TimeStart;
				currentSched['TimeEnd'] = data.TimeEnd;
				currentSched['Task'] = data.Task;
				currentSched['Status'] = 'Today';
			} else if (moment(date).format('LL') > moment(today).format('LL')) {
				futureSched['Location'] = data.Location;
				futureSched['Date'] = moment(date).format('LL');
				futureSched['TimeStart'] = data.TimeStart;
				futureSched['TimeEnd'] = data.TimeEnd;
				futureSched['Task'] = data.Task;
				futureSched['Status'] = 'Future';
			} else if (moment(date).format('LL') < moment(today).format('LL')) {
				historySched['Location'] = data.Location;
				historySched['Date'] = moment(date).format('LL');
				historySched['TimeStart'] = data.TimeStart;
				historySched['TimeEnd'] = data.TimeEnd;
				historySched['Task'] = data.Task;
				historySched['Status'] = 'History';
			}
		});

	const info = [
		{
			name: 'Location',
			icon: (
				<MaterialIcons
					name='location-pin'
					size={18}
					color='white'
				/>
			),
			value: currentSched['Location'],
		},
		{
			name: 'Date',
			icon: (
				<MaterialIcons
					name='date-range'
					size={18}
					color='white'
				/>
			),
			value: currentSched['Date'],
		},
		{
			name: 'Time',
			icon: (
				<Ionicons
					name='time-sharp'
					size={18}
					color='white'
				/>
			),
			value: `${currentSched['TimeStart']} - ${currentSched['TimeEnd']}`,
		},
		{
			name: 'Tasks',
			icon: (
				<FontAwesome
					name='tasks'
					size={17}
					color='white'
				/>
			),
			// value: `${currentSched['Tasks'].join(', ')}`,
			value: `${currentSched['Task']}`,
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
				h={270}
				mb={-40}
			>
				<Header
					img={require('../../assets/gifs/manning.gif')}
					title={'Manning Schedule'}
					description={'View your schedule and location for manning.'}
				/>
			</Center>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Box
					ml={20}
					mr={20}
					gap={20}
					mb={40}
				>
					<HStack
						bgColor='$blue300'
						rounded={15}
						hardShadow={4}
						shadowColor='$blue200'
						alignItems='center'
						justifyContent='space-between'
						p={20}
					>
						{currentSched['Status'] == 'Today' ? (
							<VStack
								alignItems='flex-start'
								gap={5}
								w={'100%'}
							>
								<CusText
									type={'TERTIARY'}
									text={'TODAY'}
									style={{ fontSize: 15, color: '#FFC739' }}
								/>

								<Divider bgColor='$blue250' />
								{info.map((info, key) => {
									return (
										<HStack
											gap={10}
											alignItems='center'
											key={key}
										>
											{info.icon}
											<CusText
												type={'SECONDARY'}
												text={info.value}
												style={{
													fontSize: 14,
													color: '#EEE',
												}}
											/>
										</HStack>
									);
								})}
							</VStack>
						) : (
							<CusText
								type={'SECONDARY'}
								text={'You have no manning schedule for today.'}
								style={{
									fontSize: 14,
									color: '#EEE',
								}}
							/>
						)}
					</HStack>
					<Box alignItems='flex-start'>
						<CusText
							type={'SECONDARY'}
							text={'Upcoming'}
							style={{ fontSize: 13 }}
						/>
						<HStack
							bgColor='$blue100'
							rounded={15}
							hardShadow={4}
							shadowColor='$blue200'
							alignItems='center'
							justifyContent='space-between'
							p={20}
							w={'100%'}
							gap={0}
						>
							{futureSched['Status'] == 'Future' ? (
								<>
									<VStack
										w={'15%'}
										gap={-5}
									>
										<CusText
											type={'SECONDARY'}
											text={futureSched['Date']
												.substring(0, 3)
												.toUpperCase()}
											style={{
												fontSize: 13,
												color: '#8695A6',
											}}
										/>
										<CusText
											type={'SECONDARY'}
											text={futureSched['Date']
												.slice(-8, -6)
												.toUpperCase()}
											style={{ fontSize: 14 }}
										/>
									</VStack>
									<Divider
										orientation={'vertical'}
										ml={10}
										bgColor={'$blue250'}
									/>
									<VStack
										w={'85%'}
										alignItems={'flex-start'}
										pl={10}
										gap={10}
									>
										<HStack
											alignItems={'center'}
											w={'100%'}
											justifyContent={'space-between'}
										>
											<VStack
												alignItems={'flex-start'}
												gap={-5}
											>
												<CusText
													type={'SECONDARY'}
													text={`${futureSched['TimeStart']} - ${futureSched['TimeEnd']}`}
													style={{
														fontSize: 13,
														color: '#8695A6',
													}}
												/>
												<CusText
													type={'SECONDARY'}
													text={
														futureSched['Location']
													}
													style={{ fontSize: 14 }}
												/>
											</VStack>
										</HStack>
									</VStack>
								</>
							) : (
								<CusText
									type={'SECONDARY'}
									text={'You have no upcoming schedule.'}
									style={{
										fontSize: 14,
									}}
								/>
							)}
						</HStack>
					</Box>
					<Box alignItems='flex-start'>
						<CusText
							type={'SECONDARY'}
							text={'History'}
							style={{ fontSize: 13 }}
						/>

						<HStack
							bgColor='$white300'
							rounded={15}
							hardShadow={4}
							shadowColor='$blue200'
							alignItems='center'
							justifyContent='space-between'
							p={20}
							w={'100%'}
							gap={0}
						>
							{historySched['Status'] == 'History' ? (
								<>
									<VStack
										w={'15%'}
										gap={-5}
									>
										<CusText
											type={'SECONDARY'}
											text={historySched['Date']
												.substring(0, 3)
												.toUpperCase()}
											style={{
												fontSize: 13,
												color: '#8695A6',
											}}
										/>
										<CusText
											type={'SECONDARY'}
											text={historySched['Date']
												.slice(-8, -6)
												.toUpperCase()}
											style={{ fontSize: 14 }}
										/>
									</VStack>
									<Divider
										orientation={'vertical'}
										ml={10}
										bgColor={'$blue250'}
									/>
									<VStack
										w={'85%'}
										alignItems={'flex-start'}
										pl={10}
										gap={10}
									>
										<HStack
											alignItems={'center'}
											w={'100%'}
											justifyContent={'space-between'}
										>
											<VStack
												alignItems={'flex-start'}
												gap={-5}
											>
												<CusText
													type={'SECONDARY'}
													text={`${historySched['TimeStart']} - ${historySched['TimeEnd']}`}
													style={{
														fontSize: 13,
														color: '#8695A6',
													}}
												/>
												<CusText
													type={'SECONDARY'}
													text={
														historySched['Location']
													}
													style={{ fontSize: 14 }}
												/>
											</VStack>
										</HStack>
									</VStack>
								</>
							) : (
								<CusText
									type={'SECONDARY'}
									text={'No manning schedule histories yet.'}
									style={{
										fontSize: 14,
									}}
								/>
							)}
						</HStack>
					</Box>
				</Box>
			</ScrollView>
		</View>
	);
};

export default ScheduleScreen;
