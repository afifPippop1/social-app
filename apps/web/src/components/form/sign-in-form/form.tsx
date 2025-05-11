"use client";

import { auth } from "@ebuddy/firebase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignInErrorMessage } from "./error-message";
import { signInSchema } from "./schema";
import { SignInSuccessMessage } from "./success-message";

export function SignInForm() {
  const { formState, handleSubmit, register } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const [signInErr, setSignInErr] = useState(false);
  const [signInSuccess, setSignInSuccess] = useState(false);

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async ({ email, password }) => {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          setSignInSuccess(true);
          window.location.pathname = "/";
        } catch {
          setSignInSuccess(false);
          setSignInErr(true);
        }
      })}
    >
      <Stack gap="1.5rem">
        <SignInErrorMessage error={signInErr} />
        <SignInSuccessMessage success={signInSuccess} />
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
          loading={formState.isSubmitting || signInSuccess}
          type="submit"
          variant="contained"
        >
          Sign in
        </Button>
      </Stack>
    </form>
  );
}
