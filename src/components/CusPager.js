import PagerView from 'react-native-pager-view';
import React from 'react';
import { Image } from '@gluestack-ui/themed';
import { StyleSheet, View, Text } from 'react-native';
import CusText from './CusText';
const CusPager = ({ item, height = 150 }) => {
	return (
		<PagerView
			style={{
				height: height,
				alignItems: 'center',
				width: '100%',
				justifyContent: 'center',
			}}
			initialPage={0}
		>
			{item.map((element, key) => (
				<Image
					source={{ uri: element }}
					height={'200px'}
					rounded={5}
					// w={220}
					objectFit='contain'
					key={key}
					alignSelf='center'
					w={'100%'}
				/>
			))}
		</PagerView>
	);
};

export default CusPager;
