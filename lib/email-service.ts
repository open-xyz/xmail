// This is a mock service that simulates sending emails through Stalwart SMTP server
export async function sendEmail(to: string, subject: string, body: string) {
  // In a real-world scenario, this would connect to Stalwart SMTP server
  console.log('Simulating email send via Stalwart SMTP:');
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${body}`);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate success or failure
  if (Math.random() > 0.1) {
    return { success: true, message: 'Email sent successfully' };
  } else {
    throw new Error('Failed to send email');
  }
}