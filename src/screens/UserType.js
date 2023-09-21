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
import CusText from '../components/CusText';

const UserType = ({ navigation }) => {
	const insets = useSafeAreaInsets();
	return (
		<View
			style={{
				flex: 1,
				paddingTop: insets.top,
				padding: 20,
				backgroundColor: '#0A2542',
			}}
		>
			<Center
				p={20}
				m={20}
				gap={20}
				justifyItems='center'
				alignItems='center'
				justifyContent='center'
				alignContent='center'
				flex={1}
				bgColor='$blue300'
			>
				<CusText
					type={'HEADING'}
					text={'Login As: '}
					style={{ color: '#FFF' }}
				/>

				<Button
					rounded={15}
					bgColor='$white300'
					borderWidth={1}
					borderColor='$blue100'
					hardShadow='4'
					shadowColor='$blue300'
					w={200}
					h={200}
					onPress={() => navigation.navigate('OwnerLog')}
				>
					<VStack
						alignItems='center'
						gap={10}
					>
						<Image
							source={require('../../assets/imgs/ownership.png')}
							borderTopLeftRadius={15}
							borderTopRightRadius={15}
							objectFit='center'
							size='xl'
						/>
						<CusText
							type={'TERTIARY'}
							text={'Unit Owner'}
						/>
					</VStack>
				</Button>
				<Button
					rounded={15}
					bgColor='$white300'
					borderWidth={1}
					borderColor='$blue100'
					hardShadow='4'
					shadowColor='$blue300'
					w={200}
					h={200}
				>
					<VStack
						alignItems='center'
						gap={10}
					>
						<Image
							source={require('../../assets/imgs/agent.png')}
							borderTopLeftRadius={15}
							borderTopRightRadius={15}
							objectFit='contain'
							size='xl'
						/>
						<CusText
							type={'TERTIARY'}
							text={'Agent'}
						/>
					</VStack>
				</Button>
			</Center>
		</View>
	);
};

export default UserType;
