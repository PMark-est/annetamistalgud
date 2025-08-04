import jwt from 'jsonwebtoken';

export function decodePaymentToken(token: string) {
  let secretKey = process.env.MONTONIO_SANDBOX_SECRET_KEY;
  if (process.env.NODE_ENV === 'prod') {
    secretKey = process.env.MONTONIO_SECRET_KEY;
  }
  try {
    const decoded = jwt.verify(token, secretKey as string);
    return decoded;
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
}
