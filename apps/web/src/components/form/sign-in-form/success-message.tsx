import { Alert } from "@mui/material";

export const SignInSuccessMessage = ({ success }: { success: boolean }) => {
  if (!success) return <></>;
  return <Alert severity="success">Successfully sign in! redirecting...</Alert>;
};
