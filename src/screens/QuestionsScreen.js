import questions from '../utilities/Questions';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
	Center,
	Box,
	Button,
	Image,
	HStack,
	VStack,
} from '@gluestack-ui/themed';
import { View, ScrollView } from 'react-native';
import { useState } from 'react';
import CusText from '../components/CusText';
import { useForm } from 'react-hook-form';
const QuestionsScreen = ({ amenities, setDssRes, navigation }) => {
	const insets = useSafeAreaInsets();

	const [currentCard, setCurrentCard] = useState(0);
	const [currentStep, setCurrentStep] = useState(0);
	const questionLength = questions.length;

	const [category, setCategory] = useState([]);
	const [ame, setAme] = useState([]);

	const handleNext = () => {
		if (currentCard < questions.length - 1) {
			setCurrentCard((prevCard) => prevCard + 1);
			setCurrentStep((prev) => prev + 1);
		}
	};
	const handlePrevious = () => {
		if (currentCard > 0) {
			setCurrentCard((prevCard) => prevCard - 1);
			setCurrentStep((prev) => prev - 1);
		}
	};

	const isLastCard = currentCard === questions.length - 1;
	const isFirstCard = currentCard === 0;

	let setAnswerVal = [];

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
		// getValues,
		clearErrors,
	} = useForm({
		amenities: '',
		number: 0,
		minVal: 0,
		maxVal: 0,
		category: '',
	});

	const result = (data) => {
		data.amenities = ame;
		data.category = category;

		setDssRes(data);
		navigation.navigate('Result');
	};
	return (
		<View
			style={{
				flex: 1,
				paddingTop: insets.top,
				padding: 20,
			}}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<QuestionsBox
					cardIndex={currentCard}
					setAnswerVal={setAnswerVal}
					control={control}
					setCategory={setCategory}
					category={category}
					questionLength={questionLength}
					setAme={setAme}
					ame={ame}
					amenities={amenities}
				/>
				<Center
					p={20}
					mt={10}
					justifyContent='flex-start'
					alignItems='flex-start'
				>
					<HStack
						justifyContent='space-between'
						w={'100%'}
					>
						{isFirstCard && <Box />}
						{!isFirstCard && (
							<Button
								onPress={handlePrevious}
								variant={'solid'}
								bgColor={'$white300'}
								color={'$blue300'}
								borderColor='$blue300'
								borderWidth={1}
							>
								<CusText
									type={'SECONDARY'}
									text={'Prev'}
									style={{
										textTransform: 'uppercase',
										color: '#000',
									}}
								/>
							</Button>
						)}
						{isLastCard ? (
							<Button
								onPress={handleSubmit(result)}
								variant={'default'}
								bgColor={'$blue300'}
								color={'$white300'}
							>
								<CusText
									type={'SECONDARY'}
									text={'Submit'}
									style={{
										textTransform: 'uppercase',
										color: '#FFF',
									}}
								/>
							</Button>
						) : (
							<>
								{currentCard < questionLength - 3 &&
									category[currentCard] && (
										<>
											<Button
												onPress={handleNext}
												variant={'solid'}
												bgColor={'$blue300'}
												color={'$white300'}
											>
												<CusText
													type={'SECONDARY'}
													text={'Next'}
													style={{
														textTransform:
															'uppercase',
														color: '#FFF',
													}}
												/>
											</Button>
										</>
									)}

								{currentCard >= questionLength - 3 && (
									<Button
										onPress={handleNext}
										variant={'solid'}
										bgColor={'$blue300'}
										color={'$white300'}
									>
										<CusText
											type={'SECONDARY'}
											text={'Next'}
											style={{
												textTransform: 'uppercase',
												color: '#FFF',
											}}
										/>
									</Button>
								)}
							</>
						)}
					</HStack>
				</Center>
			</ScrollView>
		</View>
	);
};

