'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X, Bot, Sparkles, Volume2, ArrowRight, Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES, SupportedLanguage, MultilingualService } from '../services/multilingual';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  selectedLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onClose: () => void;
  onSelectVoicePrompt: (spokenText: string) => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  selectedLanguage,
  onLanguageChange,
  onClose,
  onSelectVoicePrompt,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  const voiceSuggestionsMap: Record<SupportedLanguage, string[]> = {
    hinglish: [
      "Bhaiya kal dukaan ke liye samaan mangwana hai, dekh le kya kya khatam hone wala hai.",
      "Kal ke liye samaan mangwana hai.",
      "Iss mahine paisa kahan zyada ja raha hai?",
      "Mere customers kya zyada kharid rahe hain?",
    ],
    hi: [
      "कल के लिए सामान मंगवाना है।",
      "आज की बिक्री और शुद्ध लाभ कितना है?",
      "सप्लायर का कितना बकाया बाकी है?",
      "ग्राहक कौन सा सामान ज्यादा खरीद रहे हैं?",
    ],
    en: [
      "I need to restock inventory for tomorrow.",
      "Show today's total sales and net profit.",
      "What are my pending supplier payments?",
      "Which products have the highest customer demand?",
    ],
    ta: [
      "நாளைக்கு சரக்கு ஆர்டர் செய்ய வேண்டும்.",
      "இன்றைய விற்பனை மற்றும் லாபம் எவ்வளவு?",
      "நிலுவையில் உள்ள தொகையைக் காட்டு.",
      "வாடிக்கையாளர்கள் அதிகம் வாங்குவது எது?",
    ],
    te: [
      "రేపటికి సరుకులు ఆర్డర్ చేయాలి.",
      "ఈరోజు అమ్మకాలు మరియు లాభం ఎంత?",
      "బాకీ ఉన్న వ్యయం వివరాలు చెప్పు.",
      "కస్టమర్లు ఏ సరుకులు ఎక్కువ కొంటున్నారు?",
    ],
    mr: [
      "उद्यासाठी सामान मागवायचे आहे.",
      "आजची एकूण विक्री आणि नफा किती झाला?",
      "सप्लायरचे किती पैसे बाकी आहेत?",
      "ग्राहक कोणत्या वस्तू जास्त खरेदी करत आहेत?",
    ],
    gu: [
      "કાલે દુકાન માટે સામાન મંગાવવો છે.",
      "આજનું વેચાણ અને નફો કેટલો છે?",
      "સપ્લાયરના કેટલા પૈસા બાકી છે?",
      "ગ્રાહકો કયો સામાન વધુ ખરીદી રહ્યા છે?",
    ],
    bn: [
      "আগামীকালের জন্য স্টক অর্ডার করতে হবে।",
      "আজকের মোট বিক্রি এবং লাভ কত?",
      "বাকি পাওনার হিসাব দেখাও।",
      "গ্রাহকরা কোন পণ্য বেশি কিনছেন?",
    ]
  };

  const samplePrompts = voiceSuggestionsMap[selectedLanguage] || voiceSuggestionsMap.hinglish;

  useEffect(() => {
    if (!isOpen) {
      stopListening();
      setTranscript('');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);
    startListening();

    return () => {
      stopListening();
    };
  }, [isOpen, selectedLanguage]);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      const langObj = SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage);
      recognition.lang = langObj ? langObj.speechCode : 'hi-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);

        if (event.results[0] && event.results[0].isFinal) {
          const finalPrompt = currentTranscript.trim();
          if (finalPrompt) {
            setTimeout(() => {
              onSelectVoicePrompt(finalPrompt);
              onClose();
            }, 700);
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (err) {
      console.warn('Could not start speech recognition:', err);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {}
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 text-center space-y-5 animate-slideUp relative overflow-hidden">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* VOICE PULSING ANIMATION BUTTON */}
        <div className="pt-2">
          <button
            onClick={handleToggleListening}
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto relative transition-all active:scale-95 ${
              isListening
                ? 'bg-blue-50 border-4 border-blue-200 text-[#1B3A6B]'
                : 'bg-slate-100 border-4 border-slate-200 text-slate-400'
            }`}
          >
            {isListening ? (
              <>
                <Mic className="w-10 h-10 animate-pulse text-[#1B3A6B]" />
                <span className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-40 pointer-events-none" />
              </>
            ) : (
              <MicOff className="w-10 h-10 text-slate-400" />
            )}
          </button>
        </div>

        {/* HEADING & LANGUAGE SELECTOR */}
        <div>
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <Globe className="w-3.5 h-3.5 text-[#1B3A6B]" />
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              className="bg-blue-50 border border-blue-200 text-[#1B3A6B] rounded-full px-3 py-1 text-xs font-extrabold focus:outline-none"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.nativeName}
                </option>
              ))}
            </select>
          </div>

          <h2 className="text-xl font-black text-slate-900 tracking-tight">🎙️ Bolo, Munim ko batao</h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {isListening ? 'Listening live... Speak in your selected language' : 'Microphone paused. Tap mic to resume.'}
          </p>
        </div>

        {/* LIVE TRANSCRIPT DISPLAY AREA */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 min-h-[64px] flex items-center justify-center text-xs">
          {transcript ? (
            <p className="font-extrabold text-[#1B3A6B] leading-relaxed animate-fadeIn">
              "{transcript}"
            </p>
          ) : (
            <p className="text-slate-400 italic font-medium">
              {isSupported
                ? `Speak now... (${SUPPORTED_LANGUAGES.find(l=>l.code===selectedLanguage)?.name} voice recognition active)`
                : 'Browser Speech API fallback mode: Tap any spoken prompt below.'}
            </p>
          )}
        </div>

        {/* VOICE WAVEFORM BARS */}
        {isListening && (
          <div className="flex items-center justify-center gap-1.5 h-6">
            {[30, 60, 100, 50, 80, 40, 70, 30].map((h, i) => (
              <div
                key={i}
                className="w-1.5 bg-[#1B3A6B] rounded-full animate-pulse"
                style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </div>
        )}

        {/* QUICK VOICE PROMPTS */}
        <div className="space-y-2 text-left pt-1">
          <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
            Or tap sample voice prompt:
          </span>

          {samplePrompts.map((promptText, idx) => (
            <button
              key={idx}
              onClick={() => {
                setTranscript(promptText);
                setTimeout(() => {
                  onSelectVoicePrompt(promptText);
                  onClose();
                }, 300);
              }}
              className="w-full p-3 rounded-xl bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-between text-left transition-all active:scale-98 group"
            >
              <span className="line-clamp-2">"{promptText}"</span>
              <ArrowRight className="w-4 h-4 text-[#1B3A6B] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>

        <div className="pt-1 text-[11px] text-slate-400 font-bold flex items-center justify-center gap-1">
          <Volume2 className="w-3.5 h-3.5 text-[#1B3A6B]" />
          <span>Real-time voice recognition &amp; TTS ready</span>
        </div>

      </div>
    </div>
  );
};
