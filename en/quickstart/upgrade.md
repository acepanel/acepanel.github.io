# Update

## Automatic Update

The panel has automatic updates enabled by default, checking and updating around 2 AM daily. The panel will be briefly unavailable during updates (usually less than 1 minute).

To disable automatic updates: "Settings" -> "Security" -> "Automatic Update".

## Manual Update

### Web Interface

Click the "Update" button in the top right corner of the homepage. When a new version is available, an update page will pop up.

Do not refresh the browser or operate the panel during the update process. The page will automatically refresh after completion.

### Command Line

```shell
acepanel update
```

Suitable for situations where the panel is inaccessible. Do not close the terminal during the update process.

## Update Failed

If problems occur after updating, try to repair:

```shell
acepanel fix
```

If problems persist, provide feedback at the [Community](https://tom.moe).
