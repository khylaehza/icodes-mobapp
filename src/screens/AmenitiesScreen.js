import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
	Center,
	Box,
	HStack,
	Button,
	Image,
	Divider,
	Pressable,
	VStack,
} from '@gluestack-ui/themed';
import { View, ScrollView } from 'react-native';
import Header from '../layouts/Header';
import CusText from '../components/CusText';
import CusModal from '../components/CusModal';
import CusDatePicker from '../components/CusDatePicker';
import CusInput from '../components/CusInput';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const AmenitiesScreen = () => {
	const insets = useSafeAreaInsets();
	const amenities = [
		{
			name: 'Swimming Pool',
			capacity: '20/35',
			img: require('../../assets/imgs/pool.jpg'),
		},
		{
			name: 'Gym',
			capacity: '25/40',
			img: require('../../assets/imgs/wip.png'),
		},
	];
	const status = [
		{
			name: 'Current Bookings',
			icon: require('../../assets/imgs/wip.png'),
		},
	];
	const [showModal, setShowModal] = useState(false);
	const ref = useRef(null);
	const [selectedDate, setSelectedDate] = useState();
	const [ame, setAme] = useState('');

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
		// getValues,
	} = useForm();

	const onAdd = (data, e) => {
		Toast.show('Successful', {
			duration: Toast.durations.SHORT,
		});
		reset();
		setShowModal(false);
	};

	const Body = () => {
		return (
			<>
				<VStack gap={10}>
					<CusInput
						label={'Type'}
						icon={
							<Ionicons
								name='md-pricetag'
								size={18}
								color='#0A2542'
							/>
						}
						type={ame}
						readOnly={true}
					/>
					<CusDatePicker
						selectedDate={selectedDate}
						setSelectedDate={setSelectedDate}
						icon={
							<AntDesign
								name='calendar'
								size={22}
								color='#0A2542'
							/>
						}
						mode={'date'}
					/>
					<CusInput
						label={'Type'}
						icon={
							<Ionicons
								name='ios-people'
								size={23}
								color='#0A2542'
							/>
						}
						type={'Number of Person'}
						keyboard={'number-pad'}
					/>
				</VStack>
			</>
		);
	};
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
				mb={130}
			>
				<Header
					img={require('../../assets/gifs/amenities.gif')}
					title={'Amenities'}
					description={
						'Book, reserve, and enjoy the amenities around your tower in Congressional Town Center.'
					}
				/>

				<Box
					ml={-60}
					mr={-60}
				>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
					>
						<HStack
							flexDirection='row'
							justifyContent='center'
							p={10}
							gap={10}
							h={180}
							alignItems='center'
							mt={10}
						>
							{amenities.map((ame, key) => (
								<Box
									rounded={15}
									bgColor='$white300'
									borderWidth={1}
									borderColor='$blue100'
									hardShadow='4'
									shadowColor='$blue300'
									key={key}
								>
									<Image
										source={ame.img}
										width={200}
										h={120}
										borderTopLeftRadius={15}
										borderTopRightRadius={15}
										objectFit='contain'
									/>

									<CusModal
										header={'BOOK AN AMENITY'}
										setShowModal={setShowModal}
										showModal={showModal}
										handleSubmit={handleSubmit}
										onAdd={onAdd}
										reset={reset}
										body={<Body />}
										button={
											<Button
												size={'xs'}
												variant='solid'
												position='absolute'
												bottom={45}
												right={5}
												bgColor='$blue300'
												borderColor='$blue250'
												borderWidth={1}
												shadowColor='$blue300'
												hardShadow='4'
												onPress={() => {
													setShowModal(true);
													setAme(ame.name);
												}}
												ref={ref}
											>
												<CusText
													type={'SECONDARY'}
													text={'Book'}
													style={{
														fontSize: 14,
														color: '#FFF',
													}}
												/>
											</Button>
										}
									/>
									<HStack
										// bgColor='#C2CDD8'
										p={10}
										borderBottomLeftRadius={15}
										borderBottomRightRadius={15}
										justifyContent='space-between'
									>
										<CusText
											type={'SECONDARY'}
											text={ame.name}
											style={{ fontSize: 14 }}
										/>
										<CusText
											type={'PRIMARY'}
											text={ame.capacity}
											style={{ fontSize: 14 }}
										/>
									</HStack>
								</Box>
							))}
						</HStack>
					</ScrollView>
				</Box>
			</Center>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Box>
					{status.map((stat, key) => (
						<Box
							padding={20}
							rounded={15}
							bgColor='#FFF'
							gap={2}
							hardShadow={4}
							shadowColor='$blue200'
							key={key}
							mb={20}
						>
							<HStack
								gap={8}
								alignItems='center'
							>
								<Image
									source={stat.icon}
									h={16}
									w={16}
									objectFit='contain'
								/>
								<CusText
									type={'TERTIARY'}
									text={stat.name}
								/>
							</HStack>
							<Divider my='$0.5' />

							<HStack
								p={5}
								justifyContent='space-between'
								alignItems='center'
							>
								<CusText
									type={'SECONDARY'}
									text={'Ticket #2132323'}
									style={{ textAlign: 'left' }}
								/>

								<Pressable
									variant='link'
									size='xs'
								>
									<CusText
										type={'PRIMARY'}
										text={'View Status >'}
										style={{
											textAlign: 'left',
											color: '#0A2542',
											fontSize: 12,
										}}
									/>
								</Pressable>
							</HStack>
							<HStack
								p={5}
								justifyContent='space-between'
								alignItems='center'
							>
								<CusText
									type={'SECONDARY'}
									text={'Ticket #2132323'}
									style={{ textAlign: 'left' }}
								/>

								<Pressable
									variant='link'
									size='xs'
								>
									<CusText
										type={'PRIMARY'}
										text={'View Status >'}
										style={{
											textAlign: 'left',
											color: '#0A2542',
											fontSize: 12,
										}}
									/>
								</Pressable>
							</HStack>
						</Box>
					))}
				</Box>
			</ScrollView>
		</View>
	);
};

export default AmenitiesScreen;
