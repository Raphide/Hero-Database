import * as z from "zod";

export const schema = z.object({
  id: z.number(),
});

export type SelectFormData = z.infer<typeof schema>;