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
					let parts = val.split('.');
					let v = parts[0].replace(/\D/g, '');
					let dec = parts[1];
					Number(dec !== undefined ? v + '.' + dec : v);
					let n = new Intl.NumberFormat('en-US').format(v);
					n = dec !== undefined ? n + '.' + dec : n;
					setInput(n);
				}}
				value={input}
				type='number'
				keyboardType={'number-pad'}
			/>
		</Input>
	);
};

export default CusInputClear;
