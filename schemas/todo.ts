import { z } from "zod";

export const TodoSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().max(500).optional(),
  completed: z.boolean().optional(),
});

export type TodoFormValues = z.infer<typeof TodoSchema>;