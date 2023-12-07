import {
	Modal,
	ModalBackdrop,
	ModalContent,
	ModalHeader,
	Heading,
	ModalCloseButton,
	ModalFooter,
	ModalBody,
	Button,
} from '@gluestack-ui/themed';
import React from 'react';
import CusText from './CusText';
import { AntDesign } from '@expo/vector-icons';
const CusModalView = ({ header, body, setShowModal, showModal, button, h }) => {
	return (
		<>
			{/* {button} */}

			<Modal
				isOpen={showModal}
				onClose={() => {
					setShowModal(false);
				}}
			>
				<ModalBackdrop />
				<ModalContent h={h}>
					<ModalHeader>
						<CusText
							type={'TERTIARY'}
							text={header}
						/>
						<ModalCloseButton>
							<AntDesign
								name='close'
								size={15}
								color='black'
							/>
						</ModalCloseButton>
					</ModalHeader>
					<ModalBody>{body}</ModalBody>
					<ModalFooter>
						<Button
							size='sm'
							action='positive'
							bgColor='$blue300'
							onPress={() => setShowModal(false)}
						>
							<CusText
								type={'SECONDARY'}
								text={'Done'}
								style={{ color: '#FFF' }}
							/>
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CusModalView;
