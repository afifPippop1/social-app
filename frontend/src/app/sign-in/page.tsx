import { SignInForm } from "@/components/form/sign-in-form/form";
import {
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";

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
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
