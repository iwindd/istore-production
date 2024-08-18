"use client";
import { SignInSchema, SignInValues } from "@/schema/Signin";
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

const SignIn = () => {
  const {
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit: SubmitHandler<SignInValues> = async (
    payload: SignInValues
  ) => {
    console.log("submit", payload);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Stack
        mt={8}
        direction={"column"}
        alignItems={"center"}
        spacing={2}
        boxShadow={"lg"}
        p={6}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack alignItems={"center"} spacing={2}>
          <Avatar>
            <LoginTwoTone />
          </Avatar>
          <Typography variant="h5">เข้าสู่ระบบ</Typography>
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
        <Stack justifyContent={"end"} alignItems={"end"}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<LoginTwoTone />}
          >
            เข้าสู่ระบบ
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default SignIn;
