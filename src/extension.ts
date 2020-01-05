// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as child from 'child_process';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('[vscode-beancount-formatter] activated!');

	const disposable = vscode.languages.registerDocumentFormattingEditProvider({ scheme: 'file', language: 'beancount' }, {
		provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
			const config = vscode.workspace.getConfiguration("beancountFormatter");
			const formatterPath = config["binPath"];
			// Figure out which arguments to pass (we need to leave them blank if
			// they're set to null to let bean-format automatically detect values).
			const args = [];
			if (config["prefixWidth"] !== null) {
				args.push("-w");
				args.push(config["prefixWidth"]);
			}
			if (config["numWidth"] !== null) {
				args.push("-W");
				args.push(config["numWidth"]);
			}
			if (config["currencyColumn"] !== null) {
				args.push("-c");
				args.push(config["currencyColumn"]);
			}
			console.log('[vscode-beancount-formatter] workspace:' + JSON.stringify(vscode.workspace));
			console.log('[vscode-beancount-formatter] PATH:' + process.env.PATH);
			let cwd = process.cwd();
			if (vscode.workspace.workspaceFolders !== undefined) {
				cwd = vscode.workspace.workspaceFolders[0].uri.path;
			}
			const result = child.spawnSync(formatterPath, args, {
				input: document.getText().replace(/\r\n/g, '\n').replace(/\r/g, '\n'),
				cwd: cwd,
				env: process.env,
				stdio: 'pipe',
				encoding: 'utf-8',
			});

			if(!result.output) {
				vscode.window.showErrorMessage("Error call 'bean-format' command. Please check command in extension config and test in your terminal.");
				return [];
			}
			
			if (result.output[1]) {
				const rangeStart: vscode.Position = document.lineAt(0).range.start;
				const rangeEnd: vscode.Position = document.lineAt(document.lineCount - 1).range.end;
				return [vscode.TextEdit.replace(new vscode.Range(rangeStart, rangeEnd), result.output[1])];
			} else if (result.output[2]) {
				vscode.window.showInformationMessage(result.output[2]);
			}
			return [];
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { 
	console.log('[vscode-beancount-formatter] deactivated!');
}
