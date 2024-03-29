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
  IconButton,
  InputLabel,
  Typography,
  FormControl,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import useApiRequest from '../hooks/api.hook';
import { LoginApiResponse } from '../utils/auth.types';

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { data, loading, makeRequest } = useApiRequest<LoginApiResponse>();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await makeRequest('http://localhost:3200/api/v1/user/register', 'POST', {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      password2: formData.get('password2'),
    });
  };

  useEffect(() => {
    if (data?.data) {
      // Redirect to the login page upon successful registration
      return navigate('/login');
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
          Sign up
        </Typography>

        {!data?.error?.validationErrors && data?.error?.message && (
          <Typography color="error" variant="body1" width="100%">
            {data?.error?.message}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                autoFocus
                name="name"
                label="Full Name"
                autoComplete="given-name"
                helperText={data?.error?.validationErrors?.name?.[0]}
                error={data?.error?.validationErrors?.name !== undefined}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                label="Email Address"
                helperText={data?.error?.validationErrors?.email?.[0]}
                error={data?.error?.validationErrors?.email !== undefined}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl
                fullWidth
                error={data?.error?.validationErrors?.password !== undefined}
              >
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
                <FormHelperText>
                  {data?.error?.validationErrors?.password?.[0]}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password2"
                type="password"
                name="password2"
                label="Confirm Password"
                helperText={data?.error?.validationErrors?.password2?.[0]}
                error={data?.error?.validationErrors?.password2 !== undefined}
              />
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
                Sign Up
              </Button>
            )}
          </Box>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2" component={RouterLink}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
