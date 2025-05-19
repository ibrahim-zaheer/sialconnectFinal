function containsPhoneNumber(message) {
  if (!message) return false;

  const phonePatterns = [
    /\+92\d{10}\b/,     // Matches +92XXXXXXXXXX
    /\b03\d{9}\b/,      // Matches 03XXXXXXXXX
    /\b\d{11,12}\b/,     // Matches any 11–12 digit standalone numbers
    /\+92\d{0,10}/g,   // Matches +92, +923, +92301, ... up to 13 digits
    /\b03\d{0,9}\b/g   
  ];

  return phonePatterns.some((pattern) => pattern.test(message));
}

function containsEmail(message) {
  if (!message) return false;

  const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  return emailPattern.test(message);
}

function containsSensitiveData(message) {
  return containsPhoneNumber(message) || containsEmail(message);
}

module.exports = { containsPhoneNumber, containsEmail, containsSensitiveData };
