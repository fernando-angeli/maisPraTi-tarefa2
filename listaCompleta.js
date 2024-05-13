const prompt = require("prompt-sync")();
let exercise = 1;

// Funções auxíliares reutilizaveis
function getRandomInt(max, min) {
  return parseInt(Math.floor(Math.random() * (max - min + 1) + min));
}

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

/* 4. Crie um programa que leia o tamanho de três segmentos de reta. Analise seus
comprimentos e diga se é possível formar um triângulo com essas retas.
Matematicamente, para três segmentos formarem um triângulo, o comprimento de cada
lado deve ser menor que a soma dos outros dois.
*/
console.log(` \n--- EXERCICIO ${exercise++} ---`);

let measureSides = new Array(3);
for (i = 0; i < measureSides.length; i++)
  measureSides[i] = parseInt(prompt(`Informe as medidas do lado ${i + 1}: `));

console.log(checkMeasures(measureSides));

function checkMeasures(measures) {
  const [A, B, C] = measures;
  if (A + B > C && A + C > B && B + C > A) return "Forma um triângulo.";
  else return "Não forma um triângulo.";
}

/* 5. Crie um jogo de JoKenPo (Pedra-Papel-Tesoura).
 */
console.log(` \n--- EXERCICIO ${exercise++} ---`);
console.log("--- Vamos jogar JoKenPo ---");

let win = false;
let option = 0;
let opponent = getRandomInt(3, 1);

while (option < 1 || option > 3) {
  option = parseInt(
    prompt("Selecione uma opção: 1 (Pedra) | 2 (Papel) | 3 (Tesoura): ")
  );
}

switch (true) {
  case option === 1 && opponent === 3:
    win = true;
    break;
  case option === 2 && opponent === 1:
    win = true;
    break;
  case option === 3 && opponent === 2:
    win = true;
    break;
  case option === opponent:
    win = null;
    break;
  default:
    win = false;
    break;
}

if (win != null) {
  console.log(
    win
      ? `${identifier(option)} vence ${identifier(opponent)}, você Venceu!`
      : `${identifier(opponent)} vence ${identifier(option)}, você Perdeu!`
  );
} else {
  console.log(`${identifier(option)} empata com ${identifier(opponent)}.`);
}

function identifier(player) {
  switch (player) {
    case 1:
      return "Pedra";
    case 2:
      return "Papel";
    case 3:
      return "Tesoura";
    default:
      return "Opção inválida";
  }
}
