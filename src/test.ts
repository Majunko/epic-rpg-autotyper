import { queueCommand } from './util/queue';
import * as readline from 'readline';

// Hacer que el proceso.stdin sea un stream de teclas
readline.emitKeypressEvents(process.stdin);

let intervalId: NodeJS.Timeout;
let isPaused = false;
let startTime: number;
let elapsedTime = 0;

// testQueue();

startOrResume();

function testQueue() {
  setInterval(() => {
    // Ejecuta Comando A 
    queueCommand(commandA);
  }, 3000);

  setInterval(() => {
    // Ejecuta Comando B 
    queueCommand(commandB);
  }, 6000);

  setInterval(() => {
    // Ejecuta Comando C 
    queueCommand(commandC);
  }, 9000);
}

function commandA() {
  console.log("Comando A ejecutado");
}

function commandB() {
  console.log("Comando B ejecutado");
}

function commandC() {
  console.log("Comando C ejecutado");
}


// Función para iniciar o reanudar
function startOrResume() {
  isPaused = false;
  startTime = Date.now();
  intervalId = setTimeout(() => {
    elapsedTime = 0; // Restablecer el tiempo transcurrido
    console.log('Ejecutando tarea...');
    startOrResume(); // Reiniciar el intervalo
  }, 5 * 1000 - elapsedTime); // Restar el tiempo transcurrido
}

// Función para pausar
function pause() {
  isPaused = true;
  elapsedTime = Date.now() - startTime;
  clearTimeout(intervalId);
}

// Escuchar teclas
process.stdin.on('keypress', (ch, key) => {
  if (key) {
    if (key.name === 'p') {
      if (isPaused) {
        startOrResume();
        console.log('Resumed');
      } else {
        pause();
        console.log('Paused');
      }
    }
    else if (key.name === 'q') {
      process.exit(0);
    }
    else if (key.ctrl && key.name === 'c') {
      process.stdin.pause();
    }
  }
});

// Habilitar la entrada de teclado
if (typeof process.stdin.setRawMode === 'function') {
  process.stdin.setRawMode(true);
} else {
  throw new Error('No puedo iniciar el modo raw en la entrada del teclado.');
}
