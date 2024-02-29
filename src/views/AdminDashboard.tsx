import { Box, Container, Grid, Paper } from '@mui/material';

import {
  ItemManagement,
  EmployeeManagement,
  TransactionManagement,
  PopularItemManagement,
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
      <Container maxWidth="xl" sx={{ flexGrow: 1 }}>
        <Grid container spacing={3} paddingY={3}>
          <Grid item xs={12} lg={6}>
            <Paper>
              <EmployeeManagement />
            </Paper>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Paper>
              <TransactionManagement />
            </Paper>
          </Grid>

          <Grid item xs={12} lg={12}>
            <Paper>
              <ItemManagement />
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

export default AdminDashboard;
