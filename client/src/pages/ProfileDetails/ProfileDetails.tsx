import useStyles from './useStyles';
import PageContainer from '../../components/PageContainer/PageContainer';
import { Box, Grid, Typography, Paper, Card, CardMedia, CardContent, Avatar, Rating } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RequestForm from './RequestForm/RequestForm';
import { FormikHelpers } from 'formik';

const dummyData = {
  banner:
    'https://media.istockphoto.com/photos/beautiful-home-with-green-grass-yard-picture-id639414496?b=1&k=20&m=639414496&s=170667a&w=0&h=otjjCsBqELOUnkhMywFRcmUElVmTgcOMVgjEn9basVg=',
  avatar: 'https://www.rover.com/blog/wp-content/uploads/2018/11/IMG_3150-480x540.jpg',
  name: 'Norma Byers',
  accountType: 'sitter',
  location: 'Toronto, Ontario',
  description:
    'Animals are my passion! I will look after your pets with loving care. I have some availability for pet care in my home as well. I have 10 yrs experience at the Animal Hospital, and have owned multiple pets for many years, including numerous rescues. Kindly email, text or call me and I will respond promptly!',
  pictures: [
    'https://www.familyeducation.com/sites/default/files/inline-images/best-dog-breeds-for-kids_pug.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0FvUsBrkXrOccrFoOjXdWDh_oiQEEvQjtD08BrWkvOvXwl_mfRWsJIuuAKAbG3WBsgfY&usqp=CAU',
  ],
  price: '14',
  rate: 4,
};

export default function ProfileDetails(): JSX.Element {
  const classes = useStyles();

  const handleSubmit = (
    { start, end }: { start: Date; end: Date },
    { setSubmitting }: FormikHelpers<{ start: Date; end: Date }>,
  ) => {
    alert(`start: ${start} - end: ${end}`);
  };

  return (
    <PageContainer>
      <Grid container justifyContent="space-around" sx={{ width: '90%', margin: '0 auto' }} spacing={1}>
        <Grid item xs={12} sm={6} md={6.5} order={{ xs: 2, sm: 2, md: 1 }}>
          <Box component={Paper} className={classes.profileWrapper}>
            <Card sx={{ border: 'none', boxShadow: 'none', minHeight: 600 }}>
              <CardMedia component="img" height="200" image={dummyData.banner} alt="banner photo" />
              <CardContent className={classes.profileInfoContainer}>
                <Box className={classes.profileInfo}>
                  <Avatar
                    className={classes.avatar}
                    alt="Profile Image"
                    src={dummyData.avatar}
                    sx={{ width: 100, height: 100 }}
                  />
                  <Box className={classes.name}>
                    <Typography variant="h6">{dummyData.name}</Typography>
                    <Typography variant="caption">Loving pet {dummyData.accountType}</Typography>
                  </Box>
                  <Box textAlign="center">
                    <LocationOnIcon fontSize="small" color="primary" />
                    <Typography variant="caption" sx={{ color: '#c7c7c7' }}>
                      {dummyData.location}
                    </Typography>
                  </Box>
                  <Box className={classes.aboutMe}>
                    <Typography variant="h6">About me</Typography>
                    <Typography paragraph variant="body2">
                      {dummyData.description}
                    </Typography>
                    <Grid container mt={2} sx={{ display: 'flex', gap: 1.5 }}>
                      {dummyData.pictures.map((picture) => (
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
              <Typography variant="h6">${dummyData.price}/hr</Typography>
              <Rating name="read-only" value={dummyData.rate} readOnly size="small" />
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
