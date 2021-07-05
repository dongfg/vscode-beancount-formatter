import { format, FormatOptions } from '../format';
import { formatWithPython, dedent } from './helper';

test('env', () => {
  expect(format('')).toBe(formatWithPython(''));
  // ignore following testCase
  // expect(format(' ')).toBe(formatWithPython(' '));
});

// testCase from https://github.com/beancount/beancount/blob/master/beancount/scripts/format_test.py

test('success', () => {
  const input = dedent(`

  * Section header

  ;; Accounts (comments)
  2013-01-01 open Expenses:Restaurant
  2013-01-01 open Assets:Cash

  2014-03-02 * "Something"
    Expenses:Restaurant   50.02 USD
    Assets:Cash

  2014-03-05 balance   Assets:Cash  -50.02 USD

  2014-03-10 * "Something"
    Assets:Other   10 HOOL {500.23} USD ; Bla
    Assets:Cash

`);
  const actual = format(input);
  // console.log(`actual: '${actual}'`);
  expect(actual).toBe(formatWithPython(input));
});

test('align_posting_starts', () => {
  const input = `
          2014-03-01 * "Something"
            Expenses:Restaurant   50.01 USD
            Assets:Cash

          2014-03-02 * "Something"
           Expenses:Restaurant    50.02 USD
              Assets:Cash

          2014-03-03 * "Something"
            Expenses:Restaurant   50.03 USD
            Assets:Cash
`;
  expect(format(input)).toBe(formatWithPython(input));
});

test('open_only_issue80', () => {
  const input = `
  2015-07-16 open Assets:BoA:checking USD
`;
  expect(format(input)).toBe(formatWithPython(input));
});

test('commas', () => {
  const input = dedent(`

  * Section header

  ;; Accounts (comments)
  2013-01-01 open Expenses:Restaurant
  2013-01-01 open Assets:Cash

  2014-03-02 * "Something"
    Expenses:Restaurant   1,050.02 USD
    Assets:Cash

  2014-03-05 balance   Assets:Cash  -1,050.02 USD

  2014-03-10 * "Something"
    Assets:Other   10 HOOL {5,000.23} USD ; Bla
    Assets:Cash

`);
  expect(format(input)).toBe(formatWithPython(input));
});

test('currency_issue146', () => {
  const input = `
          1970-01-01 open Equity:Opening-balances
          1970-01-01 open Assets:Investments

          2014-03-31 * "opening"
            Assets:Investments                 1.23 FOO_BAR
            Equity:Opening-balances
`;
  expect(format(input)).toBe(formatWithPython(input));
});

test('fixed_width', () => {
  const input = `
        2016-08-01 open Expenses:Test
        2016-08-01 open Assets:Test

        2016-08-02 * "" ""
          Expenses:Test     10.00 USD
          Assets:Test
`;
  const opts: FormatOptions = { prefixWidth: 40 };
  expect(format(input, opts)).toBe(formatWithPython(input, opts));
});

test('fixed_column', () => {
  const input = dedent(`
  2016-08-01 open Expenses:Test
  2016-08-01 open Assets:Test
  2016-08-01 balance Assets:Test  0.00 USD

  2016-08-02 * "" ""
    Expenses:Test     10.00 USD
    Assets:Test
`);
  const opts: FormatOptions = { currencyColumn: 50 };
  expect(format(input, opts)).toBe(formatWithPython(input, opts).trimRight());
});

test('issue#8 1', () => {
  const input = `
  2020-01-04 balance Assets:Balance:WallackManagement  1346.32 USD
`;
  const opts: FormatOptions = { currencyColumn: 10 };
  expect(format(input, opts)).toBe(formatWithPython(input, opts));
});

test('issue#8 2', () => {
  const input = `
  2020-01-03 * "American Airlines" "ESHOPPING 2019 HOLIDAY BONUS"
  Income:PnC:Portal:AA
  Assets:Points:AmericanAirlines
`;
  const opts: FormatOptions = { currencyColumn: 10 };
  expect(format(input, opts)).toBe(formatWithPython(input, opts));
});

test('issue#18', () => {
  const input = dedent(`
  Expenses:食品烟酒:烟酒:酒类 500.00 CNY
  Expenses:abcd:ab:ab 600.00 CNY
  abcdababExpenses:abcd:ab:ab 600.00 CNY
`);
  const expected = dedent(`
  Expenses:食品烟酒:烟酒:酒类  500.00 CNY
  Expenses:abcd:ab:ab          600.00 CNY
  abcdababExpenses:abcd:ab:ab  600.00 CNY
  `);
  const opts: FormatOptions = { fixedCJKWidth: true };
  const actual = format(input, opts);
  expect(actual).toBe(expected);
});
