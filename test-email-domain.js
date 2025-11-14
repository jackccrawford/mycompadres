// Simple test script for email domain parsing

// List of common personal email domains (copy from contact.ts)
const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
  'icloud.com', 'aol.com', 'protonmail.com', 'proton.me', 'mail.com',
  'zoho.com', 'yandex.com', 'gmx.com', 'tutanota.com', 'fastmail.com',
  'me.com', 'mac.com', 'msn.com', 'comcast.net', 'verizon.net',
  'att.net', 'sbcglobal.net', 'cox.net', 'charter.net', 'earthlink.net'
];

// Function to check if an email is likely from a business
function isBusinessEmail(email) {
  try {
    const domain = email.split('@')[1].toLowerCase();
    return !PERSONAL_EMAIL_DOMAINS.includes(domain);
  } catch (error) {
    // Fallback to false if there's any parsing error
    console.error('Error parsing email domain:', error);
    return false;
  }
}

// Test cases
const testEmails = [
  'user@gmail.com',
  'john.doe@company.com',
  'support@mvara.ai',
  'jackccrawford@gmail.com',
  'support@microsoft.com',
  'info@startup.io',
  'person@outlook.com',
  'test@protonmail.com',
  'invalid-email',
  'user@customdomain.com',
  'hello@windsurf.build'
];

// Run tests
console.log('Email Domain Classification Test:');
console.log('================================');
testEmails.forEach(email => {
  const isBusiness = isBusinessEmail(email);
  console.log(`${email.padEnd(30)} => ${isBusiness ? 'BUSINESS' : 'PERSONAL'}`);
});
