import { Button, TextField, Typography, Box } from '@mui/material';
import useStyles from './useStyles';
import hero from '../../images/landing/hero.jpg';
import { useEffect, useState } from 'react';
import { getProfiles } from '../../helpers/APICalls/getProfiles';
import { useSnackBar } from '../../context/useSnackbarContext';
import ProfileCard from './ProfileCard/ProfileCard';
import SearchBar from './SearchBar/SearchBar';
import { Profile } from '../../interface/Profile';
import { useSitterSearch } from '../../context/useSitterSearchContext';

export default function Profiles() {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const { location, start, end } = useSitterSearch();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchLocation, setSearchLocation] = useState<string>();
  const [searchStartDate, setSearchStartDate] = useState<string>();
  const [searchEndDate, setSearchEndDate] = useState<string>();

  useEffect(() => {
    const initialLoad = async () => {
      const startString = start ? start.toString() : null;
      const endString = end ? end.toString() : null;
      console.log(startString, endString);
      const profiles = await getProfiles(location, startString, endString);
      if (profiles) setProfiles(profiles.profiles);
      else updateSnackBarMessage('No profiles found!');
    };
    initialLoad().catch((error) => updateSnackBarMessage(error));
  }, [location, start, end, updateSnackBarMessage]);

  const [currentIndicesTopRow, setCurrentIndicesTopRow] = useState(3);
  const [currentIndicesBottomRow, setCurrentIndicesBottomRow] = useState(6);
  console.log(profiles);
  console.log(location, start);
  const showMoreProfiles = () => {
    if (currentIndicesTopRow + 3 > profiles.length - 1) {
      setCurrentIndicesTopRow(3);
      setCurrentIndicesBottomRow(6);
    } else {
      setCurrentIndicesTopRow(currentIndicesTopRow + 6);
      setCurrentIndicesBottomRow(currentIndicesBottomRow + 6);
    }
  };

  const handleSearchClick = async () => {
    const profiles = await getProfiles(searchLocation, searchStartDate, searchEndDate);
    setProfiles(profiles.profiles);
  };

  return (
    <>
      <Box className={classes.flexContainer}>
        <SearchBar
          searchLocation={searchLocation}
          setSearchLocation={setSearchLocation}
          searchStartDate={searchStartDate}
          setSearchStartDate={setSearchStartDate}
          searchEndDate={searchEndDate}
          setSearchEndDate={setSearchEndDate}
          handleSearchClick={handleSearchClick}
        ></SearchBar>
        <Box>
          <Box className={classes.innerFlexRowContainer}>
            {profiles &&
              profiles.slice(currentIndicesTopRow - 3, currentIndicesTopRow).map((profile) => {
                return <ProfileCard key={profile._id} profile={profile}></ProfileCard>;
              })}
          </Box>
          <Box className={classes.innerFlexRowContainer}>
            {profiles &&
              profiles.slice(currentIndicesBottomRow - 3, currentIndicesBottomRow).map((profile) => {
                return <ProfileCard key={profile._id} profile={profile}></ProfileCard>;
              })}
          </Box>
        </Box>
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
      </Box>
    </>
  );
}
