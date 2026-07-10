'use client';

import { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

// ============================================================
// /app/newsletter/page.jsx  (ya jahan bhi tumhara route folder ho)
// EmailJS wala contact form isse alag hai — ye naya subscribe
// system hai jo Sanity + Resend/Brevo se connect hoga (next step
// mein banayenge). Abhi ke liye handleSubmit ek placeholder API
// call karta hai: /api/subscribe
// ============================================================

const CATEGORIES = [
    {
        id: 'breaking',
        title: 'ब्रेकिंग न्यूज़',
        desc: 'सबसे तेज़ और ताज़ा ब्रेकिंग खबरें सीधे आपके ईमेल पर',
        icon: (
            <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        ),
    },
    {
        id: 'national',
        title: 'राष्ट्रीय',
        desc: 'भारत की बड़ी और ज़रूरी खबरों का रोज़ाना अपडेट',
        icon: (
            <path d="M4 4v16m0-16h13l-2 3 2 3H4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        ),
    },
    {
        id: 'world',
        title: 'दुनिया',
        desc: 'दुनिया भर की बड़ी घटनाओं की हिंदी में जानकारी',
        icon: (
            <path d="M12 21a9 9 0 100-18 9 9 0 000 18zm-9-9h18M12 3a13 13 0 010 18 13 13 0 010-18z" strokeWidth="1.5" strokeLinecap="round" />
        ),
    },
    {
        id: 'entertainment',
        title: 'मनोरंजन',
        desc: 'बॉलीवुड, OTT और सेलिब्रिटी से जुड़ी लेटेस्ट खबरें',
        icon: (
            <path d="M8 4l10 8-10 8V4z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        ),
    },
    {
        id: 'lifestyle',
        title: 'लाइफस्टाइल',
        desc: 'हेल्थ, फूड, ट्रैवल और रोज़मर्रा से जुड़ी रोचक खबरें',
        icon: (
            <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        ),
    },
    {
        id: 'technology',
        title: 'टेक्नोलॉजी',
        desc: 'मोबाइल, गैजेट्स और टेक की दुनिया की नई खबरें',
        icon: (
            <path d="M9 4h6v3H9V4zM6 7h12v13H6V7zm4 16h4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        ),
    },
    {
        id: 'finance',
        title: 'फाइनेंस',
        desc: 'गल्फ देशों की डेली सोना-चांदी, पेट्रोल और करेंसी रेट अपडेट',
        icon: (
            <path d="M4 19h16M6 19V9l4-4 4 4 4-4v14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        ),
    },
    {
        id: 'sports',
        title: 'खेल',
        desc: 'क्रिकेट, फुटबॉल और अन्य खेलों की लेटेस्ट खबरें',
        icon: (
            <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM4 9h16M4 15h16M9.5 3.5c-3 5-3 12 0 17M14.5 3.5c3 5 3 12 0 17" strokeWidth="1.5" strokeLinecap="round" />
        ),
    },
];

export default function NewsletterPage() {
    const [email, setEmail] = useState('');
    const [selected, setSelected] = useState(['breaking']);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleCategory = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('सही ईमेल एड्रेस डालें');
            return;
        }
        if (selected.length === 0) {
            setError('कम से कम एक कैटेगरी चुनें');
            return;
        }
        setError('');
        setLoading(true);
        try {
            // TODO: is route ko Sanity se connect karenge (next step)
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, categories: selected, source: 'newsletter-page' }),
            });
            if (!res.ok) throw new Error('failed');
            toast.success('सब्सक्राइब हो गए! अब आपको लेटेस्ट खबरें मिलती रहेंगी।');
            setEmail('');
        } catch {
            toast.error('कुछ गलत हो गया, दोबारा कोशिश करें');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#FAF7F2]">
            {/* ---------- Ad box (gold page jaisa) ---------- */}
            <div className="max-w-4xl mx-auto px-4 pt-6">
                <p className="text-[11px] tracking-wide text-stone-400 mb-1 text-center">विज्ञापन</p>
                <div className="border border-dashed border-stone-300 rounded-md h-24 md:h-[90px] flex items-center justify-center bg-white/50">
                    {/* yahan apna AdSense <ins> tag daalo, jaisa gold page pe hai */}
                    <span className="text-xs text-stone-400">Ad slot — 728x90 / 320x100</span>
                </div>
            </div>

            {/* ---------- Hero ---------- */}
            <section className="max-w-4xl mx-auto px-4 pt-10 pb-8 text-center">
                <div className="flex justify-center mb-5">
                    {/* Signature element: envelope with a peeking letter — "khabar seedha inbox tak" */}
                    <div className="relative w-24 h-20">
                        <svg viewBox="0 0 96 80" className="w-full h-full">
                            {/* peeking letter */}
                            <rect x="18" y="4" width="60" height="46" rx="3" fill="#FFFFFF" stroke="#C89B3C" strokeWidth="1.5" />
                            <line x1="28" y1="18" x2="68" y2="18" stroke="#C89B3C" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="28" y1="27" x2="68" y2="27" stroke="#C89B3C" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="28" y1="36" x2="52" y2="36" stroke="#C89B3C" strokeWidth="1.5" strokeLinecap="round" />

                            {/* envelope body */}
                            <rect x="4" y="34" width="88" height="42" rx="4" fill="#FFFFFF" stroke="#C4132A" strokeWidth="2" />
                            <path d="M4 36l44 28 44-28" fill="none" stroke="#C4132A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                            {/* notification dot */}
                            <circle cx="82" cy="14" r="7" fill="#C4132A" />
                            <text x="82" y="18" textAnchor="middle" fontSize="9" fill="#FFFFFF" fontWeight="600">
                                1
                            </text>
                        </svg>
                    </div>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-stone-900 leading-snug">
                    रोज़ की ज़रूरी खबरें, सीधे आपके ईमेल पर
                </h1>
                <p className="mt-3 text-stone-500 text-sm md:text-base max-w-xl mx-auto">
                    गल्फ में रहने वाले हिंदी भाषी पाठकों के लिए — न्यूज़, गोल्ड-फ्यूल रेट और नमाज़ टाइमिंग,
                    सब कुछ एक जगह।
                </p>
            </section>

            {/* ---------- Category cards ---------- */}
            <section className="max-w-4xl mx-auto px-4 pb-6">
                <p className="text-sm font-medium text-stone-700 mb-3">आपको क्या पसंद है, चुनें:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                    {CATEGORIES.map((cat) => {
                        const active = selected.includes(cat.id);
                        return (
                            <button
                                type="button"
                                key={cat.id}
                                onClick={() => toggleCategory(cat.id)}
                                className={`relative text-left flex flex-row sm:flex-col items-center sm:items-stretch gap-3 sm:gap-2 p-3 pr-8 sm:pr-3 rounded-lg border transition ${active
                                        ? 'border-[#C4132A] bg-[#C4132A]/5'
                                        : 'border-stone-200 bg-white hover:border-stone-300'
                                    }`}
                            >
                                <div
                                    className={`absolute top-3 right-3 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${active ? 'bg-[#C4132A] border-[#C4132A]' : 'border-stone-300'
                                        }`}
                                >
                                    {active && (
                                        <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-white" fill="currentColor">
                                            <path d="M20 6L9 17l-5-5 1.41-1.41L9 14.17l9.59-9.58L20 6z" />
                                        </svg>
                                    )}
                                </div>
                                <svg
                                    viewBox="0 0 24 24"
                                    className={`w-6 h-6 sm:w-5 sm:h-5 shrink-0 ${active ? 'text-[#C4132A]' : 'text-stone-400'}`}
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    {cat.icon}
                                </svg>
                                <div className="flex-1">
                                    <p className="text-[13px] font-semibold text-stone-800 leading-snug">{cat.title}</p>
                                    <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">{cat.desc}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* ---------- Email form ---------- */}
            <section className="max-w-4xl mx-auto px-4 pb-4">
                <form onSubmit={handleSubmit} className="bg-white border border-stone-200 rounded-lg p-4 md:p-5">
                    <p className="text-[11px] text-stone-400 mb-3">
                        साइन अप करके, आप हमारी{' '}
                        <a href="/privacy-policy" className="underline hover:text-stone-600">
                            गोपनीयता नीति
                        </a>{' '}
                        और{' '}
                        <a href="/terms-and-conditions" className="underline hover:text-stone-600">
                            नियम व शर्तें
                        </a>{' '}
                        से सहमत होते हैं।
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="आपका ईमेल एड्रेस"
                            className="flex-1 border border-stone-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4132A]/30 focus:border-[#C4132A]"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#C4132A] text-white text-sm font-medium px-6 py-2.5 rounded-md hover:bg-[#a8101f] transition disabled:opacity-60"
                        >
                            {loading ? 'सब्सक्राइब हो रहा है...' : 'सब्सक्राइब करें'}
                        </button>
                    </div>
                    {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
                </form>
            </section>
        </main>
    );
}
