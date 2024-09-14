import React, { useEffect, useState } from 'react';
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from 'react-router-dom';

import { Box, CssBaseline, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Footer, Header } from './components/shared';
import {
  Login,
  NotFound,
  Registration,
  AdminDashboard,
  EmployeeDashboard,
} from './views';

import { useApiRequest } from './hooks';
import { useAppStore, useAuthStore } from './store';
import { LoginWithTokenApiResponse } from './utils/auth.types';

function App() {
  const { data, makeRequest } = useApiRequest<LoginWithTokenApiResponse>();
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

    const token = localStorage.getItem('token');
    if (token && !isAuthenticated) {
      validateToken();
    } else if (!token) {
      setIsInitialPageLoad(false);
    }
  }, []);

  useEffect(() => {
    if (data?.data) {
      // Extract user data from the response
      const { name, userId, cartId, email, balance, isAdmin } = data.data;

      // Store user data locally
      setIsInitialPageLoad(false);
      login({ name, userId, cartId, email, balance, isAdmin });
    } else if (data?.error?.code === 403) {
      // Clear token from local storage if it is invalidated
      setIsInitialPageLoad(false);
      localStorage.removeItem('token');
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
          alignItems: isInitialPageLoad ? 'center' : 'normal',
          justifyContent: isInitialPageLoad ? 'center' : 'space-between',
        }}
      >
        {isInitialPageLoad ? (
          <CircularProgress />
        ) : (
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
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
