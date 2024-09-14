import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import { render, screen, fireEvent } from '@testing-library/react';

import useAlertDialog from './dialog.hook';

describe('useAlertDialog Hook', () => {
  it('initially has dialog closed', () => {
    const { result } = renderHook(() => useAlertDialog());
    const { AlertDialog } = result.current;

    const { container } = render(<AlertDialog />);

    expect(container.querySelector('div[role="dialog"]')).toBeNull();
  });

  it('opens and displays dialog with the correct text', () => {
    const { result } = renderHook(() => useAlertDialog());

    act(() => {
      result.current.openDialog('Test Alert', 'Test Title', 'Confirm', vi.fn());
    });

    const { AlertDialog } = result.current;
    render(<AlertDialog />);

    expect(screen.getByRole('dialog')).toBeVisible();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Test Alert')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('closes the dialog on Cancel button click', () => {
    const { result } = renderHook(() => useAlertDialog());

    act(() => {
      result.current.openDialog('Test Alert', 'Test Title', 'Confirm', vi.fn());
    });

    const { AlertDialog } = result.current;
    const { container } = render(<AlertDialog />);

    fireEvent.click(screen.getByText('Cancel'));

    expect(container.querySelector('div[role="dialog"]')).toBeNull();
  });

  it('executes onConfirm handler and closes the dialog on confirm button click', () => {
    const onConfirmMock = vi.fn();

    const { result } = renderHook(() => useAlertDialog());

    act(() => {
      result.current.openDialog(
        'Test Alert',
        'Test Title',
        'Confirm',
        onConfirmMock
      );
    });

    const { AlertDialog } = result.current;
    const { container } = render(<AlertDialog />);

    fireEvent.click(screen.getByText('Confirm'));

    expect(onConfirmMock).toHaveBeenCalled();
    expect(container.querySelector('div[role="dialog"]')).toBeNull();
  });
});
