'use client';

import { useEffect, useState } from 'react';

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

export default function PrayerMonthlyTable({ country, city }) {
    const [monthlyData, setMonthlyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // 1-12
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    // Available months: current month se December tak isi saal ke
    const currentMonth = new Date().getMonth() + 1;
    const availableMonths = [];
    for (let m = currentMonth; m <= 12; m++) {
        availableMonths.push({ value: m, label: monthNames[m - 1], year: selectedYear });
    }

    useEffect(() => {
        setLoading(true);
        fetch(`/api/prayer-time/monthly?country=${country}&city=${city}&month=${selectedMonth}&year=${selectedYear}`)
            .then((r) => r.json())
            .then((data) => {
                setMonthlyData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [country, city, selectedMonth, selectedYear]);

    return (
        <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="bg-[#0f172a] text-white px-4 py-3 flex items-center justify-between flex-wrap gap-2">
                <span className="font-bold text-sm">मासिक नमाज़ समय सारणी</span>
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    className="text-black text-sm rounded px-2 py-1"
                >
                    {availableMonths.map((m) => (
                        <option key={m.value} value={m.value}>{m.label} {m.year}</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="p-5 text-center text-gray-500">Table load ho raha hai...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700">Fajr</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700">Sunrise</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700">Dhuhr</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700">Asr</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700">Maghrib</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700">Isha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthlyData?.days?.map((day, i) => (
                                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-4 py-3 text-gray-800">
                                        {day.date}
                                        <div className="text-xs text-gray-500">{day.hijriMonth} {day.hijriDay}</div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-800">{day.Fajr}</td>
                                    <td className="px-4 py-3 text-gray-800">{day.Sunrise}</td>
                                    <td className="px-4 py-3 text-gray-800">{day.Dhuhr}</td>
                                    <td className="px-4 py-3 text-gray-800">{day.Asr}</td>
                                    <td className="px-4 py-3 text-gray-800">{day.Maghrib}</td>
                                    <td className="px-4 py-3 text-gray-800">{day.Isha}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}