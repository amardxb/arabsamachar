import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* export const metadata = {
  title:  "Copyright", 
  alternates: {
    canonical: 'https://www.arabsamachar.com/copyright'
  }
}  */
export const metadata = {
  title: "Copyright - अरब समाचार | Arab Samachar",
  description: "इस पेज पर अरब समाचार की कॉपीराइट नीतियां दी गई हैं । यहाँ आप जान सकते हैं कि वेबसाइट पर प्रकाशित सभी सामग्री का उपयोग, उसका स्वामित्व और सुरक्षा अधिकार कैसे सुरक्षित किए जाते हैं।",
  alternates: {
    canonical: 'https://www.arabsamachar.com/copyright',
  },
};
 

export default function page() {
  return (
    <div className='w-full lg:w-[75%] m-auto min-h-screen mt-6'>
      <h1 className='text-2xl font-bold m-auto'>Copyright Policy</h1>
      <Tabs defaultValue="hindi">
        <TabsList className="w-full flex justify-around ">
          <TabsTrigger value="hindi" >Hindi</TabsTrigger>
          <TabsTrigger value="english">English</TabsTrigger>
        </TabsList>
        <TabsContent value="hindi" className="mb-6">
          <h2 className='mt-10 font-bold text-xl mb-4'>परिचय</h2>

          <p>अरब समाचार  में आपका स्वागत है, आपकी सूचना और जानकारी का भरोसेमंद स्रोत। यह कॉपीराइट नीति हमारी वेबसाइट पर कॉपीराइट सामग्री का उपयोग करने के संबंध में नियम और शर्तों को व्याख्या करती है। अरब समाचार  तक पहुंच करके, आप इन नियमों और शर्तों का पालन करने के लिए सहमत होते हैं।</p>

          <h2>सामग्री की स्वामित्व</h2>

          <p>अरब समाचार  पर प्रकाशित सभी सामग्री, जैसे लेख, छवियाँ, वीडियो, ग्राफिक्स, और किसी भी अन्य सामग्री, अरब समाचार  या उसके सामग्री प्रदाताओं की बुद्धिजीवी संपत्ति है, और कॉपीराइट कानूनों द्वारा संरक्षित है। इस सामग्री का अनधिकृत उपयोग, पुनः उत्पादन, या वितरण सख्त रूप से निषिद्ध है।</p>

          <h2>अनुमतियाँ
          </h2>
          <p>यदि आप अरब समाचार  से कोई सामग्री का उपयोग करना चाहते हैं, तो आपको हमसे या उस संबंधित कॉपीराइट धारक से स्पष्ट अनुमति प्राप्त करनी होगी। अनुमति मामले-मामले में प्रदान की जाती है और इसमें लाइसेंसिंग समझौतों या अन्य व्यवस्थाओं का शामिल हो सकता है।</p>

          <h2>स्तरांकन</h2>

          <p>अरब समाचार  से अनुमति के साथ सामग्री का उपयोग करते समय, आपको स्रोत का सही स्तरांकन प्रदान करना होगा। इसमें सामग्री के स्रोत को स्पष्ट रूप से इंगित करना शामिल है और, यदि योग्यता हो, अरब समाचार  पर मूल स्रोत पर लिंक प्रदान करना शामिल है।
          </p>
          <h2>उचित उपयोग</h2>

          <p>अरब समाचार  पर कुछ सामग्री को कॉपीराइट कानून के अधीन उचित उपयोग के लिए अपवादों का सामना कर सकता है। उचित उपयोग को सीमित स्थितियों के लिए कॉपीराइट सामग्री का प्रतिबंध किया जा सकता है। लेकिन, उचित उपयोग मामले-मामले में निर्धारित किया जाता है, और कॉपीराइट सामग्री का अनधिकृत उपयोग फिर भी उत्पत्ति को संक्षिप्त कर सकता है।
          </p>
          <h2>कॉपीराइट उल्लंघन की रिपोर्ट</h2>

          <p>यदि आपको लगता है कि अरब समाचार  पर किसी सामग्री द्वारा आपका कॉपीराइट उल्लंघित किया गया है, तो कृपया तुरंत

            हमसे संपर्क करें निम्नलिखित जानकारी के साथ:</p>
          <ul>
            <li>1. उल्लंघित किए गए कॉपीराइट सामग्री की पहचान।</li>
            <li>2. उल्लंघित सामग्री का पहचान और अरब समाचार  पर उसका स्थान।</li>
            <li>3. आपकी संपर्क जानकारी (नाम, पता, ईमेल, फोन नंबर)।</li>
            <li>4. आपका ऐसा मानना कि सामग्री का उपयोग कॉपीराइट धारक द्वारा अधिकृत नहीं है।</li>
            <li>5. आपका ऐसा दावा, जिसमें आप शपथ पर जानकारी है कि उपरोक्त जानकारी सही है और आप कॉपीराइट धारक हैं या कॉपीराइट धारक के प्रतिनिधित्व करने के लिए अधिकृत हैं।</li>
          </ul>

          <h2>कॉपीराइट नीति का परिवर्तन</h2>
          <p>अरब समाचार  को इस कॉपीराइट नीति को किसी भी समय पहले अथवा अपडेट करने का अधिकार सुरक्षित रहता है। हम आपको इस नीति की नियमित जांच करने का सुझाव देते हैं।</p>

          <h2>संपर्क करें</h2>

          <p>यदि इस कॉपीराइट नीति के संबंध में आपके पास कोई सवाल या संदेह है, तो कृपया हमसे संपर्क करें ।

            अरब समाचार  का उपयोग करके, आप इस कॉपीराइट नीति में बताए गए नियमों और शर्तों का पालन करने के लिए सहमत होते हैं। अगर आप इन नियमों के खिलाफ हैं, तो कृपया हमारी वेबसाइट का उपयोग न करें।</p>
        </TabsContent>
        <TabsContent value="english" className="mb-6">

          <h2>Introduction</h2>

          <p>Welcome to Arab Samachar, your trusted source for news and information. This Copyright Policy outlines the terms and conditions regarding the use of copyrighted material on our website. By accessing Arab Samachar, you agree to abide by these terms and conditions.</p>

          <h2>Ownership of Content</h2>

          <p>All content published on Arab Samachar, including articles, images, videos, graphics, and any other materials, is the intellectual property of Arab Samachar or its content providers, and is protected by copyright laws. Unauthorized use, reproduction, or distribution of this content is strictly prohibited.</p>

          <h2>Permissions</h2>

          <p>If you wish to use any content from Arab Samachar, you must obtain explicit permission from us or the respective copyright holder. Permission may be granted on a case-by-case basis and may involve licensing agreements or other arrangements.</p>

          <h2>Attribution</h2>

          <p>When using content from Arab Samachar with permission, you must provide proper attribution to the source. This includes clearly indicating the source of the content and, if applicable, providing a link back to the original source on Arab Samachar.</p>

          <h2>Fair Use</h2>

          <p>Some content on Arab Samachar may be subject to fair use exceptions under copyright law. Fair use allows for the limited use of copyrighted material for purposes such as criticism, commentary, news reporting, teaching, scholarship, or research. However, fair use is determined on a case-by-case basis, and unauthorized use of copyrighted material may still constitute infringement.</p>

          <h2>Reporting Copyright Infringement</h2>

          <p>If you believe that your copyright has been infringed upon by content on Arab Samachar, please contact us immediately with the following information:</p>
          <ul>
            <li>1. Identification of the copyrighted work claimed to have been infringed.</li>
            <li>2. Identification of the infringing material and its location on Arab Samachar.</li>
            <li>3. Your contact information (name, address, email, phone number).</li>
            <li>4. A statement by you that you have a good faith belief that the use of the material is not authorized by the copyright owner.</li>
            <li>5. A statement by you, made under penalty of perjury, that the above information is accurate and that you are the copyright owner or authorized to act on behalf of the copyright owner.</li>
          </ul>

          <h2>Changes to Copyright Policy</h2>

          <p>Arab Samachar reserves the right to modify or update this Copyright Policy at any time without prior notice. We encourage you to review this policy periodically for any changes.</p>

          <h2>Contact Us</h2>

          <p>If you have any questions or concerns regarding this Copyright Policy, please contact us at  .
            By using Arab Samachar, you agree to the terms and conditions outlined in this Copyright Policy. If you do not agree to these terms, please refrain from using our website.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
