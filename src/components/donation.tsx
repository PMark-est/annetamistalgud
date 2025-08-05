import axios from 'axios';
import React, { useEffect, useState } from 'react';
import type { Goal } from '../../types/donations';
import Button from './button/button.tsx';

interface StoreSetupData {
  [key: string]: any;
}

/*
<div className='flex items-center gap-1' key={value}>
  <input
    type='radio'
    id={`donation-${value}`}
    value={value}
    checked={donationTotal === value}
    onChange={() => setDonationTotal(value)}
  />
  <label htmlFor={`donation-${value}`}>{value}€</label>
</div>;

 */

const DonationButton = ({ name, children, className, callback }) => {
  return (
    <button
      name={name}
      type='button'
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        callback();
      }}
      className={`${className} border-solid border-1 border-slate-300 rounded-full cursor-pointer hover:brightness-95`}
    >
      {children}
    </button>
  );
};

const Donation: React.FC<{
  donationCode: string | undefined;
  setDonationCode: React.Dispatch<React.SetStateAction<string | undefined>>;
}> = ({ donationCode, setDonationCode }) => {
  const [storeSetupData, setStoreSetupData] = useState<StoreSetupData | null>(
    null
  );
  const [paymentData, setPaymentData] = useState<Goal[]>([]);
  const [bank, setBank] = useState<string>('');
  const [donation, setDonation] = useState<number>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const donationAmounts = [5, 10, 25, 50];

  useEffect(() => {
    const fetchData = async () => {
      const [storeSetup, payment] = await Promise.all([
        axios.get('/api/paymentMethods'),
        axios.get('/api/paymentData'),
      ]);

      setStoreSetupData(storeSetup.data);
      setPaymentData(payment.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.montonio.com/js/checkout.js';
    script.async = true;
    script.onload = () => {
      if (window.Montonio?.Checkout?.PaymentInitiation && storeSetupData) {
        const checkout = window.Montonio.Checkout.PaymentInitiation.create({
          accessKey: import.meta.env.VITE_MONTONIO_ACCESS_KEY,
          storeSetupData: JSON.stringify(storeSetupData),
          targetId: 'montonio-checkout',
          inputName: 'preferred-bank',
          shouldInjectCSS: false,
        });
        checkout.init();
      }
    };
    document.body.appendChild(script);
  }, [storeSetupData]);

  const pay = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!donation) {
      alert('please insert a valid donation, eg 24,40');
      return;
    }

    const payload = {
      preferredBank: bank,
      preferredRegion: 'EE',
      donationType: donationCode,
      donationTotal: donation,
    };

    try {
      setDisabled(true);
      const res = await axios.post('/api/createOrder', payload);
      window.location.href = res.data;
    } catch (err) {
      console.error(err);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className='bg-gray-100 px-10 md:px-32 py-12' id='donation-section'>
      <h3 className='uppercase text-xl md:text-4xl lg:text-5xl blue my-6'>
        Annetada saad siin!
      </h3>
      <form
        onSubmit={pay}
        className='flex flex-col gap-5 text-lg md:text-xl lg:text-2xl'
        id='my-checkout'
        noValidate
      >
        <div className='mt-4'>
          <span className='flex justify-between flex-col gap-2 lg:flex-row lg:gap-0 '>
            {donationAmounts.map(value => (
              <DonationButton
                name='amount'
                key={value}
                callback={() => {
                  setDonation(value);
                }}
                className={`p-2 px-26 ${donation === value ? 'bg-pink-100' : 'bg-white'}`}
              >
                {value}€
              </DonationButton>
            ))}
          </span>
          <input
            className={`rounded-full w-full mt-4 p-2 ${donation === undefined || donationAmounts.includes(donation)
              ? 'bg-white'
              : 'bg-pink-100'
              }`}
            type='number'
            placeholder='Muu summa'
            onChange={e => {
              setDonation(e.target.value);
            }}
            onClick={() => {
              setDonation(0);
            }}
          />
        </div>

        <div className='flex flex-col items-start gap-3'>
          {paymentData.map(goal =>
            goal.code !== 'hoiukodu' ? (
              <DonationButton
                name='type'
                key={goal.code}
                callback={() => {
                  setDonationCode(goal.code);
                }}
                className={`w-full lg:max-w-1/2 rounded-xl text-start relative overflow-hidden p-2 ${donationCode === goal.code ? 'bg-pink-100' : 'bg-white'}`}
              >
                <div
                  className='absolute top-0 left-0 w-2.5 h-full'
                  style={{ backgroundColor: goal.color }}
                />
                <div className='ml-4'>
                  <p>{goal.name}</p>
                  <p className='text-gray-500 text-sm'>{goal.code}</p>
                </div>
              </DonationButton>
            ) : null
          )}
        </div>

        <div className='grid grid-cols-2 w-full justify-between md:grid-cols-4 gap-2 lg:w-2/3'>
          {storeSetupData?.paymentMethods.paymentInitiation.setup.EE.paymentMethods.map(
            (paymentMethod, index) => (
              <button
                key={index}
                type='button'
                name='bank'
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setBank(paymentMethod.code);
                }}
                className={`flex ${bank === paymentMethod.code ? 'bg-gray-200' : 'bg-white'} items-center justify-center w-32 h-18 rounded-xl p-4 cursor-pointer hover:bg-gray-200`}
              >
                <img src={paymentMethod.logoUrl} width={72} height={72} />
              </button>
            )
          )}
        </div>

        <Button disabled={disabled} type='submit'>
          Maksma
        </Button>
      </form>
    </div>
  );
};

export default Donation;

declare global {
  interface Window {
    Montonio?: any;
  }
}
