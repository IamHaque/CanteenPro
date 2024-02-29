import React from 'react';
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from 'react-router-dom';

import { Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Footer, Header } from './components/shared';
import {
  Login,
  NotFound,
  Registration,
  AdminDashboard,
  EmployeeDashboard,
} from './views';

import { useAppStore, useAuthStore } from './store';

function App() {
  const user = useAuthStore.use.user();
  const isDarkMode = useAppStore.use.isDarkMode();
  const isAuthenticated = useAuthStore.use.isAuthenticated();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
        },
      }),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Router>
          <Header />

          <Routes>
            <Route path="/404" element={<NotFound />} />

            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate
                    replace
                    to={user?.isAdmin ? '/admin' : '/employee'}
                  />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? (
                  <Navigate
                    replace
                    to={user?.isAdmin ? '/admin' : '/employee'}
                  />
                ) : (
                  <Registration />
                )
              }
            />

            <Route
              path="/employee"
              element={
                isAuthenticated && !user?.isAdmin ? (
                  <EmployeeDashboard />
                ) : (
                  <Navigate replace to={'/'} />
                )
              }
            />
            <Route
              path="/admin"
              element={
                isAuthenticated && user?.isAdmin ? (
                  <AdminDashboard />
                ) : (
                  <Navigate replace to={'/'} />
                )
              }
            />

            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>

          <Footer />
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
