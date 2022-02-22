import { Box, Button, Card, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import StripeContainer from '../../../components/Stripe/StripeContainer';
import useStyles from './useStyles';
import visaLogo from '../../../images/visa logo.gif';
import mastercardLogo from '../../../images/mastercard logo.jpeg';
import CheckIcon from '@mui/icons-material/Check';
import { getAllPaymentMethods } from '../../../helpers/APICalls/getAllPaymentMethods';
import { setDefaultPayment } from '../../../helpers/APICalls/setDefaultPayment';
import { useSnackBar } from '../../../context/useSnackbarContext';

interface Props {
  header: string;
}

interface PaymentCard {
  brand: string;
  experationMonth: number;
  experationYear: number;
  id: string;
  last4: string;
  name: string;
}
export default function Payment({ header }: Props) {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const [paymentMethods, setPaymentMethods] = useState<PaymentCard[]>([]);
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState<string>();
  const [reloadPaymentMethods, setReloadPaymentMethods] = useState(true);
  useEffect(() => {
    const allPaymentMethods = async () => {
      const paymentMethods = await getAllPaymentMethods();

      if (!paymentMethods) {
        updateSnackBarMessage('Error, could not load payment methods!');
      } else {
        setPaymentMethods(paymentMethods.paymentMethods);
        setDefaultPaymentMethod(paymentMethods.defaultPaymentMethod);
        updateSnackBarMessage('Loaded payment methods!');
      }
    };

    if (reloadPaymentMethods) {
      allPaymentMethods();
      setReloadPaymentMethods(false);
    }
  }, [updateSnackBarMessage, reloadPaymentMethods]);

  const handleSetDefaultClick = async (paymentId: string) => {
    if (paymentId === defaultPaymentMethod) {
      updateSnackBarMessage('This card is already the default payment option!');
    } else {
      const updatedPaymentOption = setDefaultPayment(paymentId);

      if (!updatedPaymentOption) {
        updateSnackBarMessage('There was an error updating default payment option!');
      } else {
        setDefaultPaymentMethod(paymentId);
        updateSnackBarMessage('Default payment option updated!');
      }
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    const next = currentIndex + 2;
    if (next > paymentMethods.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => prev + 2);
    }
  };
  console.log(paymentMethods);
  console.log(defaultPaymentMethod);

  return (
    <>
      <SettingHeader header={header} />
      <Box>
        <Typography variant="h5" sx={{ color: 'gray', marginBottom: 5 }}>
          Saved Payment Profiles:
        </Typography>
        <Box display="flex" flexDirection="row" justifyContent="space-around" marginBottom="40px">
          {paymentMethods.slice(currentIndex, currentIndex + 2).map((payment) => {
            const { brand, experationMonth, experationYear, last4, id, name } = payment;

            const logo = () => {
              if (brand === 'visa') {
                return visaLogo;
              } else if (brand === 'mastercard') {
                return mastercardLogo;
              }
            };

            return (
              <>
                <Card className={classes.paymentCard}>
                  <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                    <img className={classes.cardLogo} src={logo()}></img>
                    <Box
                      className={classes.checkIcon}
                      onClick={() => handleSetDefaultClick(id)}
                      border="solid 2px black"
                      height="25px"
                      width="25px"
                      borderRadius="50%"
                      marginRight="15px"
                    >
                      {defaultPaymentMethod === id && <CheckIcon></CheckIcon>}
                    </Box>
                  </Box>
                  <Typography sx={{ marginLeft: 5, fontWeight: 'bold' }} variant="subtitle1">
                    **** **** **** {last4}
                  </Typography>
                  <Typography sx={{ marginLeft: 5, color: 'gray' }} variant="subtitle1">
                    Exp. Date {experationMonth}/{experationYear}
                  </Typography>
                  <Typography sx={{ marginLeft: 5 }} variant="subtitle1">
                    {name}
                  </Typography>
                </Card>
              </>
            );
          })}
        </Box>
        {paymentMethods.length > 2 && (
          <>
            <Button className={classes.nextButton} variant="outlined" onClick={() => handleNextClick()}>
              Next
            </Button>
          </>
        )}

        <StripeContainer setReloadPaymentMethods={setReloadPaymentMethods} />
      </Box>
    </>
  );
}
