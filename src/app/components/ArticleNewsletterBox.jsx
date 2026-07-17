'use client';

import { useState, useRef } from 'react';

export default function ArticleNewsletterBox() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [state, setState] = useState('idle'); // idle | loading | already | success | error
  const timerRef = useRef(null);

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const resetToCard = () => {
    setEmail('');
    setError('');
    setState('idle');
  };

  const handleSubscribe = async () => {
    setError('');

    if (!email.trim()) {
      setError('कृपया अपना ईमेल दर्ज करें');
      return;
    }

    if (!isValidEmail(email.trim())) {
      setError('कृपया एक सही ईमेल पता दर्ज करें');
      return;
    }

    setState('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          source: 'article_page',
        }),
      });

      await res.json();

      // /api/subscribe returns 201 for a brand-new subscriber, and 200
      // when the email already existed (it re-activates + updates it).
      if (res.status === 201) {
        setState('success');
      } else if (res.status === 200) {
        setState('already');
      } else {
        setState('error');
        setError('कुछ गलत हो गया, कृपया फिर से प्रयास करें');
        setTimeout(() => setState('idle'), 2500);
        return;
      }

      // After showing the message for a few seconds, fade back to the card
      timerRef.current = setTimeout(() => {
        resetToCard();
      }, 4000);
    } catch (err) {
      setState('error');
      setError('कुछ गलत हो गया, कृपया फिर से प्रयास करें');
      setTimeout(() => setState('idle'), 2500);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubscribe();
    }
  };

  const showMessageState = state === 'already' || state === 'success';

  return (
   <div className="w-full  border border-gray-300 p-1">
    <div className="w-full max-w-sm mx-auto bg-red-700 text-white p-4 shadow-sm">
      {!showMessageState ? (
        <>
          {/* Envelope icon - flat golden line design, no 3D */}
          <div className="flex justify-center mb-3">
            <svg
              width="48"
              height="48"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="6"
                y="14"
                width="44"
                height="30"
                rx="3"
                stroke="#D4AF37"
                strokeWidth="2"
              />
              <path
                d="M8 16L28 32L48 16"
                stroke="#D4AF37"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h3 className="text-lg font-bold text-center leading-snug mb-1">
            सिर्फ स्क्रॉल मत करिए। पूरी खबर जानिए।
          </h3>
          <p className="text-sm text-center text-white/90 mb-3">
            रोज़ की टॉप खबरें सीधे अपने इनबॉक्स में पाएं
          </p>

          <div className="space-y-2">
            <div className="flex w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="अपना ईमेल पता दर्ज करें..."
                disabled={state === 'loading'}
                className="flex-1 min-w-0 w-full rounded-l-md rounded-r-none px-3 py-2 text-base text-gray-900 bg-white placeholder-gray-500 border border-r-0 border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] disabled:opacity-70"
              />

              <button
                onClick={handleSubscribe}
                disabled={state === 'loading'}
                className="shrink-0 rounded-r-md rounded-l-none px-3 py-2 text-sm font-bold text-black bg-[#E2B349] hover:bg-[#c49f2f] transition-colors disabled:opacity-70"
              >
                {state === 'loading' ? '...' : 'Subscribe'}
              </button>
            </div>

            {error && (
              <p className="text-xs text-yellow-200 font-medium">{error}</p>
            )}
          </div>

          <p className="text-[11px] text-white/70 text-center mt-3 leading-relaxed">
            सब्सक्राइब पर क्लिक करके, आप डेली न्यूज़ ईमेल न्यूज़लेटर प्राप्त करने
            के लिए सहमत हैं। आप कभी भी अनसब्सक्राइब कर सकते हैं।
          </p>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-6 min-h-[200px]">
          <svg
            width="48"
            height="48"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-4"
          >
            <rect
              x="6"
              y="14"
              width="44"
              height="30"
              rx="3"
              stroke="#D4AF37"
              strokeWidth="2"
            />
            <path
              d="M8 16L28 32L48 16"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {state === 'already' ? (
            <p className="text-sm font-semibold leading-relaxed">
              आप पहले से ही सब्सक्राइब कर चुके हैं।
              <br />
              नई खबरें आपको मिलती रहेंगी।
            </p>
          ) : (
            <p className="text-sm font-semibold leading-relaxed">
              सब्सक्राइब करने के लिए धन्यवाद!
              <br />
              नई खबरें आपको मिलती रहेंगी।
            </p>
          )}
        </div>
      )}
      </div>
    </div> 

  );
}
