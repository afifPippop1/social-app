import { Navbar } from "@/components/navbar";
import { Box, Container } from "@mui/material";
import { ReactNode } from "react";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Box width="100vw" height="100vh" overflow="auto">
      <Navbar />
      <Container sx={{ paddingY: "1rem" }}>{children}</Container>
    </Box>
  );
}
