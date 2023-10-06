import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
	Center,
	Box,
	HStack,
	Divider,
	Button,
	Image,
	VStack,
} from '@gluestack-ui/themed';
import Header from '../layouts/Header';
import CusText from '../components/CusText';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import CusModal from '../components/CusModal';
import CusInput from '../components/CusInput';
import CusDatePicker from '../components/CusDatePicker';
import CusMediaPicker from '../components/CusMediaPicker';
import CusSelect from '../components/CusSelect';
import { useForm } from 'react-hook-form';
import { useState, useRef } from 'react';
import Toast from 'react-native-root-toast';
import { IdGenerator } from '../utilities/IdGenerator';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const TransactionScreen = ({ curUser }) => {
	const [showModal, setShowModal] = useState(false);
	const [showDet, setShowDet] = useState(false);
	const [type, setType] = useState('');
	const [selectedDate, setSelectedDate] = useState();
	const ref = useRef(null);
	const id = IdGenerator();
	const insets = useSafeAreaInsets();
	const [images, setImages] = useState({
		images: [],
	});
	const [videos, setVideos] = useState({
		videos: [],
	});

	const services = [
		{
			name: 'Cash',
			icon: require('../../assets/imgs/money.png'),
		},
		{
			name: 'Bank',
			icon: require('../../assets/imgs/card.png'),
		},
	];

	const status = [
		{ name: 'Pending', icon: require('../../assets/imgs/pending.png') },
		{ name: 'Confirmed', icon: require('../../assets/imgs/done.png') },
	];
	const btnRef = useRef(null);
	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
		// getValues,
		clearErrors,
	} = useForm();

	const img = images['images'];
	const vid = videos['videos'];
	const Body = () => {
		return (
			<VStack gap={10}>
				<CusInput
					placeholder={type}
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
				<CusSelect
					name={`Payment`}
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
					placeholder={'Payment For'}
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
					placeholder={'Select payment date'}
				/>
				<CusMediaPicker
					icon={
						<Ionicons
							name='ios-image'
							size={20}
							color='#0A2542'
						/>
					}
					control={control}
					name={'media'}
					setVideos={setVideos}
					setImages={setImages}
					img={img}
					vid={vid}
					required={true}
					text={'Select Receipt Image'}
				/>
			</VStack>
		);
	};

	const onAdd = async (data, e) => {
		reset();
		setShowModal(false);
		clearErrors();

		try {
			await addDoc(
				collection(
					db,
					'maintenance',
					'accountingmanagement',
					'tbl_transaction'
				),
				{
					TransactID: id,
					RequestedBy: curUser.uid,
					For: `${curUser.fName} ${curUser.lName}`,
					Proof: img,
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

	const ModalView = ({ data }) => {
		return (
			<CusMediaPicker
				icon={
					<Ionicons
						name='ios-image'
						size={20}
						color='#0A2542'
					/>
				}
				control={control}
				name={'proof'}
				setVideos={setVideos}
				setImages={setImages}
				img={data.RequestImg.filter((word) => !word.includes('mp4'))}
				text={'Proof of Payment'}
			/>
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
				mb={50}
			>
				<Header
					img={require('../../assets/gifs/payment.gif')}
					title={'Payments'}
					description={
						'Send your payment proofs to account management.'
					}
				/>

				<HStack
					flexDirection='row'
					justifyContent='space-between'
					p={5}
					m={10}
					gap={10}
				>
					{services.map((serv, key) => (
						<CusModal
							key={key}
							header={'SEND RECEIPT'}
							handleSubmit={handleSubmit}
							onAdd={onAdd}
							reset={reset}
							clearErrors={clearErrors}
							body={<Body />}
							showModal={showModal}
							setShowModal={setShowModal}
							button={
								<Button
									h={100}
									w={100}
									size='xl'
									rounded={25}
									bgColor={'$white300'}
									shadowColor={'$blue100'}
									hardShadow={4}
									onPress={() => {
										setShowModal(true);
										setType(serv.name);
									}}
									ref={btnRef}
								>
									<VStack
										alignItems='center'
										justifyItem='center'
									>
										<Image
											source={serv.icon}
											h={45}
											w={45}
											objectFit='contain'
											mt={3}
										/>
										<CusText
											type={'PRIMARY'}
											text={serv.name}
											style={{ fontSize: 11 }}
										/>
									</VStack>
								</Button>
							}
						/>
					))}
				</HStack>
			</Center>

			<ScrollView showsVerticalScrollIndicator={false}>
				<Box
					padding={20}
					rounded={15}
					bgColor='#FFF'
					gap={2}
					hardShadow={4}
					shadowColor='$blue200'
					mb={20}
				>
					<HStack
						gap={8}
						alignItems='center'
					>
						<Image
							source={require('../../assets/imgs/done.png')}
							h={16}
							w={16}
							objectFit='contain'
						/>
						<CusText
							type={'TERTIARY'}
							text={'History'}
						/>
					</HStack>
					<Divider my='$1.5' />

					{/* {reports
						.filter((element) => {
							return curUser.uid === element.RequestedBy;
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
									text={`Report #${data.ReportID}`}
									style={{ textAlign: 'left' }}
								/>

								<CusModalView
									header={`Report #${data.ReportID}`}
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
													textAlign: 'left',

													fontSize: 12,
												}}
												color='#0A2542'
											/>
										</Button>
									}
								/>
							</HStack>
						))} */}
				</Box>
			</ScrollView>
		</View>
	);
};

export default TransactionScreen;
