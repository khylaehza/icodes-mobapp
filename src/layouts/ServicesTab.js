import { View, StyleSheet, Pressable } from 'react-native';
import { AnimatePresence, MotiView } from 'moti';

import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { Image, VStack } from '@gluestack-ui/themed';
import CusText from '../components/CusText';

export default function ServicesTab({ navigate, expanded, setExpanded }) {
	return (
		<View style={{ position: 'relative', alignItems: 'center' }}>
			<Pressable
				onPress={() => {
					setExpanded(!expanded);
				}}
				style={[
					styles.button,
					// { backgroundColor: expanded ? '#2F4EB2' : '#10243E' },
				]}
			>
				<MotiView
					style={{ position: 'relative', zIndex: 5 }}
					animate={{
						scale: expanded ? 1.7 : 1.5,
						rotate: expanded ? '225deg' : '0deg',
					}}
					transition={{
						duration: 10,
						type: 'timing',
					}}
				>
					<FontAwesome5
						name='plus'
						size={14}
						color='#FFC739'
					/>
				</MotiView>
			</Pressable>
			<AnimatePresence>
				{expanded && (
					<View
						style={{
							backgroundColor: '#000',
							bottom: 0,
							right: 0,
						}}
					>
						{actions.map((action, i) => (
							<ActionButton
								key={i.toString()}
								action={action}
								index={i}
								navigate={navigate}
								setExpanded={setExpanded}
								expanded={expanded}
							/>
						))}
					</View>
				)}
			</AnimatePresence>
		</View>
	);
}

function ActionButton({ action, index, navigate, setExpanded, expanded }) {
	return (
		<MotiView
			transition={{ delay: 0, damping: 15, mass: 1 }}
			from={{
				opacity: 0,
				translateY: 0,
			}}
			animate={{
				opacity: 1,
				translateY: -85 * (index + 0.7),
			}}
			exit={{
				opacity: 0,
				translateY: 0,
			}}
		>
			<Pressable
				onPress={() => {
					setExpanded(false);
					// expanded ? navigate(action.location) : console.log('ame');
					navigate(action.location);
				}}
				style={[
					styles.button,
					{
						backgroundColor: action.color,
						shadowColor: action.color,
						borderColor: action.border,
						marginLeft: -7,
						// marginLeft: -38,
						// marginTop: -85,
					},
				]}
			>
				<Image
					style={{
						width: '50%',
						height: '40%',
					}}
					resizeMode={'center'}
					source={action.img}
				/>
				<CusText
					text={action.location}
					type={'PRIMARY'}
					style={{ color: action.fColor, fontSize: 8.5 }}
				/>
			</Pressable>
		</MotiView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#111',
		padding: 8,
	},

	button: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 77,
		height: 77,
		borderRadius: 36,
		backgroundColor: '#0A2542',
		position: 'absolute',
		marginTop: -60,
		shadowColor: '#000',
		shadowRadius: 50,
		zIndex: 5,
		shadowOffset: { height: 20 },
		shadowOpacity: 1,
		borderWidth: 5,
		borderColor: '#F5F5F5',
	},
});

const actions = [
	{
		location: 'Maintenance',
		color: '#3f4c6e',
		emoji: '👨🏻‍🚒',
		border: '#0A2542',
		img: require('../../assets/imgs/maintenance.png'),
		fColor: '#FFF',
	},
	{
		location: 'Visitors',
		color: '#7e879e',
		emoji: '📸',
		border: '#3f4c6e',
		img: require('../../assets/imgs/id-card.png'),
		fColor: '#F5F5F5',
	},

	{
		location: 'Amenities',
		color: '#bdc2cd',
		emoji: '🌊',
		border: '#7e879e',
		img: require('../../assets/imgs/booking.png'),
		fColor: '#0A2542',
	},
	{
		location: 'Transactions',
		color: '#dee3f0',
		emoji: '🌊',
		border: '#bdc2cd',
		img: require('../../assets/imgs/payment.png'),
		fColor: '#081d33',
	},
];
