import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';

export default function NewProject() {
  const navigate = useNavigate();
  const [sectors, setSectors] = useState([]);
  const [form, setForm] = useState({
    title: '',
    sector_id: '',
    problem_statement: '',
    solution: '',
    description: '',
    visibility: 'public'
  });

  useEffect(() => {
    api.get('/sectors').then((res) => setSectors(res.data)).catch(() => {
      // Fallback demo sectors if endpoint isn't ready
      setSectors([{ id: 1, name: 'Agriculture' }, { id: 2, name: 'Education' }, { id: 3, name: 'Healthcare' }]);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', form);
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to create project.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom fontWeight="bold">Submit New Project</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="Project Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <TextField fullWidth select margin="normal" label="Sector" value={form.sector_id} onChange={(e) => setForm({ ...form, sector_id: e.target.value })} required>
            {sectors.map((s) => (
              <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
            ))}
          </TextField>
          <TextField fullWidth multiline rows={2} margin="normal" label="Problem Statement" value={form.problem_statement} onChange={(e) => setForm({ ...form, problem_statement: e.target.value })} required />
          <TextField fullWidth multiline rows={2} margin="normal" label="Solution" value={form.solution} onChange={(e) => setForm({ ...form, solution: e.target.value })} required />
          <TextField fullWidth multiline rows={4} margin="normal" label="Detailed Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          <Button variant="contained" color="primary" size="large" type="submit" sx={{ mt: 3 }}>Submit Innovation</Button>
        </Box>
      </Paper>
    </Container>
  );
}
