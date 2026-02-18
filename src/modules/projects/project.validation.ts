import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
});

export const assignSolverSchema = z.object({
  solverId: z.string().min(10),
});
