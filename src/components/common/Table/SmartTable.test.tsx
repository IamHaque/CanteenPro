import moment from 'moment';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import SmartTable, { ISmartTable } from './SmartTable';
import { ISmartTableHeaderCell } from '../../../utils/table';

// Sample data and props for testing
interface SampleRow extends ISmartTable {
  id: number;
  date: string;
  name: string;
}

const sampleRows: SampleRow[] = [
  {
    id: 1,
    name: 'John Doe',
    date: moment().subtract(1, 'days').toISOString(),
  },
  {
    id: 2,
    name: 'Jane Smith',
    date: moment().subtract(2, 'days').toISOString(),
  },
];

const sampleHeadCells: ISmartTableHeaderCell[] = [
  {
    id: 'id',
    label: 'Id',
  },
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'date',
    type: 'date',
    label: 'Date',
  },
];

describe('SmartTable Component', () => {
  it('renders without crashing', () => {
    render(
      <SmartTable
        title="Test Table"
        dense={false}
        rows={sampleRows}
        headCells={sampleHeadCells}
        singleSelection={false}
        disableSelection={false}
        disablePagination={true}
      />
    );

    expect(screen.getByText('Test Table')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('displays a message when there are no rows', () => {
    render(
      <SmartTable
        title="Test Table"
        dense={false}
        rows={[]}
        headCells={sampleHeadCells}
        singleSelection={false}
        disableSelection={false}
        disablePagination={true}
      />
    );

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('handles row selection', async () => {
    const user = userEvent.setup();

    render(
      <SmartTable
        title="Test Table"
        dense={false}
        rows={sampleRows}
        headCells={sampleHeadCells}
        singleSelection={false}
        disableSelection={false}
        disablePagination={true}
      />
    );

    const firstRowCheckbox = screen.getAllByRole('checkbox')[0];
    await user.click(firstRowCheckbox);

    expect(firstRowCheckbox).toBeChecked();
  });

  it('handles single selection mode', async () => {
    const user = userEvent.setup();

    render(
      <SmartTable
        title="Test Table"
        dense={false}
        rows={sampleRows}
        headCells={sampleHeadCells}
        singleSelection={true}
        disableSelection={false}
        disablePagination={true}
      />
    );

    const firstRadioButton = screen.getAllByRole('radio')[0];
    await user.click(firstRadioButton);

    expect(firstRadioButton).toBeChecked();
  });

  it('applies pagination correctly', () => {
    render(
      <SmartTable
        title="Test Table"
        dense={false}
        rows={sampleRows}
        headCells={sampleHeadCells}
        singleSelection={false}
        disableSelection={false}
        disablePagination={false}
      />
    );

    expect(screen.getByText('Rows per page:')).toBeInTheDocument();
  });

  it('formats date cells correctly', () => {
    render(
      <SmartTable
        title="Test Table"
        dense={false}
        rows={sampleRows}
        headCells={sampleHeadCells}
        singleSelection={false}
        disableSelection={false}
        disablePagination={true}
      />
    );

    const formattedDate = moment(sampleRows[0].date).format(
      'hh:mm a DD MMM, YYYY'
    );
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });
});
