import {
  ItemManagement,
  EmployeeManagement,
  TransactionManagement,
} from '../components/admin';

function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <EmployeeManagement />
      <ItemManagement />
      <TransactionManagement />
    </div>
  );
}

export default AdminDashboard;
