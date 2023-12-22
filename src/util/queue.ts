import { sleep, getCurrentTime } from './helpers';

/**
 * Implementation of Queue
 */
const executionQueue: any = [];
let isExecuting = false;

async function executeNext() {

  if (isExecuting) return;
  isExecuting = true;

  while (executionQueue.length > 0) {
    console.log(`${executionQueue[0].name}: ${getCurrentTime()}`);
    const nextFunction = executionQueue.shift();

    try {
      await nextFunction();
      await sleep(2000);
    } catch (error) {
      console.error(`Error while trying to process the next command: ${error}`);
    }
  }

  isExecuting = false;
}


export async function queueCommand(func: any) {
  executionQueue.push(func);
  executeNext().then(() => {}).catch((e) => console.error(e));
}