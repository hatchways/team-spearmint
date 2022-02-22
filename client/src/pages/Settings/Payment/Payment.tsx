import { Box, Card, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import StripeContainer from '../../../components/Stripe/StripeContainer';
import useStyles from './useStyles';
import visaLogo from '../../../images/visa logo.gif';
import CheckIcon from '@mui/icons-material/Check';
import { getAllPaymentMethods } from '../../../helpers/APICalls/getAllPaymentMethods';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { NumberLocale } from 'yup/lib/locale';
import { BrandingWatermark } from '@mui/icons-material';
import logout from '../../../helpers/APICalls/logout';

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
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState();
  const array = ['test', 'test1'];

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

    allPaymentMethods();
  }, [updateSnackBarMessage]);
  console.log(paymentMethods);
  console.log(defaultPaymentMethod);
  // brand: "visa"
  // experationMonth: 2
  // experationYear: 2022
  // id: "pm_1KVnm9FCgtc1brY3kE0CJzXG"
  // last4: "5556"
  // name: "test"

  return (
    <>
      <SettingHeader header={header} />
      <Box>
        <Typography variant="h5" sx={{ color: 'gray', marginBottom: 5 }}>
          Saved Payment Profiles:
        </Typography>
        <Box display="flex" flexDirection="row" justifyContent="space-around" marginBottom="40px">
          {paymentMethods.map((payment) => {
            const { brand, experationMonth, experationYear, last4, id, name } = payment;

            const logo = () => {
              if (brand === 'visa') {
                return visaLogo;
              } else if (brand === 'mastercard') {
                return 'MC';
              }
            };

            return (
              <>
                <Card className={classes.paymentCard}>
                  <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                    <img className={classes.cardLogo} src={logo()}></img>
                    <Box border="solid 2px black" height="25px" width="25px" borderRadius="50%" marginRight="15px">
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
        <StripeContainer setPaymentMethods={setPaymentMethods} />
      </Box>
    </>
  );
}
