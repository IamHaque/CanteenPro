import { Box, Container, Grid, Paper, Typography } from '@mui/material';

import {
  AccountManagement,
  TransactionManagement,
  PopularItemManagement,
} from '../components/employee';

function EmployeeDashboard() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        overflow: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
      }}
    >
      <Container maxWidth="xl" sx={{ flexGrow: 1 }}>
        <Grid container spacing={3} paddingY={3}>
          <Grid container item spacing={3} xs={12}>
            <Grid item xs={6} md={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  color="primary"
                  gutterBottom
                >
                  Welcome,
                </Typography>
                <Typography component="p" variant="h4">
                  John Doe
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={6} md={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  color="primary"
                  gutterBottom
                >
                  Wallet Balance
                </Typography>
                <Typography component="p" variant="h4">
                  $ 3,024.00
                </Typography>
              </Paper>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: { xs: 'none', md: 'block' } }}
            ></Grid>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Paper>
              <TransactionManagement />
            </Paper>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Paper>
              <AccountManagement />
            </Paper>
          </Grid>

          <Grid item xs={12} mt={3}>
            <PopularItemManagement />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default EmployeeDashboard;
