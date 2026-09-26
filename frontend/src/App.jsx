import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../../src/theme';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Registry from './pages/Registry';
import { Login, Register } from './pages/AuthPages';
import ProjectDetails from './pages/ProjectDetails';
import NewProject from './pages/NewProject';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/projects" replace />} />
            <Route path="/projects" element={<Registry />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects/new" element={<NewProject />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
