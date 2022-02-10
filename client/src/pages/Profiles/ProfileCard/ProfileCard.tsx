import { Typography, Box, Card } from '@mui/material';
import useStyles from './useStyles';

export default function ProfileCard({ profile }: any) {
  const classes = useStyles();
  const rates = ['$15', '$20', '$25', '$30'];
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        className={classes.cardContainer}
      >
        <img alt="Profile picture" className={classes.profilePic} src={profile.photo}></img>
        <Typography variant="h6">{profile.name}</Typography>
        <Typography variant="subtitle2">{profile.blurb}</Typography>
        <Typography variant="subtitle2">*****</Typography>
        <Typography variant="subtitle2" className={classes.description}>
          {profile.description}
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          className={classes.innerFlexRowProfileContainer}
        >
          <Typography variant="subtitle2" className={classes.location}>
            {profile.address}
          </Typography>
          <Typography variant="subtitle2">{rates[3]}</Typography>
        </Box>
      </Box>
    </>
  );
}
