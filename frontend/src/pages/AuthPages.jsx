import React, { useState, useContext } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed. Check your credentials.');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom color="primary">Login</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextField fullWidth margin="normal" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>Sign In</Button>
        </Box>
      </Paper>
    </Container>
  );
}

export function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'innovator' });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      alert('Registration failed.');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom color="primary">Register Account</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <TextField fullWidth margin="normal" label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <TextField fullWidth margin="normal" label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <TextField fullWidth select margin="normal" label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <MenuItem value="innovator">Innovator</MenuItem>
            <MenuItem value="official">Official</MenuItem>
          </TextField>
          <Button fullWidth variant="contained" color="secondary" type="submit" sx={{ mt: 2 }}>Create Account</Button>
        </Box>
      </Paper>
    </Container>
  );
}
