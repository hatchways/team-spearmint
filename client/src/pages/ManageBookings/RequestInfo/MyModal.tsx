import { Box, Grid, Typography, Avatar } from '@mui/material';
import Modal from '@mui/material/Modal';
import useStyles from './useStyles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const MyModal: React.FC<{
  requestId: string;
  sitterId: string;
  date: string;
  avatar?: string | undefined;
  name: string;
  status: string;
  accepted: boolean;
  declined: boolean;
  handleStatus: (
    accepted: boolean,
    declined: boolean,
    requestId: string,
    sitterId: string,
    avatar?: string | undefined,
  ) => void;
  open: boolean;
  handleClose: () => void;
}> = ({ requestId, sitterId, date, avatar, name, status, accepted, declined, handleStatus, open, handleClose }) => {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.modalBox}>
        <Typography id="modal-modal-title" variant="h6" component="h2"></Typography>
        <Grid container alignItems="center">
          <Grid xs={8} item>
            <Typography variant="body1" gutterBottom>
              {date}
            </Typography>
            <Box className={classes.nameAvatar}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Avatar alt="Profile Image" src={avatar} sx={{ width: 40, height: 40 }} />
              </Typography>
              <Typography variant="body1">{name}</Typography>
            </Box>
          </Grid>
          {status === 'pending' && (
            <Grid xs={4} item className={classes.statusContainer}>
              <Box
                onClick={() => {
                  handleStatus(!accepted, declined, requestId, sitterId, avatar);
                  handleClose();
                }}
                className={classes.statusWrapper}
              >
                <CheckCircleOutlineIcon color="success" fontSize="large" />
                <Typography style={{ color: '#c7c7c7', fontSize: '10px' }}>Accept</Typography>
              </Box>
              <Box
                onClick={() => {
                  handleStatus(accepted, !declined, requestId, sitterId, avatar);
                  handleClose();
                }}
                className={classes.statusWrapper}
              >
                <HighlightOffIcon color="error" fontSize="large" />
                <Typography style={{ color: '#c7c7c7', fontSize: '10px' }}>decline</Typography>
              </Box>
            </Grid>
          )}
          {status === 'accepted' && (
            <Grid xs={4} item className={classes.statusContainer}>
              <Box
                onClick={() => {
                  handleStatus(!accepted, !declined, requestId, sitterId, avatar);
                  handleClose();
                }}
                className={classes.statusWrapper}
              >
                <HighlightOffIcon color="error" fontSize="large" />
                <Typography style={{ color: '#c7c7c7', fontSize: '10px' }}>decline</Typography>
              </Box>
            </Grid>
          )}
          {status === 'declined' && (
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
