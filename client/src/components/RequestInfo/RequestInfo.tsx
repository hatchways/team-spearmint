import { useState } from 'react';
import { Box, Grid, Typography, Avatar, Card, CardContent, Button, Modal } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { makeStyles } from '@mui/styles';
import MyModal from './MyModal';

const useStyles = makeStyles(() => ({
  status: {
    textTransform: 'uppercase',
    color: 'rgba(200, 200, 200, 0.9)',
  },
  settingButton: {
    cursor: 'pointer',
  },
}));

const RequestInfo: React.FC<{
  data: any;
  large?: boolean;
  handleStatus: (requestId: string, newStatus: string) => void;
}> = ({ data, large, handleStatus }) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => setOpen(false);

  return (
    <Card
      sx={
        large
          ? { border: 'none', boxShadow: 'none' }
          : { border: '1px solid rgba(227, 227, 227, 0.9)', boxShadow: 'none' }
      }
    >
      <CardContent>
        <Grid container sx={{ display: 'flex' }}>
          <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant={large ? 'h6' : 'body1'}>{`${data.start}-${data.end}`}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                alt="Profile Image"
                src={data.ownerPhoto}
                sx={large ? { width: 50, height: 50 } : { width: 40, height: 40 }}
              />
              <Typography variant={large ? 'h6' : 'body1'}>{data.ownerName}</Typography>
            </Box>
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="caption" className={classes.status}>
              {large ? null : data.status}
            </Typography>
          </Grid>
          <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'right' }}>
            <Box onClick={handleOpen} sx={large ? { cursor: 'pointer', marginTop: -2 } : { cursor: 'pointer' }}>
              <SettingsIcon color="disabled" fontSize="small" />
            </Box>
            <Modal disableAutoFocus={true} open={open} onClose={handleClose}>
              <MyModal data={data} open={open} handleClose={handleClose} handleStatus={handleStatus} />
            </Modal>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RequestInfo;
