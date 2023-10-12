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

const ScheduleScreen = () => {
	const insets = useSafeAreaInsets();

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
											text={info.name}
											style={{
												fontSize: 14,
												color: '#EEE',
											}}
										/>
									</HStack>
								);
							})}
						</VStack>
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
							<VStack
								w={'15%'}
								gap={-5}
							>
								<CusText
									type={'SECONDARY'}
									text={'MAR'}
									style={{
										fontSize: 13,
										color: '#8695A6',
									}}
								/>
								<CusText
									type={'SECONDARY'}
									text={'12'}
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
											text={'8AM - 10PM'}
											style={{
												fontSize: 13,
												color: '#8695A6',
											}}
										/>
										<CusText
											type={'SECONDARY'}
											text={'SM VALENZUELA'}
											style={{ fontSize: 14 }}
										/>
									</VStack>
								</HStack>
							</VStack>
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
							<VStack
								w={'15%'}
								gap={-5}
							>
								<CusText
									type={'SECONDARY'}
									text={'MAR'}
									style={{
										fontSize: 13,
										color: '#8695A6',
									}}
								/>
								<CusText
									type={'SECONDARY'}
									text={'12'}
									style={{ fontSize: 14 }}
								/>
							</VStack>
							<Divider
								orientation={'vertical'}
								ml={10}
								bgColor={'$blue100'}
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
											text={'8AM - 10PM'}
											style={{
												fontSize: 13,
												color: '#8695A6',
											}}
										/>
										<CusText
											type={'SECONDARY'}
											text={'SM VALENZUELA'}
											style={{ fontSize: 14 }}
										/>
									</VStack>
								</HStack>
							</VStack>
						</HStack>
					</Box>
				</Box>
			</ScrollView>
		</View>
	);
};

export default ScheduleScreen;
