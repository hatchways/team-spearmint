import { FetchOptions } from './../../interface/FetchOptions';

export const createPayment = async () => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
  };
  return await fetch(`/payment/add-payment`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
