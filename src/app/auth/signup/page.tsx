"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginTwoTone,
  NumbersTwoTone,
  PeopleTwoTone,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { SignUpSchema, SignUpValues } from "@/schema/Signup";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpValues> = async (
    payload: SignUpValues
  ) => {
    console.log("submit", payload);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Stack
        mt={8}
        direction={"column"}
        alignItems={"center"}
        spacing={1}
        boxShadow={"lg"}
        p={6}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack alignItems={"center"} spacing={2}>
          <Avatar>
            <LoginTwoTone />
          </Avatar>
          <Typography variant="h5">ลงทะเบียน</Typography>
        </Stack>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PeopleTwoTone />
              </InputAdornment>
            ),
          }}
          fullWidth
          placeholder="ชื่อ"
          error={!!errors["name"]?.message}
          helperText={errors["name"]?.message}
          {...register("name")}
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PeopleTwoTone />
              </InputAdornment>
            ),
          }}
          fullWidth
          placeholder="อีเมล"
          error={!!errors["email"]?.message}
          helperText={errors["email"]?.message}
          {...register("email")}
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <NumbersTwoTone />
              </InputAdornment>
            ),
          }}
          type="password"
          fullWidth
          placeholder="รหัสผ่าน"
          error={!!errors["password"]?.message}
          helperText={errors["password"]?.message}
          {...register("password")}
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <NumbersTwoTone />
              </InputAdornment>
            ),
          }}
          type="password"
          fullWidth
          placeholder="ยืนยันรหัสผ่าน"
          error={!!errors["password_confirmation"]?.message}
          helperText={errors["password_confirmation"]?.message}
          {...register("password_confirmation")}
        />
        <Stack justifyContent={"end"} alignItems={"end"}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<LoginTwoTone />}
          >
            ลงทะเบียน
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default SignIn;
