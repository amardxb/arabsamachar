'use client';

import { useEffect, useState } from 'react';
import { formatPrayerTime } from '@/lib/formatPrayerTime';

const prayerOrder = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

function parseTimeToday(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
}

export default function PrayerCard({ data }) {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000 * 30);
        return () => clearInterval(timer);
    }, []);

    if (!data || !data.timings || !data.hijri) {
        return (
            <div className="w-full bg-gradient-to-r from-emerald-500 to-teal-700 rounded-lg p-6 text-white text-center">
                नमाज़ का समय उपलब्ध नहीं है
            </div>
        );
    }

    const { timings, hijri, gregorian, cityLabel, timezone } = data;

    const timeString = now.toLocaleTimeString('en-IN', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: timezone || 'Asia/Dubai',
    });

    let nextPrayerName = null;
    let nextPrayerTime = null;
    for (const name of prayerOrder) {
        const t = parseTimeToday(timings[name]);
        if (t > now) {
            nextPrayerName = name;
            nextPrayerTime = t;
            break;
        }
    }
    let countdownText = '';
    if (nextPrayerTime) {
        const diffMs = nextPrayerTime - now;
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        countdownText = `${hours} घंटे ${minutes} मिनट में ${nextPrayerName}`;
    }

    const prayerLabels = {
        Fajr: 'फज्र', Sunrise: 'सूर्योदय', Dhuhr: 'ज़ुहर',
        Asr: 'अस्र', Maghrib: 'मग़रिब', Isha: 'इशा',
    };

    return (
        <div className="w-full bg-gradient-to-r from-emerald-500 to-teal-800 rounded-lg overflow-hidden text-white">
            <div className="p-6 text-center">
                <div className="text-sm opacity-90">{cityLabel}</div>
                <div className="text-2xl font-bold mt-1">
                    {hijri.month} {hijri.day}, {hijri.year}
                </div>
                <div className="text-sm opacity-80 mt-1">
                    {gregorian} · {timeString}
                </div>
                {countdownText && (
                    <div className="text-sm mt-3 bg-white/15 inline-block px-3 py-1 rounded-full">
                        ⏰ {countdownText}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 divide-x divide-white/20 bg-black/10">
                {prayerOrder.map((name) => {
                    const { time, period } = formatPrayerTime(timings[name]);
                    return (
                        <div key={name} className="px-2 py-4 text-center">
                            <div className="text-sm">{prayerLabels[name]}</div>
                            <div className="font-bold text-lg mt-1">{time}</div>
                            <div className="text-xs mt-0.5">{period}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}