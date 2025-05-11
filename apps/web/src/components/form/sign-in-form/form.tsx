"use client";

import { auth } from "@/config/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignInErrorMessage } from "./error-message";
import { signInSchema } from "./schema";

export function SignInForm() {
  const { formState, handleSubmit, register } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const [signInErr, setSignInErr] = useState(false);

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async ({ email, password }) => {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          window.location.pathname = "/";
        } catch {
          setSignInErr(true);
        }
      })}
    >
      <Stack gap="1.5rem">
        <SignInErrorMessage error={signInErr} />
        <TextField
          error={!!formState.errors.email}
          helperText={formState.errors.email?.message}
          type="email"
          label="Email"
          {...register("email")}
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
          Sign in
        </Button>
      </Stack>
    </form>
  );
}
