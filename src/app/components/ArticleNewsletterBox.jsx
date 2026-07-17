'use client';
import { useState } from 'react';

function EnvelopeIcon3D({ className = "w-7 h-7" }) {
    return (
        <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#b91c1c" />
                </linearGradient>
                <linearGradient id="envFlap" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fca5a5" />
                    <stop offset="100%" stopColor="#f87171" />
                </linearGradient>
                <filter id="envShadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="1" dy="4" stdDeviation="3" floodColor="#7f1d1d" floodOpacity="0.35" />
                </filter>
            </defs>
            <g transform="rotate(-18 32 34)">
                <rect x="4" y="14" width="56" height="40" rx="6" fill="url(#envBody)" filter="url(#envShadow)" />
                <path d="M4 20 L32 42 L60 20 L60 48 A6 6 0 0 1 54 54 H10 A6 6 0 0 1 4 48 Z" fill="#991b1b" opacity="0.5" />
                <path d="M4 20 L32 42 L60 20 A6 6 0 0 0 54 14 H10 A6 6 0 0 0 4 20 Z" fill="url(#envFlap)" />
                <path d="M10 15 L30 30 L26 33 L6 20 A6 6 0 0 1 10 15 Z" fill="#ffffff" opacity="0.35" />
            </g>
        </svg>
    );
}

const CATEGORIES = [
    { id: 'daily', label: 'Daily Updates' },
    { id: 'gold-exchange', label: 'Gold & Exchange' },
    { id: 'uae', label: 'UAE News' },
    { id: 'saudi', label: 'Saudi News' },
    { id: 'business', label: 'Business' },
    { id: 'sports', label: 'Sports' },
    { id: 'prayer-weather', label: 'Prayer & Weather' },
    { id: 'editor', label: "Editor's Message" },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ArticleNewsletterBox() {
    const [email, setEmail] = useState('');
    const [selected, setSelected] = useState([]);
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errors, setErrors] = useState({ email: '', category: '' });

    const toggleCategory = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
        setErrors((e) => ({ ...e, category: '' }));
    };

    const validate = () => {
        const newErrors = { email: '', category: '' };
        let valid = true;

        if (!email.trim()) {
            newErrors.email = 'ई-मेल एड्रैस जरूर भरे';
            valid = false;
        } else if (!EMAIL_REGEX.test(email.trim())) {
            newErrors.email = 'सही ई-मेल एड्रैस डालें';
            valid = false;
        }

        if (selected.length === 0) {
            newErrors.category = 'कम से कम 1 टॉपिक चुनें';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        setStatus('loading');
        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email.trim(),
                    categories: selected,
                    source: 'article_page',
                }),
            });
            setStatus(res.ok ? 'success' : 'error');
        } catch {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="rounded-xl bg-red-50 border border-red-200 p-6 my-8 text-center min-h-[220px] flex items-center justify-center  ">
                <p className="font-semibold text-red-900">सबस्क्राइब हो गए! धन्यवाद</p>
            </div>
        );
    }

    return (
        <div className="rounded-xl bg-red-50 border border-red-100 p-6 my-8 mt-20">
            <h3 suppressHydrationWarning className="text-xl font-bold text-red-950 mb-5 flex items-center gap-2">
                अपनी पसंद के टॉपिक पर अपडेट्स पाएं
                <EnvelopeIcon3D />
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 mb-2">
                {CATEGORIES.map((cat) => (
                    <label
                        key={cat.id}
                        className="flex items-center gap-2 text-sm text-gray-800 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            checked={selected.includes(cat.id)}
                            onChange={() => toggleCategory(cat.id)}
                            className="w-4 h-4 rounded border-gray-400 text-red-600 focus:ring-red-600"
                        />
                        {cat.label}
                    </label>
                ))}
            </div>
            <p className="text-red-600 text-xs mb-1 min-h-[16px]">{errors.category}</p>

            <hr className="border-red-100 mb-5 mt-3" />

            {/* Fixed-height row: input+button always same line, error sits in its OWN reserved row below, so it never pushes the button */}
            <div className="flex flex-col-reverse md:flex-col">
                <div className="flex flex-col gap-3 items-start md:flex-row md:items-center">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors((er) => ({ ...er, email: '' }));
                        }}
                        placeholder="Email"
                        className={`w-full rounded-md border px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 ${errors.email ? 'border-red-600 focus:ring-red-600' : 'border-gray-300 focus:ring-red-600'
                            }`}
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={status === 'loading'}
                        className="w-full sm:w-auto shrink-0 bg-red-600 hover:bg-red-700 transition-colors text-white px-6 py-2.5 rounded-md text-sm font-semibold tracking-wide whitespace-nowrap"
                    >
                        {status === 'loading' ? '...' : 'GET UPDATES'}
                    </button>
                </div>
                <p className="text-red-600 text-xs mt-1 min-h-[16px]">{errors.email}</p>
            </div>

            {status === 'error' && (
                <p className="text-red-600 text-xs mt-2">कुछ गड़बड़ हुई, दोबारा कोशिश करें । </p>
            )}

            <p className="text-xs text-gray-500 mt-3">
                साइन-अप करके आप हमारी {' '}
                <a href="/privacy-policy" className="text-red-600">Privacy Policy</a>{' '}
                और {' '}
                <a href="/terms-and-conditions" className="text-red-600">Terms of Use</a>{' '}
                से सहमत हैं ।
            </p>
        </div>
    );
}