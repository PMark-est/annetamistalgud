import axios from 'axios';
import jwt from 'jsonwebtoken';

export async function fetchPaymentMethods(): Promise<any> {
  let accessKey = process.env.MONTONIO_SANDBOX_ACCESS_KEY;
  let secretKey = process.env.MONTONIO_SANDBOX_SECRET_KEY;
  let url = process.env.MONTONIO_SANDBOX_API_URL;
  if (process.env.NODE_ENV === 'production') {
    accessKey = process.env.MONTONIO_ACCESS_KEY;
    secretKey = process.env.MONTONIO_SECRET_KEY;
    url = process.env.MONTONIO_API_URL;
  }
  try {
    const payload = {
      accessKey: accessKey,
    };

    const token = jwt.sign(payload, secretKey as string, {
      algorithm: 'HS256',
      expiresIn: '10m',
    });

    const response = await axios.get(`${url}/stores/payment-methods`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch payment methods:', error);
    throw new Error('Montonio API error');
  }
}
