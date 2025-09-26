import { watch } from "fs";
import { resolve } from "path";

let counter = 0;

const rebuild = async () => {
    try {
        console.log(`Rebuilding...`);

        const { build } = await import(`./build.tsx`);

        await build();

        for (const key of Object.keys(require.cache)) {
            if (key.startsWith(__dirname)) {
                delete require.cache[key];
            }
        }

        console.log(`Built successfully ✅`);
    } catch (error) {
        console.error(`Failed to build`, error);
    }
};

const pluginWatcher = watch(resolve(__dirname, "../plugins"), rebuild);
const htmlWatcher = watch(resolve(__dirname, "../builder/pages"), rebuild);

process.on("SIGINT", () => {
    pluginWatcher.close();
    htmlWatcher.close();
    
    process.exit(0);
});

await rebuild();