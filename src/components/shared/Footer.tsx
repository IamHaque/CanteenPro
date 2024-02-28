import { Link as RouterLink } from 'react-router-dom';

import { Box, Container, Link, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">Footer.</Typography>

        <Typography variant="body2" color="text.secondary">
          {'Copyright © '}
          <Link to="/" component={RouterLink}>
            CanteenPro
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
}
