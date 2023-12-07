import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import { ScrollView } from 'react-native';
import CusText from '../components/CusText';
const PrivacyPolicy = () => {
	const insets = useSafeAreaInsets();
	return (
		<View
			style={{
				flex: 1,
				paddingTop: insets.top,
				padding: 20,
			}}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Box
					p={30}
					mt={10}
					justifyContent='flex-start'
					alignItems='flex-start'
					style={{ textAlign: 'justify', color: '#000' }}
					gap={15}
					mb={50}
				>
					<CusText
						type={'HEADING'}
						text={'Privacy Policy '}
						style={{
							fontSize: 24,
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'TERTIARY'}
						text={'Last updated: November 25, 2023 '}
						style={{
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'SECONDARY'}
						text={`This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You. 

We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. 	`}
						style={{
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'HEADING'}
						text={'Interpretation and Definitions'}
						style={{
							fontSize: 22,
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'HEADING'}
						text={'Interpretation'}
						style={{
							fontSize: 20,
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'SECONDARY'}
						text={`The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural. `}
						style={{
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'HEADING'}
						text={'Definitions '}
						style={{
							fontSize: 20,
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'SECONDARY'}
						text={`For the purposes of this Privacy Policy: `}
						style={{
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<Text
						style={{
							fontFamily: 'Sora_500Medium',
							fontSize: 15,
							textAlign: 'center',
							color: '#000',
							textAlign: 'justify',
						}}
					>
						<Text
							style={{
								fontFamily: 'Sora_700Bold',
								color: '#000',
							}}
						>
							● Account
						</Text>{' '}
						means a unique account created for You to access our
						Service or parts of our Service.
					</Text>
					<Text
						style={{
							fontFamily: 'Sora_500Medium',
							fontSize: 15,
							textAlign: 'center',
							color: '#000',
							textAlign: 'justify',
						}}
					>
						<Text
							style={{
								fontFamily: 'Sora_700Bold',
								color: '#000',
							}}
						>
							● Affiliate 
						</Text>{' '}
						means an entity that controls, is controlled by or is
						under common control with a party, where "control" means
						ownership of 50% or more of the shares, equity interest
						or other securities entitled to vote for election of
						directors or other managing authority.
					</Text>
					<Text
						style={{
							fontFamily: 'Sora_500Medium',
							fontSize: 15,
							textAlign: 'center',
							color: '#000',
							textAlign: 'justify',
						}}
					>
						<Text
							style={{
								fontFamily: 'Sora_700Bold',
								color: '#000',
							}}
						>
							● Company 
						</Text>{' '}
						(referred to as either "the Company", "We", "Us" or
						"Our" in this Agreement) refers to Congressional Town
						Center, 23 Bahay Toro Avenue 1105, Quezon City, NCR.
					</Text>
					<Text
						style={{
							fontFamily: 'Sora_500Medium',
							fontSize: 15,
							textAlign: 'center',
							color: '#000',
							textAlign: 'justify',
						}}
					>
						<Text
							style={{
								fontFamily: 'Sora_700Bold',
								color: '#000',
							}}
						>
							● Cookies 
						</Text>{' '}
						are small files that are placed on Your computer, mobile
						device or any other device by a website, containing the
						details of Your browsing history on that website among
						its many uses.
					</Text>
					<Text
						style={{
							fontFamily: 'Sora_500Medium',
							fontSize: 15,
							textAlign: 'center',
							color: '#000',
							textAlign: 'justify',
						}}
					>
						<Text
							style={{
								fontFamily: 'Sora_700Bold',
								color: '#000',
							}}
						>
							● Country 
						</Text>{' '}
						 refers to: Philippines
					</Text>
					<Text
						style={{
							fontFamily: 'Sora_500Medium',
							fontSize: 15,
							textAlign: 'center',
							color: '#000',
							textAlign: 'justify',
						}}
					>
						<Text
							style={{
								fontFamily: 'Sora_700Bold',
								color: '#000',
							}}
						>
							● Device 
						</Text>{' '}
						 means any device that can access the Service such as a
						computer, a cellphone or a digital tablet.
					</Text>
					<Text
						style={{
							fontFamily: 'Sora_500Medium',
							fontSize: 15,
							textAlign: 'center',
							color: '#000',
							textAlign: 'justify',
						}}
					>
						<Text
							style={{
								fontFamily: 'Sora_700Bold',
								color: '#000',
							}}
						>
							● Personal Data
						</Text>{' '}
						is any information that relates to an identified or
						identifiable individual.
					</Text>
					<Text
						style={{
							fontFamily: 'Sora_500Medium',
							fontSize: 15,
							textAlign: 'center',
							color: '#000',
							textAlign: 'justify',
						}}
					>
						<Text
							style={{
								fontFamily: 'Sora_700Bold',
								color: '#000',
							}}
						>
							● Service 
						</Text>{' '}
						refers to the Website.
					</Text>
					<Text
						style={{
							fontFamily: 'Sora_500Medium',
							fontSize: 15,
							textAlign: 'center',
							color: '#000',
							textAlign: 'justify',
						}}
					>
						<Text
							style={{
								fontFamily: 'Sora_700Bold',
								color: '#000',
							}}
						>
							● Service Provider 
						</Text>{' '}
						means any natural or legal person who processes the data
						on behalf of the Company. It refers to third-party
						companies or individuals employed by the Company to
						facilitate the Service, to provide the Service on behalf
						of the Company, to perform services related to the
						Service or to assist the Company in analyzing how the
						Service is used.
					</Text>
					<Text
						style={{
							fontFamily: 'Sora_500Medium',
							fontSize: 15,
							textAlign: 'center',
							color: '#000',
							textAlign: 'justify',
						}}
					>
						<Text
							style={{
								fontFamily: 'Sora_700Bold',
								color: '#000',
							}}
						>
							● Usage Data
						</Text>{' '}
						refers to data collected automatically, either generated
						by the use of the Service or from the Service
						infrastructure itself (for example, the duration of a
						page visit).
					</Text>
					<Text
						style={{
							fontFamily: 'Sora_500Medium',
							fontSize: 15,
							textAlign: 'center',
							color: '#000',
							textAlign: 'justify',
						}}
					>
						<Text
							style={{
								fontFamily: 'Sora_700Bold',
								color: '#000',
							}}
						>
							● Website 
						</Text>{' '}
						refers to ICODES, accessible from ctcqcicodes.com
					</Text>
					<Text
						style={{
							fontFamily: 'Sora_500Medium',
							fontSize: 15,
							textAlign: 'center',
							color: '#000',
							textAlign: 'justify',
						}}
					>
						<Text
							style={{
								fontFamily: 'Sora_700Bold',
								color: '#000',
							}}
						>
							● You 
						</Text>{' '}
						means the individual accessing or using the Service, or
						the company, or other legal entity on behalf of which
						such individual is accessing or using the Service, as
						applicable.
					</Text>
					<CusText
						type={'HEADING'}
						text={'Collecting and Using Your Personal Data'}
						style={{
							fontSize: 22,
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'HEADING'}
						text={'Types of Data Collected '}
						style={{
							fontSize: 20,
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'HEADING'}
						text={'Personal Data'}
						style={{
							fontSize: 18,
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<Text
						style={{
							fontFamily: 'Sora_500Medium',
							fontSize: 15,
							textAlign: 'center',
							color: '#000',
							textAlign: 'justify',
						}}
					>
						While using Our Service, We may ask You to provide Us
						with certain personally identifiable information that
						can be used to contact or identify You. Personally
						identifiable information may include, but is not limited
						to:
					</Text>
					<CusText
						text={'● Email address'}
						type={'SECONDARY'}
						style={{ fontSize: 15 }}
					/>
					<CusText
						text={'● First name and last name '}
						type={'SECONDARY'}
						style={{ fontSize: 15 }}
					/>
					<CusText
						text={'● Phone number '}
						type={'SECONDARY'}
						style={{ fontSize: 15 }}
					/>
					<CusText
						text={
							'● Address, State, Province, ZIP/Postal code, City '
						}
						type={'SECONDARY'}
						style={{ fontSize: 15 }}
					/>
					<CusText
						text={'● Usage Data '}
						type={'SECONDARY'}
						style={{ fontSize: 15 }}
					/>
					<CusText
						type={'HEADING'}
						text={'Usage Data '}
						style={{
							fontSize: 18,
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						text={
							'Usage Data is collected automatically when using the Service. '
						}
						type={'SECONDARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<CusText
						text={`Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data. `}
						type={'SECONDARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<CusText
						text={`When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data. `}
						type={'SECONDARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<CusText
						text={`We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.`}
						type={'SECONDARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<CusText
						type={'HEADING'}
						text={'Tracking Technologies and Cookies '}
						style={{
							fontSize: 18,
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'SECONDARY'}
						text={
							'We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include: '
						}
						style={{
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<Text
						style={{
							fontFamily: 'Sora_500Medium',
							fontSize: 15,
							textAlign: 'center',
							color: '#000',
							textAlign: 'justify',
						}}
					>
						<Text
							style={{
								fontFamily: 'Sora_700Bold',
								color: '#000',
							}}
						>
							● Cookies or Browser Cookies
						</Text>{' '}
						A cookie is a small file placed on Your Device. You can
						instruct Your browser to refuse all Cookies or to
						indicate when a Cookie is being sent. However, if You do
						not accept Cookies, You may not be able to use some
						parts of our Service. Unless you have adjusted Your
						browser setting so that it will refuse Cookies, our
						Service may use Cookies.
					</Text>
					<Text
						style={{
							fontFamily: 'Sora_500Medium',
							fontSize: 15,
							textAlign: 'center',
							color: '#000',
							textAlign: 'justify',
						}}
					>
						<Text
							style={{
								fontFamily: 'Sora_700Bold',
								color: '#000',
							}}
						>
							● Web Beacons
						</Text>{' '}
						Certain sections of our Service and our emails may
						contain small electronic files known as web beacons
						(also referred to as clear gifs, pixel tags, and
						single-pixel gifs) that permit the Company, for example,
						to count users who have visited those pages or opened an
						email and for other related website statistics (for
						example, recording the popularity of a certain section
						and verifying system and server integrity).
					</Text>
					<CusText
						text={`Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser. `}
						type={'SECONDARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<CusText
						text={`We use both Session and Persistent Cookies for the purposes set out below:  `}
						type={'SECONDARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<CusText
						text={'● Necessary / Essential Cookies'}
						type={'TERTIARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<CusText
						text={'Type: Session Cookies '}
						type={'SECONDARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<CusText
						text={'Administered by: Us '}
						type={'SECONDARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<CusText
						text={
							'Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services. '
						}
						type={'SECONDARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<CusText
						text={'● Cookies Policy / Notice Acceptance Cookies '}
						type={'TERTIARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<CusText
						text={'Type: Persistent Cookies '}
						type={'SECONDARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<CusText
						text={'Administered by: Us '}
						type={'SECONDARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<CusText
						text={'● Functionality Cookies '}
						type={'TERTIARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<CusText
						text={'Type: Persistent Cookies '}
						type={'SECONDARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>

					<CusText
						text={
							'Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website. '
						}
						type={'SECONDARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<CusText
						text={
							'For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.  '
						}
						type={'SECONDARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<CusText
						type={'HEADING'}
						text={'Use of Your Personal Data '}
						style={{
							fontSize: 20,
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						text={
							'The Company may use Personal Data for the following purposes:  '
						}
						type={'SECONDARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<Text
						style={{
							fontFamily: 'Sora_500Medium',
							fontSize: 15,
							textAlign: 'center',
							color: '#000',
							textAlign: 'justify',
						}}
					>
						<Text
							style={{
								fontFamily: 'Sora_700Bold',
								color: '#000',
								textAlign: 'justify',
							}}
						>
							● To provide and maintain our Service
						</Text>
						, including to monitor the usage of our Service.
					</Text>
					<Text
						style={{
							fontFamily: 'Sora_500Medium',
							fontSize: 15,
							textAlign: 'center',
							color: '#000',
							textAlign: 'justify',
						}}
					>
						<Text
							style={{
								fontFamily: 'Sora_700Bold',
								color: '#000',
								textAlign: 'justify',
							}}
						>
							● To manage Your Account
						</Text>
						,  to manage Your registration as a user of the Service.
						The Personal Data You provide can give You access to
						different functionalities of the Service that are
						available to You as a registered user.
					</Text>
					<Text
						style={{
							fontFamily: 'Sora_500Medium',
							fontSize: 15,
							textAlign: 'center',
							color: '#000',
							textAlign: 'justify',
						}}
					>
						<Text
							style={{
								fontFamily: 'Sora_700Bold',
								color: '#000',
								textAlign: 'justify',
							}}
						>
							● To contact You
						</Text>
						,  To contact You by email, telephone calls, SMS, or
						other equivalent forms of electronic communication, such
						as a mobile application's push notifications regarding
						updates or informative communications related to the
						functionalities, products or contracted services,
						including the security updates, when necessary or
						reasonable for their implementation.
					</Text>
					<Text
						style={{
							fontFamily: 'Sora_500Medium',
							fontSize: 15,
							textAlign: 'center',
							color: '#000',
							textAlign: 'justify',
						}}
					>
						<Text
							style={{
								fontFamily: 'Sora_700Bold',
								color: '#000',
							}}
						>
							● To manage Your requests
						</Text>
						,  To attend and manage Your requests to Us.
					</Text>
					<CusText
						type={'HEADING'}
						text={'Retention of Your Personal Data '}
						style={{
							fontSize: 20,
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						text={
							'The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies. '
						}
						type={'SECONDARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<CusText
						text={
							'The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods. '
						}
						type={'SECONDARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<CusText
						type={'HEADING'}
						text={'Delete Your Personal Data '}
						style={{
							fontSize: 20,
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						text={
							'You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You. '
						}
						type={'SECONDARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<CusText
						text={
							'Our Service may give You the ability to delete certain information about You from within the Service. '
						}
						type={'SECONDARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<CusText
						text={
							'You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us. '
						}
						type={'SECONDARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<CusText
						text={
							'Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so. '
						}
						type={'SECONDARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<CusText
						type={'HEADING'}
						text={'Disclosure of Your Personal Data '}
						style={{
							fontSize: 20,
							textAlign: 'justify',
							color: '#000',
						}}
					/>

					<CusText
						type={'HEADING'}
						text={'Business Transactions '}
						style={{
							fontSize: 18,
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						text={
							'If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.  '
						}
						type={'SECONDARY'}
						style={{ fontSize: 15, textAlign: 'justify' }}
					/>
					<CusText
						type={'SECONDARY'}
						text={
							'Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency). '
						}
						style={{
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'HEADING'}
						text={'Other legal requirements '}
						style={{
							fontSize: 18,
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'SECONDARY'}
						text={
							'The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:  '
						}
						style={{
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'SECONDARY'}
						text={'● Comply with a legal obligation  '}
						style={{
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'SECONDARY'}
						text={
							'● Protect and defend the rights or property of the Company   '
						}
						style={{
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'SECONDARY'}
						text={
							'● Prevent or investigate possible wrongdoing in connection with the Service    '
						}
						style={{
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'SECONDARY'}
						text={
							'● Protect the personal safety of Users of the Service or the public     '
						}
						style={{
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'SECONDARY'}
						text={'● Protect against legal liability     '}
						style={{
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'HEADING'}
						text={'Security of Your Personal Data '}
						style={{
							fontSize: 20,
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'SECONDARY'}
						text={
							'The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security. '
						}
						style={{
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'HEADING'}
						text={"Children's Privacy "}
						style={{
							fontSize: 20,
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'SECONDARY'}
						text={
							'Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers. '
						}
						style={{
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'SECONDARY'}
						text={
							"If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information. "
						}
						style={{
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'HEADING'}
						text={'Links to Other Websites '}
						style={{
							fontSize: 20,
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'SECONDARY'}
						text={`Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services. `}
						style={{
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'HEADING'}
						text={'Changes to this Privacy Policy'}
						style={{
							fontSize: 20,
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'SECONDARY'}
						text={`We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page. 

We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy. 

You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page. `}
						style={{
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'HEADING'}
						text={'Contact Us '}
						style={{
							fontSize: 20,
							textAlign: 'justify',
							color: '#000',
						}}
					/>

					<CusText
						type={'SECONDARY'}
						text={`If you have any questions about this Privacy Policy, You can contact us:`}
						style={{
							textAlign: 'justify',
							color: '#000',
						}}
					/>
					<CusText
						type={'SECONDARY'}
						text={`● By email: ctcqcicodes@gmail.com `}
						style={{
							textAlign: 'justify',
							color: '#000',
						}}
					/>
				</Box>
			</ScrollView>
		</View>
	);
};

export default PrivacyPolicy;
