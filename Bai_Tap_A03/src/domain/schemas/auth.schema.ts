import { z, ZodObject } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export type LoginFormType = z.infer<typeof loginSchema>;

export const loginResolver = zodResolver(loginSchema);

const otpSchema = z.object({
  otp: z.string().length(6, {
    message: "OTP must be 6 digits",
  }),
});

export type OtpFormType = z.infer<typeof otpSchema>;

export const otpResolver = zodResolver(otpSchema);
