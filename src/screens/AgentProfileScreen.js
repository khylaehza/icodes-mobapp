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
const AgentProfileScreen = ({ curUser, navigation, Logout }) => {
	const insets = useSafeAreaInsets();

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
			func: () => {
				navigation.navigate('');
			},
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

			func: () => {
				Logout(navigation);
			},
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
				// alignContent='flex-start'
				// justifyContent='flex-start'
				mt={50}
			>
				<VStack
					space='sm'
					justifyContent='center'
					alignItems='center'
				>
					<Avatar size='2xl'>
						<AvatarImage
							source={{ uri: curUser.Image }}
							resizeMode='contain'
							size='500px'
						/>
					</Avatar>

					<CusText
						type={'HEADING'}
						text={`${curUser.FName} ${curUser.MName} ${curUser.LName}`}
						style={{ fontSize: 24, textAlign: 'center' }}
					/>

					<CusText
						type={'PRIMARY'}
						text={curUser.UName}
						style={{ marginTop: -8 }}
					/>
					<CusText
						type={'PRIMARY'}
						text={`${curUser.Email}.com`}
						style={{ marginTop: -8 }}
					/>
					<CusText
						type={'PRIMARY'}
						text={`Agent Since ${curUser.DStart}`}
						style={{ marginTop: -8 }}
					/>
					<CusText
						type={'PRIMARY'}
						text={`Team ${curUser.Team}`}
						style={{ marginTop: -8 }}
					/>
				</VStack>
			</Center>
			<VStack gap={10}>
				<Divider />
				<VStack>
					{other.map((item, okey) => (
						<Button
							onPress={item.func}
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
