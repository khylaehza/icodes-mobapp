import {
	Center,
	VStack,
	Avatar,
	Image,
	Box,
	HStack,
	Button,
	Divider,
	AvatarImage,
} from '@gluestack-ui/themed';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CusText from '../components/CusText';
import CusPager from '../components/CusPager';
import DateChecker from '../utilities/DateChecker';
const UnitInfo = ({ navigation, curUser, unitInfo }) => {
	const insets = useSafeAreaInsets();

	let dInfo = [];
	unitInfo.map((data) => {
		if (data.Units && curUser.Units) {
			if (data.Units.toString().includes(curUser.Units.toString())) {
				dInfo.push({
					image: [data.LayoutImage, ...data.TypeImage],
					type: data.TypeName,
					size: data.UnitSize,
				});
			}
		}
	});

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
				mb={30}
			>
				<ScrollView showsVerticalScrollIndicator={false}>
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
							text={'Unit Information'}
						/>
					</Box>

					<Box
						padding={15}
						rounded={15}
						bgColor='#FFF'
						gap={2}
						hardShadow={4}
						shadowColor='$blue200'
						w={'100%'}
						mt={10}
					>
						<HStack
							pr={5}
							pl={5}
							alignItems='center'
						>
							<CusText
								type={'SECONDARY'}
								style={{
									textAlign: 'left',
									fontSize: 13,
									marginRight: 10,
								}}
								text={'Tower: '}
							/>
							<CusText
								type={'PRIMARY'}
								style={{ textAlign: 'left', fontSize: 13 }}
								text={curUser.TName}
							/>
						</HStack>
					</Box>
					<Box
						padding={15}
						rounded={15}
						bgColor='#FFF'
						gap={2}
						hardShadow={4}
						shadowColor='$blue200'
						w={'100%'}
						mt={10}
					>
						<HStack
							pr={5}
							pl={5}
							alignItems='center'
						>
							<CusText
								type={'SECONDARY'}
								style={{
									textAlign: 'left',
									fontSize: 13,
									marginRight: 10,
								}}
								text={'Unit Name: '}
							/>
							<CusText
								type={'PRIMARY'}
								style={{ textAlign: 'left', fontSize: 13 }}
								text={curUser.Units}
							/>
						</HStack>
					</Box>
					{/* <CusPager item={} /> */}
					{dInfo.map((data) => {
						return (
							<>
								<Box
									padding={15}
									rounded={15}
									bgColor='#FFF'
									gap={2}
									hardShadow={4}
									shadowColor='$blue200'
									w={'100%'}
									mt={10}
								>
									<CusPager item={data.image} />
								</Box>

								<Box
									padding={15}
									rounded={15}
									bgColor='#FFF'
									gap={2}
									hardShadow={4}
									shadowColor='$blue200'
									w={'100%'}
									mt={10}
								>
									<HStack
										pr={5}
										pl={5}
										alignItems='center'
									>
										<CusText
											type={'SECONDARY'}
											style={{
												textAlign: 'left',
												fontSize: 13,
												marginRight: 10,
											}}
											text={'Unit Type: '}
										/>
										<CusText
											type={'PRIMARY'}
											style={{
												textAlign: 'left',
												fontSize: 13,
											}}
											text={data.type}
										/>
									</HStack>
								</Box>
								<Box
									padding={15}
									rounded={15}
									bgColor='#FFF'
									gap={2}
									hardShadow={4}
									shadowColor='$blue200'
									w={'100%'}
									mt={10}
								>
									<HStack
										pr={5}
										pl={5}
										alignItems='center'
									>
										<CusText
											type={'SECONDARY'}
											style={{
												textAlign: 'left',
												fontSize: 13,
												marginRight: 10,
											}}
											text={'Unit Size: '}
										/>
										<CusText
											type={'PRIMARY'}
											style={{
												textAlign: 'left',
												fontSize: 13,
											}}
											text={data.size}
										/>
									</HStack>
								</Box>
							</>
						);
					})}
				</ScrollView>
			</Center>
		</View>
	);
};

export default UnitInfo;
