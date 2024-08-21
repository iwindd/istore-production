import * as React from 'react';

interface MenuController<T> {
  anchorEl: T | null;
  handleOpen: (event: React.MouseEvent<T>) => void;
  handleClose: () => void;
  handleToggle: () => void;
  open: boolean;
}

export function useMenu<T = HTMLElement>(): MenuController<T> {
  const [anchorEl, setAnchorEl] = React.useState<T | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = (event: React.MouseEvent<T>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevState) => !prevState);
  };

  return { anchorEl, handleClose, handleOpen, handleToggle, open };
}
