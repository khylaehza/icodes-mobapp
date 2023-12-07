import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
	Center,
	Box,
	HStack,
	Divider,
	Button,
	Image,
} from '@gluestack-ui/themed';
import Header from '../layouts/Header';
import CusText from '../components/CusText';
import { Ionicons } from '@expo/vector-icons';
import CusModal from '../components/CusModal';
import CusTextArea from '../components/CusTextArea';
import { useForm } from 'react-hook-form';
import { useState, useRef } from 'react';
import Toast from 'react-native-root-toast';
import { IdGenerator } from '../utilities/IdGenerator';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

import CusModalView from '../components/CusModalView';

const ReportScreen = ({ curUser, reports }) => {
	const [showModal, setShowModal] = useState(false);
	const [showDet, setShowDet] = useState(false);
	const ref = useRef(null);
	const id = IdGenerator();
	const insets = useSafeAreaInsets();
	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
		// getValues,
		clearErrors,
	} = useForm();
	const [cur, setCur] = useState({});
	const Body = () => {
		return (
			<CusTextArea
				placeholder={'State your reports or feedback here...'}
				control={control}
				icon={
					<Ionicons
						name='menu-outline'
						size={22}
						color='#0A2542'
					/>
				}
				name={`report`}
				rules={{ required: 'Report/Feedback is required.' }}
				required={true}
			/>
		);
	};

	const onAdd = async (data, e) => {
		reset();
		setShowModal(false);
		clearErrors();

		try {
			await addDoc(
				collection(db, 'maintenance', 'admin', 'tbl_reports'),
				{
					ReportID: id,
					UserID: curUser.UID,
					Name: `${curUser.FName} ${curUser.LName}`,
					Report: data.report,
					CreatedDate: serverTimestamp(),
					Tower: curUser.Tower,
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
		return (
			<CusModalView
				header={`Report #${cur.ReportID}`}
				body={
					<CusTextArea
						placeholder={cur.Report}
						control={control}
						icon={
							<Ionicons
								name='menu-outline'
								size={22}
								color='#0A2542'
							/>
						}
						name={`report`}
						disabled={true}
					/>
				}
				showModal={showDet}
				setShowModal={setShowDet}
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
					img={require('../../assets/gifs/reports.gif')}
					title={'Reports & Feedback'}
					description={
						'Got suggestions or concerns? Let your admin know it. '
					}
				/>

				<CusModal
					header={'SEND REPORTS'}
					setShowModal={setShowModal}
					showModal={showModal}
					handleSubmit={handleSubmit}
					onAdd={onAdd}
					reset={reset}
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
								text={'Send Reports'}
								type={'TERTIARY'}
								style={{ color: '#FFF' }}
							/>
						</Button>
					}
				/>
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

					{reports
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
				</Box>
			</ScrollView>
		</View>
	);
};

export default ReportScreen;
