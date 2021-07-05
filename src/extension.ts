// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { FormatOptions, format } from './format';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext): void {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('[vscode-beancount-formatter] activated!');

  const disposable = vscode.languages.registerDocumentFormattingEditProvider(
    { scheme: 'file', language: 'beancount' },
    {
      provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
        const config = vscode.workspace.getConfiguration('beancountFormatter');
        const opts: FormatOptions = {};
        opts.prefixWidth = config.get<number>('prefixWidth');
        opts.numWidth = config.get<number>('numWidth');
        opts.currencyColumn = config.get<number>('currencyColumn');

        const result = format(document.getText().replace(/\r\n/g, '\n').replace(/\r/g, '\n'), opts);

        const rangeStart: vscode.Position = document.lineAt(0).range.start;
        const rangeEnd: vscode.Position = document.lineAt(document.lineCount - 1).range.end;
        return [vscode.TextEdit.replace(new vscode.Range(rangeStart, rangeEnd), result)];
      },
    },
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate(): void {
  console.log('[vscode-beancount-formatter] deactivated!');
}
