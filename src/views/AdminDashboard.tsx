import { Box, Container, Grid, Paper, Typography } from '@mui/material';

import {
  ItemManagement,
  EmployeeManagement,
  TransactionManagement,
} from '../components/admin';

function AdminDashboard() {
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
      <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Typography>Admin Dashboard</Typography>

          <Grid item xs={12}>
            <Paper>
              <TransactionManagement />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper>
              <EmployeeManagement />
            </Paper>
          </Grid>

          <ItemManagement />
        </Grid>
      </Container>
    </Box>
  );
}

export default AdminDashboard;
