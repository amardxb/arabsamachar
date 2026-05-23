import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 
import Link from 'next/link';

/* export const metadata = {
    title:  "Cookies-Policy",  
    alternates: {
        canonical: 'https://www.arabsamachar.com/cookies-policy'
      }
} */
export const metadata = {
  title: "Cookies Policy - अरब समाचार | Arab Samachar",
  description: "हमारे इस पेज पर आप जानेंगे कि अरब समाचार वेबसाइट cookies का उपयोग कैसे करती है, वेबसाइट इस्तेमाल को बेहतर बनाने और वेबसाइट की सेवाओं को सुधारने के लिए किन cookies का इस्तेमाल किया जाता है।",
  alternates: {
    canonical: "https://www.arabsamachar.com/cookies-policy",
  },
};
 

export default function page() {
    return (
        <div className='w-full lg:w-[75%] m-auto min-h-screen mt-6'>
            <h1 className='text-2xl font-bold m-auto'>Cookies Policy</h1>
            <Tabs defaultValue="hindi">
                <TabsList className="w-full flex justify-around ">
                    <TabsTrigger value="hindi" >Hindi</TabsTrigger>
                    <TabsTrigger value="english">English</TabsTrigger>
                </TabsList>
                <TabsContent value="hindi" className="mb-6">
                    <h2 className='mt-10 font-bold text-xl mb-4'>1. परिचय</h2>
                    <p className='text-md'>अरब समाचार  में आपका स्वागत है, आपकी सूचना और समाचार की विश्वसनीय स्रोत। यह कुकीज़ नीति आपको हमारी वेबसाइट का उपयोग करते समय हमारे कुकीज़ और अन्य ट्रैकिंग प्रौद्योगिकियों के माध्यम से सूचियों के संग्रह, उपयोग, और भंडारण के बारे में हमारे अभ्यासों के बारे में सूचित करने के लिए डिज़ाइन की गई है। अरब समाचार  का उपयोग करके, आप इस नीति के अनुसार कुकीज़ का उपयोग करने की सहमति देते हैं।</p>

                    <h2 className='mt-10 font-bold text-xl mb-4'>कुकीज़ क्या होती हैं?</h2>

                    <p className='text-md'>कुकीज़ छोटे पाठ फ़ाइलें होती हैं जो जब आप कुछ विशिष्ट वेबसाइटों पर जाते हैं तो आपकी डिवाइस (कंप्यूटर या मोबाइल डिवाइस) पर स्टोर की जाती हैं। वे वेबसाइटों को अधिक प्रभावी बनाने और वेबसाइट मालिकों को सूचना प्रदान करने के लिए व्यापक रूप से उपयोग की जाती हैं। कुकीज़ वेब सर्वरों को आपकी डिवाइस को पहचानने और आपकी ब्राउज़िंग पसंदों और गतिविधियों जैसी जानकारी इकट्ठा करने की अनुमति देती हैं।</p>

                    <h2 className='mt-10 font-bold text-xl mb-4'>हम जिस प्रकार की कुकीज़ का उपयोग करते हैं</h2>
                    <ul>
                        <li><strong>1. आवश्यक कुकीज़:</strong> ये कुकीज़ हमारी वेबसाइट के उचित काम के लिए आवश्यक होती हैं। वे आपको हमारी वेबसाइट पर नेविगेट करने और इसकी सुविधाओं का उपयोग करने की संभावना बनाती हैं, जैसे कि सुरक्षित क्षेत्रों तक पहुँचना।</li>
                        <li><strong>2. विश्लेषणात्मक/प्रदर्शन कुकीज़:</strong> ये कुकीज़ हमें हमारी वेबसाइट पर आगंतुकों की संख्या को पहचानने और गिनने की अनुमति देती हैं और देखती हैं कि आगंतुक किस प्रकार से साइट में घूमते हैं। यह हमें हमारी वेबसाइट का काम कैसे करती है, उदाहरण के लिए, यह सुनिश्चित करने में मदद करती है कि उपयोगकर्ता आसानी से जो कुछ भी खोज रहे हैं।
                        </li>
                        <li><strong>3. कार्य कुकीज़:</strong> ये कुकीज़ आपको हमारी वेबसाइट पर वापस आने पर पहचानने के लिए उपयोग की जाती हैं। वे हमें आपकी पसंदों को व्यक्तिगत बनाने, आपको नाम से स्वागत करने और आपकी पसंदों को याद रखने की संभावना बनाती हैं।
                        </li>
                        <li><strong>4. विज्ञापन कुकीज़:</strong> ये कुकीज़ उन विज्ञापनों को डिलीवर करने के लिए उपयोग की जाती हैं जो आपके और आपकी रुचियों के अनुसार अधिक संबंधित होते हैं। इन्हें भी एक विज्ञापन को कितनी बार देखा गया है और विज्ञापन कैसे प्रभावी है, इसे मापने में मदद मिलती है।</li>

                    </ul>
                    <h2 className='mt-10 font-bold text-xl mb-4'>तृतीय-पक्ष कुकीज़</h2>
                    <p className='text-md'>हम अपनी वेबसाइट पर विश्लेषण सेवाओं और व्यक्तिगत विज्ञापन प्रदान करने के लिए तृतीय-पक्ष कुकीज़ का भी उपयोग कर सकते हैं। इन तृतीय-पक्ष सेवा प्रदाताओं के पास अपने खुद के गोपनीयता नीतियां होती हैं जो वे ऐसी जानकारी का उपयोग कैसे करते हैं इस पर प्रस्तुत करती हैं।</p>

                    <h2 className='mt-10 font-bold text-xl mb-4'>कुकीज़ के संबंध में आपके विकल्प</h2>

                    <p className='text-md'>आप कुकीज़ को स्वीकार या अस्वीकार कर सकते हैं। अधिकांश वेब ब्राउज़र्स स्वचालित रूप से कुकीज़ को स्वीकार करते हैं, लेकिन आप अक्सर अपने ब्राउज़र सेटिंग को संशोधित करके कुकीज़ को अस्वीकार कर सकते हैं। हालांकि, कृपया ध्यान दें कि कुकीज़ को अक्षम करने से हमारी वेबसाइट की कार्यक्षमता प्रभावित हो सकती है।</p>

                    <h2 className='mt-10 font-bold text-xl mb-4'>इस नीति का अद्यतन</h2>

                    <p className='text-md'>
                        हम समय-समय पर इस कुकीज़ नीति को अपडेट कर सकते हैं ताकि हमारे अभ्यासों में परिवर्तन या अन्य परिचालनिक, कानूनी, या विनियामक कारणों को दर्शाया जा सके। हम आपको हमारी कुकीज़ के अभ्यासों पर नवीनतम जानकारी के लिए इस पृष्ठ को नियमित रूप से समीक्षा करने की सलाह देते हैं।</p>

                    <h2 className='mt-10 font-bold text-xl mb-4'>संपर्क करें</h2>

                    <p className='text-md'>यदि आपके पास हमारी कुकीज़ नीति के बारे में कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें । अरब समाचार  का उपयोग करके, आप इस नीति के अनुसार कुकीज़ का उपयोग करने की सहमति देते हैं। अगर आप इस नीति से सहमत नहीं हैं, तो कृपया हमारी वेबसाइट का उपयोग न करें।</p>

                </TabsContent>
                <TabsContent value="english" className="mb-6">

                    <h2 className='mt-10 font-bold text-xl mb-4'>Introduction</h2>
                    <p>Welcome to Arab Samachar, your trusted source for news and information. This Cookies Policy is designed to inform you about our practices regarding the collection, use, and disclosure of information that we may collect through cookies and other tracking technologies when you use our website.By using Arab Samachar, you consent to the use of cookies in accordance with this policy.</p>

                    <h2 className='mt-10 font-bold text-xl mb-4'>What are Cookies</h2>

                    <p>Cookies are small text files that are stored on your device (computer or mobile device) when you visit certain websites. They are widely used to make websites work more efficiently and to provide information to the website owners. Cookies allow web servers to recognize your device and gather information such as your browsing preferences and activities.</p>

                    <h2 className='mt-10 font-bold text-xl mb-4'>Types of Cookies We Use</h2>
                    <ul>
                        <li><strong>1. Essential Cookies:</strong> These cookies are necessary for the proper functioning of our website. They enable you to navigate our website and use its features, such as accessing secure areas.</li>
                        <li><strong>2. Analytical/Performance Cookies:</strong> These cookies allow us to recognize and count the number of visitors to our website and see how visitors move around the site. This helps us to improve the way our website works, for example, by ensuring that users find what they are looking for easily.
                        </li>
                        <li><strong>3. Functionality Cookies:</strong> These cookies are used to recognize you when you return to our website. They enable us to personalize our content for you, greet you by name, and remember your preferences.
                        </li>
                        <li><strong>4. Advertising Cookies:</strong> These cookies are used to deliver advertisements that are more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of the advertising campaign.
                        </li>

                    </ul>
                    <h2 className='mt-10 font-bold text-xl mb-4'>Third-Party Cookies</h2>
                    <p>We may also use third-party cookies to provide analytics services and personalized advertisements on our website. These third-party service providers have their own privacy policies addressing how they use such information.</p>

                    <h2 className='mt-10 font-bold text-xl mb-4'>Your Choices Regarding Cookies</h2>
                    <p>You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. However, please note that disabling cookies may affect the functionality of our website.</p>
                    <h2 className='mt-10 font-bold text-xl mb-4'>Updates to this Policy</h2>
                    <p>We may update this Cookies Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this page periodically for the latest information on our cookie practices.</p>

                    <h2 className='mt-10 font-bold text-xl mb-4'>Contact Us</h2>

                    <p>If you have any questions about our Cookies Policy, please contact us using our <Link href="/contact-us" className='text-blue-700'>Contact Us</Link> page.
                        By using Arab Samachar, you agree to our use of cookies in accordance with this policy. If you do not agree to this policy, please do not use our website.</p>

                </TabsContent>
            </Tabs>
        </div>
    )
}
