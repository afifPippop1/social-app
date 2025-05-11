"use client";

import { useAppSelector } from "@/hooks/store";
import { Box, Stack, Typography } from "@mui/material";
import EditDisplayName from "./edit-displayname";
import EditEmail from "./edit-email";

export default function ProfilePage() {
  const user = useAppSelector((s) => s.user.user);

  return (
    <>
      <Box>
        <Typography>Profile</Typography>
        <Stack>
          <EditEmail />
          <EditDisplayName />
        </Stack>
      </Box>
    </>
  );
}
