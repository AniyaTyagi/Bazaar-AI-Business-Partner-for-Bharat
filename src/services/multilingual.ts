export type SupportedLanguage = 'hi' | 'hinglish' | 'en' | 'ta' | 'te' | 'mr' | 'gu' | 'bn';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  speechCode: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'hinglish', name: 'Hinglish', nativeName: 'Hinglish (हिंदी + Eng)', flag: '🇮🇳', speechCode: 'hi-IN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳', speechCode: 'hi-IN' },
  { code: 'en', name: 'English', nativeName: 'English (India)', flag: '🇬🇧', speechCode: 'en-IN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', speechCode: 'ta-IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', speechCode: 'te-IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', speechCode: 'mr-IN' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', speechCode: 'gu-IN' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', speechCode: 'bn-IN' },
];

export interface MultilingualAnswers {
  restock: string;
  sales: string;
  cashflow: string;
  customers: string;
  suppliers: string;
  health: string;
  general: (query: string) => string;
}

export const DICTIONARY: Record<SupportedLanguage, MultilingualAnswers> = {
  hinglish: {
    restock: "Maine aapki picchle 30 din ki sales aur stock check kar li hai. Kal ke liye Milk (+40 packets), Maggi (+50 packs), aur Coke (+30 bottles) restock karna sahi rahega. Sharma Distributors ₹3,770 mein de rahe hain, jisse aapki ₹1,240 ki bachat hogi.",
    sales: "Aaj aapki dukaan ki kul bikri ₹84,620 hui hai (247 orders, +18% growth). Aaj ka anumanit shuddh munafa ₹18,430 hai aur average order value ₹342 hai.",
    cashflow: "Aaj ka hisaab: Jama ₹84,620, Kharcha ₹12,850. Kal Axis Bank account mein ₹31,200 ka settlement aayega. Supplier dues ₹12,850 hain aur aapka 7-day free cash ₹42,700 safe hai.",
    customers: "Is hafte aapke customers 42% zyada cold drinks aur evening snacks kharid rahe hain. Maine 47 dormant high-value customers identify kiye hain jinhone 14 din se order nahi kiya.",
    suppliers: "AI Bazaar ne 3 wholesale suppliers compare kiye hain: Sharma Distributors (₹3,770, Best Value), Gupta Wholesale (₹3,920), aur Metro Supply (₹4,100). Sharma Distributors se lene par ₹1,240 bachat hogi.",
    health: "Aniya General Store ka Business Health Score 78 / 100 hai (Healthy). Sales velocity 91 aur cash flow 82 par strong hain. Inventory turnover 67 par hai kyunki ₹18,000 slow detergent stock mein aatke hain.",
    general: (q) => `Maine aapke sawal "${q}" ko Aniya General Store ke data se check kiya hai. Aaj ki sales ₹84,620 hai, net profit ₹18,430 hai aur free cash buffer ₹42,700 hai.`
  },

  hi: {
    restock: "मैंने आपकी पिछली 30 दिनों की बिक्री और स्टॉक की जांच कर ली है। कल के लिए दूध (+40 पैकेट), मैगी (+50 पैकेट) और कोक (+30 बोतलें) मंगवाना सही रहेगा। शर्मा डिस्ट्रीब्यूटर्स ₹3,770 में दे रहे हैं, जिससे आपकी ₹1,240 की बचत होगी।",
    sales: "आज आपकी दुकान की कुल बिक्री ₹84,620 हुई है (247 ऑर्डर, 18% की वृद्धि)। आज का अनुमानित शुद्ध लाभ ₹18,430 है और औसत ऑर्डर मूल्य ₹342 है।",
    cashflow: "आज का हिसाब: जमा ₹84,620, खर्च ₹12,850। कल एक्सिस बैंक खाते में ₹31,200 का सेटलमेंट आएगा। सप्लायर का बकाया ₹12,850 है और आपका 7 दिनों का फ्री कैश ₹42,700 सुरक्षित है।",
    customers: "इस हफ्ते आपके ग्राहक 42% अधिक कोल्ड ड्रिंक्स और शाम के स्नैक्स खरीद रहे हैं। मैंने 47 पुराने मूल्यवान ग्राहकों की पहचान की है जिन्होंने 14 दिनों से खरीदारी नहीं की है।",
    suppliers: "एआई बाजार ने 3 थोक सप्लायरों की तुलना की है: शर्मा डिस्ट्रीब्यूटर्स (₹3,770, सर्वोत्तम मूल्य), गुप्ता होलसेल (₹3,920), और मेट्रो सप्लाई (₹4,100)। शर्मा डिस्ट्रीब्यूटर्स से ₹1,240 की बचत होगी।",
    health: "रमेश जनरल स्टोर का बिजनेस हेल्थ स्कोर 78 / 100 है। बिक्री और कैश फ्लो मजबूत हैं। इन्वेंट्री टर्नओवर 67 पर है क्योंकि ₹18,000 डिटर्जेंट स्टॉक में फंसे हैं।",
    general: (q) => `मैंने आपके प्रश्न "${q}" का विश्लेषण किया है। आज की बिक्री ₹84,620 है, शुद्ध लाभ ₹18,430 है और नकद सुरक्षित है।`
  },

  en: {
    restock: "I've analyzed your last 30 days of sales velocity and current inventory. You should restock Milk (+40 packets), Maggi (+50 packs), and Coke (+30 bottles) for tomorrow. Sharma Distributors offers this for ₹3,770, saving you ₹1,240.",
    sales: "Today's store sales stand at ₹84,620 across 247 orders (+18% growth). Your estimated net profit is ₹18,430 with an average order value of ₹342.",
    cashflow: "Today's ledger: Revenue ₹84,620, Expenses ₹12,850. Tomorrow's Axis Bank settlement will credit ₹31,200. Pending dues are ₹12,850 and your net free cash buffer is safe at ₹42,700.",
    customers: "Customers bought 42% more cold beverages and evening snacks this week. I identified 47 high-value dormant customers who haven't purchased in the last 14 days.",
    suppliers: "AI Bazaar compared 3 wholesale suppliers: Sharma Distributors (₹3,770, Best Value), Gupta Wholesale (₹3,920), and Metro Supply (₹4,100). Choosing Sharma Distributors saves ₹1,240.",
    health: "Aniya General Store has a Business Health Score of 78 / 100. Sales growth (91) and cash flow (82) are strong. Inventory turnover (67) has ₹18,000 stuck in slow-moving stock.",
    general: (q) => `I analyzed your query "${q}" against Aniya General Store's dataset. Today's sales are ₹84,620 with ₹18,430 net profit and ₹42,700 free cash balance.`
  },

  ta: {
    restock: "உங்கள் கடந்த 30 நாட்கள் விற்பனையை ஆய்வு செய்தேன். நாளைக்கு பால் (+40), மேகி (+50), கோக் (+30) வாங்க வேண்டும். சர்மா விநியோகஸ்தர்கள் ₹3,770-க்கு தருகிறார்கள். ₹1,240 சேமிக்கலாம்.",
    sales: "இன்று உங்கள் மொத்த விற்பனை ₹84,620 (247 ஆர்டர்கள், 18% வளர்ச்சி). இன்றைய மதிப்பிடப்பட்ட நிகர லாபம் ₹18,430.",
    cashflow: "இன்றைய கணக்கு: வருவாய் ₹84,620, செலவு ₹12,850. நாளை ஆக்ஸிஸ் வங்கியில் ₹31,200 வரவு வைக்கப்படும். நிகர ரொக்கம் ₹42,700 பாதுகாப்பானது.",
    customers: "இந்த வாரம் வாடிக்கையாளர்கள் 42% அதிகமாக குளிர்ந்த பானங்களை வாங்குகிறார்கள். 14 நாட்களாக வாங்காத 47 வாடிக்கையாளர்களைக் கண்டறிந்துள்ளேன்.",
    suppliers: "சர்மா விநியோகஸ்தர்கள் ₹3,770 சிறந்த விலையை வழங்குகிறார்கள். ₹1,240 சேமிக்க முடியும்.",
    health: "வணிக ஆரோக்கிய மதிப்பெண் 78 / 100. விற்பனை மற்றும் பணப்புழக்கம் வலுவாக உள்ளது.",
    general: (q) => `உங்கள் கேள்வி "${q}" ஆய்வு செய்யப்பட்டது. இன்றைய விற்பனை ₹84,620, லாபம் ₹18,430.`
  },

  te: {
    restock: "మీ గత 30 రోజుల అమ్మకాలను పరిశీలించాను. రేపటికి పాలు (+40), మ్యాగీ (+50), కోక్ (+30) ఆర్డర్ చేయాలి. శర్మ డిస్ట్రిబ్యూటర్స్ ₹3,770 కి ఇస్తున్నారు, మీకు ₹1,240 ఆదా అవుతుంది.",
    sales: "ఈరోజు మీ దుకాణం అమ్మకాలు ₹84,620 (247 ఆర్డర్లు, 18% పెరుగుదల). అంచనా వేసిన నికర లాభం ₹18,430.",
    cashflow: "ఈరోజు లెక్కలు: రాబడి ₹84,620, ఖర్చులు ₹12,850. రేపు యాక్సిస్ బ్యాంక్‌లో ₹31,200 డిపాజిట్ అవుతాయి.",
    customers: "ఈ వారం కస్టమర్లు 42% ఎక్కువగా కూల్ డ్రింక్స్ కొంటున్నారు. 14 రోజులుగా రాని 47 మంది పాత కస్టమర్లను గుర్తించాను.",
    suppliers: "శర్మ డిస్ట్రిబ్యూటర్స్ ₹3,770 కి ఇస్తున్నారు. మీరు ₹1,240 ఆదా చేయవచ్చు.",
    health: "మీ బిజినెస్ హెల్త్ స్కోర్ 78 / 100. అమ్మకాలు మరియు నగదు ప్రవాహం బలంగా ఉన్నాయి.",
    general: (q) => `మీ ప్రశ్న "${q}" పరిశీలించబడింది. ఈరోజు అమ్మకాలు ₹84,620, నికర లాభం ₹18,430.`
  },

  mr: {
    restock: "मी तुमच्या गेल्या ३० दिवसांच्या विक्रीचा अभ्यास केला आहे. उद्यासाठी दूध (+४०), मॅगी (+५०), आणि कोक (+३०) मागवणे योग्य राहील. शर्मा डिस्ट्रिब्युटर्स ₹३,७७० मध्ये देत आहेत, ज्यामुळे तुमचे ₹१,२४० वाचतील.",
    sales: "आज तुमच्या दुकानाची एकूण विक्री ₹८४,६२० झाली आहे (२४७ ऑर्डर्स, १८% वाढ). आजचा अंदाजित निव्वळ नफा ₹१८,४३० आहे.",
    cashflow: "आजचा हिशोब: जमा ₹८४,६२०, खर्च ₹१२,८५०. उद्या ॲक्सिस बँकेत ₹३१,२०० जमा होतील. तुमची शिल्लक ₹<ctrl42>४२,७०० सुरक्षित आहे.",
    customers: "या आठवड्यात ग्राहक ४२% जास्त कोल्ड ड्रिंक्स खरेदी करत आहेत. १४ दिवसांपासून न आलेल्या ४७ जुन्या ग्राहकांची माहिती मिळाली आहे.",
    suppliers: "शर्मा डिस्ट्रिब्युटर्स ₹३,७७० मध्ये देत आहेत, ज्यामुळे ₹१,२४० ची बचत होईल.",
    health: "बिझनेस हेल्थ स्कोर ७८ / १०० आहे. विक्री आणि कॅश फ्लो मजबूत आहेत.",
    general: (q) => `तुमच्या प्रश्नाचे विश्लेषण केले आहे. आजची विक्री ₹८४,६२० आणि नफा ₹१८,४३० आहे.`
  },

  gu: {
    restock: "મેં તમારા છેલ્લા 30 દિવસના વેચાણનું નિરીક્ષણ કર્યું છે. આવતીકાલ માટે દૂધ (+40), મેગી (+50), અને કોક (+30) મંગાવવું યોગ્ય રહેશે. શર્મા ડિસ્ટ્રીબ્યુટર્સ ₹3,770 માં આપે છે, જેથી ₹1,240 ની બચત થશે.",
    sales: "આજે તમારું કુલ વેચાણ ₹84,620 થયું છે (247 ઓર્ડર, 18% નો વધારો). આજનો અંદાજિત નફો ₹18,430 છે.",
    cashflow: "આજનો હિસાબ: જમા ₹84,620, ખર્ચ ₹12,850. કાલે એક્સિસ બેંકમાં ₹31,200 જમા થશે. તમારી રોકડ ₹42,700 સલામત છે.",
    customers: "આ અઠવાડિયે ગ્રાહકો 42% વધુ કોલ્ડ ડ્રિંક્સ ખરીદી રહ્યા છે. 14 દિવસથી ખરીદી ન કરનાર 47 ગ્રાહકો શોધાયા છે.",
    suppliers: "શર્મા ડિસ્ટ્રીબ્યુટર્સ ₹3,770 માં આપે છે. ₹1,240 ની બચત થશે.",
    health: "બિઝનેસ હેલ્થ સ્કોર 78 / 100 છે. વેચાણ અને કેશ ફ્લો મજબૂત છે.",
    general: (q) => `તમારા પ્રશ્નનું વિશ્લેષણ કરવામાં આવ્યું છે. આજનું વેચાણ ₹84,620 અને નફો ₹18,430 છે.`
  },

  bn: {
    restock: "আমি আপনার গত ৩০ দিনের বিক্রি এবং স্টক পর্যালোচনা করেছি। আগামীকালের জন্য দুধ (+৪০), ম্যাগি (+৫০) এবং কোক (+৩০) অর্ডার করা উচিত। শর্মা ডিস্ট্রিবিউটরস ₹৩,৭৭০ টাকা অফার করছে, যা আপনার ₹১,২৪০ টাকা বাঁচাবে।",
    sales: "আজ আপনার দোকানের মোট বিক্রি হয়েছে ₹৮৪,৬২০ (২৪৭টি অর্ডার, ১৮% বৃদ্ধি)। আনুমানিক নিট লাভ ₹১৮,৪৩০।",
    cashflow: "আজকের হিসাব: জমা ₹৮৪,৬২০, খরচ ₹১২,৮৫০। আগামীকাল অ্যাক্সিস ব্যাংকে ₹৩১,২০০ জমা হবে। নিট ক্যাশ ₹<ctrl42><ctrl42><ctrl42><ctrl42><ctrl42><ctrl42><ctrl42>৪২,৭০০ নিরাপদ।",
    customers: "এই সপ্তাহে গ্রাহকরা ৪২% বেশি কোল্ড ড্রিঙ্কস কিনছেন। গত ১৪ দিনে কেনাকাটা না করা ৪৭ জন গ্রাহক চিহ্নিত করা হয়েছে।",
    suppliers: "শর্মা ডিস্ট্রিবিউটরস ₹৩,৭৭০ সেরা মূল্য দিচ্ছে। আপনি ₹১,২৪০ সাশ্রয় করতে পারবেন।",
    health: "ব্যবসার হেলথ স্কোর ৭৮ / ১০০। বিক্রি এবং নগদ প্রবাহ শক্তিশালী।",
    general: (q) => `আপনার প্রশ্ন বিশ্লেষণ করা হয়েছে। আজকের বিক্রি ₹৮৪,৬২০ এবং লাভ ₹১৮,৪৩০।`
  }
};

