import CusDssPie from '../components/CusDssPie';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Center, Box, Button, Image } from '@gluestack-ui/themed';
import { View, ScrollView } from 'react-native';
import Header from '../layouts/Header';
import CusText from '../components/CusText';

const FinderScreen = ({ navigation }) => {
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
					img={require('../../assets/gifs/finder.gif')}
					title={'Unit Finder'}
					description={
						'Let your prospective buyers assess their suitable units.'
					}
				/>
			</Center>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Center
					mb={180}
					mt={40}
					w={'100%'}
				>
					<CusDssPie />
					<Button
						variant='default'
						justifyContent='center'
						// size='sm'
						mt={20}
						w={'80%'}
						bgColor='$blue300'
						onPress={() => {
							navigation.navigate('Questions');
						}}
					>
						<CusText
							type={'SECONDARY'}
							text={'PROCEED'}
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

export default FinderScreen;
