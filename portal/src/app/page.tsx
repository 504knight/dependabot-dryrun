import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { formatReleaseDay, nextReleaseDate } from '@/lib/dates';

export default function HomePage() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dependabot Demo Portal
      </Typography>
      <Alert severity="warning" sx={{ mb: 3 }}>
        This app pins vulnerable dependencies on purpose for a training session. Never deploy it.
      </Alert>
      <Typography>Next release: {formatReleaseDay(nextReleaseDate())}</Typography>
    </Container>
  );
}
