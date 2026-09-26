import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Chip, Box, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../api/client';

export default function Registry() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/projects')
      .then((res) => {
        // Ensure data is an array (handles Paginated or Wrapped responses)
        const data = Array.isArray(res.data) ? res.data : (res.data?.projects || res.data?.items || []);
        setProjects(data);
      })
      .catch((err) => {
        console.error('Failed to fetch projects:', err);
        setProjects([]);
      });
  }, []);

  const safeProjects = Array.isArray(projects) ? projects : [];

  const filteredProjects = safeProjects.filter((p) => {
    const title = p?.title || '';
    const description = p?.description || '';
    return title.toLowerCase().includes(search.toLowerCase()) || description.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom align="center" fontWeight="bold">
        Innovation Registry
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField fullWidth label="Search Projects" value={search} onChange={(e) => setSearch(e.target.value)} />
      </Box>
      <Grid container spacing={3}>
        {filteredProjects.length === 0 ? (
          <Grid item xs={12}>
            <Typography align="center" color="text.secondary">No projects found.</Typography>
          </Grid>
        ) : (
          filteredProjects.map((project) => (
            <Grid item xs={12} md={6} lg={4} key={project.id || Math.random()}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Chip label={project.current_stage || 'Idea'} color="secondary" size="small" />
                    <Chip label={project.sector_name || 'Sector'} variant="outlined" size="small" />
                  </Box>
                  <Typography variant="h6" gutterBottom>{project.title || 'Untitled'}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {(project.description || '').slice(0, 120)}...
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button fullWidth variant="outlined" component={Link} to={`/projects/${project.id}`}>
                    View Project
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
