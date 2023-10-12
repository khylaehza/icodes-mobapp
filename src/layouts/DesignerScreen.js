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

const DesignerScreen = ({ navigation }) => {
	const insets = useSafeAreaInsets();

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
				mb={-50}
			>
				<Header
					img={require('../../assets/gifs/designer.gif')}
					title={'Unit Designer'}
					description={
						'Let your prospective buyers interactively view and design the units.'
					}
				/>
			</Center>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Center mb={80}>
					<View>
						<Box
							ml={20}
							mr={20}
							padding={10}
							rounded={15}
							bgColor='$white300'
							mb={15}
							gap={2}
							hardShadow={5}
							shadowColor='$blue200'
						>
							<Box
								p={5}
								alignItems='center'
								gap={10}
							>
								<CusText
									type={'TERTIARY'}
									text={'STUDIO'}
									style={{
										textTransform: 'uppercase',
									}}
								/>

								<CusText
									type={'PRIMARY'}
									style={{
										textAlign: 'justify',
										fontSize: 12,
										marginTop: -12,
									}}
									text={`25.5 sq.meters `}
								/>

								<Image
									source={require('../../assets/imgs/Conference.jpg')}
									height={150}
									rounded={5}
									objectFit='cover'
								/>

								<Button
									variant='default'
									justifyContent='center'
									size='sm'
									w={'100%'}
									bgColor='$blue300'
									// onPress={() => {
									// 	navigation.navigate('Interactive');
									// }}
								>
									<CusText
										type={'PRIMARY'}
										style={{
											fontSize: 14,
											color: '#FFF',
										}}
										text={'View'}
									/>
								</Button>
							</Box>
						</Box>
					</View>
				</Center>
			</ScrollView>
		</View>
	);
};

export default DesignerScreen;
