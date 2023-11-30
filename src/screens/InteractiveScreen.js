import { View, ScrollView } from 'react-native';
import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import useControls from 'r3f-native-orbitcontrols';
import { useGLTF } from '@react-three/drei/native';
import studio from '../../assets/models/units/studio.glb';
import bedR2 from '../../assets/models/units/br2.glb';
import bedR2Big from '../../assets/models/units/br2Big.glb';
import bedR1 from '../../assets/models/units/br1.glb';
import bedR3 from '../../assets/models/units/br3.glb';
import CusText from '../components/CusText';
import { Center, Box, Button, Image } from '@gluestack-ui/themed';
function StudioModel({ url, ...rest }) {
	const { scene } = useGLTF(url);
	return (
		<primitive
			{...rest}
			object={scene}
		/>
	);
}

function BR1Model({ url, ...rest }) {
	const { scene } = useGLTF(url);
	return (
		<primitive
			{...rest}
			object={scene}
		/>
	);
}

function BR2Model({ url, ...rest }) {
	const { scene } = useGLTF(url);
	return (
		<primitive
			{...rest}
			object={scene}
		/>
	);
}
function BR3Model({ url, ...rest }) {
	const { scene } = useGLTF(url);
	return (
		<primitive
			{...rest}
			object={scene}
		/>
	);
}
function BR2BigModel({ url, ...rest }) {
	const { scene } = useGLTF(url);
	return (
		<primitive
			{...rest}
			object={scene}
		/>
	);
}
const InteractiveScreen = ({
	unitChosen,
	unitInfo,
	amounts,
	unitSize,
	units,
}) => {
	const [OrbitControls, events] = useControls();

	let unitAmt = [];
	unitInfo.map((info) => {
		if (info.TypeName == unitChosen) {
			amounts.map((amt) => {
				const intersection = info.Units.filter((element) =>
					amt.Units.includes(element)
				);
				unitAmt.push({ intersection, amt: amt.TCP });
			});
		}
	});

	const unique = unitAmt.filter((obj, index) => {
		return index === unitAmt.findIndex((o) => obj.amt === o.amt);
	});

	let u = [];
	const length = Object.keys(units).length;

	for (let x = 0; x < length; x++) {
		const i = units[x];

		var sorted = Object.keys(i);

		sorted.map((item, key) => {
			const element = i[item];

			if (Object.values(element).length != 0) {
				const k = Object.values(element);

				if (k) {
					k.sort(function (a, b) {
						var x = a.name.toLowerCase();
						var y = b.name.toLowerCase();
						return x < y ? -1 : x > y ? 1 : 0;
					});
				}

				k.map((e) => {
					if (e.status == 'Available') {
						u.push(e);
					}
				});
			}
		});
	}

	let availUnit = [];
	unique.map((x) => {
		u.map((us) => {
			if (x.intersection.includes(us.name)) {
				availUnit.push({ name: us.name, amount: x.amt });
			}
		});
	});

	return (
		<View
			{...events}
			style={{ flex: 1, height: '100%', backgroundColor: '#F9EEDA' }}
		>
			<View style={{ height: '60%', backgroundColor: '#F9EEDA' }}>
				<Canvas
					camera={{
						position: [0, 190, 0],
						fov: 8,
					}}
				>
					<ambientLight />
					<directionalLight />
					<Suspense>
						<StudioModel
							url={studio}
							scale={unitChosen == 'Studio (ST)' ? 1.5 : 0}
						/>
						<BR1Model
							url={bedR1}
							scale={unitChosen == '1 Bedroom (1BR)' ? 1.5 : 0}
						/>
						<BR2Model
							url={bedR2}
							scale={unitChosen == '2 Bedrooms (2BR)' ? 1.5 : 0}
						/>
						<BR3Model
							url={bedR3}
							scale={unitChosen == '3 Bedrooms (3BR)' ? 1.5 : 0}
						/>
						<BR2BigModel
							url={bedR2Big}
							scale={
								unitChosen == '2 Bedrooms Bigcut (2BR)'
									? 1.5
									: 0
							}
						/>
					</Suspense>
					<OrbitControls maxPolarAngle={Math.PI / 2} />
				</Canvas>
			</View>
			<View
				style={{
					height: '40%',
				}}
			>
				<ScrollView>
					<Center h={'100%'}>
						<Box
							p={5}
							alignItems='center'
							gap={10}
						>
							<CusText
								type={'TERTIARY'}
								text={unitChosen}
								style={{
									textTransform: 'uppercase',
								}}
							/>

							<CusText
								type={'PRIMARY'}
								style={{
									textAlign: 'justify',
									fontSize: 12,
									marginTop: -12,
								}}
								text={unitSize}
							/>

							<CusText
								type={'SECONDARY'}
								style={{
									textAlign: 'center',
									fontSize: 12,
								}}
								text={'Available Units'}
							/>
							{availUnit.map((u, key) => (
								<Box key={key}>
									<CusText
										type={'SECONDARY'}
										style={{
											textAlign: 'left',
											fontSize: 12,
										}}
										text={`${u.name} - ₱ ${
											u.amount.includes('.')
												? u.amount
												: `${u.amount}.00`
										}`}
									/>
								</Box>
							))}
						</Box>
					</Center>
				</ScrollView>
			</View>
		</View>
	);
};

export default InteractiveScreen;
