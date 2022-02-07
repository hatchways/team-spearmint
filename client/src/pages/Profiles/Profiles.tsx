import { Button, TextField, Typography } from '@mui/material';
import useStyles from './useStyles';
import hero from '../../images/landing/hero.jpg';
import { useEffect, useState } from 'react';
import { getProfiles } from '../../helpers/APICalls/getProfiles';

export default function Profiles() {
  const classes = useStyles();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    getProfiles().then((resp) => setProfiles(resp.profiles));
  }, []);

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
              {profile.address}
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
            margin="normal"
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
          Show More
        </Button>
      </div>
    </>
  );
}
