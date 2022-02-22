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
  setReloadPaymentMethods: React.Dispatch<React.SetStateAction<boolean>>;
}

const StripeContainer = ({ setReloadPaymentMethods }: Props) => {
  return (
    <>
      <Elements stripe={stripeTestPromise}>
        <CheckoutForm setReloadPaymentMethods={setReloadPaymentMethods} />
      </Elements>
    </>
  );
};

export default StripeContainer;
