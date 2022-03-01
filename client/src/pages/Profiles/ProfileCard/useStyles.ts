import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  card: {
    marginRight: 40,
  },
  cardContainer: {
    height: 275,
    width: 225,
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
  divider: {
    width: '100%',
    position: 'absolute',
    top: '85%',
  },
}));

export default useStyles;
