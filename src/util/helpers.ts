import chalk from 'chalk';

export const superTrim = (text: string) => {
  return text.replace(/\s+/g, ' ').trim();
};

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export function printLogo() {
  return console.log(chalk.hex('#13A10E')(`
    ██████╗ ██████╗  ██████╗     
    ██╔══██╗██╔══██╗██╔════╝     
    ██████╔╝██████╔╝██║  ███╗    
    ██╔══██╗██╔═══╝ ██║   ██║    
    ██║  ██║██║     ╚██████╔╝    
    ╚═╝  ╚═╝╚═╝      ╚═════╝
  `));
}