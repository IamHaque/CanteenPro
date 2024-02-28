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

import { useAuthStore } from './store';

const defaultTheme = createTheme();

function App() {
  const user = useAuthStore.use.user();
  const isAuthenticated = useAuthStore.use.isAuthenticated();

  return (
    <ThemeProvider theme={defaultTheme}>
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
