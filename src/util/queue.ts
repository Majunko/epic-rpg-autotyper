import { sleep } from './helpers';

/**
 * Implementation of Queue
 */
const executionQueue: any = [];
let isExecuting = false;

async function executeNext() {

  while (executionQueue.length > 0) {

    if (isExecuting) {
      await sleep(2000);
    }

    const nextFunction = executionQueue.shift();

    isExecuting = true;

    try {
      await nextFunction();
      await sleep(1500);
    } catch (error) {
      console.error(`Error while trying to process the next command: ${error}`);
    }

    isExecuting = false;
  }
}


export async function queueCommand(func: any) {
  executionQueue.push(func);
  if (!isExecuting) {
    executeNext().then(() => {}).catch((e) => console.error(e));
  }
}