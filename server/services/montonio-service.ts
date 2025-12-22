import jwt from 'jsonwebtoken';
import axios, { AxiosError } from 'axios';

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY_MS = 1000;

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface CreateOrderPayload {
  preferredBank: string;
  preferredRegion: string;
  donationType: string;
  donationTotal: number;
}

export const createMontonioOrder = async ({
  preferredBank,
  preferredRegion,
  donationType,
  donationTotal,
}: CreateOrderPayload): Promise<{
  paymentUrl: string;
  merchantReference: string;
}> => {
  const merchantReference = `${donationType}-${crypto.randomUUID()}`;

  let accessKey = process.env.MONTONIO_SANDBOX_ACCESS_KEY;
  let secretKey = process.env.MONTONIO_SANDBOX_SECRET_KEY;
  let url = process.env.MONTONIO_SANDBOX_API_URL;
  if (process.env.NODE_ENV === 'production') {
    accessKey = process.env.MONTONIO_ACCESS_KEY;
    secretKey = process.env.MONTONIO_SECRET_KEY;
    url = process.env.MONTONIO_API_URL;
  }
  // Use a dummy webhook URL for local development if NOTIFY_URL is localhost
  const notifyUrl = process.env.NOTIFY_URL || '';
  const isLocalhost = notifyUrl.includes('localhost') || notifyUrl.includes('127.0.0.1');
  const notificationUrl = isLocalhost
    ? 'https://webhook.site/00000000-0000-0000-0000-000000000000' // Dummy URL for local dev
    : `${notifyUrl}/api/paymentNotify`;

  const payload = {
    accessKey: accessKey,
    merchantReference,
    returnUrl: `${process.env.BASE_URL}/payment-return`,
    notificationUrl,
    grandTotal: donationTotal,
    currency: 'EUR',
    locale: 'et',
    payment: {
      method: 'paymentInitiation',
      amount: donationTotal,
      currency: 'EUR',
      methodOptions: {
        paymentDescription: donationType,
        preferredCountry: preferredRegion,
        preferredProvider: preferredBank,
      },
    },
  };

  const token = jwt.sign(payload, secretKey as string, {
    algorithm: 'HS256',
    expiresIn: '10m',
  });

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await axios.post(
        `${url}/api/orders`,
        { data: token },
        {
          timeout: 30000,
          headers: {
            'User-Agent': 'CatsHelp-Donations/1.0 (+https://catshelp.ee)',
          },
        }
      );
      return { paymentUrl: response.data.paymentUrl, merchantReference };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const status = axiosError.response?.status;

        // Log on every attempt
        console.error(
          `Montonio Error (attempt ${attempt}/${MAX_RETRIES}):`,
          status,
          axiosError.message
        );

        // Only retry on 403 (WAF/rate limit) or 5xx (server errors)
        // Don't retry on 4xx client errors (except 403)
        if (status && status !== 403 && status >= 400 && status < 500) {
          console.error('Montonio Response Data:', JSON.stringify(axiosError.response?.data, null, 2));
          throw new Error(`Failed to create Montonio order: ${axiosError.message}`);
        }
      }

      // If we have retries left, wait with exponential backoff
      if (attempt < MAX_RETRIES) {
        const delay = INITIAL_RETRY_DELAY_MS * Math.pow(2, attempt - 1);
        console.log(`Retrying Montonio request in ${delay}ms...`);
        await sleep(delay);
      }
    }
  }

  // All retries exhausted
  console.error('Montonio: All retry attempts exhausted');
  throw new Error(`Failed to create Montonio order after ${MAX_RETRIES} attempts: ${lastError?.message}`);
};
