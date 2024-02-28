import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';

import {
  MenuAccess,
  AccountManagement,
  CanteenOperations,
} from '../components/employee';

function EmployeeDashboard() {
  return (
    <Container component="main" maxWidth="lg" sx={{ flexGrow: 1 }}>
      <Typography>Employee Dashboard</Typography>
      <AccountManagement />
      <CanteenOperations />
      <MenuAccess />
    </Container>
  );
}

export default EmployeeDashboard;
