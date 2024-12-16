const sgMail = require("@sendgrid/mail");

// Set API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Send an email using SendGrid
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Email body
 */
const sendEmail = async (to, subject, text) => {
  const msg = {
    to,
    from: "ibrahim346zaheer@gmail.com", // Use a verified sender email
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
