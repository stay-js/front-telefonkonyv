import { z } from 'zod';

export const contactSchema = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  birth: z.string(),
  company: z.string(),
  role: z.string(),
  address: z.string(),
  notes: z.string(),
});

export type Contact = z.infer<typeof contactSchema>;
