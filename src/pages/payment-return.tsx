import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentReturn: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query params from URL
  const queryParams = new URLSearchParams(location.search);
  const orderToken: string = queryParams.get('order-token') || '';

  const [status, setStatus] = useState<string>('');
  console.log('payment return');

  useEffect(() => {
    if (!orderToken) return;

    axios
      .get<{ paymentStatus: string }>('/api/paymentReturn', {
        params: { orderToken },
      })
      .then(async res => {
        const data = res.data;
        setStatus(data.paymentStatus);
        navigate('/'); // redirect to home
      })
      .catch(err => {
        console.error('Error fetching payment status:', err);
      });
  }, [orderToken, navigate]);

  return <div>Payment status: {status}</div>;
};

export default PaymentReturn;
