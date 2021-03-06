import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: '70%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  label: {
    fontSize: 19,
    color: 'rgb(0,0,0,0.4)',
    paddingLeft: '5px',
  },
  inputs: {
    marginTop: '.8rem',
    height: '2rem',
    padding: '5px',
  },
  forgot: {
    paddingRight: 10,
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 220,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    fontSize: 16,
    fontWeight: 'bold',
  },
}));

export default useStyles;
