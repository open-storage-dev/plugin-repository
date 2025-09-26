import { type ExportedPlugin } from "../types";
import { BasePage } from "./base";


export function ListPage({ plugins }: { plugins: Record<string, ExportedPlugin> }) {
    return (
        <BasePage page="list">
            <h1 className="text-xl font-bold mb-8">List of all plugins</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(plugins).map(([key, plugin]) => (
                    <a 
                        key={key} 
                        className="border border-white/20 hover:border-white/50 p-4 border-dashed"
                        href={`/plugins/${plugin.author.id}/${plugin.id}`}
                    >
                        <h2 className="font-bold mb-1">
                            {plugin.name}
                        </h2>
                        <p className="text-sm font-bold mb-3">
                            By {plugin.author.name}
                        </p>
                        <p className="text-sm opacity-75">
                            {plugin.description}
                        </p>
                    </a>
                ))}
            </div>
        </BasePage>
    )
}
