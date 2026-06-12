---
name: mac-system-manager
description: macOS system management guide for Mac Mini M4 (Apple Silicon, arm64). Use when: installing software on the Mac Mini M4, setting up development tools (Homebrew, Python, Node.js, Git), configuring Time Machine backups, troubleshooting Mac-specific issues, managing app permissions, or handling Apple Silicon compatibility. Covers M4-specific considerations that differ from Intel Macs and standard macOS best practices for a beginner.
---

# Mac System Manager

## Mac Mini M4 Key Facts

- **Chip:** Apple M4 (Apple Silicon, arm64 architecture)
- **OS:** macOS Sequoia or later
- **Important:** M4 uses ARM architecture — some older software only works on Intel (x86). Check compatibility before installing.

## Package Manager: Homebrew

Homebrew is the standard way to install developer tools on Mac. Think of it as the App Store for Terminal programs.

**Install Homebrew:**
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

After install, follow the printed instructions to add it to PATH. On Apple Silicon:
```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

**Common Homebrew commands:**
```bash
brew install <package>    # Install something
brew update               # Update Homebrew itself
brew upgrade              # Upgrade all installed packages
brew list                 # See what's installed
brew doctor               # Check for problems
```

## Essential Dev Tools

Install in this order:
```bash
brew install git python3 node
```

Verify each:
```bash
git --version      # Should show 2.x
python3 --version  # Should show 3.10+
node --version     # Should show 18+
```

## Apple Silicon Compatibility

**Check if a program supports M4 (Apple Silicon):**
- Look for "Apple Silicon," "M1/M2/M3/M4," or "arm64" on the download page
- "Universal" means it works on both Intel and Apple Silicon
- "Intel only" or "x86_64" may be slow or not work at all (runs through Rosetta 2)

**Rosetta 2** (Apple's compatibility layer for Intel apps on M4):
```bash
softwareupdate --install-rosetta
```
This lets Intel-only apps run on your M4, but native Apple Silicon apps are faster.

## Time Machine Backup

**Setup (requires external drive, 1TB+ recommended):**
1. Plug in external drive
2. System Settings → General → Time Machine
3. Click "Add Backup Disk" → select your drive
4. Turn on Time Machine
5. First backup takes hours — let it run overnight

**Check backup status:**
```bash
tmutil status
```

**Restore a file:** Right-click the file in Finder → "Restore from Time Machine"

**Restore entire Mac:** Restart → hold down power button → select "Options" → "Restore from Time Machine"

## Permissions Management

When an app asks for permission:
- **Files and Folders:** Grant only to folders it needs (not "Full Disk Access" unless necessary)
- **Network:** Grant if the app legitimately needs internet
- **Automation:** Be cautious — this lets apps control other apps
- **Full Disk Access:** Only grant to trusted apps you fully understand

Check/revoke permissions: System Settings → Privacy & Security

## Common Issues on M4

**"App can't be opened because developer cannot be verified":**
```bash
xattr -d com.apple.quarantine /path/to/app
```
Or: System Settings → Privacy & Security → scroll down → "Open Anyway"

**Python version conflicts:**
```bash
which python3           # Check which python3 is active
python3 --version       # Verify version
```

**Homebrew path issues:**
On M4, Homebrew installs to `/opt/homebrew/` (not `/usr/local/` like Intel Macs).

## Checking System Info

```bash
system_profiler SPHardwareDataType   # Full hardware info
uname -m                              # Should show: arm64
sw_vers                               # macOS version
df -h                                 # Disk space
```
