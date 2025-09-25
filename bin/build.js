#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAllJson = buildAllJson;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * Recursively find all plugin.json files in the plugins directory
 */
function findPluginFiles(pluginsDir) {
    const pluginFiles = [];
    if (!fs.existsSync(pluginsDir)) {
        console.log('Plugins directory does not exist:', pluginsDir);
        return pluginFiles;
    }
    const usernames = fs.readdirSync(pluginsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    for (const username of usernames) {
        const userDir = path.join(pluginsDir, username);
        const pluginNames = fs.readdirSync(userDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
        for (const pluginName of pluginNames) {
            const pluginJsonPath = path.join(userDir, pluginName, 'plugin.json');
            if (fs.existsSync(pluginJsonPath)) {
                pluginFiles.push(pluginJsonPath);
            }
        }
    }
    return pluginFiles;
}
/**
 * Parse a plugin.json file and return plugin entry with metadata
 */
function parsePlugin(pluginJsonPath) {
    try {
        const content = fs.readFileSync(pluginJsonPath, 'utf-8');
        const plugin = JSON.parse(content);
        const pathParts = pluginJsonPath.split(path.sep);
        const pluginName = pathParts[pathParts.length - 2];
        const username = pathParts[pathParts.length - 3];
        // Check for icon file
        const iconPath = path.join(path.dirname(pluginJsonPath), 'icon.png');
        const hasIcon = fs.existsSync(iconPath);
        return {
            username,
            pluginName,
            plugin: {
                ...plugin,
                // Ensure required fields
                name: plugin.name || pluginName,
                author: plugin.author || username,
                // Add icon reference if it exists
                ...(hasIcon && { icon: `plugins/${username}/${pluginName}/icon.png` })
            },
            ...(hasIcon && { iconPath })
        };
    }
    catch (error) {
        console.error(`Error parsing plugin file ${pluginJsonPath}:`, error);
        return null;
    }
}
/**
 * Build the all.json file containing all plugins
 */
function buildAllJson() {
    const pluginsDir = path.join(process.cwd(), 'plugins');
    const outputPath = path.join(pluginsDir, 'all.json');
    console.log('Building plugin registry...');
    console.log('Plugins directory:', pluginsDir);
    const pluginFiles = findPluginFiles(pluginsDir);
    console.log(`Found ${pluginFiles.length} plugin files`);
    const plugins = [];
    let validPlugins = 0;
    for (const pluginFile of pluginFiles) {
        console.log(`Processing: ${pluginFile}`);
        const pluginEntry = parsePlugin(pluginFile);
        if (pluginEntry) {
            plugins.push({
                id: `${pluginEntry.username}/${pluginEntry.pluginName}`,
                username: pluginEntry.username,
                pluginName: pluginEntry.pluginName,
                ...pluginEntry.plugin,
                // Add metadata
                path: `plugins/${pluginEntry.username}/${pluginEntry.pluginName}`,
                lastUpdated: new Date().toISOString()
            });
            validPlugins++;
        }
    }
    const registry = {
        version: '1.0.0',
        generatedAt: new Date().toISOString(),
        totalPlugins: validPlugins,
        plugins
    };
    // Ensure plugins directory exists
    fs.mkdirSync(pluginsDir, { recursive: true });
    // Write the registry file
    fs.writeFileSync(outputPath, JSON.stringify(registry, null, 2));
    console.log(`✅ Successfully built plugin registry with ${validPlugins} plugins`);
    console.log(`📄 Registry saved to: ${outputPath}`);
}
// Run the build if this script is executed directly
if (require.main === module) {
    buildAllJson();
}
