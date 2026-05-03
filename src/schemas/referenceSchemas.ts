import { z } from "zod";

const statusEnum = z.enum(["pending", "reading", "completed", "review"]);

export const createReferenceSchema = z.object({
  title: z.string().min(1, "O título é obrigatório."),
  description: z.string().optional().nullable(),
  author: z.string().optional().nullable(),
  url: z.string().refine((val) => {
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  }, "A URL informada é inválida."),
  category: z.string().min(1, "A categoria é obrigatória."),
  status: statusEnum.default("pending"),
  tags: z.array(z.string()).optional().nullable(),
  rating: z.number().int().min(0).max(5).optional().nullable(),
});

export const updateReferenceSchema = z.object({
  title: z.string().min(1, "O título não pode ser vazio.").optional(),
  description: z.string().optional().nullable(),
  author: z.string().optional().nullable(),
  url: z
    .string()
    .refine((val) => {
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    }, "A URL informada é inválida.")
    .optional(),
  category: z.string().min(1, "A categoria não pode ser vazia.").optional(),
  status: statusEnum.optional(),
  tags: z.array(z.string()).optional().nullable(),
  rating: z.number().int().min(0).max(5).optional().nullable(),
});

export const updateRatingSchema = z.object({
  rating: z
    .number()
    .int("A nota deve ser um número inteiro.")
    .min(0, "A nota mínima é 0.")
    .max(5, "A nota máxima é 5."),
});

export const referenceIdSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .positive("O id deve ser um número inteiro positivo."),
});

export const referenceFiltersSchema = z.object({
  category: z.string().optional(),
  status: statusEnum.optional(),
  tag: z.string().optional(),
});

export type CreateReferenceSchema = z.infer<typeof createReferenceSchema>;
export type UpdateReferenceSchema = z.infer<typeof updateReferenceSchema>;
export type UpdateRatingSchema = z.infer<typeof updateRatingSchema>;
export type ReferenceFiltersSchema = z.infer<typeof referenceFiltersSchema>;
