import React from 'react';
import { Box, Paper } from '@mui/material';

interface CardWrapperProps {
  children: React.ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children }) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxHeight: 500,
        paddingLeft: 3,
        paddingRight: 1,
        paddingBottom: 5,
        backgroundColor: '#fff',
        borderRadius: 1,
        boxShadow:
          '0px 0px 1.9px rgba(0, 0, 0, 0.007),0px 0px 4.9px rgba(0, 0, 0, 0.014),0px 0px 9.9px rgba(0, 0, 0, 0.021),0px 0px 20.4px rgba(0, 0, 0, 0.031),0px 0px 56px rgba(0, 0, 0, 0.05)',
      }}
      component={Paper}
    >
      {children}
    </Box>
  );
};

export default CardWrapper;
