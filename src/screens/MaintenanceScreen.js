import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
	Center,
	Box,
	HStack,
	Divider,
	VStack,
	Button,
	Image,
} from '@gluestack-ui/themed';
import Header from '../layouts/Header';
import CusText from '../components/CusText';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import CusModal from '../components/CusModal';
import CusSelect from '../components/CusSelect';
import CusTextArea from '../components/CusTextArea';
import CusInput from '../components/CusInput';
import CusMediaPicker from '../components/CusMediaPicker';
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

const MaintenanceScreen = ({ curUser, mrequest }) => {
	const insets = useSafeAreaInsets();
	const storage = getStorage();

	const services = [
		{
			name: 'Fixtures',
			icon: require('../../assets/imgs/cabinet.png'),
		},
		{
			name: 'Lavatory',
			icon: require('../../assets/imgs/sink.png'),
		},
		{
			name: 'Structure',
			icon: require('../../assets/imgs/brick.png'),
		},
		{
			name: 'Others',
			icon: require('../../assets/imgs/more.png'),
		},
	];

	const status = [
		{ name: 'Active', icon: require('../../assets/imgs/wip.png') },
		{ name: 'Pending', icon: require('../../assets/imgs/pending.png') },
		{ name: 'Completed', icon: require('../../assets/imgs/done.png') },
	];

	const id = IdGenerator();
	const [type, setType] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [showDet, setShowDet] = useState(false);
	const btnRef = useRef(null);

	const [images, setImages] = useState({
		images: [],
	});
	const [videos, setVideos] = useState({
		videos: [],
	});
	const [cur, setCur] = useState({});
	const img = images['images'];
	const vid = videos['videos'];

	const media = [...img, ...vid];
	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
		// getValues,
		clearErrors,
	} = useForm({
		values: {
			request: type,
		},
	});

	const resetMedia = () => {
		setImages({
			images: [],
		});
		setVideos({
			videos: [],
		});
		reset();
	};
	const onAdd = async (data, e) => {
		reset();
		clearErrors();
		setShowModal(!showModal);
		setImages({
			images: [],
		});
		setVideos({
			videos: [],
		});

		const folderPath = `maintenance/propertymanagement/${curUser.id}`;
		const storageRef = (imageName, ext) =>
			ref(storage, `${folderPath}/${id}/${imageName}.${ext}`);

		try {
			const uploadTasks = [];

			await Promise.all(
				media.map(async (element, key) => {
					const mediaBlob = await getBlobFroUri(element);

					if (mediaBlob['_data']['type'] == 'video/mp4') {
						return uploadTasks.push(
							uploadBytesResumable(
								storageRef(key, 'mp4'),
								mediaBlob
							)
						);
					} else {
						return uploadTasks.push(
							uploadBytesResumable(
								storageRef(key, 'jpg'),
								mediaBlob
							)
						);
					}
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
					'propertymanagement',
					'tbl_maintenance'
				),
				{
					RequestedBy: curUser.UID,
					RequestedName: `${curUser.FName} ${curUser.LName}`,
					MRequestID: id,
					Unit: data.location,
					CreatedDate: serverTimestamp(),
					RepairType: data.request,
					RequestImg: downloadURLs,
					Details: data.details,
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

	const ModalBody = () => {
		let units = [curUser.Units];
		return (
			<>
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
						placeholder={'Location'}
						name={`location`}
						icon={
							<MaterialIcons
								name='location-pin'
								size={20}
								color='#0A2542'
							/>
						}
						control={control}
						item={[...units, 'Exterior']}
						rules={{ required: 'Location is required.' }}
						required={true}
					/>
					<CusTextArea
						placeholder={'State the problem here...'}
						control={control}
						icon={
							<Ionicons
								name='menu-outline'
								size={22}
								color='#0A2542'
							/>
						}
						name={`details`}
						rules={{ required: 'Details is required.' }}
						required={true}
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
					/>
				</VStack>
			</>
		);
	};

	const ModalView = () => {
		if (cur.RequestImg) {
			return (
				<CusModalView
					header={`Ticket #${cur.MRequestID}`}
					body={
						<VStack gap={10}>
							<CusSelect
								placeholder={cur.Unit}
								name={`location`}
								icon={
									<MaterialIcons
										name='location-pin'
										size={20}
										color='#0A2542'
									/>
								}
								control={control}
								item={[...curUser.Units, 'Exterior']}
								disabled={true}
							/>
							<CusTextArea
								placeholder={cur.Details}
								control={control}
								icon={
									<Ionicons
										name='menu-outline'
										size={22}
										color='#0A2542'
									/>
								}
								name={`details`}
								disabled={true}
							/>
							<CusInput
								placeholder={cur.RepairType}
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
								img={cur.RequestImg.filter(
									(word) => !word.includes('mp4')
								)}
								vid={cur.RequestImg.filter((word) =>
									word.includes('mp4')
								)}
								text={'Images/Videos'}
							/>
						</VStack>
					}
					showModal={showDet}
					setShowModal={setShowDet}
				/>
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
					img={require('../../assets/gifs/maintenance.gif')}
					title={'Maintenance'}
					description={
						'Got problem in your unit or around the tower? Inform the Property Management to handle it. '
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
							header={'CREATE A REQUEST'}
							handleSubmit={handleSubmit}
							onAdd={onAdd}
							reset={resetMedia}
							clearErrors={clearErrors}
							body={<ModalBody />}
							showModal={showModal}
							setShowModal={setShowModal}
							button={
								<Button
									h={80}
									w={80}
									size='xs'
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
											h={35}
											w={35}
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
				<Box mb={50}>
					{status.map((stat, skey) => {
						var hasMatch =
							mrequest.filter((element) => {
								return (
									element.Status == stat.name &&
									(curUser.Units === element.Unit ||
										element.RequestedBy == curUser.UID)
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
								key={skey}
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

								{mrequest
									.filter((element) => {
										return (
											element.Status == stat.name &&
											(curUser.Units === element.Unit ||
												element.RequestedBy ==
													curUser.UID)
										);
									})
									.map((data, mkey) => (
										<HStack
											pr={5}
											pl={5}
											justifyContent='space-between'
											alignItems='center'
											key={mkey}
											mb={-3}
										>
											<CusText
												type={'SECONDARY'}
												text={`Ticket #${data.MRequestID}`}
												style={{
													textAlign: 'left',
												}}
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

export default MaintenanceScreen;
