import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Footer = () => {
  return (
    <AppBar position="static" sx={{ top: 'auto', bottom: 0, zIndex: 999 }}>
      <Toolbar>
        <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
          &copy; {new Date().getFullYear()} Pitlane Metrics
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;