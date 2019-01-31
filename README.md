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
### 1.1.0
* bugfix, replace `cr` and `crlf` with `lf`
### 1.0.0
* First Release


## License
The MIT License (MIT)

Copyright (c) 2019 dongfg <mail@dongfg.com> (https://dongfg.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.