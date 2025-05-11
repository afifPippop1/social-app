"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { signUpSchema } from "./schema";
import { AuthService } from "@/services/auth-service";
import { SignUpErrorMessage } from "./error-message";
import { useState } from "react";
import { SignUpSuccessMessage } from "./success-message";

export function SignUpForm() {
  const { formState, handleSubmit, register } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (data) => {
        try {
          const res = await AuthService.signUp(data);
          if (res.status === "success") {
            setSuccess(true);
            window.location.pathname = "/sign-in";
            return;
          }
          throw Error(res?.error?.message);
        } catch (e: any) {
          setSuccess(false);
          setError(e?.message || "Something went wrong");
        }
      })}
    >
      <Stack gap="1.5rem">
        <SignUpErrorMessage error={error} />
        <SignUpSuccessMessage success={success} />
        <TextField
          error={!!formState.errors.email}
          helperText={formState.errors.email?.message}
          type="email"
          label="Email"
          {...register("email")}
        />
        <TextField
          error={!!formState.errors.displayName}
          helperText={formState.errors.displayName?.message}
          type="text"
          label="Display name"
          {...register("displayName")}
        />
        <TextField
          error={!!formState.errors.password}
          helperText={formState.errors.password?.message}
          type="password"
          label="Password"
          {...register("password")}
        />
        <Button
          loading={formState.isSubmitting}
          type="submit"
          variant="contained"
        >
          Sign up
        </Button>
      </Stack>
    </form>
  );
}
