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
import CusSelect from '../components/CusSelect';
import { useState, useRef, useEffect } from 'react';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import Toast from 'react-native-root-toast';
import { IdGenerator } from '../utilities/IdGenerator';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import CusModalView from '../components/CusModalView';
const VisitorsScreen = ({ curUser, visitors }) => {
	const insets = useSafeAreaInsets();
	const status = [
		{ name: 'Active', icon: require('../../assets/imgs/wip.png') },
		{ name: 'Pending', icon: require('../../assets/imgs/pending.png') },
		{ name: 'Completed', icon: require('../../assets/imgs/done.png') },
	];
	const [showModal, setShowModal] = useState(false);
	const ref = useRef(null);
	const [showDet, setShowDet] = useState(false);
	const [selectedDate, setSelectedDate] = useState();
	const [counter, setCounter] = useState(0);

	const resetFields = () => {
		reset();
		setSelectedDate();
		setCounter(0);
	};

	const addPerson = () => {
		setCounter(counter + 1);
	};

	const id = IdGenerator();
	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
		// getValues,
		clearErrors,
	} = useForm();

	const onAdd = async (data, e) => {
		let visitors = [];
		for (let x = 0; x < counter; x++) {
			visitors.push(data[`visitor_${x}`]);
		}

		reset();
		setShowModal(false);
		setCounter(0);
		clearErrors();
		setSelectedDate('');

		try {
			await addDoc(
				collection(db, 'maintenance', 'frontdesk', 'tbl_visitor'),
				{
					VisitorID: id,
					Unit: data.location,
					RequestedBy: curUser.uid,
					For: `${curUser.fName} ${curUser.lName}`,
					Visitor: visitors,
					DateStart: moment(selectedDate).format('MM/DD/YYYY'),
					Purpose: data.purpose,
					Status: 'Pending',
					CreatedDate: serverTimestamp(),
				}
			);

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

					<HStack
						justifyContent='space-between'
						alignItems='center'
					>
						<Ionicons
							name='ios-people'
							size={23}
							color='#0A2542'
						/>
						<Button
							onPress={addPerson}
							w={245}
							variant='outline'
							borderColor='#a9a9ac'
						>
							<CusText
								text={'+ Add visitor'}
								type={'PRIMARY'}
							/>
						</Button>
					</HStack>

					{Array.from(Array(counter)).map((key, index) => {
						return (
							<HStack
								gap={10}
								key={index}
							>
								<CusInput
									placeholder={"Visitor's name"}
									name={`visitor_${index}`}
									control={control}
									rules={{
										required: "Visitor's name is required.",
									}}
									autoCapitalize='words'
									icon={
										<Ionicons
											name='ios-people'
											size={23}
											color='#0A2542'
										/>
									}
									required={true}
								/>
								{/* <Button
									onPress={() => deletePerson(index)}
									// w={45}
									variant='solid'
									borderColor='#a9a9ac'
									size='sm'
									bgColor='red'
								>
									<AntDesign
										name='deleteuser'
										size={18}
										color='black'
									/>
								</Button> */}
							</HStack>
						);
					})}

					<CusSelect
						name={`location`}
						icon={
							<MaterialIcons
								name='location-pin'
								size={20}
								color='#0A2542'
							/>
						}
						control={control}
						item={[...curUser.units]}
						rules={{ required: 'Location is required.' }}
						placeholder={'Location'}
						required={true}
					/>
					{/* <CusSelect
						name={`purpose`}
						icon={
							<Ionicons
								name='md-pricetag'
								size={18}
								color='#0A2542'
							/>
						}
						control={control}
						item={[...curUser.units, 'Exterior']}
						rules={{ required: 'Purpose is required.' }}
					/> */}
					<CusInput
						placeholder={'Purpose'}
						name={`purpose`}
						control={control}
						rules={{
							required: 'Purpose is required.',
						}}
						autoCapitalize='words'
						icon={
							<Ionicons
								name='md-pricetag'
								size={18}
								color='#0A2542'
							/>
						}
						required={true}
					/>
				</VStack>
			</>
		);
	};

	const ModalView = ({ data }) => {
		return (
			<>
				<VStack gap={20}>
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
								text={data.Date}
								type={'PRIMARY'}
								style={{ color: '#8e8e8e' }}
							/>
						</Box>
					</HStack>

					{data.VisitorName.map((name, key) => (
						<HStack
							justifyContent='space-between'
							alignItems='center'
							key={key}
						>
							<Ionicons
								name='ios-people'
								size={23}
							/>

							<Box
								w={245}
								borderBottomWidth={0.8}
								borderBottomColor='$gray100'
								pb={5}
							>
								<CusText
									text={name}
									type={'PRIMARY'}
									style={{ color: '#8e8e8e' }}
								/>
							</Box>
						</HStack>
					))}

					<HStack
						justifyContent='space-between'
						alignItems='center'
					>
						<MaterialIcons
							name='location-pin'
							size={20}
							color='#0A2542'
						/>

						<Box
							w={245}
							borderBottomWidth={1}
							borderBottomColor='$gray100'
							pb={5}
						>
							<CusText
								text={data.Unit}
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
								text={data.Purpose}
								type={'PRIMARY'}
								style={{ color: '#8e8e8e' }}
							/>
						</Box>
					</HStack>
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
				// mb={130}
			>
				<Header
					img={require('../../assets/gifs/visitors.gif')}
					title={'Visitors'}
					description={
						'Inform the front-desk about your guests and visitors for your additional security purposes.'
					}
				/>

				<CusModal
					header={'ADD VISITORS'}
					setShowModal={setShowModal}
					showModal={showModal}
					handleSubmit={handleSubmit}
					onAdd={onAdd}
					reset={resetFields}
					clearErrors={clearErrors}
					body={<Body />}
					button={
						<Button
							bgColor='$blue300'
							m={20}
							onPress={() => {
								setShowModal(true);
							}}
							ref={ref}
						>
							<CusText
								text={'Add Visitor'}
								type={'TERTIARY'}
								style={{ color: '#FFF' }}
							/>
						</Button>
					}
				/>
			</Center>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Box mb={50}>
					{status.map((stat, key) => {
						var hasMatch =
							visitors.filter((element) => {
								return (
									element.Status == stat.name &&
									curUser.uid === element.RequestedBy
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

								{visitors
									.filter((element) => {
										return (
											element.Status == stat.name &&
											curUser.uid === element.RequestedBy
										);
									})
									.map((data, vkey) => (
										<HStack
											pr={5}
											pl={5}
											justifyContent='space-between'
											alignItems='center'
											key={vkey}
											mb={-3}
										>
											<CusText
												type={'SECONDARY'}
												text={`Visitors #${data.VisitorID}`}
												style={{ textAlign: 'left' }}
											/>

											<CusModalView
												header={`Visitors #${data.VisitorID}`}
												body={<ModalView data={data} />}
												showModal={showDet}
												setShowModal={setShowDet}
												button={
													<Button
														variant='link'
														size='xs'
														onPress={() => {
															setShowDet(true);
														}}
													>
														<CusText
															type={'PRIMARY'}
															text={'View Info >'}
															style={{
																textAlign:
																	'left',

																fontSize: 12,
															}}
															color='#0A2542'
														/>
													</Button>
												}
											/>
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

export default VisitorsScreen;
