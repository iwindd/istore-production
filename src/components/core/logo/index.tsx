import { Stack, Typography } from "@mui/material";
import iStoreLogo from "./logo.png";
import Image from "next/image";

const Logo = () => {
  return (
    <Stack
      direction={"row"}
      spacing={1}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        width: '100%'
      }}
    >
      <Image width={42} height={42} src={iStoreLogo} alt="istore"></Image>
      <Typography color="text.primary" variant="h3">
        iStore
      </Typography>
    </Stack>
  );
};

export default Logo;
