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

const ProfileScreen = ({ navigation, curUser }) => {
	const insets = useSafeAreaInsets();

	const other = [
		{
			name: 'Reports & Feedback',
			icon: (
				<Octicons
					name='report'
					size={18}
					color='black'
				/>
			),
			nav: 'Reports',
		},
		{
			name: 'Terms & Conditions',
			icon: (
				<Ionicons
					name='information-circle-outline'
					size={22}
					color='black'
				/>
			),
			nav: '',
		},
		{
			name: 'Logout',
			icon: (
				<Feather
					name='log-out'
					size={19}
					color='black'
				/>
			),
			nav: 'Login',
		},
	];
	const items = [
		{
			name: 'My Information',
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
			name: 'My Unit',
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
			name: 'My Files',
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
										navigation.navigate(item.action);
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
				<VStack>
					{other.map((item, okey) => (
						<Button
							onPress={() => navigation.navigate(item.nav)}
							variant='link'
							key={okey}
						>
							<HStack
								justifyContent={'flex-start'}
								w={'100%'}
								alignItems={'center'}
							>
								<Box
									w={'10%'}
									alignItems='center'
									mr={10}
								>
									{item.icon}
								</Box>

								<Box w={'80%'}>
									<CusText
										type={'TERTIARY'}
										text={item.name}
										style={{
											fontSize: 15,
											textAlign: 'left',
										}}
									/>
								</Box>
							</HStack>
						</Button>
					))}
				</VStack>
			</VStack>
		</View>
	);
};

export default ProfileScreen;
