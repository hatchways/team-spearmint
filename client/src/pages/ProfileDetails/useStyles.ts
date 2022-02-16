import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  profileWrapper: {
    minHeight: 600,
    margin: '0 auto',
    marginBottom: 50,
    backgroundColor: '#fff',
    borderRadius: 2,
    boxShadow:
      '0px 0px 1.9px rgba(0, 0, 0, 0.007),0px 0px 4.9px rgba(0, 0, 0, 0.014),0px 0px 9.9px rgba(0, 0, 0, 0.021),0px 0px 20.4px rgba(0, 0, 0, 0.031),0px 0px 56px rgba(0, 0, 0, 0.05)',
  },
  profileInfoContainer: {
    margin: '0 15px',
  },
  avatar: {
    marginTop: -66,
    border: '5px solid #fff',
  },
  name: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '10px 0px 15px 0px',
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutMe: {
    marginTop: '20px',
  },
  description: {
    lineHeight: '1px !important',
  },
  pictures: {
    height: 80,
    width: 80,
    borderRadius: 8,
  },
  requestWrapper: {
    minHeight: 400,
    margin: '0 auto',
    marginBottom: 50,
    backgroundColor: '#fff',
    borderRadius: 2,
    boxShadow:
      '0px 0px 1.9px rgba(0, 0, 0, 0.007),0px 0px 4.9px rgba(0, 0, 0, 0.014),0px 0px 9.9px rgba(0, 0, 0, 0.021),0px 0px 20.4px rgba(0, 0, 0, 0.031),0px 0px 56px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default useStyles;
