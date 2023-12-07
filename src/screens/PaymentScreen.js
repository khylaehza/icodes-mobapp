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
import CusModalView from '../components/CusModalView';

import CusSelect from '../components/CusSelect';
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-root-toast';
import CusPie from '../components/CusPie';
import moment from 'moment';
const PaymentScreen = ({ curUser, soa, transactions }) => {
	const insets = useSafeAreaInsets();
	const [showDet, setShowDet] = useState(false);
	const ref = useRef(null);

	const { control } = useForm({
		values: {
			request: curUser.Units,
		},
	});
	let contractPrice = 0;
	let dsc = 0;
	let ttlDsc = 0;
	let vat = 0;
	let compVat = 0;
	let totalCP = 0;
	let otherChargePercent = 0;
	let totalCharge = 0;
	let monthlyPercent = 0;
	let perWithTCP = 0;
	let reservation = 0;
	let noOfMonths = 0;
	let totalPayInMon = 0;
	let perWithOthers = 0;

	let table = [];
	soa.filter((s) => {
		if (curUser.UID === s.BuyersId) {
			contractPrice = s.Amount;
			dsc = s.Discounts;
			ttlDsc = new Intl.NumberFormat('en-US').format(s.TotalDiscount);
			vat = s.Vat ? s.Vat : '0';
			totalCP = s.TotalTCP;
			compVat = new Intl.NumberFormat('en-US').format(s.ComputedVat);
			otherChargePercent = s.OtherChargePercent;
			totalCharge = s.TotalCharge;
			monthlyPercent = s.MonthlyPercent;
			perWithTCP = s.PerWithTCP;
			reservation = s.ReservationFee;
			noOfMonths = s.NoOfMonths;
			totalPayInMon = s.TotalPayInMon;
			perWithOthers = s.PerWithOthers;
			table = Object.values(s.SOA);
		}
	});

	const transact = transactions.filter((element) => {
		return `${curUser.FullName}` === element.UnitOwner;
	});

	const remainPer = 100 - monthlyPercent;
	const remainUnit = new Intl.NumberFormat('en-US', {
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
	}).format((parseFloat(remainPer) / 100) * totalCP);
	const remainOthers = new Intl.NumberFormat('en-US', {
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
	}).format((parseFloat(remainPer) / 100) * totalCharge);

	const totalRemain = new Intl.NumberFormat('en-US', {
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
	}).format(
		(parseFloat(remainPer) / 100) * totalCP +
			(parseFloat(remainPer) / 100) * totalCharge
	);
	let deduct = 0;
	let soaTrans = [];
	table.filter((data, key) => {
		transact.filter((paid) => {
			if (data.month == paid.ForMonth) {
				soaTrans.push({
					...data,
					status: 'Paid',
				});
			} else {
				soaTrans.push({
					...data,
				});
			}

			if (data.amountPaid && data.status) {
				deduct += parseFloat(data.amountPaid.replace(/,/g, ''));
			}
		});
	});

	Object.values(
		table.reduce((acc, cur) => Object.assign(acc, { [cur.month]: cur }), {})
	);
	let currentBalance = 0;

	let upcomingPayment = {};
	let latePayments = {};
	table.map((p) => {
		if (p.status) {
			currentBalance += Number(p.amountPaid.replace(/,/g, ''));
			console.log(p);
		} else if (p.status != '' && !p.status) {
			let nextMonth = moment().add(1, 'months');
			let prevMonth = moment().subtract(1, 'months');
			if (p.month.includes(moment().format('MMM-YYYY'))) {
				upcomingPayment = { ...p };
			} else if (p.month.includes(nextMonth.format('MMM-YYYY'))) {
				upcomingPayment = { ...p };
			} else if (p.month.includes(prevMonth.format('MMM-YYYY'))) {
				latePayments = { ...p };
			}
		}
	});

	let remainingCur = totalPayInMon + perWithOthers - currentBalance;
	let remainPercent =
		100 - (remainingCur / (totalPayInMon + perWithOthers)) * 100;

	const ModalView = () => {
		return (
			<CusModalView
				// header={`SOA`}
				h={650}
				body={
					<VStack gap={5}>
						{table.map((data, key) => {
							return (
								<React.Fragment key={key}>
									<VStack
										bgColor={
											data.status
												? '$blue200'
												: '$white100'
										}
										rounded={15}
										hardShadow={4}
										shadowColor='$blue200'
										alignItems='center'
										justifyContent='space-between'
										p={20}
									>
										{data.status && (
											<CusText
												type={'TERTIARY'}
												text={`PAID`}
												style={{
													fontSize: 15,
												}}
											/>
										)}
										<HStack
											justifyContent={'space-between'}
											w={'100%'}
										>
											<CusText
												type={'TERTIARY'}
												text={'No.'}
												style={{
													fontSize: 15,
												}}
											/>
											<CusText
												type={'SECONDARY'}
												text={data.num}
												style={{
													fontSize: 15,
												}}
											/>
										</HStack>
										<HStack
											justifyContent={'space-between'}
											w={'100%'}
										>
											<CusText
												type={'TERTIARY'}
												text={'Date'}
												style={{
													fontSize: 15,
												}}
											/>
											<CusText
												type={'SECONDARY'}
												text={data.month}
												style={{
													fontSize: 15,
												}}
											/>
										</HStack>
										<HStack
											justifyContent={'space-between'}
											w={'100%'}
										>
											<CusText
												type={'TERTIARY'}
												text={'Unit'}
												style={{
													fontSize: 15,
												}}
											/>
											<CusText
												type={'SECONDARY'}
												text={data.unit}
												style={{
													fontSize: 15,
												}}
											/>
										</HStack>
										<HStack
											justifyContent={'space-between'}
											w={'100%'}
										>
											<CusText
												type={'TERTIARY'}
												text={'Other'}
												style={{
													fontSize: 15,
												}}
											/>
											<CusText
												type={'SECONDARY'}
												text={data.others}
												style={{
													fontSize: 15,
												}}
											/>
										</HStack>
										<HStack
											justifyContent={'space-between'}
											w={'100%'}
										>
											<CusText
												type={'TERTIARY'}
												text={'Total'}
												style={{
													fontSize: 15,
												}}
											/>
											<CusText
												type={'SECONDARY'}
												text={data.total}
												style={{
													fontSize: 15,
												}}
											/>
										</HStack>
									</VStack>
								</React.Fragment>
							);
						})}
					</VStack>
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
					img={require('../../assets/gifs/soa.gif')}
					title={'SOA'}
					description={
						'View your statement of accounts and monitor your upcoming balances.'
					}
				/>
			</Center>

			<ScrollView showsVerticalScrollIndicator={false}>
				<Box
					m={20}
					alignItems='flex-end'
				>
					<CusSelect
						name={`location`}
						control={control}
						item={[...curUser.Units]}
						// item={[...curUser.units]}
						placeholder={curUser.Units.toString()}
						// placeholder={curUser.units[0]}
						required={false}
						variant={'default'}
						textAlign='center'
						w={120}
						bgColor={'$white300'}
						softShadow={2}
						shadowColor='$blue300'
						hasDropdown={false}
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
									text={'₱ '}
									style={{ fontSize: 23, color: '#D0D0D0' }}
								/>
								<CusText
									type={'HEADING'}
									text={new Intl.NumberFormat('en-US', {
										maximumFractionDigits: 2,
										minimumFractionDigits: 2,
									}).format(remainingCur)}
									style={{ fontSize: 23, color: '#EEE' }}
								/>
							</HStack>
						</Box>
						<CusPie val={remainPercent.toFixed(0)} />
					</HStack>

					{Object.keys(latePayments).length != 0 && (
						<Box alignItems='flex-start'>
							<HStack
								justifyContent={'space-between'}
								justifyItem={'space-between'}
								alignItems={'center'}
								w={'100%'}
							>
								<CusText
									type={'SECONDARY'}
									text={'Late payments'}
									style={{ fontSize: 13 }}
								/>
							</HStack>

							<HStack
								bgColor='$red900'
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
										text={moment(latePayments.month)
											.format('MMM')
											.toString()
											.toUpperCase()}
										style={{
											fontSize: 13,
											color: '#8695A6',
										}}
									/>
									<CusText
										type={'SECONDARY'}
										text={moment(latePayments.month).format(
											'DD'
										)}
										style={{ fontSize: 20, color: '#FFF' }}
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
												text={latePayments.total}
												style={{
													fontSize: 20,
													color: '#FFF',
												}}
											/>
										</VStack>
									</HStack>
								</VStack>
							</HStack>
						</Box>
					)}

					{Object.keys(upcomingPayment).length != 0 && (
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
										text={moment(upcomingPayment.month)
											.format('MMM')
											.toString()
											.toUpperCase()}
										style={{
											fontSize: 13,
											color: '#8695A6',
										}}
									/>
									<CusText
										type={'SECONDARY'}
										text={moment(
											upcomingPayment.month
										).format('DD')}
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
												text={upcomingPayment.total}
												style={{ fontSize: 20 }}
											/>
										</VStack>
									</HStack>
								</VStack>
							</HStack>
						</Box>
					)}

					<Box
						alignItems='flex-start'
						w={'100%'}
					>
						<HStack
							justifyContent={'space-between'}
							justifyItem={'space-between'}
							alignItems={'center'}
							w={'100%'}
						>
							<CusText
								type={'SECONDARY'}
								text={'Breakdown'}
								style={{ fontSize: 13 }}
							/>
							<Button
								variant={'link'}
								size={'xs'}
								onPress={() => setShowDet(true)}
							>
								<CusText
									type={'PRIMARY'}
									text={'View All >'}
									style={{ fontSize: 13 }}
								/>
							</Button>
						</HStack>

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
								<CusText
									type={'SECONDARY'}
									text={`₱ ${
										contractPrice.includes('.')
											? contractPrice
											: `${contractPrice}.00`
									}`}
									style={{
										fontSize: 15,
									}}
								/>
							</HStack>
							<Divider
								orientation={'horizontal'}
								bgColor={'$yellow100'}
							/>

							<HStack
								justifyContent={'space-between'}
								w={'100%'}
								mt={12}
							>
								<CusText
									type={'TERTIARY'}
									text={'Deduction/s'}
									style={{
										fontSize: 15,
									}}
								/>
							</HStack>
							<Divider
								orientation={'horizontal'}
								bgColor={'$yellow100'}
							/>
							{dsc.map((name, ind) => (
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
												text={name.name}
												style={{
													fontSize: 13,
													textAlign: 'left',
												}}
											/>
											<CusText
												type={'SECONDARY'}
												text={`₱ ${new Intl.NumberFormat(
													'en-US',
													{
														maximumFractionDigits: 2,
														minimumFractionDigits: 2,
													}
												).format(name.amount)}`}
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
								bgColor={'$blue100'}
							>
								<CusText
									type={'TERTIARY'}
									text={'Total Deductions'}
									style={{
										fontSize: 13,
										textAlign: 'left',
									}}
								/>
								<CusText
									type={'TERTIARY'}
									text={`₱ ${
										ttlDsc.includes('.')
											? ttlDsc
											: `${ttlDsc}.00`
									}`}
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
									text={'Addition/s'}
									style={{
										fontSize: 15,
									}}
								/>
							</HStack>
							<Divider
								orientation={'horizontal'}
								bgColor={'$yellow100'}
							/>

							<Box
								w={'100%'}
								bgColor={'$white200'}
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
											text={`VAT ${vat}%`}
											style={{
												fontSize: 13,
												textAlign: 'left',
											}}
										/>
										<CusText
											type={'SECONDARY'}
											text={`₱ ${
												compVat.includes('.')
													? compVat
													: `${compVat}.00`
											}`}
											style={{ fontSize: 13 }}
										/>
									</HStack>
								</HStack>
							</Box>

							<HStack
								justifyContent={'space-between'}
								w={'100%'}
								alignItems={'center'}
								p={10}
								bgColor={'$blue100'}
							>
								<CusText
									type={'TERTIARY'}
									text={'Total Additions'}
									style={{
										fontSize: 13,
										textAlign: 'left',
									}}
								/>
								<CusText
									type={'TERTIARY'}
									text={`₱ ${
										compVat.includes('.')
											? compVat
											: `${compVat}.00`
									}`}
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
									text={`Other Charges (${otherChargePercent}% of TCP)`}
									style={{
										fontSize: 15,
									}}
								/>
								<CusText
									type={'SECONDARY'}
									text={`₱ ${new Intl.NumberFormat('en-US', {
										maximumFractionDigits: 2,
										minimumFractionDigits: 2,
									}).format(totalCharge)}`}
									style={{
										fontSize: 15,
									}}
								/>
							</HStack>
							<Divider
								orientation={'horizontal'}
								bgColor={'$yellow100'}
							/>
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
										text={'Total Contract Price'}
										style={{
											fontSize: 15,
										}}
									/>
									<CusText
										type={'TERTIARY'}
										text={`₱ ${new Intl.NumberFormat(
											'en-US',
											{
												maximumFractionDigits: 2,
												minimumFractionDigits: 2,
											}
										).format(totalCP)}`}
										style={{ fontSize: 15 }}
									/>
								</HStack>
							</Box>
							<Box
								w={'100%'}
								bgColor={'$blue200'}
								p={10}
							>
								<HStack
									justifyContent={'space-between'}
									w={'100%'}
								>
									<CusText
										type={'TERTIARY'}
										text={'Total Other Charges'}
										style={{
											fontSize: 15,
										}}
									/>
									<CusText
										type={'TERTIARY'}
										text={`₱ ${new Intl.NumberFormat(
											'en-US',
											{
												maximumFractionDigits: 2,
												minimumFractionDigits: 2,
											}
										).format(totalCharge)}`}
										style={{ fontSize: 15 }}
									/>
								</HStack>
							</Box>
						</VStack>
					</Box>

					<Box
						alignItems='flex-start'
						w={'100%'}
					>
						<CusText
							type={'SECONDARY'}
							text={'Payment Term'}
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
							<Box
								w={'100%'}
								bgColor={'$white200'}
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
											text={`Payment of Unit \n(${monthlyPercent}% of TCP)`}
											style={{
												fontSize: 13,
												textAlign: 'left',
											}}
										/>
										<CusText
											type={'SECONDARY'}
											text={`₱ ${new Intl.NumberFormat(
												'en-US',
												{
													maximumFractionDigits: 2,
													minimumFractionDigits: 2,
												}
											).format(perWithTCP)}`}
											style={{ fontSize: 13 }}
										/>
									</HStack>
								</HStack>
							</Box>
							<Box
								w={'100%'}
								bgColor={'$white200'}
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
											text={`Reservation Fee`}
											style={{
												fontSize: 13,
												textAlign: 'left',
											}}
										/>
										<CusText
											type={'SECONDARY'}
											text={`- ₱ ${
												reservation
													.toString()
													.includes('.')
													? reservation
													: `${reservation}.00`
											}`}
											style={{ fontSize: 13 }}
										/>
									</HStack>
								</HStack>
							</Box>
							<HStack
								justifyContent={'space-between'}
								w={'100%'}
								alignItems={'center'}
								p={10}
								bgColor={'$blue100'}
							>
								<CusText
									type={'TERTIARY'}
									text={`Total Payment of Unit in \n${noOfMonths} Months`}
									style={{
										fontSize: 13,
										textAlign: 'left',
									}}
								/>
								<CusText
									type={'TERTIARY'}
									text={`₱ ${new Intl.NumberFormat('en-US', {
										maximumFractionDigits: 2,
										minimumFractionDigits: 2,
									}).format(totalPayInMon)}`}
									style={{ fontSize: 13 }}
								/>
							</HStack>
							<Box
								w={'100%'}
								bgColor={'$white200'}
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
											text={`Payment of Other Charges \n(${monthlyPercent}% of TCP)`}
											style={{
												fontSize: 13,
												textAlign: 'left',
											}}
										/>
										<CusText
											type={'SECONDARY'}
											text={`₱ ${new Intl.NumberFormat(
												'en-US',
												{
													maximumFractionDigits: 2,
													minimumFractionDigits: 2,
												}
											).format(perWithOthers)}`}
											style={{ fontSize: 13 }}
										/>
									</HStack>
								</HStack>
							</Box>
							<HStack
								justifyContent={'space-between'}
								w={'100%'}
								alignItems={'center'}
								p={10}
								bgColor={'$blue100'}
							>
								<CusText
									type={'TERTIARY'}
									text={`Total Payment of Other\n Charges in ${noOfMonths} Months`}
									style={{
										fontSize: 13,
										textAlign: 'left',
									}}
								/>
								<CusText
									type={'TERTIARY'}
									text={`₱ ${new Intl.NumberFormat('en-US', {
										maximumFractionDigits: 2,
										minimumFractionDigits: 2,
									}).format(perWithOthers)}`}
									style={{ fontSize: 13 }}
								/>
							</HStack>
						</VStack>
					</Box>

					<Box
						alignItems='flex-start'
						w={'100%'}
					>
						<CusText
							type={'SECONDARY'}
							text={'Remaining'}
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
							mb={90}
						>
							<HStack
								justifyContent={'space-between'}
								w={'100%'}
								mt={12}
							>
								<CusText
									type={'TERTIARY'}
									text={`Unit Balance`}
									style={{
										fontSize: 15,
									}}
								/>
								<CusText
									type={'SECONDARY'}
									text={`₱ ${remainUnit}`}
									style={{
										fontSize: 15,
									}}
								/>
							</HStack>
							<Divider
								orientation={'horizontal'}
								bgColor={'$yellow100'}
							/>
							<HStack
								justifyContent={'space-between'}
								w={'100%'}
								mt={12}
							>
								<CusText
									type={'TERTIARY'}
									text={`Other Balance`}
									style={{
										fontSize: 15,
									}}
								/>
								<CusText
									type={'SECONDARY'}
									text={`₱ ${remainOthers}`}
									style={{
										fontSize: 15,
									}}
								/>
							</HStack>
							<Divider
								orientation={'horizontal'}
								bgColor={'$yellow100'}
							/>
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
										text={'Total Remaining\n Balance'}
										style={{
											fontSize: 15,
										}}
									/>
									<CusText
										type={'TERTIARY'}
										text={`₱ ${totalRemain}`}
										style={{ fontSize: 15 }}
									/>
								</HStack>
							</Box>
						</VStack>
					</Box>
					<ModalView />
				</Box>
			</ScrollView>
		</View>
	);
};

export default PaymentScreen;
