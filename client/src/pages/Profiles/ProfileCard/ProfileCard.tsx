import { Typography, Box, Card, Rating, Divider } from '@mui/material';
import useStyles from './useStyles';

export default function ProfileCard({ profile }: any) {
  const classes = useStyles();
  const rating = 4;
  const sanitizeDescription = (description: string) => {
    return description.slice(0, 50);
  };
  return (
    <>
      <Card className={classes.card}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          className={classes.cardContainer}
        >
          <img alt="Profile picture" className={classes.profilePic} src={profile.photo}></img>
          <Typography variant="h6">{profile.name}</Typography>
          <Typography variant="subtitle2">{profile.caption}</Typography>
          <Typography variant="subtitle2">
            <Rating name="read-only" value={rating} readOnly />
          </Typography>
          <Typography variant="subtitle2" className={classes.description}>
            {sanitizeDescription(profile.description)}
          </Typography>
          <Divider className={classes.divider}></Divider>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            className={classes.innerFlexRowProfileContainer}
          >
            <Typography variant="subtitle2" sx={{ marginRight: '60px !important' }}>
              {profile.address}
            </Typography>
            <Typography variant="subtitle2">{profile.price}/hr</Typography>
          </Box>
        </Box>
      </Card>
    </>
  );
}
