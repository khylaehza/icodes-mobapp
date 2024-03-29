import React, { useState, useEffect } from 'react';

import * as ImagePicker from 'expo-image-picker';
import { Video, ResizeMode } from 'expo-av';
import {
	HStack,
	Box,
	Button,
	Divider,
	Image,
	FormControl,
	FormControlLabel,
} from '@gluestack-ui/themed';
import CusText from './CusText';
import { Controller } from 'react-hook-form';

const MediaViewer = ({ img, required, vid }) => {
	const video = React.useRef(null);
	return (
		<Box
			ml={required ? 50 : 40}
			style={{
				flex: 1,
				flexDirection: 'row',
				flexWrap: 'wrap',
			}}
			gap={20}
		>
			{img.length > 0 &&
				img.map((value, key) => {
					return (
						<Image
							source={{ uri: value }}
							style={{ width: 110, height: 110 }}
							key={key}
						/>
					);
				})}
			{vid.length > 0 &&
				vid.map((value, key) => {
					return (
						<Video
							ref={video}
							source={{
								uri: value,
							}}
							style={{ width: 100, height: 100 }}
							useNativeControls
							resizeMode={ResizeMode.CONTAIN}
							key={key}
						/>
					);
				})}
			<Divider
				w={250}
				ml={-10}
			/>
		</Box>
	);
};

const CusMediaPicker = ({
	control,
	name,
	rules = {},
	icon,
	setImages,
	setVideos,
	img,
	vid,
	text = 'Pick an image or video of the problem.',
	required,
	multiple = true,
}) => {
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: false,
			aspect: [4, 3],
			quality: 1,
			allowsMultipleSelection: multiple,
		});

		if (!result.canceled) {
			const r = result.assets;
			r.map((e, i) => {
				if (e.type == 'image') {
					setImages((prevState) => ({
						images: [...prevState.images, e.uri],
					}));
				} else if (e.type == 'video') {
					setVideos((prevState) => ({
						videos: [...prevState.videos, e.uri],
					}));
				}
			});
		}
	};

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<>
					<FormControl isRequired={required}>
						<HStack
							justifyContent='flex-start'
							alignItems='center'
						>
							<FormControlLabel>{icon}</FormControlLabel>
							<Button
								onPress={pickImage}
								variant='link'
								// w={230}
								w={'90%'}
							>
								<CusText
									type={'PRIMARY'}
									text={text}
									style={{
										color: '#a9a9ac',
										textAlign: 'justify',
									}}
								/>
							</Button>
						</HStack>
					</FormControl>

					<MediaViewer
						img={img}
						vid={vid}
						required={required}
					/>
				</>
			)}
		/>
	);
};

export default CusMediaPicker;
