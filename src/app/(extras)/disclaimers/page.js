import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {
  title: "Disclaimers - अरब समाचार | Arab Samachar",
  description: "हमारे इस पेज पर अरब समाचार का डिस्क्लेमर दिया गया है। यहाँ बताया गया है कि हमारी वेबसाइट पर प्रकाशित सभी समाचार और जानकारी केवल सामान्य सूचना के उद्देश्य से हैं और इसकी पूर्ण सटीकता की गारंटी नहीं दी जाती है ।",
  alternates: {
    canonical: 'https://www.arabsamachar.com/disclaimers'
  }
}
 

export default function page() {
  return (
    <div className='w-full lg:w-[75%] m-auto min-h-screen mt-6'>
      <h1 className='text-2xl font-bold m-auto'>Disclaimer</h1>
      <Tabs defaultValue="hindi">
        <TabsList className="w-full flex justify-around ">
          <TabsTrigger value="hindi" >Hindi</TabsTrigger>
          <TabsTrigger value="english">English</TabsTrigger>
        </TabsList>
        <TabsContent value="hindi" className="mb-6">
          <h2 className='mt-10 font-bold text-xl mb-4'>परिचय</h2>
          <p>'अरब समाचार'  में आपका स्वागत है, आपकी सूचना और जानकारी का भरोसेमंद स्रोत। निम्नलिखित हमारी वेबसाइट के उपयोग के नियम और शर्तों को आवश्यकतानुसार व्यावसायिक रूप से व्यवस्थित करती है। अरब समाचार तक पहुंच करके, आप इन नियमों और शर्तों का पालन करने के लिए सहमत होते हैं।</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>सूचना की सटीकता</h2>

          <p>हालांकि हम सही और अद्यतन जानकारी प्रदान करने का प्रयास करते हैं, लेकिन अरब समाचार  किसी भी प्रकार की सटीकता, अद्यतनता, स्थिरता, उपयुक्तता, या उपलब्धता के बारे में कोई प्रकार की प्रतिनिधित्व या वारंटी नहीं देता। इसलिए, आप ऐसी जानकारी पर निर्भर करने से सावधानी बरतें।</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>संपादकीय सामग्री</h2>

          <p>अरब समाचार  पर प्रकाशित लेखों और संपादकीय सामग्री में व्यक्त किए गए विचार और राय हमारे लेखकों की होती हैं और यह आधिकारिक नीति या स्थिति का प्रतिनिधित्व नहीं करती हैं। हम किसी भी राजनीतिक, धार्मिक, या विचारशील दृष्टिकोण का समर्थन नहीं करते हैं जो सामग्री में व्यक्त किए गए हैं।</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>बाहरी लिंक</h2>

          <p>हमारी वेबसाइट पर बाहरी वेबसाइटों के लिंक हो सकते हैं जो अरब समाचार  द्वारा प्रदान या रखे नहीं जाते हैं। हम किसी भी बाहरी वेबसाइट पर किसी भी जानकारी की सटीकता, प्रासंगिकता, समयानुसारता, या पूर्णता की गारंटी नहीं देते हैं। किसी भी बाहरी लिंक का समावेश केवल उनके भीतर व्यक्त विचारों की सिफारिश या समर्थन को निर्देशित नहीं करता है।
          </p>
          <h2 className='mt-10 font-bold text-xl mb-4'>हानि की प्रतिबद्धता</h2>

          <p>अरब समाचार  किसी भी नुकसान या हानि के लिए जिम्मेदार नहीं होगा, जिसमें सीधे या अप्रत्यक्ष नुकसान या हानि शामिल है, या डेटा का नुकसान या लाभों की कमी से उत्पन्न नुकसान शामिल है, या इस वेबसाइट का उपयोग करने के संबंध में हानि उत्पन्न होती है।</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>अस्वीकृति के बदलाव</h2>

          <p>अरब समाचार  को इस अस्वीकृति को किसी भी समय पहले अथवा अपडेट करने का अधिकार सुरक्षित रहता है। हम

            आपको इस अस्वीकृति के बारे में समय-समय पर जांचने की सलाह देते हैं।
          </p>
          <h2 className='mt-10 font-bold text-xl mb-4'>संपर्क करें</h2>

          <p>यदि आपके पास इस अस्वीकृति के संबंध में कोई सवाल या चिंता है, तो कृपया हमसे संपर्क करें।

            अरब समाचार  का उपयोग करके, आप इस अस्वीकृति में बताई गई नियमों और शर्तों का पालन करने के लिए सहमत होते हैं। अगर आप इन नियमों के खिलाफ हैं, तो कृपया हमारी वेबसाइट का उपयोग न करें।</p>
        </TabsContent>
        <TabsContent value="english" className="mb-6">

          <h2 className='mt-10 font-bold text-xl mb-4'>Introduction</h2>

          <p>Welcome to Arab Samachar, your trusted source for news and information. The following disclaimer outlines the terms and conditions governing the use of our website. By accessing Arab Samachar, you agree to abide by these terms and conditions.</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>Accuracy of Information</h2>

          <p>While we strive to provide accurate and up-to-date information, Arab Samachar makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>Editorial Content</h2>

          <p>The views and opinions expressed in the articles and editorial content published on Arab Samachar are those of the authors and do not necessarily reflect the official policy or position of Arab Samachar. We do not endorse any political, religious, or ideological views expressed in the content.</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>External Links</h2>

          <p>Our website may contain links to external websites that are not provided or maintained by Arab Samachar. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites. The inclusion of any external links does not necessarily imply a recommendation or endorsement of the views expressed within them.</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>Limitation of Liability</h2>

          <p>In no event will Arab Samachar be liable for any loss or damage, including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>Changes to Disclaimer</h2>

          <p>Arab Samachar reserves the right to modify or update this disclaimer at any time without prior notice. We encourage you to review this disclaimer periodically for any changes.</p>

          <h2 className='mt-10 font-bold text-xl mb-4'>Contact Us</h2>

          <p>If you have any questions or concerns regarding this disclaimer, please contact us.

            By using Arab Samachar, you agree to the terms and conditions outlined in this disclaimer. If you do not agree to these terms, please refrain from using our website.</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
