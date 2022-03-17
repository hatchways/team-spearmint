import { TextField, Typography, Box, Button } from '@mui/material';
import useStyles from './useStyles';
import { useState } from 'react';

interface Props {
  searchLocation: string | undefined;
  setSearchLocation: React.Dispatch<React.SetStateAction<string | undefined>>;
  searchStartDate: string | undefined;
  setSearchStartDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  searchEndDate: string | undefined;
  setSearchEndDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleSearchClick: () => void;
}
export default function SearchBar({
  searchLocation,
  setSearchLocation,
  searchStartDate,
  setSearchStartDate,
  searchEndDate,
  setSearchEndDate,
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
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Typography sx={{ marginBottom: -2.5 }} variant="subtitle2">
            Drop Off
          </Typography>
          <TextField
            sx={{ marginRight: '5px' }}
            className={classes.date}
            id="dates"
            placeholder="Your dates"
            margin="normal"
            type="date"
            autoComplete="current-dates"
            onChange={(e) => setSearchStartDate(e.target.value)}
            value={searchStartDate}
          />
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Typography sx={{ marginBottom: -2.5 }} variant="subtitle2">
            Pick Up
          </Typography>
          <TextField
            sx={{ marginRight: '5px' }}
            className={classes.date}
            id="dates"
            placeholder="Your dates"
            margin="normal"
            type="date"
            autoComplete="current-dates"
            onChange={(e) => setSearchEndDate(e.target.value)}
            value={searchEndDate}
          />
        </Box>
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
