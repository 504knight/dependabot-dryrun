# Dependabot demo

> [!WARNING]
> **Training repo only. Never deploy anything from it.** This repo pins dependency versions with known vulnerabilities on purpose so Dependabot has real problems to find and fix.

This is the hands-on repo for an internal walkthrough of GitHub Dependabot: alerts, security updates, version updates with `dependabot.yml`, and Dependabot secrets for private registries. It mirrors the shape of a typical TypeScript product repo, but it contains no real application code.

## Get your own copy

1. Click **Use this template** → **Create a new repository**.
2. Choose **your personal account** as the owner.
3. Check **Include all branches**. You need the checkpoint branches below.
4. Create the repository.

Then turn on Dependabot in **your copy**: **Settings** → **Advanced Security** (under "Security and quality" in the sidebar) → **Dependabot alerts** → **Enable**. Leave the other Dependabot settings alone until the session gets to them.

## What's in here

A Yarn 4 workspaces monorepo with a single root `yarn.lock`:

| Path                       | What it is                                                                                                    |
| -------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `/` (root package)         | AWS CDK infrastructure (`aws-cdk-lib`, `constructs`) and shared tooling: TypeScript, ESLint, Prettier, Vitest |
| `infra/`                   | A tiny CDK stack (one private S3 bucket) and its test. Synth only.                                            |
| `portal/`                  | A placeholder Next.js app: React 19, MUI with Emotion, AWS SDK v3, knex/mysql2, zod, luxon                    |
| `portal/Dockerfile`        | Multi-stage Node image (build from the repo root)                                                             |
| `.github/workflows/ci.yml` | CI: format, lint, typecheck, test and CDK synth                                                               |
| `.github/actions/setup/`   | Local composite action: Node, Corepack and `yarn install --immutable`                                         |

### The intentionally vulnerable pins

| Dependency                  | Pinned to | Why it's here                                                  |
| --------------------------- | --------- | -------------------------------------------------------------- |
| `mysql2`                    | 3.9.3     | Critical alerts; one security update clears several at once    |
| `knex`                      | 2.3.0     | SQL injection, single clean fix                                |
| `luxon`                     | 3.2.0     | ReDoS, small patch bump                                        |
| `zod`                       | 3.22.2    | One alert fixed by a patch, another that needs a major upgrade |
| `@aws-sdk/client-s3`        | 3.840.0   | Transitive alerts (fast-xml-parser) that need a parent upgrade |
| `actions/download-artifact` | v4.1.2    | An alert on a GitHub Actions dependency                        |

Other dependencies are deliberately a few versions behind (but not vulnerable) so version updates have something to do.

## Checkpoints

Fell behind? Check out the branch for the section you're on. Each one is the known-good state at the **end** of that section.

| Section                              | Branch                             | What it adds                                                                                                                                                                         |
| ------------------------------------ | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Start (alerts)                       | `main`                             | The vulnerable starting point. No `dependabot.yml`.                                                                                                                                  |
| Security updates                     | `checkpoint/03-security-updates`   | The fixed versions from merging Dependabot's security PRs (mysql2, knex, luxon, zod 3.22.3, download-artifact). The alerts that need a major or parent upgrade stay open on purpose. |
| Version updates and `dependabot.yml` | `checkpoint/04-version-updates`    | `.github/dependabot.yml` with schedule, cooldown, groups, ignore rules and a security-patches group, for npm, GitHub Actions and Docker.                                             |
| Dependabot secrets                   | `checkpoint/05-dependabot-secrets` | A private registry in `dependabot.yml` and `.yarnrc.yml`, and a CI job that needs a secret.                                                                                          |

> [!NOTE]
> `checkpoint/05-dependabot-secrets` expects two secrets in your copy, both under **Settings** → **Secrets and variables**. Any placeholder value works for the demo.
>
> - `INTEGRATION_API_TOKEN`: add it under **Actions** _and_ under **Dependabot**.
> - `DEPENDABOT_PACKAGES_TOKEN`: add it under **Dependabot**.

To reset your copy's `main` to a checkpoint:

```sh
git fetch origin
git checkout main
git reset --hard origin/checkpoint/04-version-updates
git push --force-with-lease origin main
```

## Running it locally (optional)

You don't need to run anything locally for the session. If you want to:

```sh
corepack enable
yarn install
yarn lint && yarn typecheck && yarn test && yarn synth
yarn workspace portal dev
```

Node 22 is expected (see `.nvmrc`). If Corepack can't download Yarn on your network, set `COREPACK_NPM_REGISTRY=https://registry.npmjs.org` and try again.
