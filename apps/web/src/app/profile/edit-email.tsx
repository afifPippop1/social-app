import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { updateUser } from "@/store/slices/user-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { ProfileItem } from "./profile-list-item";

const schema = z.object({
  email: z.string().email(),
});

function EditEmailDialog(props: DialogProps) {
  const email = useAppSelector((s) => s.user.user?.email);
  const loading = useAppSelector((s) => s.user.loading);
  const error = useAppSelector((s) => s.user.error);
  const dispatch = useAppDispatch();
  const { formState, handleSubmit, register, reset } = useForm({
    resolver: zodResolver(schema),
    values: { email: email || "" },
  });

  const handleClose = useCallback(() => {
    props.onClose?.({}, "escapeKeyDown");
    reset();
  }, [props, reset]);

  return (
    <Dialog {...props} onClose={handleClose}>
      <form
        noValidate
        onSubmit={handleSubmit(async (value) => {
          const res = await dispatch(updateUser(value));

          if (updateUser.fulfilled.match(res)) {
            handleClose();
            window.location.pathname = "/sign-in";
          }
        })}
      >
        <DialogTitle>Email</DialogTitle>
        <DialogContent>
          <Stack gap="1rem">
            <Alert severity="warning">This will log you out</Alert>
            <TextField
              error={!!formState.errors.email || !!error}
              helperText={formState.errors.email?.message || error}
              {...register("email")}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" loading={loading}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default function EditEmail() {
  const [open, setOpen] = useState(false);
  const email = useAppSelector((s) => s.user.user?.email);

  return (
    <>
      <ProfileItem
        label="Email address"
        value={email}
        onClick={() => setOpen(true)}
      />
      <EditEmailDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
