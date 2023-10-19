import { MathUtils, Color } from 'three';
import { useCallback, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber/native';
import { useDrag } from './Grid';
import { easing } from 'maath';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { useLoader } from '@react-three/fiber/native';
import React from 'react';

const Models = ({
	position = [0.5, -1, -0.5],
	c = new Color(),
	round = Math.round,
	clamp = MathUtils.clamp,
	action,
	rotate,
	child,
	activeKey,
	color,
	xMin = -3.4,
	xMax = 1.7,
	zMin = -1.5,
	zMax = -0.5,
	...props
}) => {
	const ref = useRef();

	const pos = useRef(position);
	const onDrag = useCallback(
		({ x, z }) =>
			(pos.current = [
				clamp(x, xMin, xMax),
				position[1],
				clamp(z, zMin, zMax),
			]),
		[]
	);

	const [events, active, hovered] = useDrag(onDrag);
	// useEffect(
	// 	() =>
	// 		void (document.body.style.cursor = active
	// 			? '-webkit-grabbing'
	// 			: hovered
	// 			? '-webkit-grab'
	// 			: 'auto'),
	// 	[active, hovered]
	// );
	useFrame((state, delta) => {
		easing.damp3(ref.current.position, pos.current, 0.1, delta);
	});

	const clonedElement = React.cloneElement(child, {
		ref: ref,
		events: events,
		props: props,
		action: action,
		color: color,
		rotate: rotate,
	});

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

	// return <>{clonedElement}</>;
	return (
		<mesh
			ref={ref}
			// rotation={[0.7, 0, 0]}
		>
			<primitive
				object={obj}
				scale={0.2}
			/>
		</mesh>
	);
};

export default Models;
