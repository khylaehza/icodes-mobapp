import {
	Avatar,
	Center,
	Box,
	HStack,
	AvatarFallbackText,
	Image,
	VStack,
	Divider,
	Button,
	AvatarImage,
} from '@gluestack-ui/themed';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CusText from '../components/CusText';
import {
	Octicons,
	MaterialCommunityIcons,
	MaterialIcons,
	Ionicons,
	Feather,
	AntDesign,
} from '@expo/vector-icons';
import { useData } from '../../DataContext';
const ProfileScreen = ({ navigation }) => {
	const insets = useSafeAreaInsets();
	const { curUser } = useData();

	const items = [
		{
			name: 'Profile',
			icon: (
				<AntDesign
					name='profile'
					size={24}
					color='black'
				/>
			),
			description: 'This shows your personal information.',
			action: 'OwnerInfo',
		},
		{
			name: 'Units',
			icon: (
				<Octicons
					name='home'
					size={24}
					color='black'
				/>
			),
			description: 'You owned 1 condo unit.',
			action: 'UnitInfo',
		},
		{
			name: 'Files',
			icon: (
				<MaterialCommunityIcons
					name='file-document-multiple-outline'
					size={24}
					color='black'
				/>
			),
			description: 'You have submitted 15 documents.',
			action: 'FilesInfo',
		},
	];
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
				h={220}
				mt={50}
			>
				<VStack
					space='sm'
					justifyContent='center'
					alignItems='center'
				>
					<Avatar size='2xl'>
						<AvatarImage
							source={{ uri: curUser.unOwnerImg }}
							resizeMode='contain'
							size='500px'
						/>
					</Avatar>

					<CusText
						type={'HEADING'}
						text={`${curUser.fName}${curUser.mName} ${curUser.lName}`}
						style={{ fontSize: 24 }}
					/>

					<CusText
						type={'PRIMARY'}
						text={`Owner_${curUser.uid}`}
						style={{ marginTop: -8 }}
					/>
				</VStack>
			</Center>
			<VStack gap={10}>
				{items.map((item, key) => (
					<Box
						bgColor='$blue100'
						rounded={15}
						hardShadow={4}
						shadowColor='$blue200'
						alignItems='center'
						justifyContent='space-between'
						p={20}
						key={key}
					>
						<HStack
							justifyContent={'space-between'}
							w={'100%'}
							alignItems={'center'}
							p={10}
						>
							<Box w={'15%'}>{item.icon}</Box>
							<HStack
								justifyContent={'space-between'}
								w={'85%'}
								alignItems='center'
							>
								<VStack gap={-2}>
									<CusText
										type={'TERTIARY'}
										text={item.name}
										style={{
											fontSize: 18,
											textAlign: 'left',
										}}
									/>
									<CusText
										type={'PRIMARY'}
										text={item.description}
										style={{
											fontSize: 12,
											textAlign: 'left',
										}}
									/>
								</VStack>

								<Button
									variant='link'
									onPress={() => {
										navigation.navigate(item.action, {
											params: 'name',
										});
									}}
								>
									<Ionicons
										name='chevron-forward'
										size={24}
										color='black'
									/>
								</Button>
							</HStack>
						</HStack>
					</Box>
				))}

				<Divider mt={5} />

				<Box
					rounded={15}
					alignItems='center'
					justifyContent='space-between'
				>
					<HStack
						w={'100%'}
						alignItems={'center'}
					>
						<Box w={'15%'}>
							<Ionicons
								name='information-circle-outline'
								size={24}
								color='black'
							/>
						</Box>

						<CusText
							type={'TERTIARY'}
							text={'Terms & Conditions'}
							style={{
								fontSize: 15,
								textAlign: 'left',
							}}
						/>
					</HStack>
				</Box>

				<Box
					rounded={15}
					alignItems='center'
					justifyContent='space-between'
					p={10}
				>
					<Button
						onPress={() => navigation.navigate('Login')}
						variant='link'
					>
						<HStack
							// justifyContent={'space-between'}
							w={'100%'}
							alignItems={'center'}
						>
							<Box
								w={'15%'}
								ml={-5}
							>
								<Feather
									name='log-out'
									size={20}
									color='black'
								/>
							</Box>

							<CusText
								type={'TERTIARY'}
								text={'Logout'}
								style={{
									fontSize: 15,
									textAlign: 'left',
								}}
							/>
						</HStack>
					</Button>
				</Box>
			</VStack>
		</View>
	);
};

export default ProfileScreen;
