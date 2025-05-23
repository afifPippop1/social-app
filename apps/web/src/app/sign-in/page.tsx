import { SignInForm } from "@/components/form/sign-in-form";
import {
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function SignInPage() {
  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxWidth="xs">
        <Card>
          <CardContent>
            <Stack gap="2rem">
              <Typography variant="h4">Sign in</Typography>
              <SignInForm />
              <Typography variant="body2">
                Don&apos;t account? <Link href="/sign-up">Create one.</Link>
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
