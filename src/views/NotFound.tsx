import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>

      <Link to="/">Go to Home</Link>
    </Box>
  );
}
