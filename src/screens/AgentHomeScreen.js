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

const AgentHomeScreen = ({ curUser }) => {
	const insets = useSafeAreaInsets();

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
								text={'As of oct 6, you have...'}
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
								text={'Manning at SM Grand Central.'}
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
								text={'3 '}
								type={'HEADNO'}
							/>
							<CusText
								text={'Prospective Buyers'}
								type={'TERTIARY'}
							/>
						</HStack>
						<HStack
							bgColor='$blue100'
							w={'100%'}
							p={20}
							rounded={15}
							alignItems='center'
							gap={8}
						>
							<CusText
								text={'5'}
								type={'HEADNO'}
							/>
							<CusText
								text={'Announcements'}
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
