import jwt from 'jsonwebtoken';
import { prisma } from '../../prisma';

export async function handlePaymentNotification(orderToken: string) {
  let secretKey = process.env.MONTONIO_SANDBOX_SECRET_KEY;
  if (process.env.NODE_ENV === 'production') {
    secretKey = process.env.MONTONIO_SECRET_KEY;
  }
  const decoded = jwt.verify(orderToken, secretKey as string) as {
    paymentStatus: string;
    merchant_reference: string;
  };

  if (decoded.paymentStatus === 'PAID') {
    await prisma.donation.updateMany({
      where: {
        montonioMerchantReference: decoded.merchant_reference,
      },
      data: {
        paid: true,
      },
    });
  }
}
