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
      <h1>Employee Dashboard</h1>
      <AccountManagement />
      <CanteenOperations />
      <MenuAccess />
    </Container>
  );
}

export default EmployeeDashboard;
