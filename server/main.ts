import express from 'express';
import path from 'node:path';
import * as PaymentController from './controllers/payment-controller';

const app = express();
const PORT = 3000;

const rootDir = path.join(__dirname, '..');
app.use(express.json());
app.use(express.static(path.join(rootDir, 'dist')));

app.get('/api/paymentMethods', PaymentController.paymentMethodsHandler);
app.get('/api/paymentData', PaymentController.paymentDataHandler);
app.post('/api/createOrder', PaymentController.createOrder);
app.post('/api/paymentNotify', PaymentController.paymentNotifyHandler);
app.get('/api/paymentReturn', PaymentController.paymentReturnHandler);

app.get('/{*all}', (req, res) => {
  res.sendFile(path.join(rootDir, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
