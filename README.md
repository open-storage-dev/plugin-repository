# plugin-repository
The official OpenStorage plugin repository. Add your own plugin by submitting a PR!

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