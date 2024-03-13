import { AppBar, Switch, Toolbar, Typography } from '@mui/material';
import React from 'react';

export type HeaderProps = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export const Header = ({ theme , toggleTheme } : HeaderProps) => {
  const handleChange = () => {
    toggleTheme();
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Capytale Demo
        </Typography>
        <Switch
          checked={theme === 'dark'}
          onChange={handleChange}
          name="themeSwitch"
          inputProps={{ 'aria-label': 'toggle theme' }}
        />
      </Toolbar>
    </AppBar>
  );
};

