import GratuityCalculator from "@/app/components/GratuityCalculator";
import Link from "next/link";

export const metadata = {
  // ✅ HINDI-SPECIFIC METADATA (2026 UPDATED)
  title: "UAE ग्रेच्युटी कैलकुलेटर - ईओएस बेनिफिट्स कैलकुलेटर 2026",
  description: "फ्री UAE ग्रेच्युटी कैलकुलेटर - MOHRE फेडरल डिक्री लॉ नंबर 33/2021 के अनुसार। Limited, Unlimited, इस्तीफा, बर्खास्तगी - सभी प्रकार के कॉन्ट्रैक्ट के लिए तुरंत गणना करें। हिंदी, अंग्रेजी, उर्दू में उपलब्ध।",
  keywords: "UAE ग्रेच्युटी कैलकुलेटर, सर्विस अवधि, MOHRE, नौकरी छोड़ना, सेवानिवृत्ति, अंत में सेवा लाभ, UAE लेबर लॉ, 2026, end of service benefits, gratuity calculator",
  
  // ✅ HINDI LANG TAG
  alternates: {
    canonical: "https://www.arabsamachar.com/tools/uae-gratuity-calculator",
    languages: {
      "hi": "https://www.arabsamachar.com/tools/uae-gratuity-calculator",
      "hi-IN": "https://www.arabsamachar.com/tools/uae-gratuity-calculator",
      "en": "https://www.arabsamachar.com/en/tools/uae-gratuity-calculator",
      "ur": "https://www.arabsamachar.com/ur/tools/uae-gratuity-calculator",
    },
  },

  // ✅ OPEN GRAPH (HINDI + 2026)
  openGraph: {
    title: "UAE ग्रेच्युटी कैलकुलेटर 2026 - सेवा अवधि के अनुसार तुरंत गणना",
    description: "फ्री UAE ग्रेच्युटी कैलकुलेटर - Limited & Unlimited कॉन्ट्रैक्ट के लिए MOHRE के नियमों अनुसार गणना करें। 2026 में अपडेटेड।",
    url: "https://www.arabsamachar.com/tools/uae-gratuity-calculator",
    siteName: "अरब समाचार",
    type: "website",
    locale: "hi_IN",
    images: [
      {
        url: "https://www.arabsamachar.com/gratuity-calculator-og-hindi.jpg",
        width: 1200,
        height: 630,
        alt: "UAE ग्रेच्युटी कैलकुलेटर - अरब समाचार",
        type: "image/jpeg",
      },
    ],
  },

  // ✅ TWITTER CARD (HINDI)
  twitter: {
    card: "summary_large_image",
    title: "UAE ग्रेच्युटी कैलकुलेटर 2026 | अरब समाचार",
    description: "अपनी सेवा अवधि के अनुसार ग्रेच्युटी की गणना करें - MOHRE नियमों के अनुसार",
    image: "https://www.arabsamachar.com/gratuity-calculator-og-hindi.jpg",
    creator: "@arabsamachar",
  },

  // ✅ ROBOTS & CRAWLERS
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // ✅ HINDI-SPECIFIC TAGS
  language: "hi, hi-IN, en, ur",
  authors: [{ name: "अरब समाचार", url: "https://www.arabsamachar.com" }],
  creator: "अरब समाचार",
  publisher: "अरब समाचार",
  charset: "utf-8",
};

