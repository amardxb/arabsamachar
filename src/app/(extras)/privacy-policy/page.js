import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {     
  title: "Privacy Policy - अरब समाचार | Arab Samachar",
  description: "अरब समाचार के इस पेज पर प्राइवेसी पॉलिसी दी गई है। हमने यहाँ बताया है कि हम वेबसाइट उपयोग करने वालों की व्यक्तिगत जानकारी कैसे एकत्र, उपयोग और सुरक्षित रखते हैं।",
  alternates: {
    canonical: 'https://www.arabsamachar.com/privacy-policy'
  }
}
 

export default function page() {
  return (
    <div className='w-full lg:w-[75%] m-auto min-h-screen mt-6'>
      <h1 className='text-2xl font-bold m-auto'>Privacy Policy for Arab Samachar</h1>
      <Tabs defaultValue="hindi">
        <TabsList className="w-full flex justify-around">
          <TabsTrigger value="hindi">Hindi</TabsTrigger>
          <TabsTrigger value="english">English</TabsTrigger>
        </TabsList>
        <TabsContent value="hindi" className="mb-6">
          <h2 className='mt-10 font-bold text-xl mb-4  '>1. परिचय</h2>

          <p>Arab Samachar में आपका स्वागत है! हम आपकी गोपनीयता को महत्व देते हैं और आपकी व्यक्तिगत जानकारी की सुरक्षा को सुनिश्चित करने के लिए प्रतिबद्ध हैं। यह गोपनीयता नीति हमारे वेबसाइट और सेवाओं का उपयोग करने पर आपकी जानकारी को हम कैसे एकत्र करते हैं, उसका उपयोग कैसे करते हैं, और उसे कैसे चित्रित करते हैं, इसे स्पष्ट करती है। हमारी वेबसाइट का उपयोग करके या उसका उपयोग करके, आप इस गोपनीयता नीति की शर्तों से सहमत होते हैं।</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>2.  जानकारी जो हम एकत्र करते हैं</h2>

          <p>हम आपके वेबसाइट का उपयोग करते समय विभिन्न प्रकार की जानकारी को एकत्र करते हैं, जैसे:</p>

          <h3 className='mt-10 font-bold text-xl mb-4 ml-2'>2.1 व्यक्तिगत जानकारी</h3>

          <p>जब आप खाता रजिस्टर करते हैं, हमारे न्यूजलेटर की सदस्यता लेते हैं, या सर्वेक्षण में भाग लेते हैं, तो हम आपका नाम, ईमेल पता, और जातिगत जानकारी जैसे व्यक्तिगत जानकारी को एकत्र कर सकते हैं।</p>

          <p>यदि आप सामाजिक मीडिया प्लेटफ़ॉर्म के माध्यम से हमारी वेबसाइट के साथ जुड़ते हैं, तो हम उन प्लेटफ़ॉर्मों से जानकारी को भी एकत्र कर सकते हैं (जैसे कि आपकी प्रोफ़ाइल जानकारी, मित्र सूची) उन प्लेटफ़ॉर्मों पर आपकी गोपनीयता सेटिंग के अनुसार।</p>

          <h3 className='mt-10 font-bold text-xl mb-4 ml-2'>2.2 गैर-व्यक्तिगत जानकारी</h3>

          <p>हम कुकीज़ और समान ट्रैकिंग प्रौद्योगिकियों के माध्यम से आपके आईपी पता, ब्राउज़र प्रकार, उपकरण जानकारी, और वेबसाइट उपयोग डेटा जैसी गैर-व्यक्तिगत जानकारी को भी एकत्र कर सकते हैं।
          </p>
          <h2 className='mt-10 font-bold text-xl mb-4'>3.हम आपकी जानकारी का उपयोग कैसे करते हैं</h2>

          <p>हम आपकी जानकारी का उपयोग विभिन्न उद्देश्यों के लिए करते हैं, जैसे कि : </p>

          <h3 className='mt-10 font-bold text-xl mb-4 ml-2'>3.1 सेवाओं के प्रदान और सुधार</h3>

          <p>हम आपको हमारी वेबसाइट और सेवाओं का उपयोग करने का अधिकार प्रदान करने के लिए और हमारे प्रस्तावों की गुणवत्ता और कार्यक्षमता को सुधारने के लिए।</p>

          <h3 className='mt-10 font-bold text-xl mb-4 ml-2'>3.2 व्यक्तिगतीकरण</h3>

          <p>आपके अनुसार हमारे वेबसाइट पर अपने अनुभव को व्यक्तिगत करने के लिए, विशेष रूप से आपके रुचियों और पसंदों के आधार पर तयली की गई सामग्री, विज्ञापन, और सिफारिशों को प्रस्तुत करने के लिए।</p>

          <h3 className='mt-10 font-bold text-xl mb-4 ml-2'>3.3 संचार</h3>

          <p>हमारी सेवाओं, प्रोफाइलिंग, और अपडेट के बारे में आपके साथ संचार करने के लिए, इसमें ईमेल और अन्य चैनल शामिल हो सकते हैं जहां आपने सहमति प्रदान की है।</p>

          <h3 className='mt-10 font-bold text-xl mb-4 ml-2'>3.4 विश्लेषण</h3>

          <p>ट्रेंड का विश्लेषण करने के लिए, उपयोगकर्ता इंटरेक्शन को ट्रैक करने के लिए, और हमारी वेबसाइट का कैसे उपयोग किया जाता है और इसका प्रदर्शन कैसे किया जाता है को बेहतर समझने के लिए।</p>

          <h3 className='mt-10 font-bold text-xl mb-4 ml-2'>3.5 कानूनी अनुपालन</h3>

          <p>लागू संविधान और विधियों का पालन करने के लिए, जिसमें कैलिफोर्निया उपभोक्ता गोपनीयता अधिनियम (सीसीपीए), जनरल डेटा प्रोटेक्शन नियम (जीडीपीआर), और कैलिफोर्निया ऑनलाइन गोपनीयता संरक्षण अधिनियम (कैलोप्पा) शामिल हैं।</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>4. हम आपकी जानकारी को कैसे साझा करते हैं</h2>

          <p>हम तीसरे पक्षों के साथ आपकी जानकारी को निम्नलिखित परिस्थितियों में साझा कर सकते हैं:</p>

          <h3 className='mt-10 font-bold text-xl mb-4 ml-2'>4.1 सेवा प्रदाता</h3>

          <p>हम अपने लिए कार्य करने के लिए तीसरे पक्ष के सेवा प्रदाताओं को संलग्न कर सकते हैं, जैसे कि होस्टिंग, विश्लेषण, विज्ञापन, और ग्राहक समर्थन। इन सेवा प्रदाताओं को आपकी व्यक्तिगत जानकारी की आवश्यकता हो सकती है, लेकिन उन्हें इसका अन्य उद्देश्य के लिए उपयोग करने की अनुमति नहीं है।</p>

          <h3 className='mt-10 font-bold text-xl mb-4 ml-2'>4.2 कानूनी अनुपालन और सुरक्षा</h3>

          <p>कानून, समन, या अन्य कानूनी प्रक्रिया द्वारा आवश्यक होने पर हम आपकी जानकारी को उज्जवल कर सकते हैं, या अगर हमें ऐसा मानने का योग्य कारण है कि ऐसी जानकारी की विशेषता हमारे अधिकारों, संपत्ति, या सुरक्षा, या अन्यों के अधिकार, संपत्ति, या सुरक्षा की सुरक्षा के लिए आवश्यक है।</p>

          <h3 className='mt-10 font-bold text-xl mb-4 ml-2'>4.3 व्यवसायिक स्थानांतरण</h3>

          <p>यदि किसी विलय, अधिग्रहण, पुनर्गठन, या संपत्ति की बिक्री की घटना होती है, तो आपकी जानकारी लेना त

            ीसरी पक्ष को सौंपा जा सकता है। हम आपको इस परिवर्तन के बारे में ईमेल और/या हमारी वेबसाइट पर प्रमुख सूचना द्वारा सूचित करेंगे।</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>5. आपके अधिकार और विकल्प</h2>

          <h3 className='mt-10 font-bold text-xl mb-4 ml-2'>5.1 पहुंच और अपडेट</h3>

          <p>आप अपनी व्यक्तिगत जानकारी तक पहुंच, अपडेट, या सही कर सकते हैं, अपने खाते की सेटिंग में लॉग इन करके या सीधे हमसे संपर्क करके।</p>

          <h3 className='mt-10 font-bold text-xl mb-4 ml-2'>5.2 ऑप्ट-आउट</h3>

          <p>आप हमसे प्राप्त प्रचार ईमेल को विचलित कर सकते हैं जिसके लिए हमने उन ईमेलों में प्रदान किए गए निर्देशों का पालन करें। कृपया ध्यान दें कि यदि आप प्राचारिक संचार को विचलित करते हैं, तो हम आपको अभी भी गैर-प्राचारिक संदेश भेज सकते हैं, जैसे कि आपके खाते या लेन-देन के संबंधित संदेश।</p>

          <h3 className='mt-10 font-bold text-xl mb-4 ml-2'>5.3 डू नॉट ट्रैक</h3>

          <p>कुछ वेब ब्राउज़र शीर्षक डू नॉट ट्रैक विशेषता प्रदान कर सकते हैं जो कुछ ट्रैकिंग गतिविधियों से बाहर रहने की अनुमति देते हैं। हमारी वेबसाइट वर्तमान में डू नॉट ट्रैक सिग्नल्स का प्रतिक्रिया नहीं करती है।</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>6. डेटा भंडारण</h2>

          <p>हम आपकी व्यक्तिगत जानकारी को इस गोपनीयता नीति में उल्लिखित उद्देश्यों को पूरा करने के लिए आवश्यक समय तक रखेंगे, यहां तक कि कानून द्वारा अधिक भंडारण की अवधि को आवश्यक या परमिट किया जाता है।</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>7. सुरक्षा</h2>

          <p>हम अनधिकृत पहुंच, उपयोग, या खुलासा से आपकी व्यक्तिगत जानकारी को सुरक्षित रखने के लिए योग्य उपाय करते हैं। हालांकि, इंटरनेट या इलेक्ट्रॉनिक संचय के कोई भी प्रकार की प्रेषण एक 100% सुरक्षित नहीं है, इसलिए हम पूर्ण सुरक्षा की गारंटी नहीं दे सकते।</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>8. बच्चों की गोपनीयता</h2>

          <p>हमारी वेबसाइट का उपयोग 13 वर्ष से कम आयु के बच्चों के लिए नहीं है, और हम जानबूझकर 13 साल से कम आयु के बच्चों से व्यक्तिगत जानकारी को नहीं एकत्रित करते हैं। यदि आप एक माता-पिता या अभिभावक हैं और मानते हैं कि आपका बच्चा हमें व्यक्तिगत जानकारी प्रदान किया है, तो कृप

            या हमसे संपर्क करें ताकि हम उस जानकारी को हटा सकें।</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>9. अंतरराष्ट्रीय उपयोगकर्ता</h2>

          <p>यदि आप संयुक्त राज्य अमेरिका के बाहर से हमारी वेबसाइट का उपयोग कर रहे हैं, तो कृपया ध्यान दें कि आपकी जानकारी संयुक्त राज्य अमेरिका में हमारे सर्वरों में संग्रहित, संग्रहित, और प्रसंस्कृत की जा सकती है, जहां हमारे सर्वर स्थित हैं। हमारी वेबसाइट का उपयोग करके, आप संयुक्त राज्य अमेरिका में आपकी जानकारी को संयुक्त राज्य अमेरिका में स्थानित किए जाने की सहमति देते हैं।</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>10. इस गोपनीयता नीति में परिवर्तन</h2>

          <p>हम अपनी प्रथाओं या कानूनी आवश्यकताओं में परिवर्तन के अद्यतन करने के लिए समय-समय पर इस गोपनीयता नीति को अद्यतन कर सकते हैं। हम इस नई गोपनीयता नीति को इस पृष्ठ पर पोस्ट करके और नीचे अंतिम अद्यतन तिथि को अद्यतन करके किसी भी परिमाण के परिवर्तन की सूचना आपको देंगे।</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>11. हमसे संपर्क करें</h2>

          <p>यदि आपके पास इस गोपनीयता नीति या आपकी व्यक्तिगत जानकारी के संबंध में कोई सवाल या चिंता है, तो कृपया हमसे संपर्क करें ।
            अंतिम अपडेट : 01-06-2024
            हमारी वेबसाइट का उपयोग करके, आप स्वीकार करते हैं कि आपने इस गोपनीयता नीति को पढ़ा और समझा है, और इसमें आपकी जानकारी का संग्रहण, उपयोग, और चित्रण कैसे किया जाता है, उसकी वर्णन के रूप में सहमति देते हैं।
          </p>

        </TabsContent>
        <TabsContent value="english" className="mb-6">
          <h2 className='mt-10 font-bold text-xl mb-4'> 1. Introduction</h2>
          <p>Welcome to arabsamachar.com . We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and disclose your information when you use our website and services. By accessing or using our website, you agree to the terms of this Privacy Policy.</p>
          <h2 className='mt-10 font-bold text-xl mb-4'>2. Information We Collect</h2>
          <p>We collect various types of information when you use our website, including:</p>
          <h3 className='mt-10 font-bold text-lg mb-2 ml-4'>2.1 Personal Information</h3>
          <p>When you register for an account, subscribe to our newsletter, or participate in surveys, we may collect personal information such as your name, email address, and demographic information.</p>
          <p>If you choose to engage with our website through social media platforms, we may collect information from those platforms (e.g., your profile information, friends list) in accordance with your privacy settings on those platforms.</p>
          <h3 className='mt-10 font-bold text-lg mb-2 ml-4'>2.2 Non-Personal Information</h3>
          <p>We may collect non-personal information such as your IP address, browser type, device information, and website usage data through cookies and similar tracking technologies.</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>3. How We Use Your Information</h2>
          <p>We use the information we collect for various purposes, including:</p>
          <h3 className='mt-10 font-bold text-lg mb-2 ml-4'>3.1 Providing and Improving Our Services</h3>

          <p>To provide you with access to our website and services, and to improve the quality and functionality of our offerings.</p>

          <h3 className='mt-10 font-bold text-lg mb-2 ml-4'>3.2 Personalization</h3>

          <p>To personalize your experience on our website, including delivering tailored content, advertisements, and recommendations based on your interests and preferences.</p>

          <h3 className='mt-10 font-bold text-lg mb-2 ml-4'>3.3 Communication</h3>

          <p>To communicate with you about our services, promotions, and updates, including via email and other channels where you have provided consent.</p>

          <h3 className='mt-10 font-bold text-lg mb-2 ml-4'>3.4 Analytics</h3>

          <p>To analyze trends, track user interactions, and gather demographic information to better understand how our website is used and to optimize its performance.</p>

          <h3 className='mt-10 font-bold text-lg mb-2 ml-4'>3.5 Legal Compliance</h3>

          <p>To comply with applicable laws and regulations, including the California Consumer Privacy Act (CCPA), the General Data Protection Regulation (GDPR), and the California Online Privacy Protection Act (CalOPPA).</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>4. How We Share Your Information</h2>

          <p>We may share your information with third parties under the following circumstances:</p>

          <h3 className='mt-10 font-bold text-lg mb-2 ml-4'>4.1 Service Providers</h3>

          <p>We may engage third-party service providers to perform functions on our behalf, such as hosting, analytics, advertising, and customer support. These service providers may have access to your personal information as necessary to perform their functions, but are not permitted to use it for any other purpose.</p>

          <h3 className='mt-10 font-bold text-lg mb-2 ml-4'>4.2 Legal Compliance and Protection</h3>

          <p>We may disclose your information when required by law, subpoena, or other legal process, or if we have a good faith belief that such disclosure is necessary to protect our rights, property, or safety, or the rights, property, or safety of others.</p>

          <h3 className='mt-10 font-bold text-lg mb-2 ml-4'>4.3 Business Transfers</h3>

          <p>In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred to a third party as part of the transaction. We will notify you via email and/or prominent notice on our website of any such change in ownership or control of your personal information.</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>5. Your Rights and Choices</h2>

          <h3 className='mt-10 font-bold text-lg mb-2 ml-4'>5.1 Access and Update</h3>

          <p>You may access, update, or correct your personal information by logging into your account settings or by contacting us directly.</p>

          <h3 className='mt-10 font-bold text-lg mb-2 ml-4'>5.2 Opt-Out</h3>
          <p>You may opt out of receiving promotional emails from us by following the instructions provided in those emails or by contacting us. Please note that even if you opt out of receiving promotional communications, we may still send you non-promotional messages, such as those related to your account or transactions.</p>

          <h3 className='mt-10 font-bold text-lg mb-2 ml-4'>5.3 Do Not Track</h3>

          <p>Some web browsers may offer a Do Not Track feature that allows you to opt out of certain tracking activities. Our website does not currently respond to Do Not Track signals.</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>6. Data Retention</h2>

          <p>We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy unless a longer retention period is required or permitted by law.</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>7. Security</h2>

          <p>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>8. Children s Privacy</h2>

          <p>Our website is not intended for children under the age of 13, and we do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us so that we can delete the information.</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>9. International Users</h2>

          <p>If you are accessing our website from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States, where our servers are located. By using our website, you consent to the transfer of your information to the United States.</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>10. Changes to This Privacy Policy</h2>

          <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the Last Updated date below.</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>11. Contact Us</h2>

          <p>If you have any questions or concerns about this Privacy Policy or our practices regarding your personal information, please contact us.
            Last Updated: 01-06-2024
            By using our website, you acknowledge that you have read and understand this Privacy Policy, and agree to the collection, use, and disclosure of your information as described herein.</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}




