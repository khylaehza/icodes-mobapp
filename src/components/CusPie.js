import { PieChart } from 'react-native-gifted-charts';
import { Box, Text } from '@gluestack-ui/themed';
import CusText from './CusText';
// import * as Svg from 'react-native-svg';
const CusPie = () => {
	const pieData = [
		{ value: 70, color: '#EEE' },
		{ value: 30, color: '#8695A6' },
	];
	return (
		<Box
			justifyContent='center'
			justifyItems='center'
			mt={5}
		>
			<PieChart
				donut
				data={pieData}
				centerLabelComponent={() => {
					return (
						<CusText
							text={'70% PAID'}
							type={'PRIMARY'}
							style={{
								fontSize: 12,
								color: '#D0D0D0',
							}}
						/>
					);
				}}
				radius={35}
				innerRadius={26}
				innerCircleColor={'#0A2542'}
			/>
		</Box>
	);
};

export default CusPie;
