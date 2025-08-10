---
inclusion: always
---

# Git Commit Rule for Task Completion

## Automatic Git Operations

Before starting and after completing any task from a spec, you MUST perform the following git operations:

### Before Starting Task Work

1. **Create and switch to new branch**: `git checkout -b task-[task-number]-[brief-description]`
   - Example: `git checkout -b task-2-astro-setup`

### After Completing Task Work

1. **Stage all changes**: `git add .`
2. **Commit with signoff and conventional commit message**: `git commit -s -m "[type]([scope]): [description]"`
3. **Push branch to remote**: `git push -u origin task-[task-number]-[brief-description]`
4. **Create Pull Request**: Create PR that references and closes the associated GitHub issue

**Important**: The `-s` flag is REQUIRED for all commits to add a "Signed-off-by" line to the commit message.

## Commit Message Format

Use conventional commit format for all commit messages:

- **Format**: `[type]([scope]): [description]`
- **Type**: Use `feat` for new features, `fix` for bug fixes, `refactor` for code refactoring, `test` for adding tests, `docs` for documentation, `chore` for maintenance tasks
- **Scope**: Use the task number (e.g., `task-2`, `task-3-1`)
- **Description**: Brief description of what was implemented (lowercase, no period)

### Examples

### Branch Naming Examples

- `task-2-astro-setup`
- `task-3-content-collections`
- `task-4-hexo-migration`
- `task-5-blog-pages`

### Commit Message Examples

All commits will include a "Signed-off-by" line when using the `-s` flag:

- `feat(task-2): initialize astro project with astrowind template`
- `feat(task-3): configure project structure and content collections`
- `feat(task-4): create migration script for hexo content`
- `feat(task-5): implement core blog pages`

Each commit message will automatically include:

```
Signed-off-by: [Your Name] <[your-email]>
```

### Pull Request Creation

After pushing the branch, create a Pull Request with:

- **Title**: Same as the commit message
- **Description**: Reference the GitHub issue with "Closes #[issue-number]"
- **Base branch**: `main` (or default branch)
- **Head branch**: `task-[task-number]-[brief-description]`

## When to Apply

This rule applies to:

- **Before starting**: Any task from `.kiro/specs/*/tasks.md` files (create branch)
- **After completing**: Any task completion (commit, push, create PR)
- **Before updating**: Task status to "completed"
- **Before informing**: User that the task is finished

## Error Handling

If git operations fail:

- Inform the user about the git error
- Provide the specific error message
- Continue with task completion notification
- Do not block task completion due to git issues

## Repository Setup

Ensure the repository has:

- A remote origin configured
- Proper authentication for pushing
- The current branch is tracking a remote branch

This ensures all progress is automatically saved and backed up to the remote repository.
