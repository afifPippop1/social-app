import { Alert } from "@mui/material";

export const SignInErrorMessage = ({ error }: { error: boolean }) => {
  if (!error) return <></>;
  return <Alert severity="error">Invalid email/password</Alert>;
};
