import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  submit: {
    width: 150,
    height: 45,
    borderRadius: theme.shape.borderRadius,
  },
}));

export default useStyles;
