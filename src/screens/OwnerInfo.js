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
import DateChecker from '../utilities/DateChecker';
const OwnerInfo = ({ curUser }) => {
	const insets = useSafeAreaInsets();

	const date = curUser.createdDate ? curUser.createdDate.seconds * 1000 : '';

	const info = [
		{ name: 'Last Name', data: curUser.lName },
		{ name: 'Middle Name', data: curUser.mName },
		{ name: 'Given Name', data: curUser.fName },
		{ name: 'Unit Owner No.', data: curUser.uid },
		{
			name: 'Unit Owner Since',
			data: <DateChecker dateToCheck={new Date(date)} />,
		},
		{ name: 'Email', data: curUser.email },
		{ name: 'Contact Number', data: curUser.cNum },
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
						<AvatarImage
							source={{ uri: curUser.unOwnerImg }}
							resizeMode='contain'
							size='500px'
						/>
					</Avatar>

					<CusText
						type={'HEADING'}
						text={`${curUser.fName}${curUser.mName} ${curUser.lName}`}
						style={{ fontSize: 24 }}
					/>

					<CusText
						type={'PRIMARY'}
						text={`Owner_${curUser.uid}`}
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
						text={'Personal Information'}
					/>
				</Box>
				{info.map((data, key) => (
					<Box
						padding={15}
						rounded={15}
						bgColor='#FFF'
						gap={2}
						hardShadow={4}
						shadowColor='$blue200'
						w={'100%'}
						mt={10}
						key={key}
					>
						<HStack
							pr={5}
							pl={5}
							alignItems='center'
						>
							<CusText
								type={'SECONDARY'}
								text={`${data.name}: `}
								style={{
									textAlign: 'left',
									fontSize: 13,
									marginRight: 10,
								}}
							/>

							<CusText
								type={'PRIMARY'}
								text={data.data}
								style={{ textAlign: 'left', fontSize: 13 }}
							/>
						</HStack>
					</Box>
				))}
			</Center>
		</View>
	);
};

export default OwnerInfo;
