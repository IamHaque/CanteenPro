import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { IEmployee } from '../../utils/table';
import UpdateEmployeeBalanceModal from './UpdateEmployeeBalanceModal';

// Mock the useApiRequest hook
vi.mock('../../hooks', () => {
  return {
    useApiRequest: () => ({
      data: null,
      loading: false,
      makeRequest: vi.fn(),
    }),
  };
});

const mockEmployeeData: IEmployee = {
  id: 1,
  balance: 100,
  userId: 'user1',
  name: 'Employee 1',
  email: 'test@test.com',
};

describe('UpdateEmployeeBalanceModal Component', () => {
  const handleClose = vi.fn();
  const handleSuccess = vi.fn();

  beforeEach(() => {
    // Reset mock functions before each test
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <UpdateEmployeeBalanceModal
        open={true}
        handleClose={handleClose}
        handleSuccess={handleSuccess}
        employeeData={mockEmployeeData}
      />
    );

    expect(screen.getByText('Update Balance')).toBeInTheDocument();
    expect(screen.getByText('Update Employee Wallet')).toBeInTheDocument();
  });

  it('displays the current balance in the input field', () => {
    render(
      <UpdateEmployeeBalanceModal
        open={true}
        handleClose={handleClose}
        handleSuccess={handleSuccess}
        employeeData={mockEmployeeData}
      />
    );

    const balanceInput = screen.getByRole('spinbutton') as HTMLInputElement;

    expect(balanceInput.value).toBe('100');
  });
});
