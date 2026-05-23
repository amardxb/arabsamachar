 

import React from "react";

export default function DateTimeCard({ className, postTime, formattedDate }) {
  // Use formattedDate prop if provided, otherwise format the date internally
  const displayedDate = formattedDate ? formattedDate : new Date(postTime).toLocaleDateString('en-US', {
    weekday: 'short', // Display abbreviated weekday (Fri)
    year: 'numeric', // Display full year (2024)
    month: 'short', // Display abbreviated month (Apr)
    day: 'numeric',  // Display day of the month (19)
    hour: 'numeric',  // Display hour (10)
    minute: 'numeric', // Display minutes (51)
    hour12: true,    // Display 12-hour format (AM/PM)
  });

  return (
    <div>
      <span className={className}>{displayedDate}</span>
    </div>
  );
}
