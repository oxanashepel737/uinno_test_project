import { z } from "zod";

export const signInValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const postValidation = z.object({
  title: z.string().min(2, "Too short"),
  content: z.string().min(5, "Too short").max(255, "Too long"),
});
