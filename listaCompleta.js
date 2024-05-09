const prompt = require("prompt-sync")();
let exercise = 1;

/* 1. Escreva um programa para calcular a redução do tempo de vida de um fumante.
Pergunte a quantidade de cigarros fumados por dias e quantos anos ele já fumou.
Considere que um fumante perde 10 min de vida a cada cigarro. Calcule quantos dias de
vida um fumante perderá e exiba o total em dias.
*/
console.log(` --- EXERCICIO ${exercise++} ---`);
let cigarettesPerDay = parseInt(prompt("Quantos cigarros você fuma por dia? "));

if(cigarettesPerDay === 0){
    console.log("Parabéns por não fumar!");
}
else{
    let yearsHeSmoked = parseFloat(prompt("Fuma há quantos anos? "));
    console.log(`Você já perdeu: ${lostDaysOfLife(cigarettesPerDay, yearsHeSmoked)} dia(s) de vida.`);
}

function lostDaysOfLife(cigarettesPerDay, yearsHeSmoked){
    return Math.floor(cigarettesPerDay * 10 * (365 * yearsHeSmoked) / 1440, 0);
}