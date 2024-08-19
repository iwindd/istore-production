import * as React from 'react';

interface DialogController<T> {
  handleOpen: () => void;
  handleClose: () => void;
  handleToggle: () => void;
  open: boolean;
}

export function useDialog<T = HTMLElement>(): DialogController<T> {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleToggle = React.useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  return { handleClose, handleOpen, handleToggle, open };
}
