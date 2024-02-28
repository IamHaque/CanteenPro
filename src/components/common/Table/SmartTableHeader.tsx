import {
  Box,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { ISmartTableHeaderCell, TOrder } from '../../../utils/table';

interface SmartTableHeaderProps {
  order: TOrder;
  dense: boolean;
  rowCount: number;
  ariaLabel: string;
  numSelected: number;
  disableSelection: boolean;
  orderBy: string | number | symbol;
  headCells: ISmartTableHeaderCell[];
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof ISmartTableHeaderCell
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SmartTableHeader(props: SmartTableHeaderProps) {
  const {
    dense,
    order,
    orderBy,
    rowCount,
    ariaLabel,
    headCells,
    numSelected,
    onRequestSort,
    onSelectAllClick,
    disableSelection,
  } = props;
  const createSortHandler =
    (property: keyof ISmartTableHeaderCell) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {!disableSelection && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              size={dense ? 'small' : 'medium'}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': ariaLabel,
              }}
            />
          </TableCell>
        )}

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              onClick={createSortHandler(
                headCell.id as keyof ISmartTableHeaderCell
              )}
              direction={orderBy === headCell.id ? order : 'asc'}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
