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
import {
	Ionicons,
	AntDesign,
	MaterialIcons,
	FontAwesome5,
} from '@expo/vector-icons';
import CusModal from '../components/CusModal';
import CusInput from '../components/CusInput';
import CusDatePicker from '../components/CusDatePicker';
import CusMediaPicker from '../components/CusMediaPicker';
import CusSelect from '../components/CusSelect';
import CusSelectTransaction from '../components/CusSelectTransaction';
import { useForm } from 'react-hook-form';
import { useState, useRef } from 'react';
import Toast from 'react-native-root-toast';
import { IdGenerator } from '../utilities/IdGenerator';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import CusModalView from '../components/CusModalView';
import moment from 'moment';
const getBlobFroUri = async (uri) => {
	const blob = await new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.onload = function () {
			resolve(xhr.response);
		};
		xhr.onerror = function (e) {
			reject(new TypeError('Network request failed'));
		};
		xhr.responseType = 'blob';
		xhr.open('GET', uri, true);
		xhr.send(null);
	});

	return blob;
};

const TransactionScreen = ({ curUser, soa, transactions }) => {
	const storage = getStorage();
	const [showModal, setShowModal] = useState(false);
	const [showDet, setShowDet] = useState(false);
	const [type, setType] = useState('');
	const [selectedDate, setSelectedDate] = useState();
	// const ref = useRef(null);
	const [cur, setCur] = useState({});

	const id = IdGenerator();
	const insets = useSafeAreaInsets();
	const [images, setImages] = useState({
		images: [],
	});
	const [videos, setVideos] = useState({
		videos: [],
	});

	const filteredOwner = soa.filter((owner) => {
		if (owner.Unit == curUser.Units) {
			return owner;
		}
	});

	const choice = filteredOwner[0] ? filteredOwner[0].SOA : '';

	let monthChoices = [];
	Object.values(choice).map((item, key) => {
		if (item.status != 'Paid') {
			monthChoices.push(item.month);
		}
	});

	const [amountType, setAmountType] = useState();

	const services = [
		{
			name: 'Cash',
			icon: require('../../assets/imgs/money.png'),
		},
		{
			name: 'Cash Deposit',
			icon: require('../../assets/imgs/deposit.png'),
		},
		{
			name: 'Check',
			icon: require('../../assets/imgs/paycheck.png'),
		},
	];

	// console.log(soa);
	const status = [
		{ name: 'Pending', icon: require('../../assets/imgs/pending.png') },
		{ name: 'Confirmed', icon: require('../../assets/imgs/done.png') },
	];

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
		// getValues,
		clearErrors,
	} = useForm();

	const filteredMonth = () => {
		let filData = '';
		if (choice) {
			Object.values(choice).filter((data, key) => {
				if (amountType == data.month && data.total) {
					filData = { ...data, key };
				}
			});
		}
		return filData;
	};

	const img = images['images'];
	const vid = videos['videos'];

	const media = [...img];
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
				<CusSelectTransaction
					name={`month`}
					icon={
						<FontAwesome5
							name='calendar-day'
							size={19}
							color='#0A2542'
						/>
					}
					control={control}
					item={monthChoices}
					rules={{ required: 'Payment Month is required.' }}
					placeholder={'Payment Month'}
					required={true}
					setType={setAmountType}
					type={amountType}
				/>
				<CusInput
					placeholder={
						filteredMonth().total
							? filteredMonth().total.substring(1)
							: 'Amount'
					}
					name={`amount`}
					control={control}
					autoCapitalize='words'
					icon={
						<FontAwesome5
							name='money-bill-alt'
							size={18}
							color='#0A2542'
						/>
					}
					required={false}
					readOnly={true}
				/>
				<CusInput
					placeholder={'Receipt No'}
					name={`receiptNo`}
					control={control}
					rules={{
						required: 'Receipt No is required.',
					}}
					autoCapitalize='words'
					icon={
						<FontAwesome5
							name='receipt'
							size={18}
							color='#0A2542'
						/>
					}
					required={true}
					keyboardType={'number-pad'}
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
					placeholder={'Select date paid'}
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
					multiple={false}
				/>
			</VStack>
		);
	};

	const onAdd = async (data, e) => {
		reset();
		setShowModal(false);
		clearErrors();
		setImages({
			images: [],
		});

		const folderPath = `admin/transactions/${curUser.UID}`;
		const storageRef = (imageName, ext) =>
			ref(storage, `${folderPath}/${id}/receipt.png`);
		try {
			const uploadTasks = [];

			await Promise.all(
				media.map(async (element, key) => {
					const mediaBlob = await getBlobFroUri(element);

					return uploadTasks.push(
						uploadBytesResumable(storageRef(key, 'jpg'), mediaBlob)
					);
				})
			);

			const uploadSnapshots = await Promise.all(
				uploadTasks.map(
					(task) =>
						new Promise((resolve, reject) => {
							task.on(
								'state_changed',
								(snapshot) => {
									const progress =
										(snapshot.bytesTransferred /
											snapshot.totalBytes) *
										100;

									switch (snapshot.state) {
										case 'paused':
											console.log('Upload is paused');
											break;
										case 'running':
											console.log('Upload is running');
											break;
									}
								},
								(error) => reject(error),
								() => resolve(task.snapshot)
							);
						})
				)
			);

			const downloadURLs = await Promise.all(
				uploadSnapshots.map((snapshot) => getDownloadURL(snapshot.ref))
			);

			await addDoc(
				collection(
					db,
					'maintenance',
					'accountingmanagement',
					'tbl_transactions'
				),
				{
					CreatedDate: serverTimestamp(),
					TransactionID: id,
					Unit: curUser.Units,
					UnitOwner: `${curUser.FullName}`,
					ReceiptNo: data.receiptNo,
					ForMonth: amountType,
					DatePaid: moment(selectedDate).format('MM/DD/YYYY'),
					AmountPaid: filteredMonth().total
						? filteredMonth().total.substring(1)
						: 0,
					PayMode: type,
					Receipt: downloadURLs.toString(),
					Status: 'Pending',
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

	const ModalView = () => {
		if (cur && cur.Receipt && cur.Receipt) {
			return (
				<>
					<CusModalView
						header={`Transaction #${cur.TransactionID}`}
						body={
							<VStack gap={20}>
								<CusInput
									placeholder={cur.PayMode}
									name={`request`}
									control={control}
									icon={
										<CusText
											text={'Payment Type: '}
											type={'SECONDARY'}
										/>
									}
									readOnly={true}
								/>

								<CusInput
									placeholder={cur.ForMonth}
									name={`request`}
									control={control}
									icon={
										<CusText
											text={'Payment For: '}
											type={'SECONDARY'}
										/>
									}
									readOnly={true}
								/>

								<CusInput
									placeholder={cur.AmountPaid}
									name={`request`}
									control={control}
									icon={
										<CusText
											text={'Amount Paid: '}
											type={'SECONDARY'}
										/>
									}
									readOnly={true}
								/>

								<CusInput
									placeholder={cur.ReceiptNo.toString()}
									name={`request`}
									control={control}
									icon={
										<CusText
											text={'Receipt No.: '}
											type={'SECONDARY'}
										/>
									}
									readOnly={true}
								/>

								<CusInput
									placeholder={cur.DatePaid}
									name={`request`}
									control={control}
									icon={
										<CusText
											text={'Date Paid: '}
											type={'SECONDARY'}
										/>
									}
									readOnly={true}
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
									img={
										!cur.Receipt.includes('mp4') && [
											cur.Receipt,
										]
									}
									vid={cur.Receipt.includes('mp4')}
									text={''}
								/>
							</VStack>
						}
						showModal={showDet}
						setShowModal={setShowDet}
					/>
				</>
			);
		}
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
									// ref={btnRef}
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
				{status.map((stat, key) => {
					var hasMatch =
						transactions.filter((element) => {
							return (
								element.Status == stat.name &&
								`${curUser.FullName}` === element.UnitOwner
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
							{transactions
								.filter((element) => {
									return (
										element.Status == stat.name &&
										`${curUser.FullName}` ===
											element.UnitOwner
									);
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
											text={`Transaction #${data.TransactionID}`}
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
				{/* <Box
					padding={20}
					rounded={15}
					bgColor='#FFF'
					gap={2}
					hardShadow={4}
					shadowColor='$blue200'
					mb={20}
				></Box> */}
			</ScrollView>
		</View>
	);
};

export default TransactionScreen;
