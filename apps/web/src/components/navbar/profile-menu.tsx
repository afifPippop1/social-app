"use client";

import { auth } from "@/config/firebase";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { logout } from "@/store/slices/auth-slice";
import { Avatar, Box, Menu, MenuItem } from "@mui/material";
import { signOut } from "firebase/auth";
import { useRouter } from "nextjs-toploader/app";
import { useCallback, useState } from "react";

export function ProfileMenu() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = useAppSelector((s) => s.user.user);
  const dispatch = useAppDispatch();

  const handleGotoProfile = useCallback(() => {
    router.push("/profile");
    handleClose();
  }, [router]);

  const handleLogout = useCallback(async () => {
    await signOut(auth);
    dispatch(logout());
    window.location.href = "/sign-in";
  }, [dispatch]);

  return (
    <Box>
      <Avatar
        id="profile-button"
        onClick={handleClick}
        sx={{ cursor: "pointer" }}
      >
        {user?.displayName?.[0]}
      </Avatar>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleGotoProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}
