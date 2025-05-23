import z from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  displayName: z.string(),
});
