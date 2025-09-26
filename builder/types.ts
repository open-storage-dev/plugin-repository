import z from "zod";

export const pluginSchema = z.object({
    name: z.string(),
    description: z.string().max(500),
    author: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().optional(),
        url: z.string().optional(),
    }),
    repository: z.url({
        protocol: /https/,
        hostname: /github\.com/,
    })
});

export type InputPlugin = z.infer<typeof pluginSchema>;
export type ExportedPlugin = InputPlugin & {
    id: string;
    icon: string | null;
};