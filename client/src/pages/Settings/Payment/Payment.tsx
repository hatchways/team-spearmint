import { Box, Card, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import StripeContainer from '../../../components/Stripe/StripeContainer';
import useStyles from './useStyles';
import visaLogo from '../../../images/visa logo.gif';
import CheckIcon from '@mui/icons-material/Check';
interface Props {
  header: string;
}

export default function Payment({ header }: Props) {
  const classes = useStyles();
  const [paymentProfiles, setPaymentProfiles] = useState();
  const array = ['test', 'test'];
  const PaymentCard = () => {
    const active = true;
    return (
      <>
        <Card className={classes.paymentCard}>
          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
            <img className={classes.cardLogo} src={visaLogo}></img>
            <Box
              border="solid 2px black"
              height="25px"
              width="25px"
              borderRadius="50%"
              marginRight="15px"
              sx={{ backgroundColor: active && 'red' }}
            >
              {active && <CheckIcon></CheckIcon>}
            </Box>
          </Box>
          <Typography sx={{ marginLeft: 5, fontWeight: 'bold' }} variant="subtitle1">
            **** **** **** 1234
          </Typography>
          <Typography sx={{ marginLeft: 5, color: 'gray' }} variant="subtitle1">
            Exp. Date 11/24
          </Typography>
          <Typography sx={{ marginLeft: 5 }} variant="subtitle1">
            John Smith
          </Typography>
        </Card>
      </>
    );
  };

  return (
    <>
      <SettingHeader header={header} />
      <Box>
        <Typography variant="h5" sx={{ color: 'gray', marginBottom: 5 }}>
          Saved Payment Profiles:
        </Typography>
        <Box display="flex" flexDirection="row" justifyContent="space-around" marginBottom="40px">
          {array.map((str) => {
            return <PaymentCard key={str}></PaymentCard>;
          })}
        </Box>
        <StripeContainer />
      </Box>
    </>
  );
}
