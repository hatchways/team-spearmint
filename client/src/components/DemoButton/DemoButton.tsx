import Button from '@mui/material/Button';
import useStyles from './useStyles';
import { demoUserCredential } from '../../helpers/DemoUserCredential/DemoUserCredential';
import login from '../../helpers/APICalls/login';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useAuth } from '../../context/useAuthContext';

const DemoButton = () => {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleLogin = () => {
    login(demoUserCredential.email, demoUserCredential.password).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Button
      onClick={() => {
        handleLogin();
      }}
      size="large"
      variant="outlined"
      color="primary"
      className={classes.submit}
      disableElevation
    >
      Demo
    </Button>
  );
};

export default DemoButton;
