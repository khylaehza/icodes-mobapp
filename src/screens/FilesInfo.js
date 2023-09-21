import {
	Center,
	VStack,
	Avatar,
	Image,
	Box,
	HStack,
	Button,
} from '@gluestack-ui/themed';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CusText from '../components/CusText';
const FilesInfo = ({ navigation }) => {
	const insets = useSafeAreaInsets();

	const info = [
		{ name: 'Last Name', data: 'Hondrade' },
		{ name: 'Middle Name', data: 'Hondrade' },
		{ name: 'Given Name', data: 'Hondrade' },
		{ name: 'Unit Owner No.', data: 'Hondrade' },
		{ name: 'Surname', data: 'Hondrade' },
		{ name: 'Surname', data: 'Hondrade' },
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
						{/* <AvatarFallbackText>John Doe</AvatarFallbackText> */}
						<Image
							source={require('../../assets/gifs/avatar.gif')}
							resizeMode='contain'
						/>
					</Avatar>

					<CusText
						type={'HEADING'}
						text={'Khyla Ehza Hondrade'}
						style={{ fontSize: 24 }}
					/>

					<CusText
						type={'PRIMARY'}
						text={'Owner_93272'}
						style={{ marginTop: -8 }}
					/>
				</VStack>
				<Box
					bgColor='$blue200'
					rounded={5}
					hardShadow={4}
					shadowColor='$blue200'
					alignItems='center'
					p={10}
					mt={20}
					w={'100%'}
				>
					<CusText
						type={'SECONDARY'}
						text={'Files'}
					/>
				</Box>
			</Center>
		</View>
	);
};

export default FilesInfo;
