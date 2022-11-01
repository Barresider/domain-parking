import AWS from "aws-sdk";
import z from "zod";
import { processResponse } from "./process-response";

const SES = new AWS.SES();
const UTF8CHARSET = 'UTF-8';

interface Event {
  httpMethod: string;
  body: string;
}

export const handler = async (event: Event) => {
  let {
    httpMethod,
    body,
  } = event;

  if (httpMethod !== 'POST') {
    return processResponse(true, 'Method not allowed', 405);
  }

  const schema = z.object({
    email: z.string().email(),
    subject: z.string(),
    message: z.string(),
    offer: z.number(),
    currency: z.enum(['USD', 'EUR']),
    domain: z.string(),
  });

  let bodyValidation = schema.safeParse(JSON.parse(body));

  if (!bodyValidation.success) {
    return processResponse(true, bodyValidation.error, 400);
  }

  let { email, subject, message } = bodyValidation.data;

  // const body = (emailData.message && isHTML(emailData.message)) ?
  //   { Html: { Charset: UTF8CHARSET, Data: emailData.message } } :
  //   { Text: { Charset: UTF8CHARSET, Data: emailData.message } };

  let bodyData = `Email: ${email} 
Subject: ${subject}
Offer: ${bodyValidation.data.offer} ${bodyValidation.data.currency}
Domain: ${bodyValidation.data.domain}


Message:
${message}`;

  const emailParams: AWS.SES.SendEmailRequest = {
    Destination: {
      ToAddresses: [process.env.FROM_EMAIL]
    },
    Message: {
      Body: {
        Text: {
          Charset: UTF8CHARSET,
          Data: bodyData
        }
      },
      Subject: {
        Charset: UTF8CHARSET,
        Data: `DOMAIN REQUEST: ${subject}`
      }
    },
    Source: process.env.FROM_EMAIL
  };

  try {
    await SES.sendEmail(emailParams).promise();
    return processResponse(true);
  } catch (err) {
    console.error(err, (err as any).stack);
    const errorResponse = `Error: Execution update, caused a SES error, please look at your logs.`;
    return processResponse(true, errorResponse, 500);
  }
};