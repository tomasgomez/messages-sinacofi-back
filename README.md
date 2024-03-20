## Getting Started

Project developed with Next and applying Clean Architecture

## Steps

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Git

```bash
git checkout <feature-branch>
git pull
git checkout <release-branch>
git pull
git merge --no-ff <feature-branch>
git push
git tag -a branch-<feature-branch> -m "Merge <feature-branch> into <release-branch>"
git push --tags
git branch -d <feature-branch>
git push origin :<feature-branch>
```
