'use client';

import { useEffect, useState } from 'react';
import PrayerCard from './PrayerCard';
import PrayerMonthlyTable from './PrayerMonthlyTable';

export default function PrayerCityTabs({ country, cities }) {
    const cityKeys = Object.keys(cities);
    const [selectedCity, setSelectedCity] = useState(cityKeys[0]);
    const [todayData, setTodayData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/prayer-time?country=${country}&city=${selectedCity}`)
            .then((r) => r.json())
            .then((data) => {
                setTodayData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [country, selectedCity]);

    return (
        <div>
            {/* CITY TABS */}
            <div className="flex gap-4 overflow-x-auto border-b border-gray-300 pb-2 mb-5">
                {cityKeys.map((key) => (
                    <button
                        key={key}
                        onClick={() => setSelectedCity(key)}
                        className={`whitespace-nowrap text-sm pb-2 px-1 transition ${selectedCity === key
                                ? 'font-bold border-b-2 border-emerald-600 text-emerald-700'
                                : 'text-gray-600 hover:text-black'
                            }`}
                    >
                        {cities[key].label}
                    </button>
                ))}
            </div>

            {/* TODAY CARD */}
            {loading ? (
                <div className="w-full bg-gray-100 rounded-lg p-10 text-center text-gray-400 animate-pulse">
                    लोड हो रहा है...
                </div>
            ) : (
                <PrayerCard data={todayData} />
            )}

            {/* MONTHLY TABLE */}
            <PrayerMonthlyTable country={country} city={selectedCity} />
        </div>
    );
}