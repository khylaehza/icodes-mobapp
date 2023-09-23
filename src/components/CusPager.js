import PagerView from 'react-native-pager-view';
import React from 'react';
import { Image } from '@gluestack-ui/themed';
import { StyleSheet, View, Text } from 'react-native';
import CusText from './CusText';
const CusPager = ({ item }) => {
	return (
		<PagerView
			style={{
				height: 150,
				alignItems: 'center',
				width: '100%',
				justifyContent: 'center',
			}}
			initialPage={0}
		>
			{item.map((element, key) => (
				<Image
					source={{ uri: element }}
					height={150}
					rounded={5}
					w={220}
					objectFit='contain'
					key={key}
					alignSelf='center'
				/>
			))}
		</PagerView>
	);
};

export default CusPager;
