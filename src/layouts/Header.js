import { Box, Image } from '@gluestack-ui/themed';

import CusText from '../components/CusText';
const Header = ({ img, title, description }) => {
	return (
		<>
			<Image
				style={{
					width: '50%',
					height: '40%',
				}}
				resizeMode={'contain'}
				source={img}
			/>

			<CusText
				type={'HEADING'}
				text={title}
			/>

			<CusText
				type={'PRIMARY'}
				text={description}
			/>
		</>
	);
};

export default Header;
