import { Link } from "@mui/material";
import {
  GridActionsCellItem,
  GridActionsCellItemProps,
} from "@mui/x-data-grid";
import React, { RefAttributes } from "react";
import RouterLink from "next/link";

type GridLinkActionProps = { to: string } & GridActionsCellItemProps &
  RefAttributes<HTMLButtonElement>;

const GridLinkAction = ({ to, ...props }: GridLinkActionProps) => {
  return (
    <Link
      component={RouterLink}
      href={to}
      underline="none"
      color={"ButtonText"}
    >
      <GridActionsCellItem {...props} />
    </Link>
  );
};

export default GridLinkAction;
