# OpenStorage Plugin Repository

The official OpenStorage plugin repository. This repository hosts plugins for the OpenStorage project and automatically generates a searchable plugin registry.

## 📂 Repository Structure

```
/
├── plugins/                    # Plugin directory
│   └── :username/             # Username or organization
│       └── :pluginname/       # Plugin name
│           ├── plugin.json    # Plugin metadata (required)
│           └── icon.png       # Plugin icon (optional)
├── bin/                       # Build scripts
│   └── build.ts              # TypeScript build script
└── README.md                 # This file
```

## 🔧 How It Works

1. **Plugin Structure**: Each plugin lives in `/plugins/:username/:pluginname/` with a required `plugin.json` file
2. **Automatic Registry**: The build script scans all plugins and generates `/plugins/all.json`
3. **GitHub Pages**: The repository is configured to serve content via GitHub Pages
4. **Icon Support**: Optional `icon.png` files are automatically detected and linked

## 📝 Plugin Format

Each plugin must include a `plugin.json` file with the following structure:

```json
{
  "name": "My Awesome Plugin",
  "author": "username",
  "version": "1.0.0",
  "description": "A brief description of what this plugin does",
  "homepage": "https://example.com",
  "repository": "https://github.com/username/plugin-repo",
  "license": "MIT",
  "keywords": ["storage", "backup", "cloud"],
  "main": "index.js"
}
```

### Required Fields
- `name`: Display name of the plugin
- `author`: Plugin author
- `version`: Semantic version number
- `description`: Brief description of the plugin

### Optional Fields
- `homepage`: Plugin homepage URL
- `repository`: Source code repository URL
- `license`: Plugin license
- `keywords`: Array of keywords for discovery
- `main`: Main entry point file
- `icon`: Automatically set if `icon.png` exists

## 🚀 Adding Your Plugin

1. **Fork this repository**
2. **Create your plugin directory**: `/plugins/yourusername/pluginname/`
3. **Add your `plugin.json`** with required metadata
4. **Optionally add an `icon.png`** (recommended size: 64x64px)
5. **Submit a Pull Request**

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
npm install
```

### Build Plugin Registry
```bash
npm run build
```

This will:
1. Compile TypeScript to JavaScript
2. Scan all plugins in `/plugins/`
3. Generate `/plugins/all.json` registry

### Development Mode
```bash
npm run dev
```

Runs TypeScript compiler in watch mode.

## 📡 API

The generated registry is available at:
- **All Plugins**: `https://open-storage-dev.github.io/plugin-repository/plugins/all.json`
- **Individual Plugin**: `https://open-storage-dev.github.io/plugin-repository/plugins/:username/:pluginname/plugin.json`
- **Plugin Icon**: `https://open-storage-dev.github.io/plugin-repository/plugins/:username/:pluginname/icon.png`

## 📄 License

This repository is licensed under the Apache License 2.0. Individual plugins may have their own licenses.
