import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { User, useAuthStore } from '../store';

export default function SignIn() {
  const login = useAuthStore.use.login();

  const [isAdmin, setIsAdmin] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData: User = {
      isAdmin: isAdmin,
      email: data.get('email')?.toString(),
      password: data.get('password')?.toString(),
    };
    login(userData);
  };

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
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
              <Switch
                name="isAdmin"
                checked={isAdmin}
                onChange={handleChange}
              />
            }
            label="Login as Admin"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

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
