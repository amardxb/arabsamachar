import GratuityCalculator from "@/app/components/GratuityCalculator";

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
                "name": "UAE में ग्रेच्युटी की गणना कैसे होती है?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "UAE में ग्रेच्युटी की गणना बेसिक सैलरी, सेवा अवधि और कॉन्ट्रैक्ट प्रकार के आधार पर होती है। Limited कॉन्ट्रैक्ट वालों को पूरी ग्रेच्युटी मिलती है। Unlimited कॉन्ट्रैक्ट पर इस्तीफा देने पर सेवा वर्षों के अनुसार 1/3 से 2/3 मिलती है।",
                },
              },
              {
                "@type": "Question",
                "name": "ग्रेच्युटी के लिए न्यूनतम सेवा अवधि कितनी है?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "UAE में ग्रेच्युटी के लिए कम से कम 1 पूरे साल की लगातार सेवा आवश्यक है। MOHRE के नियमों के अनुसार यह अनिवार्य है।",
                },
              },
              {
                "@type": "Question",
                "name": "Limited और Unlimited कॉन्ट्रैक्ट में ग्रेच्युटी में क्या फर्क है?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Limited कॉन्ट्रैक्ट: 1 साल बाद पूरी ग्रेच्युटी। Unlimited कॉन्ट्रैक्ट: इस्तीफा पर 1-3 साल में 1/3, 3-5 साल में 2/3। 5+ साल बाद दोनों को समान लाभ।",
                },
              },
              {
                "@type": "Question",
                "name": "UAE में ग्रेच्युटी की अधिकतम सीमा क्या है?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "अधिकतम ग्रेच्युटी 24 महीने की बेसिक सैलरी तक सीमित है।",
                },
              },
              {
                "@type": "Question",
                "name": "क्या यह कैलकुलेटर सही है?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "यह कैलकुलेटर MOHRE Federal Decree-Law No. 33 of 2021 के अनुसार काम करता है। अनुमानित परिणाम हैं। सटीक गणना के लिए MOHRE या कानूनी सलाहकार से संपर्क करें।",
                },
              },
              {
                "@type": "Question",
                "name": "बर्खास्तगी (Termination) पर ग्रेच्युटी कितनी मिलती है?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "कंपनी द्वारा बिना कारण बर्खास्तगी पर पूरी ग्रेच्युटी + 3 महीने की सैलरी मिलती है। कारण के साथ बर्खास्तगी पर कुछ कम हो सकती है।",
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

      <div className="py-10 px-4">
        <GratuityCalculator />
      </div>
    </>
  );
}
