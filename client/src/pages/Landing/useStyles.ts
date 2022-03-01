import { makeStyles } from '@mui/styles';
import landingPicture from '../../images/landing/landing_page.jpeg';

const useStyles = makeStyles(() => ({
  container: {
    position: 'absolute',
    minHeight: '100vh',
    top: '0',
  },
  image: {
    backgroundImage: `url(${landingPicture})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-Repeat',
    backgroundSize: 'cover',
    minHeight: '45vh',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    padding: '0% 7%',
  },
}));

export default useStyles;