const QuestionsBox = ({
	cardIndex,
	control,
	setCategory,
	category,
	questionLength,
	setAme,
	ame,
	amenities,
}) => {
	const question = questions[cardIndex];

	const [item, setItem] = useState([]);

	const handleSet = (optn) => {
		const addCategory = [...category];
		addCategory[cardIndex] = optn.category;
		setCategory(addCategory);

		const addItem = [...item];
		addItem[cardIndex] = optn.answerText;
		setItem(addItem);
	};
	return (
		<>
			{question.file && (
				<>
					{question.component ? (
						<Center
							p={20}
							mt={10}
							justifyContent='flex-start'
							alignItems='flex-start'
						>
							<Box
								mr={20}
								gap={20}
								justifyContent='flex-start'
								w={'100%'}
							>
								<HStack
									bgColor='$blue300'
									rounded={5}
									hardShadow={4}
									shadowColor='$blue200'
									alignItems='center'
									justifyContent='center'
									p={5}
									w={'50%'}
								>
									<CusText
										type={'SECONDARY'}
										text={`Question ${
											cardIndex + 1
										}/${questionLength}`}
										style={{
											textTransform: 'uppercase',
											color: '#FFF',
										}}
									/>
								</HStack>
								<VStack
									bgColor='$white300'
									rounded={15}
									hardShadow={4}
									shadowColor='$blue200'
									w={'100%'}
								>
									<Box
										p={20}
										m={10}
										gap={15}
									>
										<Image
											size='lg'
											height={250}
											source={{
												uri: question.file,
											}}
											w={'100%'}
										/>
										<CusText
											type={'TERTIARY'}
											text={question.questionText}
											style={{
												textTransform: 'uppercase',
												textAlign: 'center',
											}}
										/>
									</Box>
								</VStack>
								<VStack
									flexDir={'column'}
									gap={12}
								>
									{question.component({
										control,
										setAme,
										ame,
										amenities,
									})}
								</VStack>
							</Box>
						</Center>
					) : (
						<>
							<Center
								p={20}
								mt={10}
								justifyContent='flex-start'
								alignItems='flex-start'
							>
								<Box
									mr={20}
									gap={20}
									justifyContent='flex-start'
									w={'100%'}
								>
									<HStack
										bgColor='$blue300'
										rounded={5}
										hardShadow={4}
										shadowColor='$blue200'
										alignItems='center'
										justifyContent='center'
										p={5}
										w={'50%'}
									>
										<CusText
											type={'SECONDARY'}
											text={`Question ${
												cardIndex + 1
											}/${questionLength}`}
											style={{
												textTransform: 'uppercase',
												color: '#FFF',
											}}
										/>
									</HStack>
									<VStack
										bgColor='$white300'
										rounded={15}
										hardShadow={4}
										shadowColor='$blue200'
										w={'100%'}
									>
										<Box
											p={20}
											m={10}
											gap={15}
										>
											<Image
												size='lg'
												height={250}
												source={{
													uri: question.file,
												}}
												w={'100%'}
											/>
											<CusText
												type={'TERTIARY'}
												text={question.questionText}
												style={{
													textTransform: 'uppercase',
													textAlign: 'center',
												}}
											/>
										</Box>
									</VStack>
									<VStack
										flexDir={'column'}
										gap={12}
									>
										{question.answerOptions.map(
											(optn, index) => {
												return (
													<Button
														variant={
															item[cardIndex] ==
															optn.answerText
																? 'outline'
																: 'outline'
														}
														borderColor={'$blue300'}
														bgColor={
															item[cardIndex] ==
															optn.answerText
																? '$blue100'
																: '$white200'
														}
														w={'100%'}
														size='xl'
														key={index}
														onPress={() =>
															handleSet(optn)
														}
														shadowColor='$blue200'
													>
														<CusText
															type={'SECONDARY'}
															text={
																optn.answerText
															}
															style={{
																textTransform:
																	'uppercase',
															}}
														/>
													</Button>
												);
											}
										)}
									</VStack>
								</Box>
							</Center>
						</>
					)}
				</>
			)}
		</>
	);
};
export default QuestionsScreen;
