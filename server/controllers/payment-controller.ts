import { Request, Response } from 'express';
import { createMontonioOrder } from '../services/montonio-service';
import { addDonation } from '../services/donation-service';
import { getDonationData } from '../services/donation-service';
import { fetchPaymentMethods } from '../services/payment/payment-methods-service';
import { handlePaymentNotification } from '../services/payment/payment-notify-service';
import { decodePaymentToken } from '../services/payment/payment-return-service';

export function paymentReturnHandler(req: Request, res: Response) {
  const { orderToken } = req.query;

  if (!orderToken || typeof orderToken !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid order token' });
  }

  try {
    console.log('wow');
    const decoded = decodePaymentToken(orderToken);
    return res.json(decoded);
  } catch (err) {
    console.error('Payment Return Error:', err);
    return res.status(400).json({ error: 'Invalid or expired token' });
  }
}

export async function paymentNotifyHandler(req: Request, res: Response) {
  try {
    const orderToken = req.query['order-token'] || req.body?.orderToken;

    if (!orderToken || typeof orderToken !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid order token' });
    }

    await handlePaymentNotification(orderToken);

    res.send('Payment notification processed');
  } catch (err) {
    console.error('Payment Notify Error:', err);
    res.status(400).json({ error: 'Invalid or expired token' });
  }
}

export async function paymentMethodsHandler(req: Request, res: Response) {
  try {
    const data = await fetchPaymentMethods();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch payment methods' });
  }
}

export async function paymentDataHandler(req: Request, res: Response) {
  try {
    const refresh = req.query.refresh === 'true';
    const data = await getDonationData(refresh);
    res.json(data);
  } catch (err) {
    console.error('paymentDataHandler error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const createOrder = async (req: Request, res: Response) => {
  const { preferredBank, preferredRegion, donationType, donationTotal } =
    req.body;

  try {
    const { paymentUrl, merchantReference } = await createMontonioOrder({
      preferredBank,
      preferredRegion,
      donationType,
      donationTotal,
    });

    await addDonation(donationType, donationTotal, merchantReference);

    console.log(paymentUrl);
    res.status(200).json(paymentUrl);
  } catch (error: any) {
    console.error('Montonio createOrder failed:', error?.message);
    res.status(500).json({ error: 'Failed to create order' });
  }
};
