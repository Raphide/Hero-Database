import * as z from "zod"

export const schema = z.object({
    name: z.string().min(2, "must contain at least 2 characters"),
    combat: z.number().max(100),
    durability: z.number().max(100),
    intelligence: z.number().max(100),
    power: z.number().max(100),
    speed: z.number().max(100),
    strength: z.number().max(100),
    sm: z.string()
})

export type HeroFormData = z.infer<typeof schema>;