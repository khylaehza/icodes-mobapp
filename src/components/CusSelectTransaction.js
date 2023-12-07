import {
	Select,
	SelectTrigger,
	SelectInput,
	SelectPortal,
	SelectBackdrop,
	SelectContent,
	SelectItem,
	SelectIcon,
	SelectDragIndicatorWrapper,
	SelectDragIndicator,
	HStack,
} from '@gluestack-ui/themed';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView, View } from 'react-native';

const CusSelectTransaction = ({ icon, placeholder, item, type, setType }) => {
	return (
		<HStack
			justifyContent='space-between'
			alignItems='center'
		>
			{icon}
			<Select
				onValueChange={(val) => setType(val)}
				selectedValue={type}
				w={250}
				ml={10}
			>
				<SelectTrigger variant='underlined'>
					<SelectInput
						placeholder={placeholder}
						style={{
							fontFamily: 'Sora_300Light',
							fontSize: 15,
							color: '#000',
						}}
					/>
					<SelectIcon mr='$3'>
						<AntDesign
							name='down'
							size={15}
							color='black'
						/>
					</SelectIcon>
				</SelectTrigger>
				<SelectPortal>
					<SelectBackdrop />
					<SelectContent
						h={500}
						w={'100%'}
					>
						<SelectDragIndicatorWrapper>
							<SelectDragIndicator />
						</SelectDragIndicatorWrapper>

						<ScrollView
							showsVerticalScrollIndicator={false}
							style={{ width: '100%' }}
						>
							{item.map((label, key) => (
								<SelectItem
									label={label}
									value={label}
									key={key}
								/>
							))}
						</ScrollView>
					</SelectContent>
				</SelectPortal>
			</Select>
		</HStack>
	);
};

export default CusSelectTransaction;
