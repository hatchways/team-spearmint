import { TextField, Typography, Box } from '@mui/material';
import useStyles from './useStyles';

export default function SearchBar() {
  const classes = useStyles();
  return (
    <>
      <Typography sx={{ marginTop: '30px', fontWeight: 'bold' }} variant="h5">
        Your Search Results
      </Typography>
      <Box className={classes.flexRowContainer}>
        <TextField
          id="location"
          fullWidth
          margin="normal"
          name="location"
          placeholder="Your location"
          autoComplete="location"
          autoFocus
        />
        <TextField
          className={classes.date}
          id="dates"
          placeholder="Your dates"
          margin="normal"
          type="date"
          autoComplete="current-dates"
        />
      </Box>
    </>
  );
}
