# General Project

General projects are used to deploy any type of executable program, not limited to specific programming languages.

## Use Cases

- Rust applications
- C/C++ applications
- Shell scripts
- Other compiled language applications
- Custom startup scripts

## Creating a General Project

1. Go to the **Projects** page
2. Click **Create Project**
3. Fill in the configuration:
   - **Project Name**: Project identifier
   - **Project Directory**: Directory where the executable is located
   - **Startup Command**: Command to start the program
4. Enable **Reverse Proxy** as needed

## Startup Command Examples

### Rust Application

```bash
# Run compiled binary
./myapp

# Run with arguments
./myapp --config config.toml --port 8080
```

### Shell Script

```bash
# Run script
/bin/bash start.sh

# Or run directly (requires shebang and execute permission)
./start.sh
```

### Custom Startup Script

Create `start.sh`:

```bash
#!/bin/bash
cd /opt/ace/project/myapp
export ENV=production
./myapp
```

Startup command: `/bin/bash start.sh`

## Environment Variables

You can set environment variables in the startup command:

```bash
# Single environment variable
ENV=production ./myapp

# Multiple environment variables
ENV=production PORT=8080 ./myapp
```

Or edit the project directly and add environment variables in **Runtime Settings**.

## Working Directory

The project runs in the specified project directory, and relative paths are resolved based on that directory.

If you need to change directories, you can use `cd` in the startup command:

```bash
cd /opt/ace/project/myapp/bin && ./myapp
```

## Permission Settings

Ensure the executable has execute permission:

```bash
chmod +x myapp
chmod +x start.sh
```

## Running User

By default, projects run as the `www` user. If the program requires special permissions, you can select a different user.

::: warning Note
Running as root user may pose security risks, please choose carefully.
:::

## Log Output

The program's standard output (stdout) and standard error (stderr) are recorded in logs, which can be viewed on the project management page.

It is recommended that programs output logs to standard output rather than writing to files for unified management.

## Signal Handling

When a project stops, a SIGTERM signal is sent. The program should handle this signal properly to achieve graceful shutdown:

```rust
// Rust example
use signal_hook::{consts::SIGTERM, iterator::Signals};

fn main() {
    let mut signals = Signals::new(&[SIGTERM]).unwrap();
    // Handle SIGTERM signal
}
```

```c
// C example
#include <signal.h>

void handle_sigterm(int sig) {
    // Clean up resources
    exit(0);
}

int main() {
    signal(SIGTERM, handle_sigterm);
    // ...
}
```
