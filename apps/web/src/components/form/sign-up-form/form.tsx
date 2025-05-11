"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { signUpSchema } from "./schema";
import { AuthService } from "@/services/auth-service";
import { SignUpErrorMessage } from "./error-message";
import { useState } from "react";

export function SignUpForm() {
  const { formState, handleSubmit, register } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const [error, setError] = useState<string>("");

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (data) => {
        try {
          const res = await AuthService.signUp(data);
          if (res.status === "success") {
            window.location.pathname = "/sign-in";
          }
          throw Error(res?.error?.message);
        } catch (e: any) {
          setError(e?.message || "Something went wrong");
        }
      })}
    >
      <Stack gap="1.5rem">
        <SignUpErrorMessage error={error} />
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
