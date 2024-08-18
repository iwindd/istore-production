import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loading = (props: { centered?: boolean; m?: number }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: props.centered ? "center" : undefined,
        margin: props.m || 0,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
