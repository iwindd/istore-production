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
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import RouterLink from 'next/link';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(SignInSchema),
  });

  const {data: session} = useSession();
  const router = useRouter();

  const onSubmit: SubmitHandler<SignInValues> = async (
    payload: SignInValues
  ) => {
    if (session) return router.push("/");
    try {
      const resp = await signIn("credentials", {
        ...payload,
        redirect: false
      })

      if (resp && resp.ok) {
        router.push("/");
        router.refresh();
      }else{
        throw Error("no_response");
      }
    } catch (error) {
      resetField("password");
      setError("email", {
        type: "string",
        message: "ไม่พบผู้ใช้งาน"
      }, {shouldFocus: true})
    }
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
        <Stack justifyContent={"center"} alignItems={"center"} spacing={1}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<LoginTwoTone />}
            disabled={isSubmitting}
          >
            เข้าสู่ระบบ
          </Button>
          <Link component={RouterLink} href={'/auth/signup'}>
            ฉันไม่มีบัญชี?
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
};

export default SignIn;
