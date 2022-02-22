import React, { useEffect, useState } from 'react';
import { PaymentElement, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { createPayment } from '../../helpers/APICalls/createPayment';
import { useSnackBar } from '../../context/useSnackbarContext';
import { Box, Button, CircularProgress } from '@mui/material';
import useStyles from './useStyles';

interface Props {
  setReloadPaymentMethods: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CheckoutForm({ setReloadPaymentMethods }: Props) {
  const { updateSnackBarMessage } = useSnackBar();
  const classes = useStyles();
  const [newCard, setNewCard] = useState(false);
  const [savingCard, setSavingCard] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setSavingCard(true);
    if (!elements || !stripe) {
      setSavingCard(false);
      return;
    }

    const newPayment = await createPayment();

    if (!newPayment) {
      updateSnackBarMessage('There was an error setting up payment!');
    } else {
      console.log(newPayment);
      console.log(newPayment.clientSecret);
      const { setupIntent, error } = await stripe.confirmCardSetup(newPayment.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: newPayment.billingDetails.name,
            email: newPayment.billingDetails.email,
          },
        },
      });

      if (error) {
        alert(error);
      } else if (setupIntent) {
        updateSnackBarMessage('Successfully created new payment method');
        console.log(setupIntent);
        setSavingCard(false);
        setNewCard(false);
        setReloadPaymentMethods(true);
      }
    }
  };

  return (
    <Box display="flex" alignContent="flex-start" width="100%">
      {newCard ? (
        <form onSubmit={handleSubmit} className={classes.form}>
          <CardElement />
          <Button type="submit" color="primary" variant="outlined" sx={{ marginTop: 2.5 }}>
            {savingCard ? <CircularProgress size="2rem" thickness={1.5} /> : 'Add card'}
          </Button>
        </form>
      ) : (
        <Button disabled={!stripe} onClick={() => setNewCard(true)} color="primary" variant="outlined" size="large">
          Add new payment profile
        </Button>
      )}
    </Box>
  );
}

//   const [message, setMessage] = useState<string | null | undefined>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!stripe) {
//       return;
//     }

//     const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');

//     if (!clientSecret) {
//       return;
//     }

//     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//       switch (paymentIntent?.status) {
//         case 'succeeded':
//           setMessage('Payment succeeded!');
//           break;
//         case 'processing':
//           setMessage('Your payment is processing.');
//           break;
//         case 'requires_payment_method':
//           setMessage('Your payment was not successful, please try again.');
//           break;
//         default:
//           setMessage('Something went wrong.');
//           break;
//       }
//     });
//   }, [stripe]);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     setIsLoading(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         // Make sure to change this to your payment completion page
//         return_url: 'http://localhost:3000',
//       },
//     });

//     // This point will only be reached if there is an immediate error when
//     // confirming the payment. Otherwise, your customer will be redirected to
//     // your `return_url`. For some payment methods like iDEAL, your customer will
//     // be redirected to an intermediate site first to authorize the payment, then
//     // redirected to the `return_url`.
//     if (error.type === 'card_error' || error.type === 'validation_error') {
//       setMessage(error.message);
//     } else {
//       setMessage('An unexpected error occured.');
//     }

//     setIsLoading(false);
//   };

//   return (
//     <form id="payment-form" onSubmit={handleSubmit}>
//       <PaymentElement id="payment-element" />
//       <button disabled={isLoading || !stripe || !elements} id="submit">
//         <span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}</span>
//       </button>
//       {/* Show any error or success messages */}
//       {message && <div id="payment-message">{message}</div>}
//     </form>
//   );
