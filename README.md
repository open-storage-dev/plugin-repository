# plugin-repository
The official OpenStorage plugin repository. Add your own plugin by submitting a PR!

## How to add a plugin

1. Fork this repository
2. Create new directories in the `plugins` directory with your GitHub username and plugin name (e.g. `plugins/<your-username>/<your-plugin-name>`)
3. Create a `plugin.json` file in the `plugins/<your-username>/<your-plugin-name>` directory
4. (Optional) Create an `icon.png` or `icon.svg` file in the `plugins/<your-username>/<your-plugin-name>` directory
5. Submit a PR

**Make sure to use your GitHub username, otherwise you won't be able to update the plugin later, as we cannot verify the ownership.**

### Example `plugin.json`

```json
{
    "name": "My Plugin Name",
    "description": "UI plugin",
    "author": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "url": "https://john-doe.com"
    },
    "repository": "https://github.com/john-doe/my-os-plugin"
}
```

## Building the plugin repository

First, install the dependencies:

```bash
bun install
```

Then, setup a Git worktree that we will write build results to:

```bash
git worktree add docs
```

Then, build the plugin repository:

```bash
bun run build
```

You can also watch for changes and rebuild the plugin repository automatically:

```bash
bun run watch
```