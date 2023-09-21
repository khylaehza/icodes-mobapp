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

function CusModal({
	header,
	body,
	setShowModal,
	showModal,
	button,
	onAdd,
	handleSubmit,
	reset,
}) {
	return (
		<>
			{button}

			<Modal
				isOpen={showModal}
				onClose={() => {
					setShowModal(false);
					reset();
				}}
			>
				<ModalBackdrop />
				<ModalContent>
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
							variant='outline'
							size='sm'
							action='secondary'
							mr='$3'
							onPress={() => {
								setShowModal(false);
								reset();
							}}
						>
							<CusText
								type={'PRIMARY'}
								text={'Cancel'}
							/>
						</Button>
						<Button
							size='sm'
							action='positive'
							bgColor='$blue300'
							onPress={handleSubmit(onAdd)}
						>
							<CusText
								type={'SECONDARY'}
								text={'Submit'}
								style={{ color: '#FFF' }}
							/>
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default CusModal;
