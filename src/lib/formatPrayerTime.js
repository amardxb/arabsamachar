export function formatPrayerTime(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    const totalMinutes = h * 60 + m;

    let period = '';
    if (totalMinutes >= 0 && totalMinutes < 210) {
        period = 'रात'; // 12:00 AM - 3:29 AM
    } else if (totalMinutes >= 210 && totalMinutes < 720) {
        period = 'सुबह'; // 4:00 AM - 11:59 AM
    } else if (totalMinutes >= 720 && totalMinutes < 960) {
        period = 'दोपहर'; // 12:00 PM - 3:59 PM
    } else if (totalMinutes >= 960 && totalMinutes < 1170) {
        period = 'शाम'; // 4:00 PM - 7:29 PM
    } else {
        period = 'रात'; // 7:30 PM - 11:59 PM
    }

    // 12-hour format me convert karo, bina AM/PM ke
    let displayHour = h % 12;
    if (displayHour === 0) displayHour = 12;
    const displayMinute = String(m).padStart(2, '0');

    return { time: `${displayHour}:${displayMinute}`, period };
}