// ✅ SEPARATE VIEWPORT EXPORT (NEXT.JS 13.2+)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function Page() {
  return (
    <>
      {/* ✅ SCHEMA 1: WEB APPLICATION (HINDI + 2026) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "UAE ग्रेच्युटी कैलकुलेटर",
            "description": "फ्री ऑनलाइन कैलकुलेटर - MOHRE फेडरल डिक्री लॉ नंबर 33/2021 के अनुसार UAE ग्रेच्युटी और सेवा अवधि के लाभ की गणना करें।",
            "url": "https://www.arabsamachar.com/tools/uae-gratuity-calculator",
            "applicationCategory": "FinanceApplication",
            "applicationSubCategory": "CalculatorApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "AED",
              "availability": "https://schema.org/InStock",
            },
            "creator": {
              "@type": "Organization",
              "name": "अरब समाचार",
              "url": "https://www.arabsamachar.com",
              "logo": "https://www.arabsamachar.com/arabsamacharwidelogo.jpg",
            },
            "inLanguage": ["hi", "en", "ur"],
            "operatingSystem": "Web (Browser-based)",
            "author": {
              "@type": "Organization",
              "name": "अरब समाचार",
              "url": "https://www.arabsamachar.com",
            },
            "image": "https://www.arabsamachar.com/gratuity-calculator-og-hindi.jpg",
            "datePublished": "2024-01-01",
            "dateModified": "2026-06-11",
            "version": "2.0",
          }),
        }}
      />

      {/* ✅ SCHEMA 2: BREADCRUMB (HINDI) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "होम",
                "item": "https://www.arabsamachar.com",
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "टूल्स",
                "item": "https://www.arabsamachar.com/tools",
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "UAE ग्रेच्युटी कैलकुलेटर",
                "item": "https://www.arabsamachar.com/tools/uae-gratuity-calculator",
              },
            ],
          }),
        }}
      />

      {/* ✅ SCHEMA 3: FAQ (HINDI) - IMPROVES CTR */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Basic Salary और Total Salary में क्या फर्क है?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Basic Salary वह राशि है जो Labour Contract में clearly लिखी होती है । इसमें Housing Allowance, Transport Allowance, Food Allowance जैसे भत्ते शामिल नहीं होते। ग्रेच्युटी की गणना सिर्फ Basic Salary पर होती है ।",
                },
              },
              {
                "@type": "Question",
                "name": "बर्खास्तगी (Termination) पर कितनी ग्रेच्युटी मिलती है?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "अगर कंपनी बिना कारण नौकरी से निकालती है तो पूरी ग्रेच्युटी मिलती है साथ ही नोटिस पीरियड की सैलरी भी। अगर Labour Law के Article 44 के तहत कारण है तो ग्रेच्युटी नहीं मिलती।",
                },
              },
              {
                "@type": "Question",
                "name": "ग्रेच्युटी के लिए कितने साल की नौकरी जरूरी है?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "UAE Labour Law के अनुसार कम से कम 1 पूरा साल लगातार काम करना जरूरी है। 1 साल से कम नौकरी पर कोई ग्रेच्युटी नहीं मिलती, चाहे कारण कुछ भी हो।",
                },
              },
              {
                "@type": "Question",
                "name": "अगर कंपनी ग्रेच्युटी न दे तो क्या करें?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "MOHRE की वेबसाइट या MOHRE App पर Complaint दर्ज करें। आप 800-60 पर call भी कर सकते हैं। MOHRE आमतौर पर 2 हफ्ते में मामला सुलझाता है।",
                },
              },
              {
                "@type": "Question",
                "name": "क्या ग्रेच्युटी पर कोई Tax लगता है?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "UAE में कोई Income Tax नहीं है। ग्रेच्युटी पूरी तरह Tax-Free मिलती है। हालांकि भारत में यह राशि आने पर भारतीय Tax नियम लागू हो सकते हैं।",
                },
              },
              {
                "@type": "Question",
                "name": "यह कैलकुलेटर कितना सटीक है?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "यह कैलकुलेटर MOHRE Federal Decree-Law No. 33 of 2021 के नियमों पर आधारित है और सामान्य मामलों के लिए सटीक है। जटिल मामलों जैसे partial year, unpaid leave, या disputes के लिए MOHRE या कानूनी सलाहकार से संपर्क करें।",
                },
              },
            ],
          }),
        }}
      />

      {/* ✅ SCHEMA 4: TOOL SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Tool",
            "name": "UAE ग्रेच्युटी कैलकुलेटर 2026",
            "description": "MOHRE नियमों के अनुसार UAE सेवा अवधि ग्रेच्युटी लाभों की गणना करें",
            "url": "https://www.arabsamachar.com/tools/uae-gratuity-calculator",
            "image": "https://www.arabsamachar.com/gratuity-calculator-og-hindi.jpg",
            "author": {
              "@type": "Organization",
              "name": "अरब समाचार",
              "url": "https://www.arabsamachar.com",
            },
            "datePublished": "2024-01-01",
            "dateModified": "2026-06-11",
            "inLanguage": "hi",
          }),
        }}
      />
<div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-amber-50">
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-amber-50">
  <GratuityCalculator />
</div>
         {/* — BELOW FOLD CONTENT — */}
     <div className="w-[90%] md:w-[70%] mx-auto px-4 pb-16 space-y-10 mt-4 ">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">UAE ग्रेच्युटी कैलक्यूलेटर कैसे उपयोग करें ?</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4 text-gray-800 text-md md:text-lg leading-relaxed">
              <p>
                UAE ग्रेच्युटी कैलक्यूलेटर के सबसे पहले सेक्शन मे आपको अपनी <strong>बेसिक सैलरी</strong> जो आपके लेबर कान्ट्रैक्ट मे लिखी हो वो UAE दिरहम मे लिखनी है । </p>
                <p>याद रखिए जो कुल सैलरी आपके बैंक अकाउंट मे या एक्सचेंज मे आती है वो बेसिक सैलरी से अलग हो सकती है क्युकी कुल सैलरी मे बेसिक सैलरी और भत्ता जैसे रहने का खर्च या ट्रांसपोर्ट का खर्च भी शामिल होता है । 
              </p>
               <p>इसके बाद आपको <strong>नौकरी शुरू करने की तारीख</strong>और<strong>नौकरी के आखरी दिन की तारीख</strong> डालनी है । नौकरी शुरू करने की तारीख भी वही होगी जो आपके लेबर कान्ट्रैक्ट पर लिखी हो । आपके रेज़िडन्सी वीजा पर लिखी तारीख अलग हो सकती है इसलिए सही तारीख के लिए हमेशा लेबर कान्ट्रैक्ट पर लिखी तारीख ही देखें । </p>
               <p>आपका लेबर कान्ट्रैक्ट <strong>लिमिटेड या अनलिमिटेड</strong> है वो सिलेक्ट करें । ज्यादातर केस में लिमिटेड ही होता है क्युकी 2023 के बाद से MoHRE ने अनलिमिटेड कान्ट्रैक्ट को लगभग खत्म कर दिया है । </p>
               <p>इसके बाद <strong>नौकरी छोड़ने का कारण </strong> सिलेक्ट करें । जैसे आपने नौकरी कान्ट्रैक्ट खत्म होने से पहले खुद छोड़ दी है या आपको कंपनी ने नौकरी से निकाल दिया है या फिर आपका लेबर कान्ट्रैक्ट पूरा हो गया है और अब उस कंपनी मे काम नही करना चाहते । </p>
               <p>इसके बाद <strong>Gratuity Calculate करें</strong> बटन दबाएं । कैलक्यूलेटर के हिसाब से जो gratuity बनती है वो स्क्रीन पर लिख कर या जाएगी इसे आपक pdf मे डाउनलोड भी कर सकते हैं । </p>  
               <p>UAE ग्रेच्युटी के साथ आप <Link href="/national/uae-employees-sick-leave-certificate" className="text-blue-600 underline">UAE Sick Leave                
               </Link> के नियमों के बारे मे भी जानकारी ले सकते हैं ।                 
              </p>                
            </div>         
             

          </section>
         {/* HOW IT WORKS */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-4">UAE ग्रेच्युटी कैसे काम करती है?</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4 text-gray-700 text-md md:text-lg leading-relaxed">
              <p>
                UAE में काम करने वाला हर कर्मचारी, चाहे वो किसी भी देश का हो — <strong>End of Service Gratuity (ग्रेच्युटी)</strong> पाने का अधिकार है।
                यह Federal Decree-Law No. 33 of 2021 के तहत कानूनी रूप से अनिवार्य है और आपकी कंपनी इसे देने से इनकार नही कर सकती ।
              </p>
              <p>
                ग्रेच्युटी की गणना आपकी <strong>Basic Salary</strong> पर ही होती है — Housing, Transport Allowance या किसी और प्रकार का भत्ता इसमें शामिल नहीं होता।
                Labour Contract में जो सैलरी लिखी है, वही Basic Salary मानी जाती है।
              </p>

              <div className="bg-blue-50 rounded-xl p-4 space-y-2">
                <p className="font-semibold text-blue-900">📐 गणना का फॉर्मूला:</p>
                <p className="text-blue-800"><strong>पहले 5 साल:</strong> Daily Salary × 21 दिन × सेवा वर्ष</p>
                <p className="text-blue-800"><strong>5 साल के बाद:</strong> Daily Salary × 30 दिन × अतिरिक्त सेवा वर्ष</p>
                <p className="text-blue-800"><strong>Daily Salary</strong> = Basic Salary ÷ 30</p>
              </div>

              <p>
                ग्रेच्युटी की <strong>अधिकतम सीमा 24 महीने</strong> की कुल Basic Salary है।
                चाहे नौकरी 30 साल की हो, इससे ज्यादा ग्रेच्युटी नहीं मिलेगी।
              </p>
               <p>UAE में अब कामगारों को इस तारीख तक मिलेगा वेतन <Link href="/national/uae-employees-sick-leave-certificate" className="text-blue-600 underline">UAE Salary Rule               
               </Link>                 
              </p>   
            </div>
          </section>
          {/* LIMITED vs UNLIMITED */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-4">Limited और Unlimited Contract में फर्क </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-5">
                <p className="font-bold text-blue-700 mb-2">✅ Limited Contract</p>
                <ul className="text-md text-gray-600 space-y-2">
                  <li>• तय समय सीमा के लिए होता है (जैसे 2 साल)</li>
                  <li>• इस्तीफा देने पर भी <strong>पूरी ग्रेच्युटी</strong> मिलती है । </li>
                  <li>• UAE में 2023 के बाद अधिकतर नए कॉन्ट्रैक्ट Limited हैं ।</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5">
                <p className="font-bold text-amber-700 mb-2">⚠️ Unlimited Contract</p>
                <ul className="text-md text-gray-600 space-y-2">
                  <li>• इस्तीफा पर 1-3 साल: <strong>1/3 ग्रेच्युटी</strong></li>
                  <li>• इस्तीफा पर 3-5 साल: <strong>2/3 ग्रेच्युटी</strong></li>
                  <li>• 5 साल बाद: <strong>पूरी ग्रेच्युटी</strong></li>
                </ul>
              </div>
            </div>
          </section>
           {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-4">अक्सर पूछे जाने वाले सवाल (faq)</h2>
            <div className="space-y-3">
              {[
                
                {
                  q: "Basic Salary और Total Salary में क्या फर्क है?",
                  a: "Basic Salary वह राशि है जो Labour Contract में clearly लिखी होती है। इसमें Housing Allowance, Transport Allowance, Food Allowance जैसे भत्ते शामिल नहीं होते। ग्रेच्युटी की गणना सिर्फ Basic Salary पर होती है।"
                },
                {
                  q: "बर्खास्तगी (Termination) पर कितनी ग्रेच्युटी मिलती है?",
                  a: "अगर कंपनी बिना कारण नौकरी से निकालती है तो पूरी ग्रेच्युटी मिलती है साथ ही नोटिस पीरियड की सैलरी भी। अगर Labour Law के Article 44 के तहत कारण है तो ग्रेच्युटी नहीं मिलती।"
                },
                {
                  q: "ग्रेच्युटी के लिए कितने साल की नौकरी जरूरी है?",
                  a: "UAE Labour Law के अनुसार कम से कम 1 पूरा साल लगातार काम करना जरूरी है। 1 साल से कम नौकरी पर कोई ग्रेच्युटी नहीं मिलती, चाहे कारण कुछ भी हो।"
                },
               
                {
                  q: "अगर कंपनी ग्रेच्युटी न दे तो क्या करें?",
                  a: "MOHRE की वेबसाइट या MOHRE App पर Complaint दर्ज करें। आप 800-60 पर call भी कर सकते हैं। MOHRE आमतौर पर 2 हफ्ते में मामला सुलझाता है।"
                },
                 {
                  q: "क्या ग्रेच्युटी पर कोई Tax लगता है?",
                  a: "UAE में कोई Income Tax नहीं है। ग्रेच्युटी पूरी तरह Tax-Free मिलती है। हालांकि भारत में यह राशि आने पर भारतीय Tax नियम लागू हो सकते हैं।"
                },
                {
                  q: "यह कैलकुलेटर कितना सटीक है?",
                  a: "यह कैलकुलेटर MOHRE Federal Decree-Law No. 33 of 2021 के नियमों पर आधारित है और सामान्य मामलों के लिए सटीक है। जटिल मामलों जैसे partial year, unpaid leave, या disputes के लिए MOHRE या कानूनी सलाहकार से संपर्क करें।"
                },
              ].map((item, i) => (
                <details key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm group">
                  <summary className="px-5 py-4 cursor-pointer font-semibold text-gray-800 text-md list-none flex justify-between items-center">
                    {item.q}
                    <span className="text-gray-400 group-open:rotate-180 transition-transform text-lg">▾</span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
          {/* DISCLAIMER */}
          <section>
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 text-xs text-gray-500 leading-relaxed mt-4">
              <p className="font-semibold text-gray-600 mb-1 ">⚠️ अस्वीकरण (Disclaimer)</p>
              <p>
                यह कैलकुलेटर केवल सामान्य जानकारी के लिए है। परिणाम अनुमानित हैं।
                बिलकुल सटीक गणना और कानूनी सलाह के लिए (<a href="https://www.mohre.gov.ae" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">MoHRE</a>) या किसी अधिकृत कानूनी सलाहकार से संपर्क करें।                 
              </p>
            </div>
          </section>
      </div>
      </div>
       
    </>
  );
}
