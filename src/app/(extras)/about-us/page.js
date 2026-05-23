import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link';

/* export const metadata = {
  title: "About",
  alternates: {
        canonical: 'https://www.arabsamachar.com/about-us'
      }
} */
export const metadata = {
  title: "About Us - अरब समाचार | Arab Samachar हिंदी न्यूज़",
  description: "अरब समाचार एक हिंदी न्यूज़ प्लेटफॉर्म है जहाँ आप UAE, Gulf और दुनिया भर की ताज़ा खबरें, ब्रेकिंग न्यूज़, लाइफस्टाइल, फाइनेंस और टेक्नोलॉजी से जुड़ी सभी महत्वपूर्ण जानकारी पढ़ सकते हैं।",
  alternates: {
    canonical: 'https://www.arabsamachar.com/about-us',
  },
};

export default function page() {
  return (
    <div className='w-[95%] lg:w-[75%] m-auto min-h-screen pt-6'>
      <h1 className='text-2xl font-bold m-auto'>About Us</h1>
      <Tabs defaultValue="hindi">
        <TabsList className="w-full flex justify-around">
          <TabsTrigger value="hindi" >Hindi</TabsTrigger>
          <TabsTrigger value="english">English</TabsTrigger>
        </TabsList>
        <TabsContent value="hindi" >
          <p>अरब समाचार, अरब तथा दुनिया के सभी हिंदी भाषी लोगो को ध्यान में रखकर बनाया गया है। हम भारत ,अरब जगत तथा विश्व के कोने कोने से सभी उपयोगी और बारीक समाचारो को संयोजित करते हैं ताकि आपको हर समाचार आपकी अपनी हिंदी भाषा में मिल सके।</p>

          <p>हमारी हर खबर भारत तथा भारत के लोगो की सांस्कृतिक धरोहरों को महत्वपूर्ण रखते हुई प्रस्तुत की जाती है। हमारा मुख्य उद्देश्य सभी भारतीयों को सच्चे समाचारो से अवगत करना है ताकि हम भारतीयों को कोई भ्रमित न कर सके। </p>

          <p>हम अपने सभी समाचार पाठकों को एक निष्पक्ष और स्वतंत्र मंच प्रदान करने की कोशिश करते हैं जहाँ आप सदैव देश को गौरवान्वित महसूस करते रहें।  हम आप सभी भारतीयों को एक साथ बनाये रखने के प्रयास में लगे हुए हैं।</p>

          <p>अरब समाचार सदैव आपको सच्ची और उपयोगी खबरों से अवगत करने का प्रयास करता रहेगा।  हम आपसे अरब समाचार से जुड़े रहने का अनुरोध करते हैं। अगर आप अपने कोई विचार हमसे साझा करना चाहते हैं तो आप <Link href="/contact-us" className='text-blue-700'>Contact us</Link> पेज पर जाकर वहाँ फॉर्म भर कर हमें अपने मैसेज भेज सकते हैं.</p>

        </TabsContent>
        <TabsContent value="english">
          <p>Arab News is made keeping in mind all Hindi speaking people of Arab and the world. We compile all the useful and detailed news from India, Arab world and every corner of the world so that you can get every news in your own Hindi language.</p>

          <p>Every news of ours is presented keeping in mind the cultural heritage of India and its people. Our main objective is to make all Indians aware of the true news so that no one can mislead us Indians.</p>

          <p>We try to provide an unbiased and independent platform to all our news readers where you always feel proud of the country. We are trying our best to keep all you Indians together.</p>

          <p>Arab News will always try to keep you updated with true and useful news. We request you to stay connected with Arab News. If you want to share any of your thoughts with us, you can send us your message by going to the <Link href="/contact-us" className='text-blue-700'>Contact us</Link> page and filling the form there.</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}


