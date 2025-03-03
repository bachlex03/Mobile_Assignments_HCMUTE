import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const profileSchema = z.object({
  profile_firstName: z.string().min(1, {
    message: "First name is required",
  }),
  profile_lastName: z.string().min(1, {
    message: "Last name is required",
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
