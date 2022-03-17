import { Typography } from '@mui/material';
import { Box } from '@mui/system';

interface LandingPageHeaderProps {
  header: string;
}

const LandingPageHeader: React.FC<LandingPageHeaderProps> = ({ header }) => {
  return (
    <Box>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          marginBottom: 8,
        }}
      >
        {header}
      </Typography>
    </Box>
  );
};

export default LandingPageHeader;
