import { View, Text } from 'react-native';
import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import useControls from 'r3f-native-orbitcontrols';
import { Grid } from '../layouts/Grid';
import Models from '../layouts/Models';
function Studio1(props) {
	const material = useLoader(
		MTLLoader,
		require('../../assets/models/units/studio1.mtl')
	);

	const obj = useLoader(
		OBJLoader,
		require('../../assets/models/units/studio1.obj'),
		(loader) => {
			material.preload();
			loader.setMaterials(material);
		}
	);

	const mesh = useRef();

	return (
		<mesh
			ref={mesh}
			// rotation={[0.7, 0, 0]}
		>
			<primitive
				object={obj}
				scale={0.2}
			/>
		</mesh>
	);
}

const InteractiveScreen = () => {
	const [OrbitControls, events] = useControls();
	return (
		<View
			{...events}
			style={{ flex: 1 }}
		>
			<Text>sasa</Text>
			<Canvas camera={{ fov: 15, position: [-10, 45, 20] }}>
				<ambientLight />
				{/* <pointLight position={[10, 10, 10]} /> */}

				<Suspense fallback={null}>
					{/* <Studio1 /> */}
					<mesh
						rotation={[-Math.PI / 2, 0, 0]}
						position-y={-2}
					>
						<planeGeometry args={[10, 10]} />
					</mesh>

					<group position={[0, 0, 0]}>
						<Grid>
							<Models child={<Studio1 />} />
						</Grid>
					</group>
				</Suspense>
				<OrbitControls maxPolarAngle={2} />
			</Canvas>
		</View>
	);
};

export default InteractiveScreen;
