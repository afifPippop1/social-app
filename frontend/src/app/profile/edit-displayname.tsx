import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { updateUser } from "@/store/slices/user-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { ProfileItem } from "./profile-list-item";

const schema = z.object({
  displayName: z.string().nullable().optional(),
});

function EditDisplayNameDialog(props: DialogProps) {
  const displayName = useAppSelector((s) => s.user.user?.displayName);
  const loading = useAppSelector((s) => s.user.loading);
  const dispatch = useAppDispatch();
  const { formState, handleSubmit, register, reset } = useForm({
    resolver: zodResolver(schema),
    values: {
      displayName,
    },
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
          await dispatch(updateUser(value));
          handleClose();
        })}
      >
        <DialogTitle>Display name</DialogTitle>
        <DialogContent>
          <TextField
            error={!!formState.errors.displayName}
            helperText={formState.errors.displayName?.message}
            {...register("displayName")}
          />
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

export default function EditDisplayName() {
  const [open, setOpen] = useState(false);
  const user = useAppSelector((s) => s.user.user);

  return (
    <>
      <ProfileItem
        label="Display name"
        value={user?.displayName}
        onClick={() => setOpen(true)}
      />
      <EditDisplayNameDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
