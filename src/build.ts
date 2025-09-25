#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';

interface Plugin {
  name: string;
  author: string;
  version: string;
  description: string;
  homepage?: string;
  repository?: string;
  license?: string;
  keywords?: string[];
  icon?: string;
  main?: string;
  [key: string]: any;
}

interface PluginEntry {
  username: string;
  pluginName: string;
  plugin: Plugin;
  iconPath?: string;
}

/**
 * Recursively find all plugin.json files in the plugins directory
 */
function findPluginFiles(pluginsDir: string): string[] {
  const pluginFiles: string[] = [];
  
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
function parsePlugin(pluginJsonPath: string): PluginEntry | null {
  try {
    const content = fs.readFileSync(pluginJsonPath, 'utf-8');
    const plugin: Plugin = JSON.parse(content);
    
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
  } catch (error) {
    console.error(`Error parsing plugin file ${pluginJsonPath}:`, error);
    return null;
  }
}

/**
 * Build the all.json file containing all plugins
 */
function buildAllJson(): void {
  const pluginsDir = path.join(process.cwd(), 'plugins');
  const outputPath = path.join(pluginsDir, 'all.json');
  
  console.log('Building plugin registry...');
  console.log('Plugins directory:', pluginsDir);
  
  const pluginFiles = findPluginFiles(pluginsDir);
  console.log(`Found ${pluginFiles.length} plugin files`);
  
  const plugins: any[] = [];
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

export { buildAllJson };