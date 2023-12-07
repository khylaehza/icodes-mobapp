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
} from '@gluestack-ui/themed';
import { AntDesign } from '@expo/vector-icons';
const CusSelectClear = ({ placeholder, item, type, setType }) => {
	return (
		<Select
			onValueChange={(val) => setType(val)}
			selectedValue={type}
			bgColor='$blue100'
			rounded={5}
			pl={7}
		>
			<SelectTrigger
				variant='outline'
				size='md'
				style={{
					fontFamily: 'Sora_500Medium',
					fontSize: 15,
					color: '#000',
				}}
				borderWidth={0}
			>
				<SelectInput
					placeholder={placeholder}
					style={{
						fontFamily: 'Sora_500Medium',
						fontSize: 15,
						color: '#000',
						alignSelf: 'center',
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
				<SelectContent>
					<SelectDragIndicatorWrapper>
						<SelectDragIndicator />
					</SelectDragIndicatorWrapper>

					{item.map((i, key) => (
						<SelectItem
							label={i.name}
							value={i.name}
							key={key}
						/>
					))}
				</SelectContent>
			</SelectPortal>
		</Select>
	);
};

export default CusSelectClear;
