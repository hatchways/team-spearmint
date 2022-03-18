import { useState, useEffect } from 'react';
import useStyles from './useStyles';
import { useHistory, useParams } from 'react-router-dom';
import PageContainer from '../../components/PageContainer/PageContainer';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Rating,
  CircularProgress,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RequestForm from './RequestForm/RequestForm';
import { FormikHelpers } from 'formik';
import { useAuth } from '../../context/useAuthContext';
import loadProfile from '../../helpers/APICalls/loadProfile';
import createRequest from '../../helpers/APICalls/createRequest';
import { Profile } from '../../interface/Profile';

export default function ProfileDetails(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const { loggedInUser } = useAuth();
  const [profile, setProfile] = useState<Profile>();
  const { sitterId } = useParams<{ sitterId: string }>();

  useEffect(() => {
    const takeProfile = async () => {
      loadProfile(sitterId).then((data: any) => {
        console.log(data);
        if (!data) {
          console.error({ error: !data });
        } else if (data) {
          setProfile(data);
        } else {
          console.error({ data });
        }
      });
    };
    takeProfile();
  }, [sitterId]);

  if (profile === undefined) return <CircularProgress />;
  if (!profile) {
    history.push('/');
    return <CircularProgress />;
  }

  const handleSubmit = (
    { start, end }: { start: Date; end: Date },
    { setSubmitting }: FormikHelpers<{ start: Date; end: Date }>,
  ) => {
    if (loggedInUser) {
      createRequest(loggedInUser.id, profile._id, start, end).then((data) => {
        if (data.error) {
          console.error({ error: data.error.message });
          setSubmitting(false);
        } else if (data) {
          console.log(data);
          setSubmitting(false);
        } else {
          // should not get here from backend but this catch is for an unknown issue
          console.error({ data });
          setSubmitting(false);
        }
      });
    }
  };

  return (
    <PageContainer>
      <Grid container justifyContent="space-around" sx={{ width: '90%', margin: '0 auto' }} spacing={1}>
        <Grid item xs={12} sm={6} md={6.5} order={{ xs: 2, sm: 2, md: 1 }}>
          <Box component={Paper} className={classes.profileWrapper}>
            <Card sx={{ border: 'none', boxShadow: 'none', minHeight: 600 }}>
              <CardMedia component="img" height="200" image={profile.coverPicture} alt="banner photo" />

              <CardContent className={classes.profileInfoContainer}>
                <Box className={classes.profileInfo}>
                  <Avatar
                    className={classes.avatar}
                    alt="Profile Image"
                    src={profile.photo}
                    sx={{ width: 100, height: 100 }}
                  />
                  <Box className={classes.name}>
                    <Typography variant="h6">{profile.name}</Typography>
                    <Typography variant="caption">Loving pet {profile.accountType.slice(4)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <LocationOnIcon fontSize="small" color="primary" />
                    <Typography variant="caption" sx={{ color: '#c7c7c7' }}>
                      {profile.address}
                    </Typography>
                  </Box>
                  <Box className={classes.aboutMe}>
                    <Typography variant="h6">About me</Typography>
                    <Typography paragraph variant="body2">
                      {profile.description}
                    </Typography>
                    <Grid container mt={2} sx={{ display: 'flex', gap: 1.5 }}>
                      {profile.gallery.map((picture: string) => (
                        <Grid item key={picture}>
                          <img src={picture} alt="sitter picture" className={classes.pictures} />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} order={{ xs: 1, sm: 2, md: 2 }}>
          <Box component={Paper} className={classes.requestWrapper}>
            <Box textAlign="center">
              <Typography variant="h6">${profile.price}/hr</Typography>
              <Rating name="read-only" value={profile.rate} readOnly size="small" />
            </Box>
            <Box sx={{ padding: '20px 30px' }}>
              <RequestForm handleSubmit={handleSubmit} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
