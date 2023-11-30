import { PieChart } from 'react-native-gifted-charts';
import { View, Text } from '@gluestack-ui/themed';
import CusText from './CusText';
import { ScrollView } from 'react-native';
const CussDssPie = ({ render = false, points }) => {
	const pieData = [
		{
			value: 10,
			color: '#b7c6d6',
			text: 'Large ',
		},
		{ value: 10, color: '#8da6c2', text: 'Small' },
		{ value: 10, color: '#547599', text: 'High-Level ' },
		{ value: 10, color: '#264b73', text: 'Low-Level ' },
		{ value: 10, color: '#12375e', text: 'Mid-Level ' },
	];

	const renderDot = (color) => {
		return (
			<View
				style={{
					height: 10,
					width: 10,
					borderRadius: 5,
					backgroundColor: color,
					marginRight: 10,
				}}
			/>
		);
	};

	const renderLegendComponent = () => {
		const val = [
			{ name: 'Large Rooms: ', value: 10 },
			{ name: 'Small Rooms: ', value: 10 },
			{ name: 'High-Level Floors: ', value: 10 },
			{ name: 'Low-Level Floors: ', value: 10 },
			{ name: 'Mid-Level Floors: ', value: 10 },
		];

		return (
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'flex-start',
					gap: 20,
				}}
			>
				{points.map((v) => (
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={true}
					>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'flex-start',
								marginBottom: 10,
							}}
							ml={10}
							mr={10}
						>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									// width: 120,
									// marginRight: 20,
								}}
							>
								{renderDot('#006DFF')}
								<CusText
									type={'SECONDARY'}
									text={`${v.text}: `}
									style={{
										textTransform: 'uppercase',
									}}
								/>
								<CusText
									type={'SECONDARY'}
									text={v.value}
									style={{
										textTransform: 'uppercase',
									}}
								/>
							</View>
						</View>
					</ScrollView>
				))}
			</View>
		);
	};

	return (
		<View>
			<View
				style={{
					padding: 20,
					alignItems: 'center',
					marginLeft: 25,
				}}
			>
				<PieChart
					data={points ? points : pieData}
					showText
					donut
					textColor='white'
					radius={130}
					textSize={12}
					innerCircleBorderWidth={2}
					focusOnPress
					centerLabelComponent={() => {
						return (
							<View
								style={{
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<CusText
									type={'SECONDARY'}
									text={'Unit Finder'}
									style={{
										textTransform: 'uppercase',
									}}
								/>
							</View>
						);
					}}
				/>
			</View>
			{render && renderLegendComponent()}
		</View>
	);
};

export default CussDssPie;
