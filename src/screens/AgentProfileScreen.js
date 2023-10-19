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
const AgentProfileScreen = ({ curUser, navigation }) => {
	const insets = useSafeAreaInsets();

	console.log(curUser);
	const other = [
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
				mt={50}
			>
				<VStack
					space='sm'
					justifyContent='center'
					alignItems='center'
				>
					<Avatar size='2xl'>
						<AvatarImage
							source={{ uri: curUser.image }}
							resizeMode='contain'
							size='500px'
						/>
					</Avatar>

					<CusText
						type={'HEADING'}
						text={`${curUser.fName} ${curUser.mName} ${curUser.lName}`}
						style={{ fontSize: 24 }}
					/>

					<CusText
						type={'PRIMARY'}
						text={curUser.uName}
						style={{ marginTop: -8 }}
					/>
					<CusText
						type={'PRIMARY'}
						text={`${curUser.email}.com`}
						style={{ marginTop: -8 }}
					/>
					<CusText
						type={'PRIMARY'}
						text={`Agent Since ${curUser.dStart}`}
						style={{ marginTop: -8 }}
					/>
					<CusText
						type={'PRIMARY'}
						text={`Team ${curUser.team}`}
						style={{ marginTop: -8 }}
					/>
				</VStack>
			</Center>
			<VStack gap={10}>
				<Divider />
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

export default AgentProfileScreen;
