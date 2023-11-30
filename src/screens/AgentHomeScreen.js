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

const AgentHomeScreen = ({ curUser, manningSched, pBuyers }) => {
	const insets = useSafeAreaInsets();
	const today = new Date();
	const currentSched = {};
	manningSched
		.filter((data) => data.Team == curUser.Team)
		.map((data) => {
			const date = new Date(data.SchedDate);

			if (moment(date).format('LL') == moment(today).format('LL')) {
				currentSched['Location'] = data.Location;
			}
		});

	const pb = pBuyers.filter((data) => data.AgentID == curUser.EmpId);

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
							height: '55%',
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

						<Box
							bgColor='$blue100'
							w={'100%'}
							p={20}
							rounded={15}
						>
							<CusText
								text={
									currentSched.Location
										? `Manning at ${currentSched.Location}.`
										: 'No Manning Schedule.'
								}
								type={'TERTIARY'}
							/>
						</Box>

						<HStack
							bgColor='$blue100'
							w={'100%'}
							p={20}
							rounded={15}
							alignItems='center'
							gap={8}
						>
							<CusText
								text={pb.length}
								type={'HEADNO'}
							/>
							<CusText
								text={'Prospective Buyers'}
								type={'TERTIARY'}
							/>
						</HStack>
					</VStack>
				</Box>
			</Box>
		</View>
	);
};

export default AgentHomeScreen;
