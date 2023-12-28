import { Input, InputField } from '@gluestack-ui/themed';
const CusInputClear = ({
	placeholder,
	h = 35,
	isReadOnly,
	w,
	setInput,
	input,
}) => {
	return (
		<Input
			variant='outline'
			size='xl'
			h={h}
			isDisabled={isReadOnly}
			isInvalid={false}
			// isReadOnly={isReadOnly}
			w={w}
			bgColor='$white300'
		>
			<InputField
				placeholder='0'
				style={{
					fontFamily: 'Sora_300Light',
					color: '#000',
					textAlign: 'right',
				}}
				onChangeText={(val) => {
					let num = val.replace(/\D/g, '');
					setInput(num);
				}}
				value={new Intl.NumberFormat('en-US').format(input)}
				type='number'
				keyboardType={'number-pad'}
			/>
		</Input>
	);
};

export default CusInputClear;
