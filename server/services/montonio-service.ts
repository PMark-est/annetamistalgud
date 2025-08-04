import jwt from 'jsonwebtoken';
import axios from 'axios';

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
  if (process.env.NODE_ENV === 'prod') {
    accessKey = process.env.MONTONIO_ACCESS_KEY;
    secretKey = process.env.MONTONIO_SECRET_KEY;
    url = process.env.MONTONIO_API_URL;
  }
  const payload = {
    accessKey: accessKey,
    merchantReference,
    returnUrl: `${process.env.BASE_URL}/payment-return`,
    notificationUrl: `${process.env.NOTIFY_URL}/api/paymentNotify`,
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

  try {
    const response = await axios.post(`${url}/orders`, {
      data: token,
    });
    return { paymentUrl: response.data.paymentUrl, merchantReference };
  } catch (error) {
    console.error('Montonio Error:\n', error);
  }
};
