import { writeFile } from "fs/promises";
import { mkdir } from "fs/promises";
import { copyFile } from "fs/promises";
import { exists, readdir, readFile } from "fs/promises";
import { join, resolve } from "path";
import z from "zod";

const baseUrl = "https://plugins.open-storage.dev";

const pluginSchema = z.object({
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

const safeNameSchema = z.string().min(1).max(255).regex(/^[a-zA-Z0-9_-]+$/);

type InputPlugin = z.infer<typeof pluginSchema>;
type ExportedPlugin = InputPlugin & {
    icon: string | null;
};

const filterFiles = (names: string[]) => names.filter(name => !name.includes("."));

const pluginRoot = resolve(__dirname, "../plugins");

const plugins = await readdir(pluginRoot).then(filterFiles);

let allPlugins: Record<string, ExportedPlugin> = {};

for (const username of plugins) {
    const userPlugins = await readdir(join(pluginRoot, username)).then(filterFiles);

    let exportedUserPlugins: Record<string, ExportedPlugin> = {};

    for (const pluginname of userPlugins) {
        const pluginPath = join(pluginRoot, username, pluginname, "plugin.json");
        const pluginJson = await readFile(pluginPath, "utf8");
        
        const json = JSON.parse(pluginJson);
        const plugin = pluginSchema.parse(json);

        const hasPngIcon = await exists(join(pluginRoot, username, pluginname, "icon.png"));
        const hasSvgIcon = await exists(join(pluginRoot, username, pluginname, "icon.svg"));

        if (!safeNameSchema.safeParse(username).success) {
            throw new Error(`Usernames can only contain letters, numbers, underscores and hyphens, ${username} is invalid`);
        }

        if (!safeNameSchema.safeParse(pluginname).success) {
            throw new Error(`Plugin names can only contain letters, numbers, underscores and hyphens, ${pluginname} is invalid`);
        }

        let icon = null;

        if (hasPngIcon) {
            icon = `${baseUrl}/plugins/${username}/${pluginname}/icon.png`;
        } else if (hasSvgIcon) {
            icon = `${baseUrl}/plugins/${username}/${pluginname}/icon.svg`;
        }

        exportedUserPlugins[`${plugin.author.id}/${plugin.name}`] = {
            ...plugin,
            name: `${username}/${pluginname}`,
            author: {
                ...plugin.author,
                id: username,
            },
            icon
        };

        // Make sure the directory exists
        await mkdir(join(__dirname, "../docs/plugins", username, pluginname), { recursive: true });

        // Write the modified plugin to the directory
        await writeFile(join(__dirname, "../docs/plugins", username, pluginname, "plugin.json"), JSON.stringify(exportedUserPlugins[`${plugin.author.id}/${plugin.name}`], null, 2));

        // Copy the icon to the directory (if any)
        if (hasPngIcon) {
            await copyFile(join(pluginRoot, username, pluginname, "icon.png"), join(__dirname, "../docs/plugins", username, pluginname, "icon.png"));
        } else if (hasSvgIcon) {
            await copyFile(join(pluginRoot, username, pluginname, "icon.svg"), join(__dirname, "../docs/plugins", username, pluginname, "icon.svg"));
        }
    }

    await writeFile(join(__dirname, `../docs/plugins/${username}/all.json`), JSON.stringify(exportedUserPlugins, null, 2));

    allPlugins = { ...allPlugins, ...exportedUserPlugins };
}

// We want to sort the keys alphabetically
const sortedPlugins = Object.fromEntries(
    Object.entries(allPlugins).sort(([a], [b]) => a.localeCompare(b))
);

await writeFile(join(__dirname, "../docs/plugins/all.json"), JSON.stringify(sortedPlugins, null, 2));