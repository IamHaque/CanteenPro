import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Toolbar, alpha, Typography, Tooltip, IconButton } from '@mui/material';

interface SmartTableToolbarProps {
  title: string;
  numSelected: number;
  actionTitle?: string;
  onActionClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDeleteClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function SmartTableToolbar(props: SmartTableToolbarProps) {
  const { title, numSelected, actionTitle, onActionClick, onDeleteClick } =
    props;

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

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={onDeleteClick}>
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
