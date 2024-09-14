import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import useSnackbar from './snackbar.hook';

describe('useSnackbar Hook', () => {
  it('initially sets the Snackbar to be closed', () => {
    const { result } = renderHook(() => useSnackbar());

    expect(result.current.handleClick).toBeDefined();
    expect(result.current.SnackbarComponent).toBeDefined();
  });

  it('opens the Snackbar with the correct message and severity', () => {
    const { result } = renderHook(() => useSnackbar());

    const message = 'This is a success message';
    const severity = 'success';

    act(() => {
      result.current.handleClick(severity, message);
    });

    render(<result.current.SnackbarComponent />);

    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-filledSuccess');
  });
});
