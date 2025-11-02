import z from "zod";

export const emailSchema = z
  .string()
  .trim()
  .email("Invalid email address")
  .min(3);

  export const passwordSchema = z.string().trim().min(3)
  export const nameSchema = z.string().trim().min(3)

  export const registerSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    avatar: z.string().optional()
  })

  export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema
  })

  export type RegisterSchemaType = z.infer<typeof registerSchema>
  export type LoginSchemaType = z.infer<typeof loginSchema>