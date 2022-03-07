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
    alignItems: 'center',
    width: 400,
    marginBottom: 30,
  },
  date: {
    width: 250,
  },
  searchButton: {
    height: 52,
  },
}));

export default useStyles;
