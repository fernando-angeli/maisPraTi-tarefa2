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

/* 6. Crie um jogo onde o computador vai sortear um número entre 1 e 5. O jogador vai
tentar descobrir qual foi o valor sorteado. 
*/
console.log(` \n--- EXERCICIO ${exercise++} ---`);

let drawnNumber = getRandomInt(1, 5);
console.log("Tente adivinhar o número escolhido entre 1 e 5: ");
let attempt = 0;
do {
  attempt = parseInt(prompt("Qual a sua escolha? "));
  if (attempt === drawnNumber) {
    console.log(`Acertou! O número era o ${drawnNumber}.`);
  } else if (attempt < 1 || attempt > 5) {
    console.log("Valor inválido, fora do intervado de 1 a 5.");
  } else {
    console.log("Errou, tente novamente.");
  }
} while (drawnNumber != attempt);

/* 7. Uma empresa de aluguel de carros precisa cobrar pelos seus serviços. O aluguel de um
carro popular custa R$ 90,00 por dia e um carro de luxo custa R$ 150,00. Além disso, o
cliente paga por Km percorrido. Faça um programa que leia o tipo de carro alugado
(popular ou luxo), quantos dias de aluguel e quantos Km foram percorridos. No final,
mostre o preço a ser pago de acordo com os dados a seguir:
Carros populares
- Até 100 Km percorridos: R$ 0,20 por Km
- Acima de 100 Km percorridos: R$ 0,10 por Km
Carros de luxo
- Até 200 Km percorridos: R$ 0,30 por Km
- Acima de 200 Km percorridos: R$ 0,25 por Km
*/
console.log(` \n--- EXERCICIO ${exercise++} ---`);

const POPULAR_CAR_DAILY = 90.0;
const POPULAR_KM_UP_TO_100_KM = 0.2;
const POPULAR_KM_OVER_100_KM = 0.1;
const LUXURY_CAR_DAILY = 150.0;
const LUXURY_KM_UP_TO_200_KM = 0.3;
const LUXURY_KM_OVER_200_KM = 0.25;

let typeCar = parseInt(
  prompt("Selecione o tipo de veículo: 1 - Popular | 2 - Luxo: ")
);
let rentalDays = parseInt(prompt("Quantos dias de locação: "));
let kilometersDriven = parseFloat(prompt("Quantos kilômetros rodados: "));

console.log(
  `Sua locação de um carro do tipo ${
    typeCar === 1 ? "Popular" : "Luxo"
  } durante ${rentalDays} dia(s) e com percurso de ${kilometersDriven} km(s) teve um valor total de R$${calculateTrip(
    typeCar,
    rentalDays,
    kilometersDriven
  ).toFixed(2)}`
);

function calculateTrip(typeCar, rentalDays, kilometersDriven) {
  switch (true) {
    case typeCar === 1 && kilometersDriven <= 100:
      return (
        POPULAR_CAR_DAILY * rentalDays +
        POPULAR_KM_UP_TO_100_KM * kilometersDriven
      );
    case typeCar === 1 && kilometersDriven > 100:
      return (
        POPULAR_CAR_DAILY * rentalDays +
        POPULAR_KM_OVER_100_KM * kilometersDriven
      );
    case typeCar === 2 && kilometersDriven <= 200:
      return (
        LUXURY_CAR_DAILY * rentalDays +
        LUXURY_KM_UP_TO_200_KM * kilometersDriven
      );
    case typeCar === 2 && kilometersDriven > 200:
      return (
        LUXURY_CAR_DAILY * rentalDays + LUXURY_KM_OVER_200_KM * kilometersDriven
      );
    default:
      return 0;
  }
}
