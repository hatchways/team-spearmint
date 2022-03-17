import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  paymentCard: {
    border: 'solid 2px black',
    height: 175,
    width: 250,
  },
  cardLogo: {
    height: 75,
    width: 75,
    marginLeft: 10,
  },
  nextButton: {
    float: 'right',
  },
  checkIcon: {
    cursor: 'pointer',
  },
}));

export default useStyles;
