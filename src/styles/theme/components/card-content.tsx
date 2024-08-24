import type { Components } from "@mui/material/styles";

import type { Theme } from "../types";

export const MuiCardContent = {
  styleOverrides: {
    root: { padding: "20px 20px", "&:last-child": { paddingBottom: "20px" } },
  },
} satisfies Components<Theme>["MuiCardContent"];
