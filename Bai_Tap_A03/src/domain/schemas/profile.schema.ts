import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const profileSchema = z.object({
  email: z.string().email({
    message: "Email is invalid",
  }),
  phoneNumber: z
    .string()
    .min(9, {
      message: "Phone number 10 digits",
    })
    .regex(/^\d+$/, {
      message: "Phone number is invalid",
    }),
});

export type ProfileFormType = z.infer<typeof profileSchema>;

export const profileResolver = zodResolver(profileSchema);

////
const imageSchema = z.object({
  image: z.string().url({
    message: "Image is invalid",
  }),
});

export type ImageFormType = z.infer<typeof imageSchema>;

export const imageResolver = zodResolver(imageSchema);
