"use client";
import UpdateProfile from "@/actions/user/update";
import { Confirmation, useConfirm } from "@/hooks/use-confirm";
import { useInterface } from "@/providers/InterfaceProvider";
import { ProfileSchema, ProfileValues } from "@/schema/Profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailTwoTone, PeopleTwoTone } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const DetailForm = () => {
  const { setBackdrop } = useInterface();
  const { data: session, update } = useSession();
  const { register, handleSubmit } = useForm<ProfileValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: session?.user.name,
      email: session?.user.email,
    },
  });

  const confirmation = useConfirm({
    title: "แจ้งเตือน",
    text: "คุณต้องการที่จะแก้ไขโปรไฟล์หรือไม่?",
    onConfirm: async (payload: ProfileValues) => {
      if (!session) return;
      setBackdrop(false);
      try {
        const resp = await UpdateProfile(payload);
        if (!resp.success) throw Error(resp.message);
        update({
          ...session,
          user: {
            ...session.user,
            name: resp.data.name,
            email: resp.data.email,
          },
        });
        enqueueSnackbar("บันทึกข้อมูลผู้ใช้สำเร็จแล้ว!", {
          variant: "success",
        });
      } catch (error) {
        enqueueSnackbar("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้งภายหลัง", {
          variant: "error",
        });
      } finally {
        setBackdrop(false);
      }
    },
  });

  const onSubmit: SubmitHandler<ProfileValues> = async (payload) => {
    confirmation.with(payload);
    confirmation.handleOpen();
  };

  return (
    <>
      <Card component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <CardHeader title="ข้อมูลผู้ใช้"></CardHeader>
        <Divider />
        <CardContent>
          <Stack spacing={1}>
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
              autoFocus
              {...register("name")}
            />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailTwoTone />
                  </InputAdornment>
                ),
              }}
              fullWidth
              placeholder="อีเมล"
              {...register("email")}
            />
            <Typography
              variant="caption"
              color="primary"
              sx={{ cursor: "pointer" }}
            >
              เปลี่ยนรหัสผ่าน ?
            </Typography>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            type="submit"
            color="inherit"
            variant="text"
            sx={{ ml: "auto" }}
          >
            บันทึก
          </Button>
        </CardActions>
      </Card>
      <Confirmation {...confirmation.props} />
    </>
  );
};

export default DetailForm;
