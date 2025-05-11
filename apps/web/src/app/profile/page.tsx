"use client";

import { useAppSelector } from "@/hooks/store";
import { Box, Stack, Typography } from "@mui/material";
import EditDisplayName from "./edit-displayname";
import { ProfileItem } from "./profile-list-item";

export default function ProfilePage() {
  const user = useAppSelector((s) => s.user.user);

  return (
    <>
      <Box>
        <Typography>Profile</Typography>
        <Stack>
          <ProfileItem label="Email address" value={user?.email} />
          <EditDisplayName />
        </Stack>
      </Box>
    </>
  );
}
