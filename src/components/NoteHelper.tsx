"use client";
import { Info } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import React from 'react'

const NoteHelper = () => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={0.5}
    >
      <Info fontSize="small" sx={{ opacity: 0.6 }} />
      <Typography variant="caption">
        เช่น ชื่อผู้ใช้, รหัสการสั่งจอง, คำอธิบาย, ข้อมูล, คำชี้แจงเพิ่มเติม เป็นต้น
      </Typography>
    </Stack>
  )
}

export default NoteHelper