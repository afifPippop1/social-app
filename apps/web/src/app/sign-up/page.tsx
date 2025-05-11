import { SignUpForm } from "@/components/form/sign-up-form";
import {
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function SignUpPage() {
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
              <SignUpForm />
              <Typography variant="body2">
                Already have account? <Link href="/sign-in">Sign in</Link>
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
