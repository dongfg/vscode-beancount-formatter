# vscode-beancount-formatter

beancount formatter extension for VS Code

## Requirements

~~Requires `bean-format` command to be installed, install python `beancount` package first.~~

After `1.3.0`, `beancount` is no longer needed, but format options are still supported.

## Extension Settings

- ~~`beancountFormatter.binPath`: path of `bean-format`~~ (deprecated)
- `beancountFormatter.prefixWidth`: Use this prefix width instead of determining an optimal value automatically.
- `beancountFormatter.numWidth`: Use this width to render numbers instead of determining an optimal value.
- `beancountFormatter.currencyColumn`: Align currencies in this column.

## Usage

> extension will be activated when open `*.bean` or `*.beancount` file.

Files can be formatted on-demand by right-clicking in the document and selecting Format Document in the editor context menu, by using the associated keyboard shortcut, or by running command Format Document from the Command Palette.

Default keyboard shortcuts for Format Document command:

- macOS: **Shift+Alt+F**
- Linux: **Ctrl+Shift+I**
- Windows: **Shift+Alt+F**

## Development

- [format.ts](src/format.ts) was rewrite from beancount's [format.py](https://github.com/beancount/beancount/blob/master/beancount/scripts/format.py)
- `yarn test` run testCase copy from [format_test.py](https://github.com/beancount/beancount/blob/master/beancount/scripts/format_test.py)
- The test helper file `helper.ts` depends on `bean-format` command, so you need to install `beancount` with pip

## License

The MIT License (MIT)

Copyright (c) 2020 dongfg <mail@dongfg.com> (https://dongfg.com)

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
