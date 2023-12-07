import {
	View,
	Box,
	HStack,
	Divider,
	VStack,
	Center,
} from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../layouts/Header';
import { ScrollView } from 'react-native';
import CusText from '../components/CusText';
import CusSelectClear from '../components/CusSelectClear';
import CusInputClear from '../components/CusInputClear';
import { useState } from 'react';
const CalculatorScreen = ({ navigation, payterm }) => {
	const [type, setType] = useState();
	const [tcp, setTCP] = useState('');

	let term = [];
	payterm.filter((pay) => {
		term.push({
			name: pay.PaymentTermName,
			monthPercent: pay.MonthlyPercent,
			months: pay.NoOfMonths,
			rsvd: pay.ReservationFee,
		});
	});
	const insets = useSafeAreaInsets();

	const current = term.filter((term) => {
		return type == term.name ? term : [] > 0;
	});
	let cur = { ...current };
	let divide = cur[0] ? parseFloat(cur[0]['monthPercent']) / 100 : 0;
	let percent = cur[0] ? parseFloat(cur[0]['monthPercent']) : 0;
	let timePer = cur ? Number(tcp.replace(',', '')) * divide : 0;
	let reservation = cur[0] ? Number(cur[0]['rsvd'].replace(',', '')) : 0;
	let less = tcp && cur[0] ? Number(timePer) - reservation : 0;
	let mon = cur[0] ? Number(cur[0]['months']) : 0;
	let payMonthly = tcp ? less / mon : 0;
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
				h={260}
				mb={-60}
			>
				<Header
					img={require('../../assets/gifs/calculator.gif')}
					title={'Calculator'}
					description={
						"Calculate the unit's monthly payment by selecting payment term."
					}
				/>
			</Center>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Box
					ml={20}
					mr={20}
					gap={17}
					mb={40}
				>
					<CusSelectClear
						item={term}
						placeholder={'Payment Term'}
						setType={setType}
						type={type}
					/>
					<CusText
						text={'Contract Price'}
						type={'SECONDARY'}
						style={{
							textAlign: 'right',
							marginBottom: -18,
							fontSize: 12,
						}}
					/>
					<CusInputClear
						h={50}
						size={30}
						setInput={setTCP}
						input={tcp ? tcp : ''}
					/>
					<CusText
						text={`Downpayment Percent (${percent}%)`}
						type={'SECONDARY'}
						style={{
							textAlign: 'right',
							marginBottom: -18,
							fontSize: 12,
						}}
					/>

					<Box
						justifyContent='flex-end'
						flexDirection='row'
						alignContent='center'
						alignItems='center'
						gap={20}
					>
						<CusText
							text={'×'}
							type={'SECONDARY'}
						/>

						<CusInputClear
							w={85}
							isReadOnly={true}
							input={divide.toString()}
						/>
					</Box>
					<Divider />
					<CusText
						text={
							timePer
								? `${new Intl.NumberFormat('en-US', {
										maximumFractionDigits: 2,
										minimumFractionDigits: 2,
								  }).format(timePer)}`
								: '0'
						}
						type={'PRIMARY'}
						style={{
							fontFamily: 'Sora_300Light',
							fontSize: 20,
							color: '#000',
							textAlign: 'right',
							marginBottom: -15,
						}}
					/>
					<CusText
						text={`Reservation Fee`}
						type={'SECONDARY'}
						style={{
							textAlign: 'right',
							marginBottom: -18,
							fontSize: 12,
						}}
					/>
					<Box
						justifyContent='flex-end'
						flexDirection='row'
						alignContent='center'
						alignItems='center'
						gap={20}
					>
						<CusText
							text={'-'}
							type={'SECONDARY'}
						/>
						<CusInputClear
							w={150}
							isReadOnly={true}
							input={reservation.toString()}
						/>
					</Box>
					<Divider />
					<CusText
						text={
							less
								? `${new Intl.NumberFormat('en-US', {
										maximumFractionDigits: 2,
										minimumFractionDigits: 2,
								  }).format(less)}`
								: '0.00'
						}
						type={'PRIMARY'}
						style={{
							fontFamily: 'Sora_300Light',
							fontSize: 20,
							color: '#000',
							textAlign: 'right',
							marginBottom: -15,
						}}
					/>
					<CusText
						text={`Months`}
						type={'SECONDARY'}
						style={{
							textAlign: 'right',
							marginBottom: -18,
							fontSize: 12,
						}}
					/>
					<Box
						justifyContent='flex-end'
						flexDirection='row'
						alignContent='center'
						alignItems='center'
						gap={20}
					>
						<CusText
							text={'÷'}
							type={'SECONDARY'}
						/>
						<CusInputClear
							w={85}
							isReadOnly={true}
							input={mon.toString()}
						/>
					</Box>
					<Divider />
					<CusText
						text={`Total Contract Price`}
						type={'SECONDARY'}
						style={{
							textAlign: 'right',

							fontSize: 12,
						}}
					/>
					<Box
						bgColor='$blue100'
						p={20}
						mt={-10}
						rounded={5}
						softShadow='4'
					>
						<CusText
							text={
								payMonthly
									? `₱${new Intl.NumberFormat('en-US', {
											maximumFractionDigits: 2,
											minimumFractionDigits: 2,
									  }).format(payMonthly)}`
									: '0.00'
							}
							type={'TERTIARY'}
							style={{
								fontSize: 20,
								color: '#000',
								textAlign: 'right',
							}}
						/>
					</Box>
				</Box>
			</ScrollView>
		</View>
	);
};

export default CalculatorScreen;
