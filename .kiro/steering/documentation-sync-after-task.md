# Documentation Sync Rule for Task Completion

## Mandatory Documentation Review

After completing any task from a spec, you MUST review and update the project documentation to ensure it stays synchronized with the current state of the project.

## Documentation Files to Review

The following files must be reviewed and updated as needed:

1. **README.md** - Project overview, installation, and usage instructions
2. **DEVELOPER.md** - Development setup, architecture, and contribution guidelines

## Review and Update Process

1. **Read current documentation**: Review the existing content in README.md and DEVELOPER.md
2. **Identify gaps**: Compare documentation with newly implemented functionality
3. **Update content**: Add or modify sections to reflect:
   - New features or components implemented
   - Updated dependencies or requirements
   - Changes to project structure
   - New testing procedures
   - Updated build or deployment steps
4. **Maintain consistency**: Ensure documentation style and format remain consistent

## When to Apply

This rule applies to:

- Any task completion from `.kiro/specs/*/tasks.md` files
- After updating task status to "completed"
- Before performing git commit operations
- After implementing any significant code changes

## Documentation Update Guidelines

### README.md Updates

- Update feature descriptions if new functionality is added
- Modify installation instructions if dependencies change
- Update usage examples if API changes
- Refresh project status or roadmap sections

### DEVELOPER.md Updates

- Document new architecture components
- Update development setup if dependencies change
- Add new testing procedures or commands
- Document new build processes or tools
- Update code organization or structure information

## Integration with Other Rules

This rule should be executed AFTER the test validation rule and BEFORE the git commit rule:

1. Run tests and ensure they pass
2. Mark task as completed
3. **Review and update documentation**
4. Perform git operations (add, commit, push)

This ensures that documentation changes are included in the same commit as the implementation changes.

## Exception Cases

Documentation updates may be skipped only when:

- The task involves only internal refactoring with no external API changes
- The task is a pure bug fix with no new functionality
- The changes are covered by existing documentation

In all other cases, documentation should be reviewed and updated as appropriate.
