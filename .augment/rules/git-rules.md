---
type: "manual"
---

# Git Operations Rules

## Shell Environment
- **Current Shell**: PowerShell (default on Windows)
- **Alternative**: Git Bash (available and preferred for complex git operations)

## PowerShell Limitations

### ❌ Does NOT Work in PowerShell:
1. **Command chaining with `&&`**
   ```powershell
   # ❌ WRONG - PowerShell doesn't support &&
   git add . && git commit -m "message" && git push
   ```

2. **Single quotes for commit messages with special characters**
   ```powershell
   # ❌ May cause issues with special characters
   git commit -m 'Fix: user's profile'
   ```

3. **Bash-style command substitution**
   ```bash
   # ❌ WRONG in PowerShell
   git commit -m "$(date)"
   ```

### ✅ DOES Work in PowerShell:
1. **Separate commands (one per line)**
   ```powershell
   # ✅ CORRECT
   git add .
   git commit -m "message"
   git push
   ```

2. **Double quotes for commit messages**
   ```powershell
   # ✅ CORRECT
   git commit -m "Update user profile feature"
   ```

3. **PowerShell-specific chaining with `;`**
   ```powershell
   # ✅ CORRECT (but runs all commands regardless of success)
   git add . ; git commit -m "message" ; git push
   ```

## Git Bash (Preferred for Git Operations)

### ✅ Fully Supported:
1. **Command chaining with `&&`**
   ```bash
   # ✅ CORRECT - stops on first error
   git add . && git commit -m "message" && git push
   ```

2. **Both single and double quotes**
   ```bash
   # ✅ Both work
   git commit -m "message"
   git commit -m 'message'
   ```

3. **All standard bash features**
   ```bash
   # ✅ All bash syntax works
   git commit -m "$(date): Update"
   ```

## Best Practices

### For Simple Operations (PowerShell is OK):
- Single git commands
- Basic add/commit/push workflows
- Checking status, logs, etc.

### For Complex Operations (Use Git Bash):
- Multiple chained commands
- Commands with complex quoting
- Scripts with conditional logic
- Operations requiring bash features

## Recommended Approach

**When using `launch-process` tool:**

1. **For PowerShell** (simple operations):
   ```typescript
   launch-process({
     command: "git add .",
     wait: true,
     cwd: "C:/path/to/repo"
   })
   // Then separate commands for commit and push
   ```

2. **For Git Bash** (complex operations):
   ```typescript
   launch-process({
     command: "git add . && git commit -m \"message\" && git push",
     wait: true,
     cwd: "C:/path/to/repo"
   })
   ```

## Common Git Workflows

### Commit and Push (PowerShell):
```powershell
git add .
git commit -m "Commit message"
git push
```

### Commit and Push (Git Bash):
```bash
git add . && git commit -m "Commit message" && git push
```

### Check Status:
```powershell
# Works in both
git status
```

### View Recent Commits:
```powershell
# Works in both
git log --oneline -5
```

## Notes
- Always use double quotes for commit messages in PowerShell
- Git Bash is more reliable for complex operations
- When in doubt, use Git Bash for git operations
- The `&&` operator in bash ensures commands only run if previous command succeeded
- The `;` operator in PowerShell runs all commands regardless of success/failure

## ⚠️ PowerShell File Encoding (Mojibake Prevention)

PowerShell's `Set-Content`, `Copy-Item`, and here-strings (`@"..."@`) can corrupt non-ASCII characters (e.g., `─`, `→`, `…`, em-dashes) by re-encoding UTF-8 through Windows-1252, producing mojibake like `â"€â"€â"€`.

### Rules for writing files with non-ASCII content outside the workspace:
1. **NEVER use PowerShell `Set-Content` or `Copy-Item`** for files containing Unicode beyond basic ASCII
2. **Use Node.js** with explicit `'utf8'` encoding instead:
   ```javascript
   // Write a file
   fs.writeFileSync(path, content, 'utf8');
   // Copy a file preserving encoding
   fs.writeFileSync(dest, fs.readFileSync(src, 'utf8'), 'utf8');
   ```
3. **For long multiline content**, write a temporary `.mjs` script in the workspace (where `save-file` works), run it with `node`, then delete it — rather than passing large strings through PowerShell
4. **PSReadLine crashes** on large multiline inputs (here-strings > ~30 lines) — another reason to use script files instead

