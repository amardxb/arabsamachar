'use client';

import { useEffect, useState } from 'react';

const prayerOrder = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

const prayerLabels = {
    Fajr: 'फज्र',
    Sunrise: 'सूर्योदय',
    Dhuhr: 'ज़ुहर',
    Asr: 'अस्र',
    Maghrib: 'मग़रिब',
    Isha: 'इशा',
};

function parseTimeToday(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
}

export default function HomePrayerWidget() {
    const [data, setData] = useState(null);
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        fetch('/api/home-prayer-time')
            .then((r) => r.json())
            .then(setData)
            .catch(() => setData(null));
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000 * 30);
        return () => clearInterval(timer);
    }, []);

    if (!data || !data.timings) return null;

    let nextName = null;
    let nextTime = null;
    for (const name of prayerOrder) {
        const t = parseTimeToday(data.timings[name]);
        if (t > now) {
            nextName = name;
            nextTime = t;
            break;
        }
    }

    if (!nextTime) return null;

    const diffMs = nextTime - now;
    const h = Math.floor(diffMs / 3600000);
    const m = Math.floor((diffMs % 3600000) / 60000);
    const pad = (n) => String(n).padStart(2, '0');

    return (
        <span className="hidden md:flex md:flex-col md:items-start leading-tight">
            {data.city && (
                <span className="text-[10px] text-gray-500">{data.city}</span>
            )}
            <span className="text-sm font-medium">{prayerLabels[nextName]}</span>
            <span className="text-[11px] text-gray-600">{pad(h)}:{pad(m)}</span>
        </span>
    );
}