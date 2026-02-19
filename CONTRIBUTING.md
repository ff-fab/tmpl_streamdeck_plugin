# Contributing to tmpl_streamdeck_plugin

## Branching Model (GitHub Flow)

1. **Branch from `main`** using descriptive prefixes: `feat/`, `fix/`, `docs/`,
   `chore/`, `refactor/`.
2. **Open a PR early** — keep changes small and focused.
3. **Squash-merge only** — keeps `main` history clean and conventional-commit friendly.
4. **Direct pushes to `main` are blocked** by branch protection.

## Commit Messages (Conventional Commits)

Every commit must follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

| Prefix      | SemVer effect | Example                                   |
| ----------- | ------------- | ----------------------------------------- |
| `feat:`     | MINOR bump    | `feat: add docs_style flat option`        |
| `fix:`      | PATCH bump    | `fix: correct jinja whitespace in config` |
| `feat!:`    | MAJOR bump    | `feat!: remove deprecated prompt`         |
| `docs:`     | no release    | `docs: update README scaffold section`    |
| `chore:`    | no release    | `chore: bump pre-commit hooks`            |
| `refactor:` | no release    | `refactor: simplify post-create script`   |
| `test:`     | no release    | `test: add copier dry-run validation`     |

`release-please` reads these prefixes to decide version bumps and generate changelogs.

## Release Process

Releases are fully automated via
[Release Please](https://github.com/googleapis/release-please):

1. Push/merge to `main` with conventional commits.
2. Release Please opens (or updates) a release PR with changelog and version bump.
3. Review and merge the release PR.
4. A GitHub Release and SemVer tag (`vX.Y.Z`) are created automatically.

Copier consumers pin a version with:

```bash
copier copy --vcs-ref v0.2.0 --trust gh:ff-fab/tmpl_streamdeck_plugin <target>
```

## Quality Gates

Before opening a PR, ensure:

- `pre-commit run --all-files` passes (formatting, spelling, YAML/TOML syntax)
- Template dry-run succeeds:
  ```bash
  copier copy --trust --defaults \
    -d project_name="Test" -d description="test" \
    . /tmp/test-scaffold
  ```

CI runs these checks automatically on every PR.
