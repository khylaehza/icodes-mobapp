import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Center, Box, Button, Image } from '@gluestack-ui/themed';
import { View, ScrollView } from 'react-native';
import Header from '../layouts/Header';
import CusText from '../components/CusText';
import CusPager from '../components/CusPager';

const DesignerScreen = ({
	navigation,
	unitInfo,
	setUnitChosen,
	setUnitSize,
}) => {
	const insets = useSafeAreaInsets();

	const units = [
		{
			name: 'Studio (ST)',
			size: '20 sq. meters',
			layout: 'https://i.imgur.com/HBF8Opw.jpg',
		},
		{
			name: '1 Bedroom (1BR)',
			size: '30 sq. meters',
			layout: 'https://i.imgur.com/Erd4T0x.jpg',
		},
		{
			name: '2 Bedrooms (2BR)',
			size: '52 sq. meters',
			layout: 'https://i.imgur.com/xwU22bs.jpg',
		},
		{
			name: '2 Bedrooms Bigcut (2BR)',
			size: '70 sq. meters',
			layout: 'https://i.imgur.com/E5J3zmi.jpg',
		},
		{
			name: '3 Bedrooms (3BR)',
			size: '79 sq. meters',
			layout: 'https://i.imgur.com/oqE08wS.jpg',
		},
	];

	let unitFiltered = [];

	if (unitInfo) {
		unitInfo.filter((info) => {
			if (
				units.filter(
					(stat) =>
						info.TypeName === stat.name &&
						`${info.UnitSize} sq. meters` === stat.size
				).length > 0
			) {
				unitFiltered.push({
					name: info.TypeName,
					size: `${info.UnitSize} sq. meters`,
					layout: [info.LayoutImage, ...info.TypeImage],
				});
			}
		});
	}

	const unique = unitFiltered.filter((obj, index) => {
		return (
			index ===
			unitFiltered.findIndex(
				(o) => obj.name === o.name && obj.size === o.size
			)
		);
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
				h={270}
				mb={-50}
			>
				<Header
					img={require('../../assets/gifs/designer.gif')}
					title={'Unit Viewer'}
					description={
						'Let your prospective buyers interactively view the units.'
					}
				/>
			</Center>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Center
					mb={80}
					w={'100%'}
				>
					{/* <View
						w={'100%'}
						bgColor='blue'
					> */}
					{unique ? (
						<>
							{unique.map((unit, key) => (
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
									key={key}
									w={'100%'}
								>
									<Box
										p={5}
										alignItems='center'
										gap={10}
									>
										<CusText
											type={'TERTIARY'}
											text={unit.name}
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
											text={unit.size}
										/>

										<CusPager
											item={unit.layout}
											height={300}
										/>

										<Button
											variant='default'
											justifyContent='center'
											size='sm'
											w={'100%'}
											bgColor='$blue300'
											onPress={() => {
												setUnitChosen(unit.name);
												setUnitSize(unit.size);
												navigation.navigate(
													'Interactive'
												);
											}}
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
							))}
						</>
					) : (
						<>
							{units.map((unit, key) => (
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
									key={key}
									w={'100%'}
								>
									<Box
										p={5}
										alignItems='center'
										gap={10}
									>
										<CusText
											type={'TERTIARY'}
											text={unit.name}
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
											text={unit.size}
										/>

										<Image
											size='lg'
											height={150}
											rounded={5}
											source={{
												uri: unit.layout,
											}}
										/>
										<Button
											variant='default'
											justifyContent='center'
											size='sm'
											w={'100%'}
											bgColor='$blue300'
											onPress={() => {
												setUnitChosen(unit.name);
												navigation.navigate(
													'Interactive'
												);
											}}
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
							))}
						</>
					)}
					{/* </View> */}
				</Center>
			</ScrollView>
		</View>
	);
};

export default DesignerScreen;
