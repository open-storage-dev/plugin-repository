import { type ExportedPlugin } from "../types";
import { BasePage } from "./base";


export function ListPage({ plugins }: { plugins: Record<string, ExportedPlugin> }) {
    return (
        <BasePage>
            <h1>List</h1>
        </BasePage>
    )
}
