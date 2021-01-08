/* eslint-disable no-console */
import chalk from 'chalk';
import consola from 'consola';
import prettyOutput from 'prettyoutput';
import highlight from 'cli-highlight';

export const logCategory = {
  event: { color: '#6800FF' },
  info: { color: '#00ABFF' },
  record: { color: '#FF9500' },
  data: { color: '#FF9500' },
  command: { color: '#FF9500' },
  send: { color: '#00BD0C' },
  error: { color: '#FF0076' },
  warn: { color: '#FF0076' },
  notify: { color: '#FF9500' },
  success: { color: '#00BD0C' },
};

/**
 * Output JSON nicely to the CLI
 */
export const prettyJson = (data: Record<string, any>): string => {
  return highlight(prettyOutput(data, { noColor: true }), {
    theme: {
      string: chalk.hex('#00ABFF'),
      built_in: chalk.dim,
      number: chalk.hex('#00BD0C'),
      attr: chalk.dim,
      name: chalk.dim,
      class: chalk.dim,
      literal: chalk.dim,
      keyword: chalk.dim,
    },
  });
};
/**
 * Standard logging
 */
export const clog = (
  category: keyof typeof logCategory,
  description: string,
  data?: Record<string, any> | string | number
): void => {
  const color = logCategory[category].color;

  const points: (string | number)[] = [chalk.hex(color)(category), description];

  data && typeof data !== 'object' ? points.push(data) : ``;

  console.log(points.join(chalk.dim(` > `)));
  if (data instanceof Error) {
    consola.error(data);
  } else if (typeof data == 'object') {
    console.log(prettyJson(data as Record<string, any>));
  }
};

export const logger = consola;
