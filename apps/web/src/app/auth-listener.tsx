"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { listenToAuth } from "@/store/slices/auth-slice";
import { Box, CircularProgress } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthenticatedLayout from "./authenticated-layout";

export default function AuthListener({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token);
  const loading = useAppSelector((s) => s.auth.loading);

  useEffect(() => {
    dispatch(listenToAuth());
  }, [dispatch]);

  useEffect(() => {
    if (
      !token &&
      !loading &&
      pathname !== "/sign-in" &&
      pathname !== "/sign-up"
    ) {
      router.push("/sign-in");
    }
  }, [token, router, pathname, loading]);

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        width="100vw"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (token) {
    return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
  }

  return children;
}
