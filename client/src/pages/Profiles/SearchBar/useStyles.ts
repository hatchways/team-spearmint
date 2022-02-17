import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  flexRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 400,
    marginBottom: 30,
  },
  date: {
    width: 250,
  },
  profileContainer: {
    backgroundColor: 'purple',
    height: '60%',
    width: '80%',
  },
  innerFlexRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
