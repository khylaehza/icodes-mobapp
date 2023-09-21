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
import Toast from 'react-native-root-toast';

const VisitorsScreen = () => {
	const insets = useSafeAreaInsets();
	const status = [
		{
			name: 'Upcoming Visitors',
			icon: require('../../assets/imgs/wip.png'),
		},
		{
			name: 'Past Visitors',
			icon: require('../../assets/imgs/wip.png'),
		},
	];

	const [showModal, setShowModal] = useState(false);
	const ref = useRef(null);
	const location = ['Unit 1013', 'Exterior', 'Unit 5422'];
	const [loc, setLocation] = useState('');
	const [selectedDate, setSelectedDate] = useState();
	const [counter, setCounter] = useState(0);

	const addPerson = () => {
		setCounter(counter + 1);
	};

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
		setCounter(0);
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
							w={250}
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
									w={250}
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
						label={'Location'}
						icon={
							<MaterialIcons
								name='location-pin'
								size={20}
								color='#0A2542'
							/>
						}
						item={location}
						value={loc}
						setValue={setLocation}
						placeholder={'Select location'}
					/>
					<CusSelect
						label={'Purpose'}
						icon={
							<MaterialIcons
								name='location-pin'
								size={20}
								color='#0A2542'
							/>
						}
						item={location}
						value={loc}
						setValue={setLocation}
						placeholder={'Select purpose'}
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
					header={'BOOK AN AMENITY'}
					setShowModal={setShowModal}
					showModal={showModal}
					handleSubmit={handleSubmit}
					onAdd={onAdd}
					reset={reset}
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

export default VisitorsScreen;
