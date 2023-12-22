import chalk from 'chalk';

function addLeadingZero(number: number) {
    return number < 10 ? '0' + number : number;
}

export const getCurrentTime = () => {
  let currentDateTime = new Date();

  let hours = addLeadingZero(currentDateTime.getHours()); // Get the hour (0-23)
  let minutes = addLeadingZero(currentDateTime.getMinutes()); // Get the minute (0-59)
  let seconds = addLeadingZero(currentDateTime.getSeconds()); // Get the second (0-59)

  // Format the date and time
  let formattedDateTime = `${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
}

export const superTrim = (text: string) => {
  return text.replace(/\s+/g, ' ').trim();
};

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const printLogo = () =>  {
  return console.log(chalk.hex('#13A10E')(`
    ██████╗ ██████╗  ██████╗
    ██╔══██╗██╔══██╗██╔════╝ 
    ██████╔╝██████╔╝██║  ███╗
    ██╔══██╗██╔═══╝ ██║   ██║
    ██║  ██║██║     ╚██████╔╝
    ╚═╝  ╚═╝╚═╝      ╚═════╝
  `));
}