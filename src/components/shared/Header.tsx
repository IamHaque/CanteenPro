import { Link as RouterLink } from 'react-router-dom';

import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';

import { useAppStore, useAuthStore } from '../../store';

type NavLink = {
  url: string;
  name: string;
  isAdmin?: boolean;
  isSecure?: boolean;
};

const NAV_LINKS: NavLink[] = [
  { name: 'Login', url: '/login' },
  { name: 'Register', url: '/register' },
  { name: 'Employee', url: '/employee', isSecure: true },
  { name: 'Admin', url: '/admin', isSecure: true, isAdmin: true },
];

function Header() {
  const user = useAuthStore.use.user();
  const logout = useAuthStore.use.logout();
  const isDarkMode = useAppStore.use.isDarkMode();
  const toggleDarkMode = useAppStore.use.toggleDarkMode();
  const isAuthenticated = useAuthStore.use.isAuthenticated();

  const renderNavLinks = (link: NavLink) => {
    if (!isAuthenticated && link?.isSecure) return;
    if (isAuthenticated && !link?.isSecure) return;
    if (!user?.isAdmin && link?.isAdmin) return;
    if (user?.isAdmin && !link?.isAdmin) return;

    return (
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
    );
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
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
            <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
              <Button
                size="small"
                variant="text"
                onClick={() => {
                  toggleDarkMode();
                }}
                aria-label="Button to toggle theme"
                sx={{
                  p: '4px',
                  color: 'white',
                  minWidth: '48px',
                }}
              >
                {isDarkMode ? (
                  <WbSunnyRoundedIcon fontSize="small" />
                ) : (
                  <ModeNightRoundedIcon fontSize="small" />
                )}
              </Button>
            </Tooltip>

            {NAV_LINKS.map(renderNavLinks)}

            {isAuthenticated && (
              <Button
                onClick={logout}
                sx={{ color: 'white', display: 'block' }}
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
