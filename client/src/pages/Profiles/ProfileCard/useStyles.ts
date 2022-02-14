import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  card: {
    marginRight: 40,
  },
  cardContainer: {
    height: 275,
    width: 225,
    // boxShadow: '1px 1px 5px lightgrey, -1px -1px 5px lightgrey',
    // marginRight: 40,
    textAlign: 'center',
    position: 'relative',
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
    position: 'absolute',
    bottom: 10,
    marginTop: '30px',
    width: '80%',
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
