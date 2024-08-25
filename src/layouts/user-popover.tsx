import * as React from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

import { LogoutTwoTone, PeopleTwoTone } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { useInterface } from "@/providers/InterfaceProvider";

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

export function UserPopover({
  anchorEl,
  onClose,
  open,
}: UserPopoverProps): React.JSX.Element {
  const router = useRouter();
  const { data, update } = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const { setBackdrop } = useInterface();

  const onSignout = React.useCallback(async (): Promise<void> => {
    onClose();
    try {
      await signOut({ callbackUrl: "/", redirect: true });

      router.refresh();
      enqueueSnackbar("ออกจากระบบสำเร็จ", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งภายหลัง", {
        variant: "error",
      });
    }
  }, [router, enqueueSnackbar, setBackdrop, onClose]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: "240px" } } }}
    >
      <Box sx={{ p: "16px 20px " }}>
        <Typography variant="subtitle1">{data?.user?.name}</Typography>
        <Typography color="text.secondary" variant="body2">
          {data?.user?.email}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        sx={{ p: "8px", "& .MuiMenuItem-root": { borderRadius: 1 } }}
      >
        <MenuItem component={Link} href={Path("account").href}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          บัญชีของฉัน
        </MenuItem>
        <MenuItem onClick={onSignout}>
          <ListItemIcon>
            <LogoutTwoTone />
          </ListItemIcon>
          ออกจากระบบ
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
