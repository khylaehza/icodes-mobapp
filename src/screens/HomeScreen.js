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

import moment from 'moment';
const HomeScreen = ({ curUser, anncmnts, mrequest, visitors, bookings }) => {
	const insets = useSafeAreaInsets();
	const today = new Date();
	var annc = anncmnts.filter((element) => {
		if (curUser.Tower) {
			return element.For.includes(curUser.Tower) && element.Status;
		}
	});

	var mrq = mrequest.filter((element) => {
		return curUser.Units === element.Unit && element.Status != 'Completed';
	});

	var book = bookings.filter((element) => {
		return `${curUser.FName} ${curUser.LName}` === element.UnitOwner;
	});

	var vstr = visitors.filter((element) => {
		return curUser.Units === element.Unit && element.Status != 'Completed';
	});

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
					text={`Hi, ${curUser.FName}!`}
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
								text={`As of ${moment(today).format(
									'MMM DD'
								)}, you have...`}
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
									text={annc.length}
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
									text={mrq.length}
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
									text={book.length}
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
									text={vstr.length}
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
