import { TextField, Typography, Box } from '@mui/material';
import useStyles from './useStyles';
import { useState } from 'react';

interface Props {
  searchLocation: string | undefined;
  setSearchLocation: React.Dispatch<React.SetStateAction<string | undefined>>;
  searchDate: string | undefined;
  setSearchDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleSearchClick: () => void;
}
export default function SearchBar({
  searchLocation,
  setSearchLocation,
  searchDate,
  setSearchDate,
  handleSearchClick,
}: Props) {
  const classes = useStyles();

  return (
    <>
      <Typography sx={{ marginTop: '30px', fontWeight: 'bold' }} variant="h5">
        Your Search Results
      </Typography>
      <Box className={classes.flexRowContainer}>
        <TextField
          sx={{ marginRight: '5px' }}
          id="location"
          fullWidth
          margin="normal"
          name="location"
          placeholder="Your location"
          autoComplete="location"
          autoFocus
          onChange={(e) => setSearchLocation(e.target.value)}
          value={searchLocation}
        />
        <TextField
          sx={{ marginRight: '5px' }}
          className={classes.date}
          id="dates"
          placeholder="Your dates"
          margin="normal"
          type="date"
          autoComplete="current-dates"
          onChange={(e) => setSearchDate(e.target.value)}
          value={searchDate}
        />
        <Button
          onClick={() => handleSearchClick()}
          sx={{ marginTop: 1 }}
          className={classes.searchButton}
          variant="outlined"
        >
          Search
        </Button>
      </Box>
    </>
  );
}
