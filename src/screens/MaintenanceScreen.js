import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
	Center,
	Box,
	HStack,
	Pressable,
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

const MaintenanceScreen = () => {
	const insets = useSafeAreaInsets();

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

	const location = ['Unit 1013', 'Exterior', 'Unit 5422'];
	const [loc, setLocation] = useState('');
	const [type, setType] = useState('');
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

	const ModalBody = () => {
		return (
			<>
				<VStack gap={10}>
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
					<CusTextArea
						placeholder={'State the problem here...'}
						icon={
							<Ionicons
								name='menu-outline'
								size={22}
								color='#0A2542'
							/>
						}
					/>
					<CusInput
						label={'Type'}
						icon={
							<Ionicons
								name='md-pricetag'
								size={18}
								color='#0A2542'
							/>
						}
						type={type}
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
							serv={serv}
							key={key}
							location={location}
							value={loc}
							setValue={setLocation}
							type={type}
							setType={setType}
							header={'CREATE A REQUEST'}
							handleSubmit={handleSubmit}
							onAdd={onAdd}
							reset={reset}
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
									ref={ref}
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
								pr={5}
								pl={5}
								justifyContent='space-between'
								alignItems='center'
							>
								<CusText
									type={'SECONDARY'}
									text={'Ticket #2132323'}
									style={{ textAlign: 'left' }}
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
							<HStack
								pr={5}
								pl={5}
								justifyContent='space-between'
								alignItems='center'
							>
								<CusText
									type={'SECONDARY'}
									text={'Ticket #2132323'}
									style={{ textAlign: 'left' }}
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
					))}
				</Box>
			</ScrollView>
		</View>
	);
};

export default MaintenanceScreen;
