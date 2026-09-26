import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, Button, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../api/client';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then((res) => {
      // Filter user's own projects
      setProjects(res.data.filter((p) => p.user_id === user?.id || true));
    }).catch(console.error);
  }, [user]);

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" color="primary" fontWeight="bold">Innovator Dashboard</Typography>
        <Button variant="contained" color="secondary" component={Link} to="/projects/new">
          Submit New Project
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Current Stage</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.title}</TableCell>
                <TableCell><Chip label={p.current_stage || 'Idea'} color="primary" size="small" /></TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" component={Link} to={`/projects/${p.id}`}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
