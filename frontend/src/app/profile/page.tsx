"use client";

import { useAppSelector } from "@/hooks/store";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { MdChevronRight } from "react-icons/md";

type Primitive = string | number | boolean | null | undefined;

const ProfileItem = ({ label, value }: { label: string; value: Primitive }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py="0.5rem"
      px="1rem"
      sx={{
        cursor: "pointer",
        ":hover": {
          bgcolor: "#FAFAFA",
        },
      }}
    >
      <Typography>{label}</Typography>
      <Box display="flex" alignItems="center" gap="1rem">
        <Typography>{value}</Typography>
        <IconButton>
          <MdChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
};

export default function ProfilePage() {
  const user = useAppSelector((s) => s.auth.user);

  return (
    <Box>
      <Typography>Profile</Typography>
      <Stack>
        <ProfileItem label="Email address" value={user?.email} />
        <ProfileItem label="Username" value={user?.displayName} />
      </Stack>
    </Box>
  );
}
