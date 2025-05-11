import { Alert } from "@mui/material";

export const SignUpSuccessMessage = ({ success }: { success: boolean }) => {
  if (!success) return <></>;
  return <Alert severity="success">Successfully sign up! redirecting...</Alert>;
};
