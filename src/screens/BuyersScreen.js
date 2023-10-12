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

const BuyersScreen = () => {
	const insets = useSafeAreaInsets();
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
							maxLength={4}
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
						/>
					</VStack>
				</ScrollView>
			</Box>
		);
	};

	const onAdd = async (data, e) => {};
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
								<HStack
									pr={5}
									pl={5}
									justifyContent='space-between'
									alignItems='center'
									// key={mkey}
									mb={-3}
								>
									<CusText
										type={'SECONDARY'}
										text={`${stat.name} #`}
										style={{
											textAlign: 'left',
										}}
									/>
									<CusModalView
										header={`Ticket #`}
										body={''}
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
							</Box>
						);
					})}
				</Box>
			</ScrollView>
		</View>
	);
};

export default BuyersScreen;
