import React, { ReactNode } from 'react';
import {
  TableRow,
  TableCell,
  Checkbox,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
  Radio,
} from '@mui/material';
import moment from 'moment';

import SmartTableHeader from './SmartTableHeader';
import SmartTableToolbar from './SmartTableToolbar';

import {
  TOrder,
  stableSort,
  getComparator,
  ISmartTableHeaderCell,
} from '../../../utils/table';

// Define a generic interface for a table row
interface ISmartTableRow {
  [key: string]: string | number | null | undefined; // Allow keys to be string or number
}

// Extend ISmartTableRow for ISmartTable
export interface ISmartTable extends ISmartTableRow {
  // Add additional properties specific to your table, if any
}

interface ButtonConfig {
  title: string;
  icon: ReactNode;
  onClick: (selectedRowIds: readonly number[]) => void;
}

interface SmartTableProps<T extends ISmartTable> {
  title: string;
  dense: boolean;
  ariaLabel?: string;
  rows: readonly T[];
  actionTitle?: string;
  singleSelection: boolean;
  disableSelection: boolean;
  disablePagination: boolean;
  headerButtons?: ButtonConfig[];
  headCells: ISmartTableHeaderCell[];
  onDeleteClick?: (selectedRowIds: readonly number[]) => void;
  onActionClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function SmartTable<T extends ISmartTable>(
  props: SmartTableProps<T>
) {
  const {
    rows,
    dense,
    title,
    headCells,
    ariaLabel,
    actionTitle,
    headerButtons,
    onActionClick,
    onDeleteClick,
    singleSelection,
    disableSelection,
    disablePagination,
  } = props;
  const initialRowsPerPage = disablePagination ? rows.length : 5;

  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState<TOrder>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof T>('id');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (singleSelection || disableSelection) return;

    if (event.target.checked) {
      const newSelected = rows.map((n) => Number(n.id));
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_: React.MouseEvent<unknown>, id: number) => {
    if (disableSelection) return;

    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (singleSelection) {
      if (selectedIndex < 0) {
        newSelected = [id];
      } else {
        newSelected = [];
      }
    } else {
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
    }

    setSelected(newSelected);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(
        rows as readonly { [key in keyof T]: string | number }[],
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [rows, order, orderBy, page, rowsPerPage]
  );

  return (
    <React.Fragment>
      <SmartTableToolbar
        title={title}
        selected={selected}
        buttons={headerButtons}
        actionTitle={actionTitle}
        setSelected={setSelected}
        numSelected={selected.length}
        onActionClick={onActionClick}
        onDeleteClick={onDeleteClick}
      />

      <TableContainer>
        <Table
          aria-labelledby="employeeTable"
          size={dense ? 'small' : 'medium'}
        >
          <SmartTableHeader
            dense={dense}
            order={order}
            orderBy={orderBy}
            ariaLabel={ariaLabel}
            headCells={headCells}
            rowCount={rows.length}
            numSelected={selected.length}
            onRequestSort={handleRequestSort}
            singleSelection={singleSelection}
            disableSelection={disableSelection}
            onSelectAllClick={handleSelectAllClick}
          />

          <TableBody>
            {rows.length <= 0 && (
              <TableRow>
                <TableCell colSpan={headCells.length + 1} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}

            {rows.length > 0 &&
              visibleRows.map((row, index) => {
                const isItemSelected = isSelected(Number(row.id));
                const labelId = `smart-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover={disableSelection ? false : true}
                    onClick={(event) => handleClick(event, Number(row.id))}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{
                      cursor: disableSelection ? 'auto' : 'pointer',
                      '&:last-child td, &:last-child th': disablePagination
                        ? { border: 0 }
                        : {},
                    }}
                  >
                    {!disableSelection && (
                      <TableCell padding="checkbox">
                        {singleSelection ? (
                          <Radio
                            size="small"
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        ) : (
                          <Checkbox
                            size="small"
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        )}
                      </TableCell>
                    )}

                    {headCells.map(({ id, type }, index) => {
                      const cell = row[id];
                      if (cell === undefined) return;

                      let cellValue = cell.toString();

                      if (type === 'currency') {
                        cellValue = '$ ' + parseFloat(cellValue).toFixed(2);
                      } else if (type === 'date') {
                        cellValue = moment(cellValue).fromNow().toString();
                      }

                      return (
                        <TableCell key={cell.toString() + index}>
                          {cellValue}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}

            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {!disablePagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </React.Fragment>
  );
}
