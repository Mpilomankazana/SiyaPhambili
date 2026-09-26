import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography, Box, Stepper, Step, StepLabel, TextField, Button, Divider, Alert } from '@mui/material';
import api from '../api/client';
import { AuthContext } from '../context/AuthContext';

const STAGES = ['Idea', 'Prototype', 'Pilot', 'Scale', 'Implemented'];

export default function ProjectDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [project, setProject] = useState(null);
  const [contact, setContact] = useState({ requester_name: '', requester_email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  
  // Official review states
  const [newStage, setNewStage] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    api.get(`/projects/${id}`).then((res) => {
      setProject(res.data);
      setNewStage(res.data.current_stage);
    }).catch(console.error);
  }, [id]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    await api.post(`/projects/${id}/contact`, contact);
    setSubmitted(true);
  };

  const handleStageAdvance = async (e) => {
    e.preventDefault();
    await api.post(`/projects/${id}/stage`, { new_stage: newStage, notes });
    const updated = await api.get(`/projects/${id}`);
    setProject(updated.data);
    alert('Stage updated!');
  };

  if (!project) return <Container sx={{ py: 4 }}><Typography>Loading...</Typography></Container>;

  const currentStageIndex = STAGES.indexOf(project.current_stage || 'Idea');

  return (
    <Container sx={{ py: 4 }}>
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom fontWeight="bold">{project.title}</Typography>
        
        {/* Stage Progress Stepper */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h6" gutterBottom>Project Stage Progress</Typography>
          <Stepper activeStep={currentStageIndex} alternativeLabel>
            {STAGES.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>Problem Statement</Typography>
        <Typography paragraph>{project.problem_statement}</Typography>

        <Typography variant="h6" color="primary">Solution</Typography>
        <Typography paragraph>{project.solution}</Typography>

        <Typography variant="h6" color="primary">Description</Typography>
        <Typography paragraph>{project.description}</Typography>
      </Paper>

      {/* Official Review Section */}
      {(user?.role === 'official' || user?.role === 'admin') && (
        <Paper sx={{ p: 4, mb: 4, border: '2px solid #2563EB' }}>
          <Typography variant="h5" color="primary" gutterBottom>Official Review & Stage Advancement</Typography>
          <Box component="form" onSubmit={handleStageAdvance}>
            <TextField fullWidth select margin="normal" label="Target Stage" value={newStage} onChange={(e) => setNewStage(e.target.value)}>
              {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
            </TextField>
            <TextField fullWidth multiline rows={3} margin="normal" label="Verification Notes" value={notes} onChange={(e) => setNotes(e.target.value)} required />
            <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>Update Stage</Button>
          </Box>
        </Paper>
      )}

      {/* Contact Form */}
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" color="primary" gutterBottom>Contact Innovator</Typography>
        {submitted ? (
          <Alert severity="success">Your contact request has been submitted successfully!</Alert>
        ) : (
          <Box component="form" onSubmit={handleContactSubmit}>
            <TextField fullWidth margin="normal" label="Your Name" value={contact.requester_name} onChange={(e) => setContact({ ...contact, requester_name: e.target.value })} required />
            <TextField fullWidth margin="normal" label="Your Email" value={contact.requester_email} onChange={(e) => setContact({ ...contact, requester_email: e.target.value })} required />
            <TextField fullWidth multiline rows={3} margin="normal" label="Message" value={contact.message} onChange={(e) => setContact({ ...contact, message: e.target.value })} required />
            <Button variant="contained" color="secondary" type="submit" sx={{ mt: 2 }}>Send Request</Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
