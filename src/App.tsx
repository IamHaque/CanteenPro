import React, { useEffect, useState } from 'react';
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

import useApiRequest from './hooks/api.hook';
import { useAppStore, useAuthStore } from './store';
import { LoginWithTokenApiResponse } from './utils/auth.types';

function App() {
  const { data, makeRequest } = useApiRequest();
  const [isInitialPageLoad, setIsInitialPageLoad] = useState(true);

  const user = useAuthStore.use.user();
  const login = useAuthStore.use.login();
  const themeMode = useAppStore.use.themeMode();
  const setThemeMode = useAppStore.use.setThemeMode();
  const isAuthenticated = useAuthStore.use.isAuthenticated();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode === 'dark' ? 'dark' : 'light',
        },
      }),
    [themeMode]
  );

  useEffect(() => {
    if (!isInitialPageLoad) {
      localStorage.setItem('themeMode', themeMode);
    }
  }, [themeMode, isInitialPageLoad]);

  useEffect(() => {
    const setUserThemeModel = () => {
      const localThemeMode = localStorage.getItem('themeMode');
      if (localThemeMode === 'dark' || localThemeMode === 'light') {
        setThemeMode(localThemeMode);
      }
    };

    const validateToken = async () => {
      await makeRequest(
        'http://localhost:3200/api/v1/user/loginWithToken',
        'GET'
      );
    };

    setUserThemeModel();
    if (!isAuthenticated) {
      validateToken();
    }
    setIsInitialPageLoad(false);
  }, []);

  useEffect(() => {
    if ((data as LoginWithTokenApiResponse)?.data) {
      // Extract user data from the response
      const { name, userId, cartId, email, balance, isAdmin } = (
        data as LoginWithTokenApiResponse
      ).data;

      // Store user data locally
      login({ name, userId, cartId, email, balance, isAdmin });
    }
  }, [data]);

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
