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
import Toast from 'react-native-root-toast';
import moment from 'moment';
import { IdGenerator } from '../utilities/IdGenerator';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import CusModalView from '../components/CusModalView';

const AmenitiesScreen = ({ curUser, amenities, bookings }) => {
	const insets = useSafeAreaInsets();

	const status = [
		{ name: 'Pending', icon: require('../../assets/imgs/pending.png') },
		{ name: 'Declined', icon: require('../../assets/imgs/failed.png') },
		{
			name: 'Approved',
			icon: require('../../assets/imgs/wip.png'),
		},
		{ name: 'Check-In', icon: require('../../assets/imgs/check-in.png') },
		{ name: 'Check-Out', icon: require('../../assets/imgs/check-out.png') },
	];

	const [showModal, setShowModal] = useState(false);
	const ref = useRef(null);
	const [showDet, setShowDet] = useState(false);
	const [selectedDate, setSelectedDate] = useState();
	const [ame, setAme] = useState('');
	const id = IdGenerator();
	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
		clearErrors,
	} = useForm({
		values: {
			request: ame,
		},
	});

	const [cur, setCur] = useState({});

	const resetFields = () => {
		reset();
		setSelectedDate();
	};

	const onAdd = (data, e) => {
		reset();
		setShowModal(false);
		setSelectedDate('');
		clearErrors();

		try {
			addDoc(collection(db, 'maintenance', 'frontdesk', 'tbl_bookings'), {
				RequestedBy: curUser.UID,
				UnitOwner: `${curUser.FName} ${curUser.LName}`,
				BookingID: id,
				AmenityType: data.request,
				Date: moment(selectedDate).format('MM/DD/YYYY'),
				NumPerson: data.number,
				Status: 'Pending',
				CreatedDate: serverTimestamp(),
				TNum: curUser.TName,
			});
			Toast.show('Successful', {
				duration: Toast.durations.SHORT,
			});
		} catch (e) {
			Toast.show('Failed', {
				duration: Toast.durations.SHORT,
			});
			console.log(e);
		}
	};

	const Body = () => {
		return (
			<>
				<VStack gap={10}>
					<CusInput
						placeholder={ame}
						name={`request`}
						control={control}
						icon={
							<Ionicons
								name='md-pricetag'
								size={18}
								color='#0A2542'
							/>
						}
						readOnly={true}
						required={true}
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
						placeholder={'Number of Person'}
						name={`number`}
						control={control}
						icon={
							<Ionicons
								name='ios-people'
								size={23}
								color='#0A2542'
							/>
						}
						keyboardType={'number-pad'}
						required={true}
					/>
				</VStack>
			</>
		);
	};

	const ModalView = () => {
		return (
			<>
				<CusModalView
					header={`Booking #${cur.BookingID}`}
					body={
						<VStack gap={20}>
							<HStack
								justifyContent='space-between'
								alignItems='center'
							>
								<Ionicons
									name='md-pricetag'
									size={18}
									color='#0A2542'
								/>

								<Box
									w={245}
									borderBottomWidth={1}
									borderBottomColor='$gray100'
									pb={5}
								>
									<CusText
										text={cur.AmenityType}
										type={'PRIMARY'}
										style={{ color: '#8e8e8e' }}
									/>
								</Box>
							</HStack>
							<HStack
								justifyContent='space-between'
								alignItems='center'
							>
								<AntDesign
									name='calendar'
									size={22}
									color='#0A2542'
								/>
								<Box
									w={245}
									borderBottomWidth={1}
									borderBottomColor='$gray100'
									pb={5}
								>
									<CusText
										text={cur.Date}
										type={'PRIMARY'}
										style={{ color: '#8e8e8e' }}
									/>
								</Box>
							</HStack>
							<HStack
								justifyContent='space-between'
								alignItems='center'
							>
								<Ionicons
									name='ios-people'
									size={23}
									color='#0A2542'
								/>

								<Box
									w={245}
									borderBottomWidth={1}
									borderBottomColor='$gray100'
									pb={5}
								>
									<CusText
										text={cur.NumPerson}
										type={'PRIMARY'}
										style={{ color: '#8e8e8e' }}
									/>
								</Box>
							</HStack>

							{cur.Reason && (
								<HStack
									justifyContent='space-between'
									alignItems='center'
								>
									<CusText
										text={'Declined Reason: '}
										type={'SECONDARY'}
										style={{ color: '#0A2542' }}
									/>

									<Box
										w={245}
										borderBottomWidth={1}
										borderBottomColor='$gray100'
										pb={5}
										alignContent='left'
									>
										<CusText
											text={cur.Reason}
											type={'PRIMARY'}
											style={{ color: '#8e8e8e' }}
											textAlign={'left'}
										/>
									</Box>
								</HStack>
							)}
						</VStack>
					}
					showModal={showDet}
					setShowModal={setShowDet}
				/>
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
							{amenities
								.filter((element) => {
									return (
										curUser.Tower ==
										element.TNum.slice(-3, -1)
									);
								})
								.map((data, key) => (
									<Box
										rounded={15}
										bgColor='$white300'
										borderWidth={1}
										borderColor='$blue100'
										hardShadow='4'
										shadowColor='$blue300'
										key={key}
										width={240}
									>
										<Image
											source={{ uri: data.AmenityImg }}
											// width={200}
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
											reset={resetFields}
											clearErrors={clearErrors}
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
														setAme(
															data.AmenityName
														);
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
												text={data.AmenityName}
												style={{ fontSize: 14 }}
											/>
											<CusText
												type={'PRIMARY'}
												text={`Cap: ${data.Capacity}`}
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
				<Box mb={50}>
					{status.map((stat, key) => {
						var hasMatch =
							bookings.filter((element) => {
								return (
									element.Status == stat.name &&
									`${curUser.FName} ${curUser.LName}` ===
										element.UnitOwner
								);
							}).length > 0;

						return (
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
								<Divider my='$1.5' />
								{bookings
									.filter((element) => {
										return (
											element.Status == stat.name &&
											`${curUser.FName} ${curUser.LName}` ===
												element.UnitOwner
										);
										// return (
										// 	element.Status == stat.name &&
										// 	curUser.UID === element.RequestedBy
										// );
									})
									.map((data, akey) => (
										<HStack
											pr={5}
											pl={5}
											justifyContent='space-between'
											alignItems='center'
											key={akey}
											mb={-3}
										>
											<CusText
												type={'SECONDARY'}
												text={`Booking #${data.BookingID}`}
												style={{ textAlign: 'left' }}
											/>
											<Button
												variant='link'
												size='xs'
												onPress={() => {
													setShowDet(true);
													setCur(data);
												}}
											>
												<CusText
													type={'PRIMARY'}
													text={'View Info >'}
													style={{
														textAlign: 'left',

														fontSize: 12,
													}}
													color='#0A2542'
												/>
											</Button>
											<ModalView />
										</HStack>
									))}
								{!hasMatch && (
									<CusText
										type={'SECONDARY'}
										text={`No data available.`}
										style={{
											textAlign: 'center',
										}}
									/>
								)}
							</Box>
						);
					})}
				</Box>
			</ScrollView>
		</View>
	);
};

export default AmenitiesScreen;
