---
inclusion: always
---

# GitHub Issue Creation Rule for Task Execution

## Automatic GitHub Issue Creation

Before beginning work on any task from a spec (except task #1 which creates the GitHub project), you MUST create a GitHub issue to track the work.

## Issue Creation Process

1. **Create GitHub issue** using the GitHub CLI or API
2. **Set issue title** to match the task description
3. **Add issue body** with task details and requirements
4. **Label the issue** appropriately (e.g., `enhancement`, `task`, `spec`)
5. **Reference the issue** in all related commits

## Issue Title Format

Use the task description as the issue title:

- `Set up Git repository and GitHub project` (skip - this is task #1)
- `Initialize Astro project with AstroWind template`
- `Configure project structure and content collections`
- `Create migration script for Hexo content`

## Issue Body Template

```markdown
## Task Description
[Brief description of the task]

## Requirements
[List the requirements this task addresses]

## Acceptance Criteria
- [ ] [Specific deliverable 1]
- [ ] [Specific deliverable 2]
- [ ] [Specific deliverable 3]

## Related Spec
- Spec: [spec-name]
- Task: [task-number]
```

## Commit Message Integration

When committing work for a task, reference the issue number:

```
feat(task-2): initialize astro project with astrowind template

Closes #[issue-number]

Signed-off-by: [Your Name] <[your-email]>
```

## Exception

**Task #1 Exception**: Skip issue creation for the first task that sets up the Git repository and GitHub project, as the repository needs to exist before issues can be created.

## Error Handling

If GitHub issue creation fails:

- Log the error and continue with task execution
- Inform the user about the issue creation failure
- Proceed with the task but note the missing issue tracking

## Benefits

This process provides:

- Clear tracking of work progress
- Issue-based project management
- Linkage between commits and planned work
- Historical record of task completion
