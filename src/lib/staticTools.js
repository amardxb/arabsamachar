// Ye tool pages Sanity schema ka hissa nahi hain (weather, gold-rate, exchange-rate,
// prayer-time, gratuity calculator) - isliye inhe yahan manually maintain kar rahe hain.
// Jab bhi koi NAYA tool page add karo, bas yahan ek naya object add kar dena.

export const staticTools = [
  {
    title: "UAE मौसम | UAE Weather",
    url: "/tools/weather/uae",
    keywords: ["uae weather", "dubai weather", "mausam", "temperature uae", "uae temperature"],
  },
  {
    title: "सऊदी अरब मौसम | Saudi Arabia Weather",
    url: "/tools/weather/saudi",
    keywords: ["saudi weather", "riyadh weather", "mausam saudi", "saudi temperature"],
  },
  {
    title: "क़तर मौसम | Qatar Weather",
    url: "/tools/weather/qatar",
    keywords: ["qatar weather", "doha weather", "mausam qatar", "qatar temperature"],
  },
  {
    title: "कुवैत मौसम | Kuwait Weather",
    url: "/tools/weather/kuwait",
    keywords: ["kuwait weather", "kuwait city weather", "mausam kuwait", "kuwait temperature"],
  },
  {
    title: "बहरीन मौसम | bahrain Weather",
    url: "/tools/weather/bahrain",
    keywords: ["bahrain weather", "manama weather", "mausam bahrain", "bahrain temperature"],
  },
  {
    title: "ओमान मौसम | Oman Weather",
    url: "/tools/weather/oman",
    keywords: ["oman weather", "muscat weather", "mausam oman", "oman temperature"],
  },
   
  {
    title: "UAE गोल्ड रेट | UAE Gold Silver Rate",
    url: "/tools/gold-silver-rate/uae",
    keywords: ["gold rate uae", "gold price dubai", "gold rate today", "gold price today", "gold rate today dubai", "sona rate", "22k gold price", "uae silver rate", "dubai silver rate"],
  },
  {
    title: "Saudi गोल्ड रेट | Saudi Gold Silver Rate",
    url: "/tools/gold-silver-rate/saudi",
    keywords: ["gold rate saudi", "gold price saudi", "sona rate", "22k gold price", "gold rate riyad", "saudi silver rate" ],
  },
  {
    title: "कतर गोल्ड रेट | Qatar Gold Silver Rate",
    url: "/tools/gold-silver-rate/qatar",
    keywords: ["gold rate qatar", "gold price qatar", "sona rate", "22k gold price","qatar silver rate"],
  },
  {
    title: "कुवैत गोल्ड रेट | Kuwait Gold Silver Rate",
    url: "/tools/gold-silver-rate/kuwait",
    keywords: ["gold rate kuwait", "gold price kuwait ", "sona rate", "22k gold price", "kuwait silver rate"],
  },
  {
    title: "बहरीन गोल्ड रेट | Bahrain Gold Silver Rate",
    url: "/tools/gold-silver-rate/bahrain",
    keywords: ["gold rate bahrain", "gold price bahrain", "sona rate", "22k gold price", "bahrain silver rate"],
  },
  {
    title: "ओमान गोल्ड रेट | Oman Gold Silver Rate",
    url: "/tools/gold-silver-rate/oman",
    keywords: ["gold rate oman ", "gold price oman ", "sona rate", "22k gold price","oman silver rate"],
  },  
  {
    title: "UAE एक्सचेंज रेट | UAE Exchange Rate",
    url: "/tools/exchange-rate/uae",
    keywords: ["exchange rate uae", "dirham to rupee", "inr aed rate", "currency rate today"],
  },
  {
    title: "सऊदी एक्सचेंज रेट | Saudi Exchange Rate",
    url: "/tools/exchange-rate/saudi",
    keywords: ["exchange rate saudi", "riyal to rupee", "inr sar rate", "currency rate today"],
  },
  {
    title: "कतर एक्सचेंज रेट | Qatar Exchange Rate",
    url: "/tools/exchange-rate/qatar",
    keywords: ["exchange rate qatar", "riyal to rupee", "inr qtr rate", "currency rate today"],
  },
  {
    title: "कुवैत एक्सचेंज रेट | Kuwait Exchange Rate",
    url: "/tools/exchange-rate/kuwait",
    keywords: ["exchange rate kuwait", "dinar to rupee", "inr kwd rate", "currency rate today"],
  },
  {
    title: "बहरीन एक्सचेंज रेट | bahrain Exchange Rate",
    url: "/tools/exchange-rate/bahrain",
    keywords: ["exchange rate bahrain", "dinar to rupee", "inr bhr rate", "currency rate today"],
  },
  {
    title: " ओमान एक्सचेंज रेट | oman Exchange Rate",
    url: "/tools/exchange-rate/oman",
    keywords: ["exchange rate oman", "omani rial to rupee", "inr omr rate", "currency rate today"],
  },  

  {
    title: "UAE नमाज़ का समय | UAE Prayer Time",
    url: "/tools/prayer-time/uae",
    keywords: ["prayer time uae", "namaz time dubai", "azan time"],
  },
  {
    title: "सऊदी नमाज़ का समय | Saudi Prayer Time",
    url: "/tools/prayer-time/saudi",
    keywords: ["prayer time saudi", "namaz time saudi", "azan time"],
  },
  {
    title: "कतर नमाज़ का समय | Qatar Prayer Time",
    url: "/tools/prayer-time/qatar",
    keywords: ["prayer time qatar", "namaz time qatar", "azan time"],
  },
  {
    title: "कुवैत नमाज़ का समय | Kuwait Prayer Time",
    url: "/tools/prayer-time/kuwait",
    keywords: ["prayer time kuwait", "namaz time kuwait", "azan time"],
  },
  {
    title: "बहरीन नमाज़ का समय | bahrain Prayer Time",
    url: "/tools/prayer-time/bahrain",
    keywords: ["prayer time bahrain", "namaz time bahrain", "azan time"],
  },
  {
    title: "ओमान नमाज़ का समय | Oman Prayer Time",
    url: "/tools/prayer-time/oman",
    keywords: ["prayer time oman", "namaz time oman", "azan time"],
  },  
  {
    title: "UAE में पेट्रोल डीजल का रेट | UAE fuel price",
    url: "/tools/fuel-rates/uae",
    keywords: [
      "uae fuel price today",
      "petrol price dubai",
      "diesel price uae",
      "adnoc fuel price",
      "epco fuel price",
      "uae petrol rate today",
      "special 95 price uae",
      "super 98 price uae",
      "e-plus 91 price uae",
      "uae diesel rate today",       
      "new fuel price uae",
      "petrol rate abu dhabi",
      "petrol rate sharjah",
      "uae fuel price update"
    ]
  },
  {
    title: "सऊदी में पेट्रोल डीजल का रेट | Saudi fuel price",
    url: "/tools/fuel-rates/saudi",
    keywords: [
      "saudi arabia fuel price today",
      "petrol price saudi arabia",
      "diesel price saudi arabia",
      "aramco fuel price",
      "saudi petrol price update",
      "petrol 91 price saudi",
      "petrol 95 price saudi",
      "saudi diesel rate today",      
      "new fuel price saudi arabia",
      "petrol rate riyadh",
      "petrol rate jeddah",
      "petrol rate dammam",
      "saudi fuel price monthly update",
      "wqod fuel price"
    ]
  },
  {
    title: "कतर में पेट्रोल डीजल का रेट | Qatar fuel price",
    url: "/tools/fuel-rates/qatar",
    keywords: [
      "qatar fuel price today",
      "petrol price qatar",
      "diesel price qatar",
      "woqod fuel price",
      "qatar petrol price update",
      "premium petrol price qatar",
      "super petrol price qatar",
      "qatar diesel rate today",      
      "new fuel price qatar",
      "petrol rate doha",
      "petrol rate al rayyan",
      "petrol rate al khor",
      "qatar fuel price monthly update",
      "qatar energy fuel price"
    ]
  },
  {
    title: "कुवैत में पेट्रोल डीजल का रेट | Kuwait fuel price",
    url: "/tools/fuel-rates/kuwait",
    keywords: [
      "kuwait fuel price today",
      "petrol price kuwait",
      "diesel price kuwait",
      "kipic fuel price",
      "kuwait petrol price update",
      "super petrol price kuwait",
      "ultra petrol price kuwait",
      "kuwait diesel rate today",      
      "new fuel price kuwait",
      "petrol rate kuwait city",
      "petrol rate hawally",
      "petrol rate ahmadi",
      "kuwait fuel price monthly update",
      "knpc fuel price"
    ]
  },
  {
    title: "बहरीन में पेट्रोल डीजल का रेट | Bahrain fuel price",
    url: "/tools/fuel-rates/bahrain",
    keywords: [
      "bahrain fuel price today",
      "petrol price bahrain",
      "diesel price bahrain",
      "bapco fuel price",
      "bahrain petrol price update",
      "petrol 90 price bahrain",
      "petrol 95 price bahrain",
      "bahrain diesel rate today",       
      "new fuel price bahrain",
      "petrol rate manama",
      "petrol rate riffa",
      "petrol rate muharraq",
      "bahrain fuel price monthly update",
      "nogaholding fuel price"
    ]
  },
  {
    title: "ओमान में पेट्रोल डीजल का रेट | Oman fuel price",
    url: "/tools/fuel-rates/oman",
    keywords: [
      "oman fuel price today",
      "petrol price oman",
      "diesel price oman",
      "oman oil fuel price",
      "oman petrol price update",
      "m91 petrol price oman",
      "m95 petrol price oman",
      "oman diesel rate today",      
      "new fuel price oman",
      "petrol rate muscat",
      "petrol rate salalah",
      "petrol rate sohar",
      "oman fuel price monthly update",
      "orpic fuel price"
    ]
  },  
  {
    title: "UAE ग्रेच्युटी कैलकुलेटर | Gratuity Calculator",
    url: "/tools/uae-gratuity-calculator",
    keywords: ["gratuity calculator uae", "end of service benefit", "gratuity uae calculation"],
  },
];

 export function searchStaticTools(query) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  return staticTools.filter((tool) => {
    const haystack = (tool.title + " " + tool.keywords.join(" ")).toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
}
