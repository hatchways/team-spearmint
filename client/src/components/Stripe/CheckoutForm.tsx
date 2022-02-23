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