export class MultilingualService {
  public fontStyle?: string;

  public static getAnswer(query: string, lang: SupportedLanguage): { text: string; category: keyof MultilingualAnswers } {
    const lower = query.toLowerCase();

    let category: keyof MultilingualAnswers = 'general';

    if (lower.includes('samaan') || lower.includes('restock') || lower.includes('stock') || lower.includes('mangwana') || lower.includes('buy') || lower.includes('order')) {
      category = 'restock';
    } else if (lower.includes('paisa') || lower.includes('cash') || lower.includes('hisaab') || lower.includes('dues') || lower.includes('settlement') || lower.includes('kharcha') || lower.includes('jama')) {
      category = 'cashflow';
    } else if (lower.includes('customer') || lower.includes('demand') || lower.includes('kharid') || lower.includes('buying') || lower.includes('grahak')) {
      category = 'customers';
    } else if (lower.includes('sales') || lower.includes('profit') || lower.includes('revenue') || lower.includes('bikri') || lower.includes('munafa') || lower.includes('drop')) {
      category = 'sales';
    } else if (lower.includes('supplier') || lower.includes('wholesale') || lower.includes('sharma') || lower.includes('gupta') || lower.includes('rate') || lower.includes('cheapest')) {
      category = 'suppliers';
    } else if (lower.includes('health') || lower.includes('score') || lower.includes('optimize') || lower.includes('slow')) {
      category = 'health';
    }

    const dict = DICTIONARY[lang] || DICTIONARY.hinglish;
    let answerText = '';

    if (category === 'general') {
      answerText = dict.general(query);
    } else {
      answerText = dict[category] as string;
    }

    return { text: answerText, category };
  }

  public static speakText(text: string, lang: SupportedLanguage) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      const langObj = SUPPORTED_LANGUAGES.find(l => l.code === lang);
      utterance.lang = langObj ? langObj.speechCode : 'hi-IN';
      utterance.rate = 0.95; // Clear natural rate for voice assistant

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
    }
  }
}
