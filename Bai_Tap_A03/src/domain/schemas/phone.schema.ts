import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const phoneNumberSchema = z.object({
  phoneNumber: z.string().min(9).max(11),
});

export type PhoneNumberFormType = z.infer<typeof phoneNumberSchema>;

export const phoneNumberResolver = zodResolver(phoneNumberSchema);
