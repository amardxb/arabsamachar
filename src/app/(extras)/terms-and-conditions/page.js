import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {
  title: "Terms & Conditions - अरब समाचार | Arab Samachar",
  description: "इस पेज पर हमने अरब समाचार के नियम और शर्तें (Terms & Conditions) दी हैं। यहाँ वेबसाइट के उपयोग, अधिकार, सामग्री और उपयोग करने वाले की जिम्मेदारियों से जुड़े नियमों की जानकारी दी गई है।",
  alternates: {
    canonical: 'https://www.arabsamachar.com/terms-and-conditions'
  }
}
 
export default function page() {
  return (
    <div className='w-full lg:w-[75%] m-auto min-h-screen mt-6'>
      <h1 className='text-2xl font-bold m-auto'>Terms and Conditions</h1>
      <Tabs defaultValue="hindi">
        <TabsList className="w-full flex justify-around ">
          <TabsTrigger value="hindi" >Hindi</TabsTrigger>
          <TabsTrigger value="english">English</TabsTrigger>
        </TabsList>
        <TabsContent value="hindi" className="mb-6">
          <h2 className='mt-10 font-bold text-xl mb-4'>1. परिचय</h2>
          <p>हमारी वेबसाइट 'अरब समाचार'  में आपका स्वागत है! ये नियम और शर्तें हमारी न्यूज़ वेबसाइट के उपयोग को नियंत्रित करती हैं, जो विश्व, राष्ट्रीय, जीवनशैली, मनोरंजन, प्रौद्योगिकी, खेल, वित्त, धर्म आदि जैसे विभिन्न श्रेणियों को शामिल करती है। इस वेबसाइट का उपयोग करके, आप इन नियमों और शर्तों का पालन करने के साथ सहमत होते हैं। अगर आप इन नियमों और शर्तों के किसी भाग से असहमत हैं, तो कृपया हमारी वेबसाइट का उपयोग न करें।</p>
          <h2 className='mt-10 font-bold text-xl mb-4'>2. परिभाषाएँ</h2>
          <ul>
            <li>अरब समाचार हमारी न्यूज़ वेबसाइट का संदर्भ है।</li>
            <li>उपयोगकर्ता, आप, और आपका हमारी वेबसाइट तक पहुंचने वाले व्यक्ति को संदर्भित करते हैं।</li>
            <li>सामग्री अरब समाचार  पर उपलब्ध किसी भी पाठ, छवियाँ, वीडियो, या अन्य बहुमीडिया सामग्री को संदर्भित करती है।</li>
          </ul>
          <h2 className='mt-10 font-bold text-xl mb-4'>3. नियमों का स्वीकृति</h2>
          <p>अरब समाचार  का उपयोग करके, आप इन नियमों और शर्तों को पूरी तरह से स्वीकार करते हैं। यदि आप इन नियमों और शर्तों में से किसी से असहमत हैं, तो कृपया हमारी वेबसाइट का उपयोग न करें।</p>
          <h2 className='mt-10 font-bold text-xl mb-4' >4. सामग्री का उपयोग</h2>
          <p>4.1. अरब समाचार  पर प्रदान की गई सभी सामग्री केवल सूचनात्मक उद्देश्यों के लिए है। हम सुनिश्चित करने का प्रयास करते हैं कि प्रस्तुत जानकारी की सटीकता और विश्वसनीयता हो, लेकिन हम इसकी पूर्णता या किसी भी उद्देश्य के लिए उपयुक्तता की गारंटी नहीं देते हैं।</p>
          <p> 4.2. आप अरब समाचार  से पृष्ठों को अपने व्यक्तिगत उपयोग के लिए देख सकते, डाउनलोड कर सकते, और प्रिंट कर सकते हैं, इन नियमों और शर्तों में निर्दिष्ट प्रतिबंधों के अधीन।</p>

          <ul>4.3. आपको नहीं करना चाहिए:
            <li>अरब समाचार से सामग्री को यथावत पुनः प्रकाशित करना।</li>
            <li>अरब समाचार से सामग्री को बेचना, किराया देना, या उप-लाइसेंस देना।</li>
            <li>अरब समाचार से सामग्री की प्रतिलिपि बनाना, दोहराना, या किसी वाणिज्यिक उद्देश्य के लिए सामग्री की प्रतिलिपि करना।</li>
            <li>पूर्व सहमति के बिना अरब समाचार से सामग्री को पुनः वितरित करना।</li>
          </ul>

          <h2 className='mt-10 font-bold text-xl mb-4'>5. उपयोगकर्ता खाते</h2>
          <p>5.1. अरब समाचार  की कुछ विशेषताओं तक पहुंचने के लिए, आपको एक उपयोगकर्ता खाता बनाना आवश्यक हो सकता है। आपको अपने खाते और पासवर्ड की गोपनीयता को बनाए रखने और अपने कंप्यूटर या मोबाइल डिवाइस की पहुंच को प्रतिबंधित करने के लिए जिम्मेदार है।</p>
          <p>5.2. आपको अपने खाते या पासवर्ड के तहत होने वाली सभी गतिविधियों के लिए जिम्मेदार होने के लिए सहमत होना चाहिए। 5.3. अरब समाचार  को यदि लगता है कि आपने इन नियमों और शर्तों का उल्लंघन किया है या किसी भ्रांतिपूर्ण, अपमानजनक, या अवैध गतिविधियों में शामिल हुए हैं, तो वह आपके खाते को कभी भी सस्पेंड या समाप्त करने का अधिकार रखता है, सूचना के साथ या बिना सूचना के।</p>
          <h2 className='mt-10 font-bold text-xl mb-4'>6. गोपनीयता नीति</h2>
          <p>6.1. आपकी गोपनीयता हमारे लिए महत्वपूर्ण है। कृपया हमारी गोपनीयता नीति की समीक्षा करें ताकि आप हमारी व्यक्तिगत जानकारी को कैसे एकत्र करते, उपयोग करते, और खुलासा करते हैं, वह समझ सकें।</p>
          <p> 6.2. अरब समाचार  का उपयोग करके, आप हमारी गोपनीयता नीति में आपकी जानकारी को एकत्र और उपयोग करने के लिए सहमति देते हैं, जैसा कि हमारी गोपनीयता नीति में विवरणित किया गया है।</p>
          <h2 className='mt-10 font-bold text-xl mb-4'>7. बौद्धिक संपत्ति के अधिकार</h2>
          <p>7.1. अगर अन्यथा निर्दिष्ट नहीं किया गया है, तो अरब समाचार  और उसके लाइसेंसधारक सभी सामग्री पर बौद्धिक संपत्ति के अधिकार रखते हैं। सभी बौद्धिक संपत्ति के अधिकार सुरक्षित हैं। </p>
          <p>7.2. आपको अरब समाचार  से किसी भी सामग्री का उपयोग नहीं करना चाहिए जो दूसरों के बौद्धिक संपत्ति के अधिकारों का उल्लंघन करती है।</p>
          <h2 className='mt-10 font-bold text-xl mb-4'>8. दायित्व की सीमा</h2>
          <p>8.1. किसी भी परिस्थिति में अरब समाचार  किसी भी प्रकार के सीधे, परोक्ष, आकस्मिक, विशेष, या परिणामशाली क्षति के लिए जिम्मेदार नहीं होगा, जो इस वेबसाइट के उपयोग या इसमें विदित सामग्री से किसी भी तरह संबंधित होती है।</p>
          <p>8.2. अरब समाचार  को इस वेबसाइट पर हमेशा उपलब्ध, या किसी भी प्रकार से उपलब्ध, या यह वेबसाइट पर दी गई जानकारी पूरी, सच्ची, सटीक, या गुमराह की गारंटी नहीं दी जाती है।</p>
          <h2 className='mt-10 font-bold text-xl mb-4'>9. नियमों और शर्तों में परिवर्तन</h2>
          <p>9.1. अरब समाचार  को किसी भी समय बिना पूर्व सूचना के इन नियमों और शर्तों को संशोधित करने का अधिकार है। इस वेबसाइट का उपयोग जारी रखने के साथ, आप इन नियमों और शर्तों के सबसे वर्तमान संस्करण से बाध्य होने के लिए सहमत होते हैं।</p>
          <h2 className='mt-10 font-bold text-xl mb-4'>10. कानूनी प्राधिकरण</h2>
          <p>ये नियम और शर्तें भारत के कानूनों के अनुसार संचालित और व्याख्यानित की जाएंगी। इन नियमों और शर्तों से संबंधित किसी भी विवाद को भारत के न्यायाधिकरणों की विशेष प्राधिकरण में रखा जाएगा।</p>
          <p><span>अंतरराष्ट्रीय प्रयोगकर्ताओं के लिए ध्यान दें:</span>
            यह नियम और शर्तें भारत के कानूनों के अनुसार हैं। अंतरराष्ट्रीय प्रयोगकर्ताओं को इन नियमों की पालना करने के लिए अपने स्थानीय कानूनी सलाहकार से सलाह लेने की सिफारिश की जाती है। कृपया ध्यान दें कि यह नियम और शर्तें भारतीय और अंग्रेजी भाषा में हैं, और यदि अन्य भाषा में अनुवाद किया गया है, तो भारतीय भाषा का प्राथमिकता होगी।</p>
        </TabsContent>
        <TabsContent value="english" className="mb-6">
          <h2 className='mt-10 font-bold text-xl mb-4'>1. Introduction</h2>
          <p>Welcome to Arab Samachar! These terms and conditions govern your use of our news website, covering various categories including national, world, entertainment, lifestyle, technology, finance, sports, religion, and more. By accessing this website, you agree to comply with these terms and conditions. If you disagree with any part of these terms and conditions, please refrain from using our website.</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>2. Definitions</h2>
          <p>Arab Samachar refers to our news website.User, You, and Your refer to the individual accessing our website.
            Content refers to any text, images, videos, or other multimedia materials available on Arab Samachar.</p>
          <h2 className='mt-10 font-bold text-xl mb-4'>3. Acceptance of Terms</h2>
          <p>By using Arab Samachar, you accept these terms and conditions in full. You must not use this website if you disagree with any of these terms and conditions.</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>4. Use of Content</h2>
          <p>4.1. All content provided on Arab Samachar is for informational purposes only. We strive to ensure the accuracy and reliability of the information presented, but we do not guarantee its completeness or suitability for any purpose. </p>
          <p>4.2. You may view, download, and print pages from Arab Samachar for your own personal use, subject to the restrictions set out in these terms and conditions.</p>
          <ul>4.3. You must not:
            <li>- Republish material from Arab Samachar without proper attribution.</li>
            <li>- Sell, rent, or sub-license material from Arab Samachar.</li>
            <li>- Reproduce, duplicate, or copy material from Arab Samachar for commercial purposes.</li>
            <li>- Redistribute content from Arab Samachar without prior consent.</li>
          </ul>
          <h2 className='mt-10 font-bold text-xl mb-4'>5. User Accounts</h2>
          <p>5.1. In order to access certain features of Arab Samachar, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or mobile device.</p>
          <p>5.2. You agree to accept responsibility for all activities that occur under your account or password.</p>
          <p>5.3. Arab Samachar reserves the right to suspend or terminate your account at any time, with or without notice, if we believe that you have violated these terms and conditions or engaged in any fraudulent, abusive, or unlawful activities.</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>6. Privacy Policy</h2>
          <p>6.1. Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and disclose your personal information.</p>
          <p>6.2. By using Arab Samachar, you consent to the collection and use of your information as described in our Privacy Policy.</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>7. Intellectual Property Rights</h2>
          <p>7.1. Unless otherwise stated, Arab Samachar and its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved.</p>
          <p>7.2. You must not use any content from Arab Samachar in a way that infringes upon the intellectual property rights of others.</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>8. Limitation of Liability</h2>
          <p>8.1. In no event shall Arab Samachar be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with your use of this website or the content contained herein.</p>
          <p>8.2. Arab Samachar does not warrant that this website will be constantly available, or available at all, or that the information on this website is complete, true, accurate, or non-misleading.</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>9. Changes to Terms and Conditions</h2>
          <p>9.1. Arab Samachar may revise these terms and conditions at any time without notice. By continuing to use this website, you agree to be bound by the most current version of these terms and conditions.</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>10. Governing Law</h2>
          <p>These terms and conditions shall be governed by and construed in accordance with the laws of India. Any disputes relating to these terms and conditions shall be subject to the exclusive jurisdiction of the courts in India.</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
