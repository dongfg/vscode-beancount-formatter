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
  return output.trimRight();
}
