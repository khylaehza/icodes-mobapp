import CusDssPie from '../components/CusDssPie';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Center, Box, Button, Image } from '@gluestack-ui/themed';
import { View, ScrollView } from 'react-native';
import Header from '../layouts/Header';
import CusText from '../components/CusText';

const ResultScreen = ({ navigation, dssResult, setPref }) => {
	const insets = useSafeAreaInsets();

	const res = dssResult;

	let flrSize = res.category;
	let largeSize = 0;
	let smallSize = 0;
	let lowFloor = 0;
	let highFloor = 0;
	let midFloor = 0;

	flrSize.filter((item) => {
		switch (item) {
			case 'larger':
				largeSize++;
				break;
			case 'lower':
				lowFloor++;
				break;
			case 'smaller':
				smallSize++;
				break;
			case 'higher':
				highFloor++;
				break;
			case 'medium':
				midFloor++;
				break;
		}
	});

	let flrPref = '';
	let sizePref = '';
	if (largeSize > smallSize) {
		sizePref = 'Large Rooms';
	} else {
		sizePref = 'Small Rooms';
	}

	if (lowFloor > highFloor) {
		flrPref = 'Low-Level Floors';
		if (lowFloor > midFloor) {
			flrPref = 'Low-Level Floors';
		} else {
			flrPref = 'Mid-Level Floors';
		}
	} else if (lowFloor < highFloor) {
		if (highFloor > midFloor) {
			flrPref = 'High-Level Floors';
		} else {
			flrPref = 'Mid-Level Floors';
		}
	} else {
		flrPref = 'Mid-Level Floors';
	}

	const pref = [flrPref, sizePref];

	function retText(pref) {
		const textRef = [pref[0], pref[1]];

		if (
			textRef.includes('High-Level Floors') &&
			textRef.includes('Large Rooms')
		) {
			return 'Your preference is higher floors and large rooms, it suggests that you are someone who enjoys expansive living spaces and the elevated perspective that comes with living on higher floors. You may have a penchant for breathtaking views, a sense of privacy, and a desire to be above the hustle and bustle of the world below. Living on higher floors can offer a sense of tranquility and a feeling of being removed from the noise and commotion of the street. Additionally, your preference for large rooms indicates that you value ample space for various activities, such as entertaining guests, pursuing hobbies, or simply having room to spread out and relax.';
		} else if (
			textRef.includes('High-Level Floors') &&
			textRef.includes('Small Rooms')
		) {
			return 'Your preference is higher floors and small rooms, it suggests that you are someone who values a compact and elevated living experience. Living on higher floors allows you to enjoy a sense of privacy and detachment from the happening on the ground level. It offers a peaceful and secluded environment where you can retreat and find solace. Your preference for small rooms suggests that you prioritize simplicity, functionality, and efficiency in your living space. You may prefer to have a cozy and minimalistic environment that is easy to maintain and organize.';
		} else if (
			textRef.includes('Mid-Level Floors') &&
			textRef.includes('Large Rooms')
		) {
			return 'Your preference is middle floors and large rooms, it suggests that you are someone who enjoys a balance between elevation and spaciousness. middle floors offer a middle ground between higher and lower perspectives, providing you with a decent view without being too distant from the ground. Large rooms accommodate various activities and provide ample space for comfortable living.';
		} else if (
			textRef.includes('Mid-Level Floors') &&
			textRef.includes('Small Rooms')
		) {
			return 'Your preference is middle floors and small rooms, it suggests that you are someone who appreciates a balanced and efficient living space. middle floors offer a moderate perspective while small rooms ensure simplicity and functionality in your living environment. You value practicality and comfort without the need for excessive space.';
		} else if (
			textRef.includes('Low-Level Floors') &&
			textRef.includes('Large Rooms')
		) {
			return 'Your preference is lower floors and large rooms, it suggests that you are someone who finds comfort and enjoyment in spacious living environments closer to the ground. You may appreciate the feeling of being grounded and having a strong sense of stability. Additionally, living on lower floors can provide a sense of security and convenience, allowing easy access to the outdoors or amenities within the condo.';
		} else if (
			textRef.includes('Low-Level Floors') &&
			textRef.includes('Small Rooms')
		) {
			return 'Your preference is lower floors and small rooms, it suggests that you are someone who appreciates a cozy and intimate living environment. You may find comfort in smaller spaces that offer a sense of security and containment. Living on lower floors can provide a grounded feeling and a connection to the immediate surroundings. You may also value the convenience and ease of access that comes from being closer to the ground.';
		} else {
			return 'Unable to determine preferences based on the provided inputs.';
		}
	}

	const resultText = retText(pref);
	const points = [
		{
			text: 'Large',
			value: largeSize,
			color: '#b7c6d6',
		},
		{
			text: 'Small',
			value: smallSize,
			color: '#8da6c2',
		},
		{
			text: 'Low-Level',
			value: lowFloor,
			color: '#264b73',
		},
		{
			text: 'Mid-Level',
			value: midFloor,
			color: '#12375e',
		},
		{
			text: 'High-Level',
			value: highFloor,
			color: '#547599',
		},
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
				h={270}
				mb={-50}
				gap={10}
			>
				<Center
					ml={-20}
					mr={-20}
					pt={20}
					mt={20}
				>
					<CusText
						type={'SECONDARY'}
						text={"Your Perspective Buyer's Unit Preference is:"}
						style={{
							textAlign: 'center',
						}}
					/>
				</Center>

				<CusText
					type={'HEADING'}
					text={`${pref[0]} and ${pref[1]}`}
					style={{
						textTransform: 'uppercase',
						lineHeight: 35,
						textAlign: 'center',
					}}
				/>
			</Center>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Center
					mb={100}
					w={'100%'}
					pl={15}
					pr={15}
				>
					<CusDssPie points={points} />
					<CusText
						type={'PRIMARY'}
						text={`${resultText}`}
						style={{
							textAlign: 'justify',
						}}
					/>
					<Button
						variant='default'
						justifyContent='center'
						// size='sm'
						mt={20}
						w={'80%'}
						bgColor='$blue300'
						onPress={() => {
							setPref(pref);
							navigation.navigate('Suitable');
						}}
					>
						<CusText
							type={'SECONDARY'}
							text={'NEXT'}
							style={{
								textTransform: 'uppercase',
								color: '#FFF',
							}}
						/>
					</Button>
				</Center>
			</ScrollView>
		</View>
	);
};

export default ResultScreen;
