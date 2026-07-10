'use client';

// components/NewsletterMobileModal.jsx
// Isko apne root layout.jsx mein import karke ek baar render kar do
// (jaise <FooterNewsletterSignup> ke paas ya <body> ke andar kahin bhi),
// ye khud hi decide karega kab dikhna hai.

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const DELAY_MS = 8000; // 8 second baad modal dikhega
const STORAGE_KEY = 'newsletter_modal_dismissed';

export default function NewsletterMobileModal() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Agar pehle dismiss/subscribe kar chuka hai to dobara mat dikhao
    const alreadyDismissed = localStorage.getItem(STORAGE_KEY);
    if (alreadyDismissed) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('सही ईमेल एड्रेस डालें');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'mobile-modal' }),
      });
      if (!res.ok) throw new Error('failed');
      toast.success('सब्सक्राइब हो गए!');
      localStorage.setItem(STORAGE_KEY, 'true');
      setVisible(false);
    } catch {
      toast.error('कुछ गलत हो गया, दोबारा कोशिश करें');
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    // sm:hidden -> ye modal sirf mobile par dikhega, desktop par kabhi nahi
    <div className="fixed inset-0 z-50 flex items-end sm:hidden">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={closeModal}
      />
      <div className="relative w-full bg-white rounded-t-2xl p-5 pb-6 animate-in slide-in-from-bottom">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-stone-400 text-xl leading-none"
          aria-label="Close"
        >
          &times;
        </button>

        <h3 className="text-base font-bold text-stone-900 pr-6">
          रोज़ की खबरें ईमेल पर पाएं
        </h3>
        <p className="text-xs text-stone-500 mt-1 mb-4">
          गल्फ की ताज़ा खबरें सीधे आपके इनबॉक्स में — मुफ़्त में।
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="आपका ईमेल एड्रेस"
            className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4132A]/30 focus:border-[#C4132A]"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C4132A] text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-[#a8101f] transition disabled:opacity-60"
          >
            {loading ? '...' : 'Subscribe'}
          </button>
        </form>

        <button
          onClick={closeModal}
          className="w-full text-center text-xs text-stone-400 mt-3 underline"
        >
          अभी नहीं
        </button>
      </div>
    </div>
  );
}
