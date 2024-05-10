const prompt = require("prompt-sync")();
let exercise = 1;

/* 1. Escreva um programa para calcular a redução do tempo de vida de um fumante.
Pergunte a quantidade de cigarros fumados por dias e quantos anos ele já fumou.
Considere que um fumante perde 10 min de vida a cada cigarro. Calcule quantos dias de
vida um fumante perderá e exiba o total em dias.
*/
console.log(` \n--- EXERCICIO ${exercise++} ---`);
let cigarettesPerDay = parseInt(prompt("Quantos cigarros você fuma por dia? "));

if (cigarettesPerDay === 0) {
  console.log("Parabéns por não fumar!");
} else {
  let yearsHeSmoked = parseFloat(prompt("Fuma há quantos anos? "));
  console.log(
    `Você já perdeu: ${lostDaysOfLife(
      cigarettesPerDay,
      yearsHeSmoked
    )} dia(s) de vida.`
  );
}

function lostDaysOfLife(cigarettesPerDay, yearsHeSmoked) {
  return Math.floor((cigarettesPerDay * 10 * (365 * yearsHeSmoked)) / 1440, 0);
}

/* 2. Escreva um programa que pergunte a velocidade de um carro. Caso ultrapasse 80 Km/h-1, 
exiba uma mensagem dizendo que o usuário foi multado. Nesse caso, exiba o valor da multa, 
cobrando R$ 5,00 por cada Km acima da velocidade permitida.
*/
console.log(` \n--- EXERCICIO ${exercise++} ---`);
const PERMITTED_SPEED = 79;
const FINE_VALUE = 5.0;
let speed = parseInt(prompt("Informe a velocidade do veículo: "));
console.log(
  speed > PERMITTED_SPEED
    ? `Multa de R$ ${calculateFine(speed).toFixed(2)}`
    : "Velocidade permitida."
);

function calculateFine(speed) {
  return (speed - PERMITTED_SPEED) * FINE_VALUE;
}

/* 3. Faça um algoritmo que pergunte a distância que um passageiro deseja percorrer em
Km. Calcule o preço da passagem, cobrando R$ 0.50 por Km para viagens até 200 Km e
R$ 0.45 para viagens mais longas.
*/
console.log(` \n--- EXERCICIO ${exercise++} ---`);

let distance = parseFloat(prompt("Informe a distância a ser percorrida: "));
const DISTANCE_UP_TO_200 = 0.5;
const DISTANCE_MORE_THAN_200 = 0.45;

console.log(
  `O valor da viagem será de R$ ${calculateTrip(distance).toFixed(2)}`
);

function calculateTrip(distance) {
  return distance <= 200
    ? distance * DISTANCE_UP_TO_200
    : distance * DISTANCE_MORE_THAN_200;
}
