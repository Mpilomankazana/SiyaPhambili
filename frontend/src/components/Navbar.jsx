import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../src/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: '#fff', flexGrow: 1, fontWeight: 'bold' }}>
          SiyaPhambili
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/projects">Registry</Button>
          {user ? (
            <>
              {user.role === 'innovator' && (
                <>
                  <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
                  <Button color="inherit" component={Link} to="/projects/new">New Project</Button>
                </>
              )}
              <Button color="secondary" variant="contained" sx={{ ml: 1 }} onClick={() => { logout(); navigate('/'); }}>
                Logout ({user.name})
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="secondary" variant="contained" sx={{ ml: 1 }} component={Link} to="/register">Register</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
