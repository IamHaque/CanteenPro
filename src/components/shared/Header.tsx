import { Link as RouterLink } from 'react-router-dom';

import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';

import { useAuthStore } from '../../store';

const NAV_LINKS = [
  { name: 'Admin', url: '/admin' },
  { name: 'Employee', url: '/employee' },
  { name: 'Login', url: '/login' },
  { name: 'Register', url: '/register' },
];

function Header() {
  const logout = useAuthStore.use.logout();
  const isAuthenticated = useAuthStore.use.isAuthenticated();

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            to="/"
            noWrap
            variant="h6"
            component={RouterLink}
            sx={{
              display: 'flex',
              color: 'inherit',
              fontWeight: 700,
              letterSpacing: '.2rem',
              textDecoration: 'none',
              fontFamily: 'monospace',
            }}
          >
            CanteenPro
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              gap: '0.5rem',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            {NAV_LINKS.map((link) => (
              <Button key={link.name} sx={{ color: 'white', display: 'block' }}>
                <Link
                  to={link.url}
                  component={RouterLink}
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                  }}
                >
                  {link.name}
                </Link>
              </Button>
            ))}

            {isAuthenticated && (
              <Button
                sx={{ color: 'white', display: 'block' }}
                onClick={logout}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;