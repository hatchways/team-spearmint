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
    width: 500,
    marginBottom: 30,
    marginTop: 20,
  },
  date: {
    width: 100,
  },
  searchButton: {
    height: 52,
  },
}));

export default useStyles;
