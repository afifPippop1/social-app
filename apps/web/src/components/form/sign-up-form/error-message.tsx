import { Alert } from "@mui/material";

export const SignUpErrorMessage = ({ error }: { error: string }) => {
  if (!error) return <></>;
  return <Alert severity="error">{error}</Alert>;
};
