import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  cardContainer: {
    height: 275,
    width: 225,
    boxShadow: '1px 1px 5px lightgrey, -1px -1px 5px lightgrey',
    marginRight: 40,
    textAlign: 'center',
  },
  profilePic: {
    height: 80,
    width: 80,
    borderRadius: '50%',
    marginTop: 0,
  },
  description: {
    width: '70%',
  },
  innerFlexRowProfileContainer: {
    marginTop: '30px',
  },
  location: {
    marginRight: '60px !important',
  },
  button: {
    marginTop: '30px !important',
    marginBottom: '40px !important',
  },
}));

export default useStyles;
