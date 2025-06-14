import React from "react";

// Utility function to get the ordinal suffix
const getOrdinalSuffix = (n) => {
  if (n % 10 === 1 && n !== 11) {
    return n + "st";
  } else if (n % 10 === 2 && n !== 12) {
    return n + "nd";
  } else if (n % 10 === 3 && n !== 13) {
    return n + "rd";
  } else {
    return n + "th";
  }
};

// Reusable DateDisplay component
const DateDisplay = ({ date }) => {
  const formatDate = (date) => {
    const d = new Date(date);

    // Format the date without the ordinal suffix using Intl.DateTimeFormat
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",   // "numeric" will display the day as a number
      month: "long",    // "long" will display the full month name
      year: "numeric",  // "numeric" will display the full year
    }).format(d);

    // Get the day and apply the ordinal suffix
    const day = d.getDate();
    const dayWithSuffix = getOrdinalSuffix(day);

    // Return the final formatted date with the ordinal suffix
    return formattedDate.replace(day, dayWithSuffix);
  };

  return (
    <span>{formatDate(date)}</span>
  );
};

export default DateDisplay;
