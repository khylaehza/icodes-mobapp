import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
	Box,
	HStack,
	Divider,
	Image,
	VStack,
	Center,
} from '@gluestack-ui/themed';
import CusText from '../components/CusText';
import { useData } from '../../DataContext';

const HomeScreen = () => {
	const insets = useSafeAreaInsets();
	const {
		curUser,
		anncmnts,
		mrequest,
		visitors,
		amenities,
		bookings,
		reports,
	} = useData();

	return (
		<View
			style={{
				flex: 1,
				paddingTop: insets.top,
			}}
		>
			<Box
				p={20}
				m={20}
				alignContent='flex-start'
				justifyContent='flex-start'
			>
				<Center>
					<Image
						style={{
							width: '50%',
							height: '50%',
						}}
						resizeMode={'contain'}
						source={require('../../assets/gifs/agent.gif')}
					/>
				</Center>
				<CusText
					text={`Hi, ${curUser.fName}!`}
					type={'HEADING'}
				/>

				<Box mt={15}>
					<VStack gap={10}>
						<HStack
							justifyContent={'space-between'}
							justifyItem={'space-between'}
							alignItems={'center'}
							w={'100%'}
						>
							<CusText
								type={'SECONDARY'}
								text={'As of oct 6, you have...'}
								style={{ fontSize: 13 }}
							/>
						</HStack>

						<HStack
							gap={5}
							justifyContent='space-between'
							alignItems='center'
							w={'100%'}
						>
							<Box
								bgColor='$blue100'
								w={'60%'}
								p={20}
								rounded={15}
							>
								<CusText
									text={'0 '}
									type={'HEADNO'}
								/>
								<CusText
									text={'Announcements'}
									type={'TERTIARY'}
								/>
							</Box>
							<Box
								bgColor='$blue100'
								w={'40%'}
								p={20}
								rounded={15}
							>
								<CusText
									text={'1'}
									type={'HEADNO'}
								/>
								<CusText
									text={'Request'}
									type={'TERTIARY'}
								/>
							</Box>
						</HStack>

						<HStack
							gap={5}
							justifyContent='space-between'
							alignItems='center'
						>
							<Box
								bgColor='$blue100'
								w={'45%'}
								p={20}
								rounded={15}
							>
								<CusText
									text={'3 '}
									type={'HEADNO'}
								/>
								<CusText
									text={'Bookings'}
									type={'TERTIARY'}
								/>
							</Box>
							<Box
								bgColor='$blue100'
								w={'55%'}
								p={20}
								rounded={15}
							>
								<CusText
									text={'5'}
									type={'HEADNO'}
								/>
								<CusText
									text={'Visitors'}
									type={'TERTIARY'}
								/>
							</Box>
						</HStack>
					</VStack>
				</Box>
			</Box>
		</View>
	);
};

export default HomeScreen;
