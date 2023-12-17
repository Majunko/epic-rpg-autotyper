import { queueCommand } from './util/queue'

function commandA() {
  console.log("Comando A ejecutado");
}

function commandB() {
  console.log("Comando B ejecutado");
}

function commandC() {
  console.log("Comando C ejecutado");
}

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