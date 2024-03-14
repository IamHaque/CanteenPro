import { ReactNode } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Toolbar, alpha, Typography, Tooltip, IconButton } from '@mui/material';

interface ButtonConfig {
  title: string;
  icon: ReactNode;
  onClick: (selectedRowIds: readonly number[]) => void;
}

interface SmartTableToolbarProps {
  title: string;
  numSelected: number;
  actionTitle?: string;
  buttons?: ButtonConfig[];
  selected: readonly number[];
  onDeleteClick?: (selectedRowIds: readonly number[]) => void;
  setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>;
  onActionClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function SmartTableToolbar(props: SmartTableToolbarProps) {
  const {
    title,
    buttons,
    selected,
    setSelected,
    numSelected,
    actionTitle,
    onActionClick,
    onDeleteClick,
  } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="h2"
          color="primary"
        >
          {title}
        </Typography>
      )}

      {numSelected > 0 &&
        buttons &&
        buttons.map((button, index) => (
          <Tooltip key={index} title={button.title}>
            <IconButton
              onClick={() => {
                if (!button.onClick) return;
                button.onClick(selected);
                setSelected([]);
              }}
            >
              {button.icon}
            </IconButton>
          </Tooltip>
        ))}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => {
              if (!onDeleteClick) return;
              onDeleteClick(selected);
              setSelected([]);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}

      {numSelected <= 0 && actionTitle && (
        <Tooltip title={actionTitle}>
          <IconButton onClick={onActionClick}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
