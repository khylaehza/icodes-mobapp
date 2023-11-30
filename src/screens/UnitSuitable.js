import CusDssPie from '../components/CusDssPie';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
	Center,
	Box,
	Button,
	Image,
	VStack,
	HStack,
} from '@gluestack-ui/themed';
import { View, ScrollView } from 'react-native';
import Header from '../layouts/Header';
import CusText from '../components/CusText';
import CusPager from '../components/CusPager';
const UnitSuitable = ({
	navigation,
	dssResult,
	pref,
	units,
	unitTypes,
	unitData,
	towers,
	amenities,
}) => {
	const insets = useSafeAreaInsets();

	const res = dssResult;

	let unitPrefMatch = [];
	let unitPrefWithAmountMatch = [];
	let unitPrefWithAmenity = [];
	let unitPrefWithFamSize = [];
	const length = Object.keys(units).length;

	for (let x = 0; x < length; x++) {
		const i = units[x];

		var sorted = Object.keys(i);

		sorted.map((item) => {
			const element = i[item];

			if (Object.values(element).length != 0) {
				const k = Object.values(element);

				if (k) {
					k.sort(function (a, b) {
						var x = a.name.toLowerCase();
						var y = b.name.toLowerCase();
						return x < y ? -1 : x > y ? 1 : 0;
					});
				}

				k.map((e) => {
					if (
						e.status == 'Available' &&
						e.category[1] == pref[0] &&
						e.category[2] == pref[1]
					) {
						unitPrefMatch.push(e);
						if (
							parseFloat(res.minVal.replace(/,/g, '')) <
								parseFloat(e.tcp.replace(/,/g, '')) &&
							parseFloat(res.maxVal.replace(/,/g, '')) >=
								parseFloat(e.tcp.replace(/,/g, ''))
						) {
							unitPrefWithAmountMatch.push(e);
						}

						res.amenities.map((rx) => {
							if (
								rx.slice(rx.length - 3, -1) ==
								e.name.substring(0, 2) > 0
							) {
								unitPrefWithAmenity.push(e);
							}
						});

						unitTypes.map((item) => {
							if (
								parseInt(res.number) <=
								parseInt(item.TypeMax).length >
								0
							) {
								unitPrefWithFamSize.push(e);
							}
						});
					}
				});
			}
		});
	}

	let unitPrefWithAmtAme = [];
	if (unitPrefWithAmountMatch && unitPrefWithAmenity) {
		unitPrefWithAmountMatch.map((amt) => {
			if (
				unitPrefWithAmenity.filter((am) => am.name === amt.name)
					.length > 0
			) {
				unitPrefWithAmtAme.push(amt);
			}
		});
	}

	let unitPrefWithAmtSize = [];
	if (unitPrefWithAmountMatch && unitPrefWithFamSize) {
		unitPrefWithAmountMatch.map((amt) => {
			if (
				unitPrefWithFamSize.filter((sz) => sz.name === amt.name)
					.length > 0
			) {
				unitPrefWithAmtSize.push(amt);
			}
		});
	}

	let unitPrefWithAmeSize = [];
	if (unitPrefWithAmenity && unitPrefWithFamSize) {
		unitPrefWithAmenity.map((am) => {
			if (
				unitPrefWithFamSize.filter((sz) => sz.name === am.name).length >
				0
			) {
				unitPrefWithAmeSize.push(am);
			}
		});
	}

	let unitPrefWithAmtAmeSize = [];
	if (unitPrefWithAmtAme && unitPrefWithFamSize) {
		unitPrefWithAmtAme.map((aa) => {
			if (
				unitPrefWithFamSize.filter((sz) => sz.name === aa.name).length >
				0
			) {
				unitPrefWithAmtAmeSize.push(aa);
			}
		});
	}

	let bestUnit = [];
	if (unitPrefWithAmtAmeSize.length > 0) {
		bestUnit.push({
			units: unitPrefWithAmtAmeSize,
			stat: 'all',
			msg: `This unit aligns with your preferences, including living in ${pref[0]} and ${pref[1]}. It also accommodates your desired amenity and family capacity, while the amount falls within the specified budget range, making it a suitable and financially feasible option for consideration.`,
		});
	} else if (unitPrefWithAmtAme.length > 0) {
		bestUnit.push({
			units: unitPrefWithAmtAme,
			stat: 'amt and ame',
			msg: `This unit aligns with your preferences, including living in ${pref[0]} and ${pref[1]}. It also accommodates your desired amenity and the amount falls within the specified budget range, making it a suitable and financially feasible option for consideration.`,
		});
	} else if (unitPrefWithAmtSize.length > 0) {
		bestUnit.push({
			units: unitPrefWithAmtSize,
			stat: 'amt and size',
			msg: `This unit aligns with your preferences, including living in ${pref[0]} and ${pref[1]}. It also accommodates your family capacity and the amount falls within the specified budget range, making it a suitable and financially feasible option for consideration.`,
		});
	} else if (unitPrefWithAmeSize.length > 0) {
		bestUnit.push({
			units: unitPrefWithAmeSize,
			stat: 'ame and size',
			msg: `This unit aligns with your preferences, including living in ${pref[0]} and ${pref[1]}. It also accommodates your desired amenity and family capacity, making it a suitable option for consideration.`,
		});
	} else if (unitPrefWithAmountMatch.length > 0) {
		bestUnit.push({
			units: unitPrefWithAmountMatch,
			stat: 'amt',
			msg: `This unit aligns with your preferences, including living in ${pref[0]} and ${pref[1]}. It also falls within the specified budget range, making it a suitable and financially feasible option for consideration.`,
		});
	} else if (unitPrefWithAmenity.length > 0) {
		bestUnit.push({
			units: unitPrefWithAmenity,
			stat: 'ame',
			msg: `This unit aligns with your preferences, including living in ${pref[0]} and ${pref[1]}. It also accommodates your desired amenity, making it a suitable option for consideration.`,
		});
	} else if (unitPrefWithFamSize.length > 0) {
		bestUnit.push({
			units: unitPrefWithFamSize,
			stat: 'ame',
			msg: `This unit aligns with your preferences, including living in ${pref[0]} and ${pref[1]}. It also accommodates your family capacity, making it a suitable option for consideration.`,
		});
	} else if (unitPrefMatch.length > 0) {
		bestUnit.push({
			units: unitPrefMatch,
			stat: 'pref',
			msg: `This unit aligns with your preferences, including living in ${pref[0]} and ${pref[1]}, making it a suitable option for consideration.`,
		});
	} else {
		bestUnit.push({ units: [], stat: 'no match' });
	}

	const unitDataGen = (num) => {
		let unitDataList = [];

		unitData.filter((data) => {
			if (data.Units && bestUnit[0]['units'][num]) {
				if (data.Units.includes(bestUnit[0]['units'][num]['name'])) {
					unitDataList = {
						'Unit Type': data.TypeName,
						'Unit Size': `${data.UnitSize} sq. meters`,
						Images: [...[data.LayoutImage], ...data.TypeImage],
						'Tower No':
							bestUnit[0]['units'][num]['tower'].substring(1),
						'Floor No': bestUnit[0]['units'][num]['floor'],
						'Unit No': bestUnit[0]['units'][num]['no'],
						'Contract Price': `₱${bestUnit[0]['units'][num]['tcp']}`,
						'Unit Name': bestUnit[0]['units'][num]['name'],
					};

					if (unitTypes) {
						unitTypes.filter((sz) => {
							if (
								`${sz.TypeName} (${sz.TypeCode})` ===
								data.TypeName
							) {
								unitDataList = {
									...unitDataList,
									'People Capacity': sz.TypeMax,
								};
							}
						});
					}
				}
			}
		});

		if (towers && bestUnit[0]['units'][num]) {
			towers.map((tow) => {
				if (
					tow.TowerNum ==
					bestUnit[0]['units'][num]['tower'].substring(1)
				) {
					unitDataList = {
						...unitDataList,
						'Tower Status': tow.Status,
					};
				}

				if (amenities) {
					let amenity = [];
					amenities.filter((ame) => {
						if (ame.TNum === tow.TowerName) {
							amenity.push(
								ame.AmenityName.substring(
									ame.AmenityName.length - 5,
									-1
								)
							);
						}
					});
					unitDataList = {
						...unitDataList,
						Amenities: amenity.join(', '),
					};
				}
			});
		}

		return unitDataList;
	};

	const firstBox = [
		{ 'Tower No ': unitDataGen(0)['Tower No'] },
		{ 'Floor No ': unitDataGen(0)['Floor No'] },
		{ 'Unit No ': unitDataGen(0)['Unit No'] },
	];

	const secondBox = [
		{ 'Unit Type ': unitDataGen(0)['Unit Type'] },
		{ 'Unit Size ': unitDataGen(0)['Unit Size'] },
	];

	const thirdBox = [
		{ 'People Capacity ': unitDataGen(0)['People Capacity'] },
		{ 'Status ': unitDataGen(0)['Tower Status'] },
	];

	const fourthBox = [
		{ 'Amenities ': unitDataGen(0)['Amenities'] },
		{ 'Contract Price ': unitDataGen(0)['Contract Price'] },
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
				p={10}
				m={10}
				alignContent='flex-start'
				justifyContent='flex-start'
				gap={10}
				mb={50}
			>
				{bestUnit[0]['stat'] == 'no match' ? (
					<>
						<Center
							ml={-20}
							mr={-20}
							pt={20}
							mt={20}
						>
							<CusText
								type={'SECONDARY'}
								text={
									"Your Perspective Buyer's Suitable Unit is:"
								}
								style={{
									textAlign: 'center',
								}}
							/>
						</Center>
					</>
				) : (
					<>
						<ScrollView showsVerticalScrollIndicator={false}>
							<Center
								ml={-20}
								mr={-20}
								pt={20}
								mt={20}
							>
								<CusText
									type={'SECONDARY'}
									text={
										"Your Perspective Buyer's Suitable Unit is:"
									}
									style={{
										textAlign: 'center',
									}}
								/>
							</Center>

							<CusText
								type={'HEADING'}
								text={`${unitDataGen(0)['Unit Name']}`}
								style={{
									textTransform: 'uppercase',
									lineHeight: 35,
									textAlign: 'center',
								}}
							/>
							<VStack
								bgColor='$white300'
								rounded={15}
								hardShadow={4}
								shadowColor='$blue200'
								w={'100%'}
							>
								<Box p={10}>
									<CusPager
										item={unitDataGen(0)['Images']}
										height={300}
									/>
								</Box>
							</VStack>
							<VStack
								// bgColor='$blue100'
								p={15}
							>
								<CusText
									type={'SECONDARY'}
									text={`"${bestUnit[0]['msg']}"`}
									style={{
										textAlign: 'justify',
									}}
								/>
							</VStack>
							<VStack gap={10}>
								<HStack
									gap={20}
									justifyContent='center'
								>
									{firstBox.map((name, key) => (
										<Box
											flexDir={'column'}
											gap={5}
											key={key}
											bgColor='$white300'
											rounded={15}
											hardShadow={4}
											shadowColor='$blue200'
											p={8}
										>
											<CusText
												type={'SECONDARY'}
												text={Object.keys(name)}
											/>
											<CusText
												type={'PRIMARY'}
												text={Object.values(name)}
											/>
										</Box>
									))}
								</HStack>

								<HStack
									gap={20}
									justifyContent='center'
								>
									{secondBox.map((name, key) => (
										<Box
											flexDir={'column'}
											gap={5}
											key={key}
											bgColor='$white300'
											rounded={15}
											hardShadow={4}
											shadowColor='$blue200'
											p={8}
										>
											<CusText
												type={'SECONDARY'}
												text={Object.keys(name)}
											/>
											<CusText
												type={'PRIMARY'}
												text={Object.values(name)}
											/>
										</Box>
									))}
								</HStack>

								<HStack
									gap={20}
									justifyContent='center'
								>
									{thirdBox.map((name, key) => (
										<Box
											flexDir={'column'}
											gap={5}
											key={key}
											bgColor='$white300'
											rounded={15}
											hardShadow={4}
											shadowColor='$blue200'
											p={8}
										>
											<CusText
												type={'SECONDARY'}
												text={Object.keys(name)}
											/>
											<CusText
												type={'PRIMARY'}
												text={Object.values(name)}
											/>
										</Box>
									))}
								</HStack>
								<HStack
									gap={20}
									justifyContent='center'
								>
									{fourthBox.map((name, key) => (
										<Box
											flexDir={'column'}
											gap={5}
											key={key}
											bgColor='$white300'
											rounded={15}
											hardShadow={4}
											shadowColor='$blue200'
											p={8}
										>
											<CusText
												type={'SECONDARY'}
												text={Object.keys(name)}
											/>
											<CusText
												type={'PRIMARY'}
												text={Object.values(name)}
											/>
										</Box>
									))}
								</HStack>
							</VStack>
						</ScrollView>
					</>
				)}
			</Center>
		</View>
	);
};

export default UnitSuitable;
