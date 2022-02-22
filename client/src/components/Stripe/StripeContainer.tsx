import React, { useState, useEffect } from 'react';
import { Appearance, loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { FetchOptions } from '../../interface/FetchOptions';
import { AuthApiData } from '../../interface/AuthApiData';

import CheckoutForm from './CheckoutForm';
import SettingHeader from '../SettingsHeader/SettingsHeader';

const PUBLIC_KEY =
  'pk_test_51KV92vFCgtc1brY3Bh4YYuzFkYRSN8GghvdDGCNVftdvnZBKUZB58b1mOyJtETy83kBwQWYSfgaCu9c5Y6SYwKVk00IUQrbjmy';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

interface Props {
  setPaymentMethods: React.Dispatch<React.SetStateAction<any[]>>;
}

const StripeContainer = ({ setPaymentMethods }: Props) => {
  const [clientSecret, setClientSecret] = useState('');

  // useEffect(() => {
  //   const fetchOptions: FetchOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ price: [{ id: 'dog_sitting' }] }),
  //     credentials: 'include',
  //   };
  //   // Create PaymentIntent as soon as the page loads
  //   fetch('/create-payment-intent', fetchOptions)
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret));
  // }, []);

  const appearance: Appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#e97aff',
      colorBackground: '#f61ff9',
      colorText: '#5cff5f',
    },
  };
  const options: StripeElementsOptions = {
    // clientSecret,
    appearance,
  };

  return (
    <>
      <Elements options={options} stripe={stripeTestPromise}>
        <CheckoutForm setPaymentMethods={setPaymentMethods} />
      </Elements>
    </>
  );
};

export default StripeContainer;
