import { Box, Grid, Typography, Avatar } from '@mui/material';
import Modal from '@mui/material/Modal';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import useStyles from './useStyles';

const MyModal: React.FC<{
  data: any;
  open: boolean;
  handleStatus: (requestId: string, newStatus: string) => void;
  handleClose: () => void;
}> = ({ data, open, handleClose, handleStatus }) => {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={handleClose} disableAutoFocus={true}>
      <Box className={classes.modalBox}>
        <Typography id="modal-modal-title" variant="h6" component="h2"></Typography>
        <Grid container alignItems="center">
          <Grid xs={8} item>
            <Typography variant="body1" gutterBottom>
              {`${data.start}-${data.end}`}
            </Typography>
            <Box className={classes.nameAvatar}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Avatar alt="Profile Image" src={data.ownerPhoto} sx={{ width: 40, height: 40 }} />
              </Typography>
              <Typography variant="body1">{data.ownerName}</Typography>
            </Box>
          </Grid>
          {data.status === 'pending' && (
            <Grid xs={4} item className={classes.statusContainer}>
              <Box
                onClick={() => {
                  handleStatus(data._id, 'accepted');
                  handleClose();
                }}
                className={classes.statusWrapper}
              >
                <CheckCircleOutlineIcon color="success" fontSize="large" />
                <Typography style={{ color: '#c7c7c7', fontSize: '10px' }}>Accept</Typography>
              </Box>
              <Box
                onClick={() => {
                  handleStatus(data._id, 'declined');
                  handleClose();
                }}
                className={classes.statusWrapper}
              >
                <HighlightOffIcon color="error" fontSize="large" />
                <Typography style={{ color: '#c7c7c7', fontSize: '10px' }}>decline</Typography>
              </Box>
            </Grid>
          )}
          {data.status === 'accepted' && (
            <Grid xs={4} item className={classes.statusContainer}>
              <Box
                onClick={() => {
                  handleStatus(data._id, 'declined');
                  handleClose();
                }}
                className={classes.statusWrapper}
              >
                <HighlightOffIcon color="error" fontSize="large" />
                <Typography style={{ color: '#c7c7c7', fontSize: '10px' }}>decline</Typography>
              </Box>
            </Grid>
          )}
          {data.status === 'declined' && (
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
