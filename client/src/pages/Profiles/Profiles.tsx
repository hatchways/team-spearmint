import { Button, TextField, Typography } from '@mui/material';
import useStyles from './useStyles';
import hero from '../../images/landing/hero.jpg';
import { useState } from 'react';

export default function Profiles() {
  const classes = useStyles();

  const fakeProfile = {
    photo: hero,
    name: 'John Bean',
    blurb: 'Dog care helper',
    stars: 5,
    description: 'I have lots of experience working with and taking care of dogs of all breeds!',
    location: 'Seattle, Washington',
    rate: '15$',
  };
  const fakeProfile2 = {
    photo: hero,
    name: 'Jill Peanut',
    blurb: 'Dog care walker',
    stars: 4,
    description: 'I love dogs!',
    location: 'Seattle, Washington',
    rate: '17$',
  };
  const profiles = [
    fakeProfile,
    fakeProfile,
    fakeProfile,
    fakeProfile,
    fakeProfile,
    fakeProfile,
    fakeProfile2,
    fakeProfile2,
    fakeProfile2,
    fakeProfile2,
    fakeProfile2,
    fakeProfile2,
  ];
  const [currentIndicesTopRow, setCurrentIndicesTopRow] = useState(3);
  const [currentIndicesBottomRow, setCurrentIndicesBottomRow] = useState(6);

  const Profile = ({ profile }: any) => {
    return (
      <>
        <div className={classes.cardContainer}>
          <img className={classes.profilePic} src={profile.photo}></img>
          <Typography variant="h6">{profile.name}</Typography>
          <Typography variant="subtitle2">{profile.blurb}</Typography>
          <Typography variant="subtitle2">*****</Typography>
          <Typography variant="subtitle2" className={classes.description}>
            {profile.description}
          </Typography>
          <div className={classes.innerFlexRowProfileContainer}>
            <Typography variant="subtitle2" className={classes.location}>
              {profile.location}
            </Typography>
            <Typography variant="subtitle2">{profile.rate}</Typography>
          </div>
        </div>
      </>
    );
  };

  const showMoreProfiles = () => {
    if (currentIndicesTopRow + 3 > profiles.length - 1) {
      setCurrentIndicesTopRow(3);
      setCurrentIndicesBottomRow(6);
    } else {
      setCurrentIndicesTopRow(currentIndicesTopRow + 6);
      setCurrentIndicesBottomRow(currentIndicesBottomRow + 6);
    }
  };
  console.log(profiles);
  return (
    <>
      <div className={classes.flexContainer}>
        <Typography className={classes.header} variant="h5">
          Your Search Results
        </Typography>
        <div className={classes.flexRowContainer}>
          <TextField
            id="location"
            // label="location"
            fullWidth
            margin="normal"
            name="location"
            placeholder="Your location"
            autoComplete="location"
            autoFocus
            // helperText={touched.email ? errors.email : ''}
            // error={touched.email && Boolean(errors.email)}
            // value={values.email}
            // onChange={handleChange}
          />
          <TextField
            className={classes.date}
            id="dates"
            placeholder="Your dates"
            // label={<Typography className={classes.label}>dates</Typography>}
            // fullWidth
            margin="normal"
            // InputProps={{
            //   classes: { input: classes.inputs },
            // }}
            type="date"
            autoComplete="current-dates"
            // helperText={touched.dates ? errors.dates : ''}
            // error={touched.dates && Boolean(errors.dates)}
            // value={values.dates}
            // onChange={handleChange}
          />
        </div>
        <div>
          <div className={classes.innerFlexRowContainer}>
            {profiles.slice(currentIndicesTopRow - 3, currentIndicesTopRow).map((profile) => {
              return <Profile key={profile} profile={profile}></Profile>;
            })}
          </div>
          <div className={classes.innerFlexRowContainer}>
            {profiles.slice(currentIndicesBottomRow - 3, currentIndicesBottomRow).map((profile) => {
              return <Profile key={profile} profile={profile}></Profile>;
            })}
          </div>
        </div>

        <Button
          onClick={() => showMoreProfiles()}
          size="large"
          variant="contained"
          color="primary"
          className={classes.button}
          disableElevation
        >
          Show More{/* {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Login'} */}
        </Button>
      </div>
    </>
  );
}
