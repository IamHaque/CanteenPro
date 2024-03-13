/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
  Box,
  Grid,
  Link,
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useAuthStore } from '../store';
import useApiRequest from '../hooks/api.hook';

export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const login = useAuthStore.use.login();
  const { data, loading, makeRequest } = useApiRequest<any>();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await makeRequest('http://localhost:3200/api/v1/user/login', 'POST', {
      email: formData.get('email'),
      password: formData.get('password'),
    });
  };

  useEffect(() => {
    if (data?.data) {
      // Extract user data from the response
      const { name, userId, cartId, email, balance, isAdmin, token } =
        data.data;

      // Store user data locally
      login({ name, userId, cartId, email, balance, isAdmin });

      // Store the token in local storage for future use
      localStorage.setItem('token', token);
      login(data?.data);

      // Redirect to the home page upon successful login
      navigate('/');
    }
  }, [data]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                label="Email Address"
                helperText={data?.error?.message}
                error={data?.error?.message?.length > 0}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={data?.error?.message?.length > 0}>
                <InputLabel htmlFor="component-outlined">Password *</InputLabel>
                <OutlinedInput
                  required
                  id="password"
                  name="password"
                  label="Password"
                  autoComplete="new-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText>{data?.error?.message}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, mb: 2 }}>
            {loading ? (
              <LoadingButton
                loading
                fullWidth
                variant="contained"
                loadingPosition="start"
                startIcon={<SaveIcon />}
              >
                Signing Up
              </LoadingButton>
            ) : (
              <Button fullWidth type="submit" variant="contained">
                Sign In
              </Button>
            )}
          </Box>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/register" variant="body2" component={RouterLink}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
