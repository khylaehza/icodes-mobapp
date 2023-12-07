import {
	Center,
	VStack,
	Avatar,
	Image,
	Box,
	HStack,
	Button,
	AvatarImage,
} from '@gluestack-ui/themed';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CusText from '../components/CusText';
const FilesInfo = ({ navigation, curUser }) => {
	const insets = useSafeAreaInsets();

	console.log(curUser);
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
							source={{
								uri: curUser.UnOwnerImg,
							}}
							resizeMode='contain'
							size='500px'
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
				<ScrollView
					showsVerticalScrollIndicator={false}
					style={{ width: '100%' }}
				>
					<Box
						gap={20}
						w={'100%'}
						mb={290}
						mt={10}
					>
						<Box
							padding={15}
							rounded={15}
							bgColor='#FFF'
							hardShadow={4}
							shadowColor='$blue200'
							w={'100%'}
						>
							<Image
								source={{ uri: curUser.Billing }}
								resizeMode='contain'
								size='xl'
								w={'100%'}
							/>
						</Box>

						<Box
							padding={15}
							rounded={15}
							bgColor='#FFF'
							hardShadow={4}
							shadowColor='$blue200'
							w={'100%'}
						>
							<Image
								source={{ uri: curUser.Cert }}
								resizeMode='contain'
								size='xl'
								w={'100%'}
							/>
						</Box>

						<Box
							padding={15}
							rounded={15}
							bgColor='#FFF'
							hardShadow={4}
							shadowColor='$blue200'
							w={'100%'}
						>
							<Image
								source={{ uri: curUser.Tin }}
								resizeMode='contain'
								size='xl'
								w={'100%'}
							/>
						</Box>

						<Box
							padding={15}
							rounded={15}
							bgColor='#FFF'
							hardShadow={4}
							shadowColor='$blue200'
							w={'100%'}
						>
							<Image
								source={{ uri: curUser.Id1 }}
								resizeMode='contain'
								size='xl'
								w={'100%'}
							/>
						</Box>

						<Box
							padding={15}
							rounded={15}
							bgColor='#FFF'
							hardShadow={4}
							shadowColor='$blue200'
							w={'100%'}
						>
							<Image
								source={{ uri: curUser.Id2 }}
								resizeMode='contain'
								size='xl'
								w={'100%'}
							/>
						</Box>

						<Box
							padding={15}
							rounded={15}
							bgColor='#FFF'
							hardShadow={4}
							shadowColor='$blue200'
							w={'100%'}
						>
							<Image
								source={{ uri: curUser.Income }}
								resizeMode='contain'
								size='xl'
								w={'100%'}
							/>
						</Box>
					</Box>
				</ScrollView>
			</Center>
		</View>
	);
};

export default FilesInfo;
