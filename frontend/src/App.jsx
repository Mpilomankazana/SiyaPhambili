/**
 * Main router configuration.
 * TODO (Day 1/2 — ROADMAP.md Phase 3):
 * - Public Registry view
 * - Project Submission form
 * - Stage-Gate status component
 * - Admin dashboard (Phase 4)
 */
import { Typography, Container } from "@mui/material";

function App() {
  return (
    <Container sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        SiyaPhambili
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        We Move Forward — scaffolding ready, routes land during the
        hackathon (ROADMAP.md Phase 3).
      </Typography>
    </Container>
  );
}

export default App;
