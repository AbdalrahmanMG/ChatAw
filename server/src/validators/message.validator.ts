import z from "zod";


export const sendMessageSchema = z.object({
  chatId: z.string().trim().min(3),
  content: z.string().trim().optional(),
  image: z.string().trim().optional(),
  replyTo: z.string().trim().optional()
}).refine(data => data.content || data.image , {
  message: "Either content or image must be provided",
  path: ["content"]
})