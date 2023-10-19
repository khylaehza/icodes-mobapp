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
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
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
import CusCheckbox from '../components/CusCheckbox';
import CusRadioGroup from '../components/CusRadioGroup';
import CusDatePicker from '../components/CusDatePicker';
import moment from 'moment';
const BuyersScreen = ({ curUser, pBuyers }) => {
	const insets = useSafeAreaInsets();

	console.log(pBuyers);
	const id = IdGenerator();
	const [type, setType] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [showDet, setShowDet] = useState(false);
	const [selectedDate, setSelectedDate] = useState();
	const btnRef = useRef(null);

	const gender = ['Male', 'Female'];
	const citizenship = ['Filipino', 'American', 'Others: '];
	const civilStat = [
		'Single',
		'Separated/Divorce',
		'Married',
		'Widow/Widower',
	];
	const preference = ['1 BR', 'Loft', '2BR', 'Studio', 'Others: '];
	const purpose = ['Investment', 'Personal Use'];
	const productKnow = [
		'Advertisement',
		'Agent/Broker',
		'Mall Exhibit',
		'Friends',
		'Others: ',
	];
	const services = [
		{
			name: 'Zoom',
			icon: require('../../assets/imgs/zoom.png'),
		},
		{
			name: 'Tripping',
			icon: require('../../assets/imgs/tripping.png'),
		},
		{
			name: 'Walk-in',
			icon: require('../../assets/imgs/walkin.png'),
		},
		{
			name: 'Pull-ins',
			icon: require('../../assets/imgs/pullins.png'),
		},
	];

	const servHistory = [
		{ name: 'Zoom', icon: require('../../assets/imgs/wip.png') },
		{ name: 'Tripping', icon: require('../../assets/imgs/pending.png') },
		{ name: 'Walk-in', icon: require('../../assets/imgs/done.png') },
		{ name: 'Pull-ins', icon: require('../../assets/imgs/done.png') },
	];

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
			mName: '',
			telNum: '',
			company: '',
			compAddress: '',
			compPostal: '',
		},
	});

	const ModalBody = () => {
		return (
			<Box maxHeight={500}>
				<ScrollView showsVerticalScrollIndicator={false}>
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

						<CusInput
							name={`lName`}
							control={control}
							icon={
								<CusText
									text={'Last Name:'}
									type={'SECONDARY'}
								/>
							}
							required={true}
							rules={{ required: 'Last name is required.' }}
						/>
						<CusInput
							name={`fName`}
							control={control}
							icon={
								<CusText
									text={'First Name:'}
									type={'SECONDARY'}
								/>
							}
							required={true}
							rules={{ required: 'First name is required.' }}
						/>
						<CusInput
							name={`mName`}
							control={control}
							icon={
								<CusText
									text={'Middle Name:'}
									type={'SECONDARY'}
								/>
							}
							required={false}
						/>

						<CusRadioGroup
							radioLabels={gender}
							control={control}
							name={`gender`}
							required={true}
							icon={
								<CusText
									text={'Gender:'}
									type={'SECONDARY'}
								/>
							}
							rules={{ required: 'Gender is required.' }}
						/>

						<CusDatePicker
							selectedDate={selectedDate}
							setSelectedDate={setSelectedDate}
							icon={
								<CusText
									text={'Birthdate:'}
									type={'SECONDARY'}
								/>
							}
							mode={'date'}
							w={185}
							rules={{ required: 'Birthdate is required.' }}
						/>
						<CusCheckbox
							checkLabels={citizenship}
							control={control}
							name={'citizenship'}
							icon={
								<CusText
									text={'Citizenship:'}
									type={'SECONDARY'}
								/>
							}
							required={true}
							others={'otherCitizen'}
							rules={{ required: 'Citizenship is required.' }}
						/>
						<CusCheckbox
							checkLabels={civilStat}
							control={control}
							name={'civil'}
							icon={
								<CusText
									text={'Civil Status:'}
									type={'SECONDARY'}
								/>
							}
							required={true}
							rules={{ required: 'Civil Status is required.' }}
						/>
						<CusTextArea
							control={control}
							placeholder={
								"Enter prospective buyer's full address here..."
							}
							icon={
								<CusText
									text={'Home Address:'}
									type={'SECONDARY'}
								/>
							}
							name={`address`}
							rules={{ required: 'Address is required.' }}
							required={true}
							stack={true}
							w={270}
						/>
						<CusInput
							name={`postal`}
							control={control}
							icon={
								<CusText
									text={'Postal Code:'}
									type={'SECONDARY'}
								/>
							}
							required={true}
							type={'number'}
							keyboardType={'number-pad'}
							maxLength={4}
							placeholder={'xxxx'}
							rules={{ required: 'Postal code is required.' }}
						/>
						<CusInput
							name={`cNum`}
							control={control}
							icon={
								<CusText
									text={'Contact No:'}
									type={'SECONDARY'}
								/>
							}
							keyboardType={'number-pad'}
							placeholder={'09xx-xxx-xxx'}
							maxLength={11}
							w={175}
							required={true}
							type={'number'}
							rules={{ required: 'Contact number is required.' }}
						/>
						<CusInput
							name={`telNum`}
							control={control}
							icon={
								<CusText
									text={'Telephone No:'}
									type={'SECONDARY'}
								/>
							}
							keyboardType={'number-pad'}
							placeholder={'xxxx-xxxx'}
							maxLength={8}
							w={175}
							type={'number'}
						/>
						<CusInput
							name={`email`}
							control={control}
							icon={
								<CusText
									text={'Email Add:'}
									type={'SECONDARY'}
								/>
							}
							type={'email'}
							placeholder={'name@example.com'}
							w={175}
							required={true}
							rules={{ required: 'Email is required.' }}
						/>
						<CusInput
							name={`company`}
							control={control}
							icon={
								<CusText
									text={'Company Name:'}
									type={'SECONDARY'}
								/>
							}
							required={false}
						/>
						<CusTextArea
							control={control}
							placeholder={
								"Enter prospective buyer's full company address here..."
							}
							icon={
								<CusText
									text={'Company Address:'}
									type={'SECONDARY'}
								/>
							}
							name={`compAddress`}
							stack={true}
							w={290}
						/>
						<CusInput
							name={`compPostal`}
							control={control}
							icon={
								<CusText
									text={'Company Postal Code:'}
									type={'SECONDARY'}
								/>
							}
							type={'number'}
							maxLength={4}
						/>
						<Divider />
						<CusCheckbox
							checkLabels={preference}
							control={control}
							name={'preference'}
							icon={
								<CusText
									text={'Preference:'}
									type={'SECONDARY'}
								/>
							}
							required={true}
							others={'otherPref'}
							rules={{ required: 'Preference is required.' }}
						/>
						<CusCheckbox
							checkLabels={purpose}
							control={control}
							name={'purpose'}
							icon={
								<CusText
									text={'Purpose:'}
									type={'SECONDARY'}
								/>
							}
							required={true}
							rules={{ required: 'Purpose is required.' }}
						/>
						<CusCheckbox
							checkLabels={productKnow}
							control={control}
							name={'productKnow'}
							icon={
								<CusText
									text={'How did you get to know CTC:'}
									type={'SECONDARY'}
								/>
							}
							required={true}
							others={'otherKnow'}
							rules={{ required: 'This is is required.' }}
						/>
					</VStack>
				</ScrollView>
			</Box>
		);
	};

	const onAdd = async (data, e) => {
		reset();
		setShowModal(false);
		clearErrors();
		setSelectedDate('');
		console.log(data);
		try {
			await addDoc(
				collection(
					db,
					'maintenance',
					'salesmanagement',
					'tbl_agentBuyers'
				),
				{
					ABuyersID: id,
					PBType: data.request,
					Agent: `${curUser.fName} ${curUser.lName}`,
					PBBy: curUser.empId,
					LName: data.lName,
					FName: data.fName,
					MName: data.mName,
					Gender: data.gender,
					BDate: moment(selectedDate).format('MM/DD/YYYY'),
					Civil: data.civil,
					Citizen: data.citizenship,
					Address: data.address,
					Postal: data.postal,
					CNum: data.cNum,
					TNum: data.telNum,
					Email: data.email,
					CompName: data.company,
					CompAdd: data.compAddress,
					CompPostal: data.compPostal,
					Preference: data.preference,
					Purpose: data.purpose,
					Know: data.productKnow,
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
			<>
				<CusInput
					placeholder={data.PBType}
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
				<CusInput
					placeholder={data.LName}
					name={`lName`}
					control={control}
					icon={
						<CusText
							text={'Last Name:'}
							type={'SECONDARY'}
						/>
					}
					readOnly={true}
				/>
				<CusInput
					name={`fName`}
					control={control}
					icon={
						<CusText
							text={'First Name:'}
							type={'SECONDARY'}
						/>
					}
					readOnly={true}
					placeholder={data.FName}
				/>
				<CusInput
					name={`mName`}
					control={control}
					icon={
						<CusText
							text={'Middle Name:'}
							type={'SECONDARY'}
						/>
					}
					readOnly={true}
					placeholder={data.MName}
				/>
				<CusInput
					name={`gender`}
					control={control}
					icon={
						<CusText
							text={'Gender:'}
							type={'SECONDARY'}
						/>
					}
					readOnly={true}
					placeholder={data.Gender}
				/>
				<CusInput
					name={`bday`}
					control={control}
					icon={
						<CusText
							text={'Birthdate:'}
							type={'SECONDARY'}
						/>
					}
					readOnly={true}
					placeholder={data.BDate}
				/>
				<CusInput
					name={`citi`}
					control={control}
					icon={
						<CusText
							text={'Citizenship:'}
							type={'SECONDARY'}
						/>
					}
					readOnly={true}
					placeholder={data.Citizen}
				/>
				<CusInput
					name={`civil`}
					control={control}
					icon={
						<CusText
							text={'Civil Status:'}
							type={'SECONDARY'}
						/>
					}
					readOnly={true}
					placeholder={data.Civil}
				/>
				<CusTextArea
					placeholder={data.Address}
					control={control}
					icon={
						<CusText
							text={'Address:'}
							type={'SECONDARY'}
						/>
					}
					name={`address`}
					disabled={true}
				/>
				<CusInput
					name={`postal`}
					control={control}
					icon={
						<CusText
							text={'Postal Code:'}
							type={'SECONDARY'}
						/>
					}
					readOnly={true}
					placeholder={data.Postal}
				/>
				<CusInput
					name={`Contact`}
					control={control}
					icon={
						<CusText
							text={'Contact No.'}
							type={'SECONDARY'}
						/>
					}
					readOnly={true}
					placeholder={data.CNum}
				/>
				<CusInput
					name={`Tel`}
					control={control}
					icon={
						<CusText
							text={'Telephone No. '}
							type={'SECONDARY'}
						/>
					}
					readOnly={true}
					placeholder={data.Tel}
				/>
				<CusInput
					name={`Email`}
					control={control}
					icon={
						<CusText
							text={'Email'}
							type={'SECONDARY'}
						/>
					}
					readOnly={true}
					placeholder={data.Email}
				/>
				<CusInput
					name={`Company`}
					control={control}
					icon={
						<CusText
							text={'Company Name: '}
							type={'SECONDARY'}
						/>
					}
					readOnly={true}
					placeholder={data.CompName}
				/>
				<CusInput
					name={`CompAdd`}
					control={control}
					icon={
						<CusText
							text={'Company Address: '}
							type={'SECONDARY'}
						/>
					}
					readOnly={true}
					placeholder={data.CompAdd}
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
				h={340}
			>
				<Header
					img={require('../../assets/gifs/buyers.gif')}
					title={'Prospective Buyers'}
					description={
						'View, record, and submit all engagement proofs with your prospective buyers.'
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
							header={'SEND PROOF'}
							handleSubmit={handleSubmit}
							onAdd={onAdd}
							reset={reset}
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
					{servHistory.map((stat, skey) => {
						var hasMatch =
							pBuyers.filter((element) => {
								return (
									element.PBType == stat.name &&
									curUser.empId === element.PBBy
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
								<CusText
									type={'TERTIARY'}
									text={stat.name}
								/>

								<Divider my='$1.5' />
								{pBuyers
									.filter((element) => {
										return (
											element.PBType == stat.name &&
											curUser.empId === element.PBBy
										);
									})
									.map((data, bkey) => (
										<HStack
											pr={5}
											pl={5}
											justifyContent='space-between'
											alignItems='center'
											key={bkey}
											mb={-3}
										>
											<CusText
												type={'SECONDARY'}
												text={`${stat.name} #${data.ABuyersID}`}
												style={{
													textAlign: 'left',
												}}
											/>
											<CusModalView
												header={`${stat.name} #${data.ABuyersID}`}
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

export default BuyersScreen;
