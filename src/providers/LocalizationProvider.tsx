"use client";
import { LocalizationProvider as Localization } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const LocalizationProvider = ({ children }: { children: React.ReactNode }) => {
  return <Localization dateAdapter={AdapterDayjs}>{children}</Localization>;
};

export default LocalizationProvider;
