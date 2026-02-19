# tmpl_streamdeck_plugin

Copier template repository for scaffolding Stream Deck plugin projects with
DevContainer-first tooling, strict quality gates, CI workflows, and MkDocs documentation.

The actual generated project content lives under `template/` and is selected via
`_subdirectory: template` in `copier.yml`.

## Template at a glance

- **Template engine:** Copier (`_min_copier_version: 9.11.3`)
- **Generated stack:** TODO
- **Workspace style:** DevContainer + VS Code defaults + Taskfile commands
- **Optional toggles:** MIT license file, Codecov config, Robot Framework CI/tests

## Copier answers reference (all prompts)

All user-facing answers are defined in `copier.yml`.

| Answer key           | Type   | Default                                      | Choices                                                    | Behavior in scaffold                                                                                 |
| -------------------- | ------ | -------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `project_name`       | `str`  | _none_                                       | free text                                                  | Sets display/project names (README, MkDocs, workflow image names, package metadata).                 |
| `repo_name`          | `str`  | `project_name \| lower \| replace(' ', '-')` | free text                                                  | Used for GitHub URLs and repository naming in generated files.                                       |
| `gh_token`           | `str`  | `""`                                         | free text                                                  | Optional local GitHub authentication token                                                           |
| `context7_api_key`   | `str`  | `""`                                         | free text                                                  | Optional local Context7 API key                                                                      |
| `description`        | `str`  | _none_                                       | free text                                                  | Populates generated README and package metadata description.                                         |
| `license`            | `str`  | `MIT`                                        | `MIT`, `None`                                              | Controls whether `LICENSE` is rendered and influences `codecov` question visibility/default.         |
| `codecov`            | `bool` | `license != 'None'`                          | `true`, `false`                                            | Prepare for codecov service? Prompt only appears when license is not `None`.                         |
| `coverage_threshold` | `int`  | `80`                                         | any integer (0 to disable)                                 | Minimum line-coverage percentage enforced by the test summary script (`--fail-under` default).       |
| `robot_framework`    | `bool` | `false`                                      | `true`, `false`                                            | Enables Robot Framework-specific test guidance, result handling, and CI integration-test job blocks. |
| `docs_style`         | `str`  | `dita`                                       | `diataxis`, `dita`, `user-journey`, `architecture`, `flat` | Controls explanatory comments/style guidance in generated MkDocs config and docs instructions.       |
| `release_please`     | `bool` | `true`                                       | `true`, `false`                                            | Adds a Release Please workflow for automated changelog, version bumps, and SemVer tagging.           |
| `init_git_on_copy`   | `bool` | `true`                                       | `true`, `false`                                            | Enables scaffold-time `_tasks` git initialization (`git init -b main`) during `copier copy`.         |

### Internal Copier behavior

- `{{ _copier_conf.answers_file }}.jinja` writes all resolved answers into the generated
  answers file (`{{ _copier_answers|to_nice_yaml }}`).
- The `_tasks` section in `copier.yml` runs only when trusted (`--trust`/`--UNSAFE` or
  trusted template source) and only for copy operations.

## Conditional files and features

- `LICENSE` is rendered only when `license == "MIT"`.
- `codecov.yml` is rendered only when `codecov == true`.
- Robot Framework-specific behavior appears when `robot_framework == true`, including:
  - additional CI integration-test job
  - Robot-aware test summary script behavior
  - Robot-aware testing instructions in `.github/instructions`
- `release-please.yml` workflow is rendered only when `release_please == true`.

## Usage notes

### Scaffold a project

```bash
copier copy --trust . <target-directory>
```

The trust flag is required for `_tasks` execution (including `init_git_on_copy`).

### Update from template changes

```bash
copier update --trust
```

## Release process

This repository uses [Release Please](https://github.com/googleapis/release-please) with
GitHub Flow:

1. Branch from `main` (`feat/`, `fix/`, `chore/`, etc.).
2. Use [Conventional Commits](https://www.conventionalcommits.org/) in commit messages.
3. Open a PR — CI runs lint and template validation.
4. Squash-merge into `main`.
5. Release Please opens/updates a release PR with changelog and version bump.
6. Merge the release PR to create a GitHub Release and SemVer tag (`vX.Y.Z`).

Copier consumers pin a specific version:

```bash
copier copy --vcs-ref v0.2.0 --trust gh:ff-fab/tmpl_python_project_kickstart <target>
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for full commit and release conventions.

## Maintainer guidance

- Keep user prompts and defaults in `copier.yml` authoritative.
- Keep generated-user docs in `template/README.md.jinja`.
- Keep maintainer/template behavior docs in this repository `README.md`.
- Use conventional commits — release-please reads them for versioning.
