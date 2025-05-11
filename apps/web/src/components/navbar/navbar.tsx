import { Box, Container } from "@mui/material";
import Link from "next/link";
import { ProfileMenu } from "./profile-menu";

export function Navbar() {
  return (
    <Box
      boxShadow="0px 1px 3px 0px rgba(94,94,94,0.75)"
      bgcolor="white"
      py="0.5rem"
    >
      <Container>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Link href="/">Home</Link>
          <ProfileMenu />
        </Box>
      </Container>
    </Box>
  );
}
