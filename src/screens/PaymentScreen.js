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

import CusSelect from '../components/CusSelect';
import { useState, useRef, useEffect } from 'react';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-root-toast';
import CusPie from '../components/CusPie';
const PaymentScreen = () => {
	const insets = useSafeAreaInsets();
	const [showModal, setShowModal] = useState(false);
	const ref = useRef(null);

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
	const location = ['Unit 1013', 'Exterior', 'Unit 5422'];
	const [loc, setLocation] = useState('');

	const tcpBreakdown = [
		{ Name: 'Unit Amount', Amount: '₱5, 212.33' },
		{ Name: 'VAT (12%)', Amount: '₱21, 212' },
		{ Name: 'Other Charges', Amount: '₱5, 212.33' },
	];

	const tcpDiscounts = [
		{ Name: 'Promo Discount (5%)', Amount: '₱5, 212.33' },
		{ Name: 'Cash Discount for Studio', Amount: '₱21, 212' },
		{ Name: '7% Discount on 50% DP', Amount: '₱5, 212.33' },
	];
	const Body = () => {
		return <></>;
	};

	return (
		<View
			style={{
				flex: 1,
				paddingTop: insets.top,
			}}
		>
			<Center
				p={20}
				m={20}
				alignContent='flex-start'
				justifyContent='flex-start'
				h={270}
				mb={-60}
			>
				<Header
					img={require('../../assets/gifs/payment.gif')}
					title={'Payments'}
					description={
						'View your statement of accounts and send your payment proofs to account management.'
					}
				/>

				{/* <CusModal
					header={'BOOK AN AMENITY'}
					setShowModal={setShowModal}
					showModal={showModal}
					handleSubmit={handleSubmit}
					onAdd={onAdd}
					reset={reset}
					// body={<Body />}
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
				/> */}
			</Center>

			<ScrollView showsVerticalScrollIndicator={false}>
				<Box
					m={20}
					alignItems='flex-end'
				>
					<CusSelect
						label={'Location'}
						icon={''}
						item={location}
						value={loc}
						setValue={setLocation}
						placeholder={'T1-2143'}
						variant={'default'}
						textAlign='center'
						w={120}
						bgColor={'$white100'}
					/>
				</Box>
				<Box
					ml={20}
					mr={20}
					gap={20}
				>
					<HStack
						bgColor='$blue300'
						rounded={15}
						hardShadow={4}
						shadowColor='$blue200'
						alignItems='center'
						justifyContent='space-between'
						p={20}
					>
						<Box
							alignItems='flex-start'
							// gap={5}
						>
							<CusText
								type={'SECONDARY'}
								text={'Current Balance'}
								style={{ fontSize: 13, color: '#FFC739' }}
							/>
							<HStack>
								<CusText
									type={'HEADING'}
									text={'₱'}
									style={{ fontSize: 23, color: '#D0D0D0' }}
								/>
								<CusText
									type={'HEADING'}
									text={'4, 232, 343.00'}
									style={{ fontSize: 23, color: '#EEE' }}
								/>
							</HStack>
						</Box>
						<CusPie />
					</HStack>

					<Box alignItems='flex-start'>
						<HStack
							justifyContent={'space-between'}
							justifyItem={'space-between'}
							alignItems={'center'}
							w={'100%'}
						>
							<CusText
								type={'SECONDARY'}
								text={'Upcoming'}
								style={{ fontSize: 13 }}
							/>
							<Button
								variant={'link'}
								size={'xs'}
							>
								<CusText
									type={'PRIMARY'}
									text={'View All >'}
									style={{ fontSize: 13 }}
								/>
							</Button>
						</HStack>

						<HStack
							bgColor='$blue100'
							rounded={15}
							hardShadow={4}
							shadowColor='$blue200'
							alignItems='center'
							justifyContent='space-between'
							p={20}
							w={'100%'}
							gap={0}
						>
							<VStack
								w={'15%'}
								// mr={15}
							>
								<CusText
									type={'SECONDARY'}
									text={'MAR'}
									style={{
										fontSize: 13,
										color: '#8695A6',
									}}
								/>
								<CusText
									type={'SECONDARY'}
									text={'12'}
									style={{ fontSize: 20 }}
								/>
							</VStack>
							<Divider
								orientation={'vertical'}
								ml={10}
								bgColor={'$blue100'}
							/>
							<VStack
								w={'85%'}
								alignItems={'flex-start'}
								pl={10}
								gap={10}
							>
								<HStack
									alignItems={'center'}
									w={'100%'}
									justifyContent={'space-between'}
								>
									<VStack alignItems={'flex-start'}>
										<CusText
											type={'TERTIARY'}
											text={'UNIT'}
											style={{
												fontSize: 13,
												color: '#8695A6',
											}}
										/>
										<CusText
											type={'TERTIARY'}
											text={'₱5, 212.33'}
											style={{ fontSize: 20 }}
										/>
									</VStack>
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
												bgColor='$blue100'
												// m={20}
												// variant='outline'
												onPress={() => {
													setShowModal(true);
												}}
												ref={ref}
												size='xs'
											>
												<VStack
													alignItems='center'
													justifyItem='center'
												>
													<FontAwesome5
														name='receipt'
														size={24}
														color='#0A2542'
													/>
												</VStack>
											</Button>
										}
									/>
								</HStack>

								{/* <Divider
								orientation={'horizontal'}
								ml={-5}
							/> */}
							</VStack>
						</HStack>
					</Box>

					<Box
						alignItems='flex-start'
						w={'100%'}
					>
						<CusText
							type={'SECONDARY'}
							text={'Breakdown'}
							style={{ fontSize: 13 }}
						/>
						<VStack
							mt={5}
							bgColor='$white300'
							rounded={15}
							hardShadow={4}
							shadowColor='$blue200'
							alignItems='center'
							justifyContent='space-between'
							p={20}
							gap={10}
							w={'100%'}
						>
							<HStack
								justifyContent={'space-between'}
								w={'100%'}
							>
								<CusText
									type={'TERTIARY'}
									text={'Contract Price'}
									style={{
										fontSize: 15,
									}}
								/>
							</HStack>
							<Divider
								orientation={'horizontal'}
								bgColor={'$yellow100'}
							/>
							{tcpBreakdown.map((name, ind) => (
								<Box
									w={'100%'}
									bgColor={'$white200'}
									key={ind}
								>
									<HStack
										justifyContent={'space-between'}
										w={'100%'}
										alignItems={'center'}
										p={10}
									>
										<Box w={'10%'}>
											<AntDesign
												name='pushpino'
												size={15}
												color='black'
											/>
										</Box>
										<HStack
											justifyContent={'space-between'}
											w={'90%'}
										>
											<CusText
												type={'SECONDARY'}
												text={name.Name}
												style={{
													fontSize: 13,
													textAlign: 'left',
												}}
											/>
											<CusText
												type={'SECONDARY'}
												text={name.Amount}
												style={{ fontSize: 13 }}
											/>
										</HStack>
									</HStack>
								</Box>
							))}
							<HStack
								justifyContent={'space-between'}
								w={'100%'}
								alignItems={'center'}
								p={10}
								bgColor={'$blue200'}
							>
								<CusText
									type={'TERTIARY'}
									text={'Total'}
									style={{
										fontSize: 13,
										textAlign: 'left',
									}}
								/>
								<CusText
									type={'TERTIARY'}
									text={'₱5, 212.33'}
									style={{ fontSize: 13 }}
								/>
							</HStack>

							<HStack
								justifyContent={'space-between'}
								w={'100%'}
								mt={12}
							>
								<CusText
									type={'TERTIARY'}
									text={'Adjustments'}
									style={{
										fontSize: 15,
									}}
								/>
							</HStack>
							<Divider
								orientation={'horizontal'}
								bgColor={'$yellow100'}
							/>
							{tcpDiscounts.map((name, ind) => (
								<Box
									w={'100%'}
									bgColor={'$white200'}
									key={ind}
								>
									<HStack
										justifyContent={'space-between'}
										w={'100%'}
										alignItems={'center'}
										p={10}
									>
										<Box w={'10%'}>
											<AntDesign
												name='pushpino'
												size={15}
												color='black'
											/>
										</Box>
										<HStack
											justifyContent={'space-between'}
											w={'90%'}
										>
											<CusText
												type={'SECONDARY'}
												text={name.Name}
												style={{
													fontSize: 13,
													textAlign: 'left',
												}}
											/>
											<CusText
												type={'SECONDARY'}
												text={name.Amount}
												style={{ fontSize: 13 }}
											/>
										</HStack>
									</HStack>
								</Box>
							))}

							<HStack
								justifyContent={'space-between'}
								w={'100%'}
								alignItems={'center'}
								p={10}
								bgColor={'$blue200'}
							>
								<CusText
									type={'TERTIARY'}
									text={'Total'}
									style={{
										fontSize: 13,
										textAlign: 'left',
									}}
								/>
								<CusText
									type={'TERTIARY'}
									text={'₱5, 212.33'}
									style={{ fontSize: 13 }}
								/>
							</HStack>

							<Box
								w={'100%'}
								mt={12}
								bgColor={'$yellow100'}
								p={10}
							>
								<HStack
									justifyContent={'space-between'}
									w={'100%'}
								>
									<CusText
										type={'TERTIARY'}
										text={'Total Balance'}
										style={{
											fontSize: 15,
										}}
									/>
									<CusText
										type={'TERTIARY'}
										text={'₱5, 212.33'}
										style={{ fontSize: 15 }}
									/>
								</HStack>
							</Box>
						</VStack>
					</Box>
					<Box
						alignItems='flex-start'
						mb={90}
					>
						<HStack
							justifyContent={'space-between'}
							justifyItem={'space-between'}
							alignItems={'center'}
							w={'100%'}
						>
							<CusText
								type={'SECONDARY'}
								text={'History'}
								style={{ fontSize: 13 }}
							/>
							<Button
								variant={'link'}
								size={'xs'}
							>
								<CusText
									type={'PRIMARY'}
									text={'View All >'}
									style={{ fontSize: 13 }}
								/>
							</Button>
						</HStack>

						<Box
							padding={10}
							bgColor='$blue100'
							rounded={15}
							gap={2}
							hardShadow={5}
							w={'100%'}
						>
							<HStack
								pr={5}
								pl={5}
								justifyContent='space-between'
								alignItems='center'
							>
								<CusText
									type={'SECONDARY'}
									text={'Receipt #2132323'}
									style={{ textAlign: 'left', fontSize: 13 }}
								/>

								<CusText
									type={'SECONDARY'}
									text={'Mar 12'}
									style={{ textAlign: 'left', fontSize: 13 }}
								/>

								<Button
									variant='link'
									size='xs'
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
							</HStack>
						</Box>
					</Box>
				</Box>
			</ScrollView>
		</View>
	);
};

export default PaymentScreen;
