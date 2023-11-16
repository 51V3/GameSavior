const mailjet = require('node-mailjet');
const jsPDF = require('jspdf');

const mailjetClient = mailjet.connect(
  process.env.MJ_APIKEY_PUBLIC, // Mailjet API key public
  process.env.MJ_APIKEY_PRIVATE, // Mailjet API key private
);

exports.handler = async function (event, context) {
  const { to, subject } = JSON.parse(event.body);

  // Create a PDF document
  const pdf = new jsPDF();
  pdf.text('Game Details:', 10, 10);

  // Convert PDF to base64
  const pdfBase64 = pdf.output('datauristring').split(',')[1];

  const request = mailjetClient
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: 'contacts.gamesavior@gmail.com',
          },
          To: [
            {
              Email: to,
            },
          ],
          Subject: subject,
          Attachments: [
            {
              ContentType: 'application/pdf',
              Filename: 'ticket.pdf',
              Base64Content: pdfBase64,
            },
          ],
          HTMLPart: `<p>Thank you for your order! Here are your tickets.</p><p>See attached PDF for game details.</p>`,
        },
      ],
    });

  try {
    const response = await request;
    console.log(response.body);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
