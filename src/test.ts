/**
   * test
   */
  // Define las funciones correspondientes a cada comando
function commandA() {
    console.log("Comando A ejecutado");
}

function commandB() {
    console.log("Comando B ejecutado");
}

function commandC() {
    console.log("Comando C ejecutado");
}

// Establece intervalos para la ejecución de cada comando
setInterval(() => {
   // Ejecuta Comando A 
   queueCommand(commandA);
}, 3000);

setInterval(() => {    
     // Ejecuta Comando B 
     queueCommand(commandB);  
},6000);

setInterval(() => {     
      // Ejecuta Comando C 
      queueCommand(commandC);   
},9000);


const executionQueue=[];
let isExecuting=false;

async function executeNext(){
  
 while(executionQueue.length>0){

       if(isExecuting){           
           await sleep(2000);
        }
      
      const nextFunction=executionQueue.shift();
      
      isExecuting=true;
       
       try{
         await nextFunction();
         await sleep(1000);
       }catch(error){
          console.error(`Error al intentar procesar el siguiente comando: ${error}`);
       }

        isExecuting=false;        
   }
}


async function queueCommand(func){
  
    executionQueue.push(func);
    
    if(!isExecuting){       
        executeNext().then(()=>{}).catch((e)=>console.error(e));
     }        
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
