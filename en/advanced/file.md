# File

The file module provides a powerful graphical file manager. The design philosophy is to restore the Windows Explorer operation experience as much as possible, supporting right-click menus, drag-and-drop upload, keyboard shortcuts, and other features.

## File Manager

![File Manager](/images/file/file-list.png)

## Core Features

### Windows-like Operation Experience

- **Right-click Menu**: Right-click on files or directories to pop up an action menu
- **Drag-and-drop Upload**: Directly drag local files to the browser window to upload
- **Multi-select Operations**: Support Ctrl+click for multi-select, Shift+click for range selection
- **Keyboard Shortcuts**: Common operations have corresponding keyboard shortcuts

### Keyboard Shortcuts

| Shortcut | Function   |
|----------|------------|
| `Ctrl+C` | Copy       |
| `Ctrl+X` | Cut        |
| `Ctrl+V` | Paste      |
| `Delete` | Delete     |
| `F2`     | Rename     |
| `Ctrl+A` | Select All |

## Navigation

### Path Navigation

The top displays breadcrumb navigation of the current path. Click to quickly jump to any parent directory.

### Quick Buttons

- **Back**: Return to the previous visited directory
- **Forward**: Go to the next directory
- **Parent Directory**: Return to parent directory
- **Refresh**: Refresh current directory
- **Home Directory**: Return to default directory

## File List

The file list displays the following information:

| Column        | Description                                                               |
|---------------|---------------------------------------------------------------------------|
| Name          | File or directory name                                                    |
| Size          | File size, directories show "Calculate" which can be clicked to calculate |
| Permissions   | File permissions (e.g., 0755)                                             |
| Owner/Group   | File owner and group                                                      |
| Modified Time | Last modified time                                                        |
| Actions       | Open, compress, rename, delete, more                                      |

### Select Files

![Select Files](/images/file/file-select.png)

After selecting files, batch operation buttons appear at the top:

- **Copy**: Copy selected files
- **Move**: Move selected files
- **Compress**: Compress selected files
- **Permissions**: Modify permissions
- **Delete**: Delete selected files

### More Actions

Click the **More** button on the file row to display more action options:

![More Actions](/images/file/file-context-menu.png)

- **Copy**: Copy file to another directory
- **Move**: Move file to another directory
- **Permissions**: Modify file permissions and owner
- **Compress**: Compress file
- **Copy Path**: Copy the full path of the file
- **Properties**: View detailed file properties

## Toolbar

### New

Click the **New** button to:

- Create new file
- Create new directory

### Upload

Click the **Upload** button to upload local files to the server.

Supported upload methods:

- Click to select files for upload
- **Drag-and-drop Upload**: Directly drag files to the page to upload

### Remote Download

Click the **Remote Download** button, enter a URL address to download remote files to the current directory.

Use cases:

- Download software installation packages
- Download remote backup files
- Get files from other servers

### Search

Enter keywords in the search box to search for files:

- Default searches current directory
- Check **Include Subdirectories** to search recursively

### Terminal

Click the **Terminal** button to open a terminal in the current directory for convenient command line operations.

### Sort

Click the **Sort** button to sort the file list by different fields.

## File Editor

AcePanel has a built-in powerful code editor based on Monaco Editor (the same editor core as VS Code).

![File Editor](/images/file/file-editor.png)

### Editor Features

- **Syntax Highlighting**: Supports syntax highlighting for various programming languages
- **Code Folding**: Supports code block folding
- **Line Numbers**: Displays line numbers for easy positioning
- **Minimap**: Displays code thumbnail on the right side
- **Word Wrap**: Can toggle word wrap mode
- **Multi-file Editing**: Supports opening multiple files simultaneously with tab switching

### Editor Shortcuts

| Shortcut       | Function          |
|----------------|-------------------|
| `Ctrl+S`       | Save current file |
| `Ctrl+Shift+S` | Save all files    |
| `Ctrl+F`       | Search            |
| `Ctrl+H`       | Replace           |
| `Ctrl+G`       | Go to line        |

### Editor Toolbar

- **Save**: Save current file
- **Save All**: Save all modified files
- **Refresh**: Reload file content
- **Search**: Open search panel
- **Replace**: Open replace panel
- **Go to**: Jump to specified line
- **Font Size**: Adjust editor font size
- **Toggle Word Wrap**: Enable/disable word wrap
- **Toggle Minimap**: Show/hide right-side minimap
- **Settings**: Editor settings

### Fullscreen Mode

Click the **Maximize** button for fullscreen editing to get more editing space:

![Fullscreen Editor](/images/file/file-editor-fullscreen.png)

### Sidebar File Tree

The left side of the editor displays the file tree of the current directory, allowing you to:

- Quickly switch to edit other files
- Create new files
- Search files

### Status Bar

The editor bottom status bar displays:

- Full file path
- Line ending type (LF/CRLF)
- Cursor position (line, column)
- Indentation settings (spaces/Tab)
- File language type

## Permission Explanation

Linux file permissions are represented by three groups of numbers:

| Permission | Number | Description |
|------------|--------|-------------|
| r          | 4      | Read        |
| w          | 2      | Write       |
| x          | 1      | Execute     |

For example `0755`:

- Owner: 7 (4+2+1) = read+write+execute
- Group: 5 (4+1) = read+execute
- Others: 5 (4+1) = read+execute

Common permissions:

- `0644`: Regular files
- `0755`: Executable files and directories
- `0600`: Private files (such as keys)
