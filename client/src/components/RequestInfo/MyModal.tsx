import { Box, Grid, Typography, Avatar } from '@mui/material';
import Modal from '@mui/material/Modal';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import useStyles from './useStyles';

const MyModal: React.FC<{
  dummyData: any;
  open: boolean;
  handleClose: () => void;
}> = ({ dummyData, open, handleClose }) => {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={handleClose} disableAutoFocus={true}>
      <Box className={classes.modalBox}>
        <Typography id="modal-modal-title" variant="h6" component="h2"></Typography>
        <Grid container alignItems="center">
          <Grid xs={8} item>
            <Typography variant="body1" gutterBottom>
              {dummyData.date}
            </Typography>
            <Box className={classes.nameAvatar}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Avatar alt="Profile Image" src={dummyData.avatar} sx={{ width: 40, height: 40 }} />
              </Typography>
              <Typography variant="body1">{dummyData.name}</Typography>
            </Box>
          </Grid>
          {dummyData.status === 'pending' && (
            <Grid xs={4} item className={classes.statusContainer}>
              <Box
                onClick={() => {
                  alert('clicked on accepted');
                  handleClose();
                }}
                className={classes.statusWrapper}
              >
                <CheckCircleOutlineIcon color="success" fontSize="large" />
                <Typography style={{ color: '#c7c7c7', fontSize: '10px' }}>Accept</Typography>
              </Box>
              <Box
                onClick={() => {
                  alert('clicked on declined');
                  handleClose();
                }}
                className={classes.statusWrapper}
              >
                <HighlightOffIcon color="error" fontSize="large" />
                <Typography style={{ color: '#c7c7c7', fontSize: '10px' }}>decline</Typography>
              </Box>
            </Grid>
          )}
          {dummyData.status === 'accepted' && (
            <Grid xs={4} item className={classes.statusContainer}>
              <Box
                onClick={() => {
                  alert('clicked on declined');
                  handleClose();
                }}
                className={classes.statusWrapper}
              >
                <HighlightOffIcon color="error" fontSize="large" />
                <Typography style={{ color: '#c7c7c7', fontSize: '10px' }}>decline</Typography>
              </Box>
            </Grid>
          )}
          {dummyData.status === 'declined' && (
            <Grid xs={4} item className={classes.statusContainer}>
              <Box className={classes.statusWrapper}>
                <Typography style={{ color: '#f14140', fontSize: '11px' }}>
                  Sorry, you have already declined this request. The owner may have found another solution
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Modal>
  );
};
export default MyModal;
