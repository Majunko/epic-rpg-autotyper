import chalk from 'chalk';

/**
 * @return {void}
 */
export function printLogo() {
  return console.log(chalk.hex('#E7A3A9')(`
    ██████╗ ██████╗  ██████╗     
    ██╔══██╗██╔══██╗██╔════╝     
    ██████╔╝██████╔╝██║  ███╗    
    ██╔══██╗██╔═══╝ ██║   ██║    
    ██║  ██║██║     ╚██████╔╝    
    ╚═╝  ╚═╝╚═╝      ╚═════╝
  `));
}

