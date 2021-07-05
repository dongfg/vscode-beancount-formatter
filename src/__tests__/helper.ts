import { FormatOptions } from '../format';
import * as child from 'child_process';

export function formatWithPython(contents: string, opts?: FormatOptions): string {
  const args = Array<string>();
  if (opts?.prefixWidth) {
    args.push('-w');
    args.push(opts.prefixWidth.toString());
  }
  if (opts?.numWidth) {
    args.push('-W');
    args.push(opts.numWidth.toString());
  }
  if (opts?.currencyColumn) {
    args.push('-c');
    args.push(opts.currencyColumn.toString());
  }

  const result = child.spawnSync('bean-format', args, {
    input: contents,
    cwd: '../../',
    env: process.env,
    stdio: 'pipe',
    encoding: 'utf-8',
  });

  const output = result.output[1];
  // console.log(`output: '${output.trimRight()}'`);
  return output;
}

export function dedent(templateStrings: TemplateStringsArray | string): string {
  const matches = [];
  const strings = typeof templateStrings === 'string' ? [templateStrings] : templateStrings.slice();
  strings[strings.length - 1] = strings[strings.length - 1].replace(/\r?\n([\t ]*)$/, '');
  for (let i = 0; i < strings.length; i++) {
    let match;

    if ((match = strings[i].match(/\n[\t ]+/g))) {
      matches.push(...match);
    }
  }
  if (matches.length) {
    const size = Math.min(...matches.map((value) => value.length - 1));
    const pattern = new RegExp(`\n[\t ]{${size}}`, 'g');

    for (let i = 0; i < strings.length; i++) {
      strings[i] = strings[i].replace(pattern, '\n');
    }
  }
  strings[0] = strings[0].replace(/^\r?\n/, '');
  return strings[0];
}
