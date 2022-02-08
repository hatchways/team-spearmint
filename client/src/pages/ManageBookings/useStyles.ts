import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  leftContainer: {
    display: 'flex',
    justifyContent: 'start',
  },
  rightContainer: {
    display: 'flex',
  },
  leftWrapper: {
    width: '88%',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  rightWrapper: {
    width: '100%',
  },
  contentWrapper: {
    margin: '0 auto',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
    boxShadow:
      '0px 0px 1.9px rgba(0, 0, 0, 0.007),0px 0px 4.9px rgba(0, 0, 0, 0.014),0px 0px 9.9px rgba(0, 0, 0, 0.021),0px 0px 20.4px rgba(0, 0, 0, 0.031),0px 0px 56px rgba(0, 0, 0, 0.05)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    fontWeight: 'bolder',
  },
  bookingContent: {
    marginTop: 30,
    marginBottom: 10,
  },
  scrollArea: {
    paddingRight: 10,
    maxHeight: 400,
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'rgba(230, 230, 230, 0.9)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(170, 170, 170, 1)',
      borderRadius: 6,
    },
  },
  requests: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  calendarContainer: {
    width: '100%',
    textAlign: 'center',
    padding: '30px 10px',
  },
}));

export default useStyles;
