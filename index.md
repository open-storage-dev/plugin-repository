---
layout: default
title: OpenStorage Plugin Repository
---

# OpenStorage Plugin Repository

Welcome to the official OpenStorage plugin repository! This site hosts plugins for the OpenStorage project and provides an automatically generated plugin registry.

## 🔍 Browse Plugins

- **[View All Plugins (JSON)](/plugin-repository/plugins/all.json)** - Machine-readable plugin registry
- **Total Plugins**: {{ site.data.all.totalPlugins | default: "Loading..." }}

## 📚 Documentation

For detailed information about adding plugins, plugin format, and development, see our [README on GitHub](https://github.com/open-storage-dev/plugin-repository).

## 🚀 Add Your Plugin

1. **Fork** the [repository](https://github.com/open-storage-dev/plugin-repository)
2. **Create** your plugin in `/plugins/yourusername/pluginname/`
3. **Add** a `plugin.json` file with metadata
4. **Optionally** add an `icon.png` (64x64px recommended)
5. **Submit** a Pull Request

## 📡 API Endpoints

- `GET /plugin-repository/plugins/all.json` - All plugins registry
- `GET /plugin-repository/plugins/:username/:pluginname/plugin.json` - Individual plugin
- `GET /plugin-repository/plugins/:username/:pluginname/icon.png` - Plugin icon

## 📄 Plugin Format

```json
{
  "name": "My Plugin",
  "author": "username", 
  "version": "1.0.0",
  "description": "Brief description",
  "homepage": "https://example.com",
  "repository": "https://github.com/username/plugin",
  "license": "MIT",
  "keywords": ["storage", "backup"]
}
```

---

<small>Repository managed by the OpenStorage team. Last updated: {{ "now" | date: "%Y-%m-%d" }}</small>