"use client";
import UpdateLineToken from "@/actions/user/line";
import { Confirmation, useConfirm } from "@/hooks/use-confirm";
import { useInterface } from "@/providers/InterfaceProvider";
import { NotificationsTwoTone } from "@mui/icons-material";
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
} from "@mui/material";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import React from "react";

const LineForm = () => {
  const { setBackdrop } = useInterface();
  const { data: session, update } = useSession();
  const [token, setToken] = React.useState<string>(
    session?.user.line_token || ""
  );

  const confirmation = useConfirm({
    title: "แจ้งเตือน",
    text: "คุณต้องการที่จะแก้ไขLine tokenหรือไม่?",
    onConfirm: async () => {
      if (!session) return;
      setBackdrop(false);
      try {
        const resp = await UpdateLineToken(token);
        if (!resp.success) throw Error(resp.message);
        update({
          ...session,
          user: {
            ...session.user,
            line_token: resp.data,
          },
        });
        enqueueSnackbar("บันทึก line token สำเร็จแล้ว!", {
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    confirmation.handleOpen();
  };

  return (
    <>
      <Card component={"form"} onSubmit={onSubmit}>
        <CardHeader title="ไลน์"></CardHeader>
        <Divider />
        <CardContent component={"form"}>
          <Stack spacing={1}>
            <TextField
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NotificationsTwoTone />
                  </InputAdornment>
                ),
              }}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              fullWidth
              placeholder="LINE TOKEN"
              autoFocus
            />
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

export default LineForm;
