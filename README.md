# vscode-beancount-formatter

beancount formatter extension for VS Code

## Requirements

Requires `bean-format` command to be installed, install python `beancount` package first.

## Extension Settings

* `beancountFormatter.binPath`: path of `bean-format`

> For pyenv, the recommend value is `~/.pyenv/versions/<version>/bin/bean-format`

## Usage

> extension will be activated when open `*.bean` or `*.beancount` file.

Files can be formatted on-demand by right-clicking in the document and selecting Format Document in the editor context menu, by using the associated keyboard shortcut, or by running command Format Document from the Command Palette.

Default keyboard shortcuts for Format Document command:

* macOS: **Shift+Alt+F**
* Linux: **Ctrl+Shift+I**
* Windows: **Shift+Alt+F**

## Release Notes
### 1.0.0
* First Release