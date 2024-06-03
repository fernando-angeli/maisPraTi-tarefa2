const prompt = require("prompt-sync")();
const colors = require("colors");
let exerciseNumber = 1;

// Variáveis reutilizadas
let continueReading = 1;

/* 1. Escreva um programa para calcular a redução do tempo de vida de um fumante.
Pergunte a quantidade de cigarros fumados por dias e quantos anos ele já fumou.
Considere que um fumante perde 10 min de vida a cada cigarro. Calcule quantos dias de
vida um fumante perderá e exiba o total em dias.
*/
exercise();
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
exercise();
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
exercise();

let distance = parseInt(prompt("Informe a distância a ser percorrida: "));
const DISTANCE_UP_TO_200 = 0.5;
const DISTANCE_MORE_THAN_200 = 0.45;
console.log(
  `O valor da viagem será de R$ ${(distance <= 200
    ? distance * DISTANCE_UP_TO_200
    : distance * DISTANCE_MORE_THAN_200
  ).toFixed(2)}`
);

/* 4. Crie um programa que leia o tamanho de três segmentos de reta. Analise seus
comprimentos e diga se é possível formar um triângulo com essas retas.
Matematicamente, para três segmentos formarem um triângulo, o comprimento de cada
lado deve ser menor que a soma dos outros dois.
*/
exercise();

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
exercise();
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
exercise();

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
exercise();

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

/* 8. Um programa de vida saudável quer dar pontos por atividades físicas realizadas que
podem ser trocados por dinheiro. Cada hora de atividade física no mês vale pontos. O
sistema funciona assim:
- até 10 h de atividade no mês: ganha 2 pontos por hora
- de 10 h até 20 h de atividade no mês: ganha 5 pontos por hora
- acima de 20 h de atividade no mês: ganha 10 pontos por hora
- A cada ponto ganho, o cliente fatura R$ 0,05 (5 centavos)
Faça um programa que leia quantas horas de atividade uma pessoa teve por mês.
Calcule e mostre quantos pontos ela teve e quanto dinheiro ela conseguiu ganhar.
*/
exercise();

const UP_TO_10_HOURS = 2;
const BETWEEN_10_AND_20_HOURS = 5;
const OVER_20_HOURS = 10;
const POINT_VALUE = 0.05;

let activityHours = parseInt(prompt("Horas de atividade realizadas no mês: "));
let accumulatedPoints = getAccumulatedPoints(activityHours);

if (activityHours > 0)
  console.log(
    `Você realizou ${activityHours} hora(s) de atividades e acumulou ${accumulatedPoints} pontos, seu resgante será de R$${(
      accumulatedPoints * POINT_VALUE
    ).toFixed(2)}`
  );
else console.log("Você não acumulou pontos.");

function getAccumulatedPoints(activityHours) {
  if (activityHours > 0 && activityHours <= 10)
    return activityHours * UP_TO_10_HOURS;
  else if (activityHours <= 20) return activityHours * BETWEEN_10_AND_20_HOURS;
  else return activityHours * OVER_20_HOURS;
}

/* 9. Desenvolva um aplicativo que leia o salário e o sexo de vários funcionários. No final,
mostre o total de salário pago aos homens e o total pago às mulheres. O programa vai
perguntar ao usuário se ele quer continuar ou não sempre que ler os dados de um
funcionário.
*/
exercise();

continueReading = 1;
let sumMale = 0;
let sumFemale = 0;
let employeeData = [];

class Employee {
  constructor(gender, salary) {
    this.gender = gender;
    this.salary = salary;
  }
}

while (continueReading !== 0) {
  let gender = prompt(
    "Informe o sexo do funcionário (F - Feminino | M - Masculino): "
  ).toUpperCase();
  let salary = parseFloat(prompt("Informe o salário: "));
  employeeData.push(new Employee(gender, salary));
  continueReading = parseInt(
    prompt("Continuar cadastro? (1 - SIM | 0 - NÃO): ")
  );
}

employeeData.forEach((e) => {
  e.gender === "M" ? (sumMale += e.salary) : (sumFemale += e.salary);
});

console.log(
  `Total de salários pago aos homens: R$${sumMale.toFixed(
    2
  )} e total pago às mulheres: R$${sumFemale.toFixed(2)}`
);

/* 10. Crie um programa usando a estrutura “faça enquanto” que leia vários números. A
cada laço, pergunte se o usuário quer continuar ou não. No final, mostre na tela:
a) O somatório entre todos os valores;
b) Qual foi o menor valor digitado;
c) A média entre todos os valores;
d) Quantos valores são pares.
*/
exercise();
continueReading = 1;

let listOfNumbers = [];

while (continueReading !== 0) {
  let number = parseInt(prompt("Informe um número: "));
  listOfNumbers.push(number);
  continueReading = parseInt(
    prompt("Deseja inserir outro número? (1 - SIM | 0 - NÃO): ")
  );
}

let sumOfNumbers = 0;
let lowerValue = listOfNumbers[0];
let numberOfPairs = 0;

listOfNumbers.forEach((number) => {
  sumOfNumbers += number;
  if (number < lowerValue) lowerValue = number;
  if (number % 2 === 0) numberOfPairs++;
});

console.log(`A soma dos valores digitados é: ${sumOfNumbers}`);
console.log(`O menor valor digitado é: ${lowerValue}`);
console.log(
  `A média dos valores digitados é: ${(
    sumOfNumbers / listOfNumbers.length
  ).toFixed(1)}`
);
console.log(`A quantidade de valores pares é: ${numberOfPairs}`);

/* 11. Desenvolva um programa que leia o primeiro termo e a razão de uma PA (Progressão
Aritmética), mostrando na tela os 10 primeiros elementos da PA e a soma entre todos os
valores da sequência.
 */
exercise();

let firstTerm = parseInt(prompt("Informe o primeiro termo da PA: "));
let diference = parseInt(prompt("Informe a razão da PA: "));
let pa = [firstTerm];
let sumElementsPa = firstTerm;

for (i = 1; i < 10; i++) {
  pa[i] = pa[i - 1] + diference;
  sumElementsPa += pa[i];
}

console.log(pa);
console.log("Soma dos elementos:", sumElementsPa);

/* 12. Faça um programa que mostre os 10 primeiros elementos da Sequência de Fibonacci.
Ex.: 1, 1, 2, 3, 5, 8, 13, 21.
 */
exercise();

console.log("10 primeiros elementos da sequência de Fibonacci");
getFibonacci(10).forEach((n, i) => {
  console.log(`${i + 1} = ${n}`);
});

/* 13. Crie um programa que preencha automaticamente (usando lógica, não apenas
atribuindo diretamente) um vetor numérico com 15 posições com os primeiros elementos
da sequência de Fibonacci.
 */
exercise();

console.log("15 primeiros elementos da sequência de Fibonacci");
getFibonacci(15).forEach((n, i) => {
  console.log(`${i + 1} = ${n}`);
});

/* 14. Faça um programa que leia 7 nomes de pessoas e guarde-os em um vetor. No final,
mostre uma listagem com todos os nomes informados, na ordem inversa daquela em
que eles foram informados.
 */
exercise();

let names = [];
while (names.length < 7)
  names.push(prompt(`Informe o nome ${names.length + 1}: `));
console.log("Ordem inversa dos nomes digitados:");
for (i = 6; i >= 0; i--) console.log(names[i]);

/* 15. Desenvolva um programa que leia 10 números inteiros e guarde-os em um vetor. No
final, mostre quais são os números pares que foram digitados e em que posições eles
estão armazenados.
 */
exercise();
let integers = integersNumbers(10);
integers.forEach((i, n) => {
  if (n % 2 === 0) console.log(`Número par: ${n} - posição ${i}`);
});

/* 16. Crie uma lógica que preencha um vetor de 20 posições com números aleatórios
(entre 0 e 99) gerados pelo computador. Logo em seguida, mostre os números gerados e
depois coloque o vetor em ordem crescente, mostrando no final os valores ordenados.
 */
exercise();

let randomNumbers20 = [];
while (randomNumbers20.length < 20) {
  let number = getRandomInt(0, 99);
  if (!randomNumbers20.includes(number)) randomNumbers20.push(number);
}
console.log(randomNumbers20);

randomNumbers20.sort((a, b) => {
  return a - b;
});
console.log(randomNumbers20);

/* 17. Crie um programa que leia o nome e a idade de 9 pessoas e guarde esses valores em
dois vetores, em posições relacionadas. No final, mostre uma listagem contendo apenas
os dados das pessoas menores de idade.
 */
exercise();

names = []; // já declarado em outro exercício
let years = [];
for (i = 0; i < 9; i++) {
  names.push(prompt(`Informe o nome do usuário ${i + 1}: `));
  years.push(parseInt(prompt(`Informe a idade do usuário ${i + 1}: `)));
}
console.log("Pessoas menores de idade:");
for (i = 0; i < years.length; i++)
  if (years[i] < 18) console.log(`Nome: ${names[i]}, idade: ${years[i]}`);

/* 18. Crie um registro com o nome do funcionário, cargo e salário. Leia este registro para
um funcionário e ao final escreva o conteúdo do registro.
 */
exercise();

let employee = { name: "", position: "", salary: 0 };
employee.name = prompt("Digite o nome: ");
employee.position = prompt("Digite o cargo: ");
employee.salary = parseFloat(prompt("Digite o salário: "));

console.log(
  `Nome: ${employee.name} - Cargo: ${
    employee.position
  } - Salário R$${employee.salary.toFixed(2)}`
);

/* 19. Escrever um programa para ler 5 horários. Validar cada horário fornecendo através de
repetição. Escrever cada um deles no formato HH.MM.SS.
 */
exercise();
let timings = [];
while (timings.length < 5) {
  let read = prompt(
    `Informe 5 horários no formato HH:MM:SS (${timings.length + 1} de 5): `
  );
  let error = validateTime(read.split(":"));

  if (error === "") {
    timings.push(read);
  } else console.log(`ERRO - ${error}`);
}
timings.forEach((time) => {
  console.log(time.replace(/:/g, "."));
});

function validateTime(time) {
  let response = "",
    hours = parseInt(time[0]),
    minutes = parseInt(time[1]),
    seconds = parseInt(time[2]);
  if (hours < 0 || hours > 23) response += "Hora inválida. ";
  if (minutes < 0 || minutes > 59) response += "Minutos inválidos. ";
  if (
    (hours === 0 && minutes === 0 && seconds === 0) ||
    seconds < 0 ||
    seconds > 59
  )
    response += "Segundos inválidos.";
  return response;
}

/* 20. Uma indústria faz a folha mensal de pagamentos de seus 80 empregados baseada
no seguinte: existe uma tabela com os dados de cada funcionalidade: matrícula, nome e
salário bruto. Escreva um programa que leia e processe a tabela e emita (escreva na
tela), cada funcionário, seu contracheque, cujo formato é dado a seguir:
Matrícula:
Nome:
Salário bruto:
Dedução INSS:
Salário líquido:
(Dicas: desconto de 12%, salário líquido é a diferença entre salário bruto e a redução do
INSS).
 */
exercise();
let employeeData20 = [];
const INSS_ALIQUOT = 0.12;
continueReading = 1;

class Employee20 {
  constructor(registry, name, grossPay, inss, netPay) {
    this.registry = registry;
    this.name = name;
    this.grossPay = grossPay;
    this.inss = grossPay * INSS_ALIQUOT;
    this.netPay = this.grossPay - this.inss;
  }
}

while (continueReading === 1) {
  let registry;
  do {
    registry = parseInt(prompt("Informe o número de matrícula: "));
  } while (!validateRegistry(registry));
  let name = prompt("Informe o nome: ");
  let grossPay = parseFloat(prompt("Informe o salário: "));
  employeeData20.push(new Employee20(registry, name, grossPay));
  continueReading = parseInt(
    prompt("Deseja inserir outro funcionário? (1 - SIM | 0 - NÃO): ")
  );
}

employeeData20.forEach((e) => {
  console.log(`
Matrícula: ${e.registry}
Nome: ${e.name}
Salário bruto: R$ ${e.grossPay.toFixed(2)}
Dedução de INSS: R$ ${e.inss.toFixed(2)}
Salário líquido: R$ ${e.netPay.toFixed(2)}
`);
});

function validateRegistry(registry) {
  for (e of employeeData20)
    if (e.registry === registry) {
      console.log("Matrícula já utilizada, informe outro valor.");
      return false;
    }
  return true;
}

/* 21. Faça uma função que recebe, por parâmetro, a altura (alt) e o sexo de uma pessoa e
retorna o seu peso ideal. Para homens, calcular o peso ideal usando a fórmula: peso ideal
= 72.7 x alt - 58 e, para mulheres, peso ideal = 62.1 x alt - 44.7.
 */
exercise();

let alt = parseFloat(prompt("Informe sua altura (em metros): "));
let gender21 = prompt("Informe seu sexo (F - Feminino | M - Masculino): ");
console.log(idealWeight(alt, gender21));

function idealWeight(alt, sex) {
  return sex.toUpperCase() === "M"
    ? `Seu peso ideal é ${(72.7 * alt - 58).toFixed(1)}kg`
    : `Seu peso ideal é ${(62.1 * alt - 44.7).toFixed(1)}kg`;
}

/* 22. A prefeitura de uma cidade fez uma pesquisa entre os seus habitantes, coletando
dados sobre o salário e número de filhos. Faça uma função que leia esses dados para um
número não determinado de pessoas e retorne a média de salário da população, a
média do número de filhos, o maior salário e o percentual de pessoas com salário até R$
350,00.
 */
exercise();
continueReading = 1;
let people = peopleReader();
calculateAverages(people);

function peopleReader() {
  let peopleReader = [];
  let person = {
    pay: "",
    numberOfChildren: "",
  };
  while (continueReading === 1) {
    person.pay = parseFloat(prompt("Informe o salário: "));
    person.numberOfChildren = parseInt(prompt("Informe o número de filhos: "));
    peopleReader.push({ ...person });
    continueReading = parseInt(
      prompt("Deseja inserir outro funcionário? (1 - SIM | 0 - NÃO): ")
    );
  }
  return peopleReader;
}

function calculateAverages(people) {
  let averagePay = 0,
    averageChildren = 0,
    highestPay = 0,
    payUpTo350 = 0;
  people.forEach((p) => {
    averagePay += p.pay;
    if (p.pay > highestPay) highestPay = p.pay;
    averageChildren += p.numberOfChildren;
    if (p.pay <= 350) payUpTo350++;
  });
  return console.log(`
  Média de salário: R$ ${(averagePay / people.length).toFixed(2)}
  Média de filhos: ${Math.round(averageChildren / people.length)}
  Maior salário: R$ ${highestPay.toFixed(2)}
  Percentual de habitantes com renda até R$350,00: ${(
    (payUpTo350 / people.length) *
    100
  ).toFixed(1)}%
  `);
}

/* 23. Criar e imprimir a matriz identidade MI[1..7,1..7] em que todos os elementos da
diagonal principal são iguais a 1 e os demais são nulos.
 */
exercise();

printMatrix(identityMatrix(7));

function identityMatrix(size) {
  let matrix = [];
  console.log(`Matriz ${size} x ${size}`);
  for (i = 0; i < size; i++) {
    let line = [];
    for (j = 0; j < size; j++) {
      line[j] = i === j ? 1 : 0;
    }
    matrix[i] = line;
  }
  return matrix;
}

/* 24. Dada uma matriz M[1..6,1..8], criar um vetor C que contenha, em cada posição, a
quantidade de elementos negativos da linha correspondente de M.
 */
exercise();

let matrix24 = matrix(6, 8, -9, 9);
let c = [matrix24.length];
for (i = 0; i < matrix24.length; i++) {
  let count = 0;
  for (j = 0; j < matrix24[i].length; j++) {
    if (matrix24[i][j] < 0) count++;
  }
  c[i] = count;
}

console.log(`Quantidade de elementos negativos por linha:
[${c}]
`);

/* 25. Faça um algoritmo que leia uma matriz de 15 X 20 de números reais e mostre a soma
de cada coluna separadamente.
 */
exercise();
let matrix25 = matrix(15, 20, -9, 9);
let sumElementsMatrix = [];

for (i = 0; i < matrix25.length; i++) {
  let sum = 0;
  for (j = 0; j < matrix25[i].length; j++) {
    sum += matrix25[i][j];
  }
  sumElementsMatrix[i] = sum;
}

console.log(`A soma dos elementos de cada linha:
[${sumElementsMatrix}]
`);

/* 26. Dadas duas matrizes numéricas A[1..3,1..5] e B[1..3,1..5], calcular a matriz produto
P[1..3,1..5].
 */
exercise();
let matrixA = matrix(3, 5, 1, 4);
let matrixB = matrix(5, 3, 1, 4);
let productAB = [];

if (matrixA.length === matrixB[0].length) {
  for (i = 0; i < matrixA.length; i++) {
    let line = [];
    for (j = 0; j < matrixB[i].length; j++) {
      let sum = 0;
      for (k = 0; k < matrixB.length; k++) {
        sum += matrixA[i][k] * matrixB[k][j];
      }
      line.push(sum);
    }
    productAB.push(line);
  }
  console.log("Matriz produto:");
  printMatrix(productAB);
} else {
  console.log(
    `Não é possível multiplicar matrizes em que a quantidade de linhas da matriz A não seja igual a quantidade de colunas da matriz B.`
  );
}

/* 27. Elaborar um algoritmo que leia uma matriz M(6,6) e um valor A. Após a leitura,
multiplicar a matriz M pelo valor A e colocar os valores da matriz multiplicados por A em
um vetor V(36). Escrever o vetor V no final.
 */
exercise();
let matrix27 = matrix(6, 6, 1, 3);
let multiplier = parseInt(prompt("Informe o multiplicador da matriz: "));
let matrixResult = [];

for (i = 0; i < matrix27.length; i++) {
  let line = [];
  for (j = 0; j < matrix27[i].length; j++) {
    line.push(matrix27[i][j] * multiplier);
  }
  matrixResult.push(line);
}
console.log("Matriz resultado da multiplicação: ");
printMatrix(matrixResult);

/* 28. Fazer um algoritmo para receber uma matriz 10 x 10 e devolver o resultado pedido no item:
a) a soma dos elementos acima da diagonal principal;
b) a soma dos elementos abaixo da diagonal principal;
*/
exercise();
let matrix28 = matrix(10, 10, 1, 1);
let elementsAbove = 0;
let elementsBelow = 0;

addElementsAboveAndBelowTheDiagonal(matrix28);

function addElementsAboveAndBelowTheDiagonal(matrix) {
  matrix28.forEach((row, i) => {
    row.map((element, j) => {
      if (i < j) elementsAbove += element;
      else if (i > j) elementsBelow += element;
    });
  });
  console.log(
    `Soma dos elementos acima da diagonal principal = ${elementsAbove}`.yellow
  );
  console.log(
    `Soma dos elementos abaixo da diagonal principal = ${elementsBelow}`.blue
  );
  displayColorMatrix(matrix28);
}

function displayColorMatrix(matrix) {
  matrix.forEach((row, i) => {
    let coloredRow = row.map((element, j) => {
      if (i < j) return element.toString().yellow;
      else if (i > j) return element.toString().blue;
      else return element.toString();
    });
    console.log(` ${coloredRow.join(" | ")}`);
  });
}

/* 29. Escreva um algoritmo que leia uma matriz M(5,5) e calcule as somas:
a) da linha 4 de M;
b) da coluna 2 de M;
c) da diagonal principal;
d) todos os elementos da matriz M.
Escrever essas somas e a matriz.
*/
exercise();
let matrixM = matrix(5, 5, 1, 5);
let sumLine4 = 0;
let sumColumn2 = 0;
let sumDiagonal = 0;
let sumOfAll = 0;

matrixM.forEach((row, i) => {
  row.map((element, j) => {
    if (i === j) sumDiagonal += element;
    if (i === 3) sumLine4 += element;
    if (j === 1) sumColumn2 += element;
    sumOfAll += element;
  });
});

console.log(`Resultado:
-> Soma linha 4 = ${sumLine4}
-> Soma coluna 2 = ${sumColumn2}
-> Soma diagonal principal = ${sumDiagonal}
-> Soma de todos os elementos = ${sumOfAll}`);

/* 30. Escrever um algoritmo que lê uma matriz M(5,5) e cria 2 vetores SL(5) e SC(5) que
contenham, respectivamente, as somas das linhas e das colunas de M. Escrever a matriz
e os vetores criados.
*/
exercise();
let matrixM30 = matrix(5, 5, 1, 5);
let sL = [];
let sC = [];
matrixM30.forEach((row, i) => {
  sL.push(0);
  sC.push(0);
});

matrixM30.forEach((row, i) => {
  row.map((element, j) => {
    sL[i] += element;
    sC[j] += element;
  });
});
console.log(`-> Soma dos elementos de cada linha: [${sL}]
-> Soma dos elementos de cada coluna: [${sC}]
`);

/* 31. Escreva um algoritmo que leia um número inteiro A e uma matriz V 30 x 30 de inteiros.
Conte quantos valores iguais a A estão na matriz. Crie, a seguir, uma matriz X contendo
todos os elementos de V diferentes de A. Mostre os resultados.
*/
exercise();
let a = parseInt(prompt("Informe um valor inteiro: "));
let matrixV = matrix(5, 5, 1, 9);
let matrixX = [];
let countEqualElements = 0;
let diferentElements = [];

matrixV.forEach((row) => {
  row.map((element) => {
    if (element === a) countEqualElements++;
    else diferentElements.push(element);
  });
});

diferentElements.reverse();
let sizeX = Math.ceil(Math.sqrt(diferentElements.length));

for (i = 0; i < sizeX; i++) {
  let line = [];
  for (j = 0; j < sizeX; j++) {
    let element = diferentElements.pop();
    if (element !== undefined) line.push(element);
  }
  matrixX.push(line);
}
console.log(`
O valor ${a} aparece ${countEqualElements} vez(es) na matriz gerada.
Matriz resultado da exclusão do elemento ${a} de todas as posições:`);
printMatrix(matrixX);

/* 32. Escrever um algoritmo que lê uma matriz M(12,13) e divida todos os 13 elementos de
cada uma das 12 linhas de M pelo maior elemento em módulo daquela linha. Escrever a
matriz lida e a modificada.
*/
exercise();
let matrixM32 = matrix(12, 13, 1, 9);
let matrixM32Modificated = [];

matrixM32.forEach((row) => {
  let higherNumber = 0;
  let line = [];
  row.map((element) => {
    if (element > higherNumber) higherNumber = element;
  });
  row.map((element) => {
    line.push(element / higherNumber);
  });
  matrixM32Modificated.push(line);
});
console.log(
  "Matriz resultado da divisão de cada elemento pelo maior elemento de cada linha:"
);
printMatrixWithDecimalNumber(matrixM32Modificated);

/* 33. Faça um algoritmo que leia uma matriz 3 x 3 e após a leitura, multiplique os
elementos da diagonal principal com a média dos elementos da diagonal secundária.
*/
exercise();
let matrix33 = matrix(3, 3, 1, 3);
let multiplier33 = averageOfTheSecundaryDiagonal(matrix33);
console.log(
  `O multiplicador (média dos elementos da diagonal secundária) é ${multiplier33}`
);
printColorMainDiagonal(matrixWithMultipliedDiagonal(matrix33), "blue");

function averageOfTheSecundaryDiagonal(matrix) {
  let sumElements = 0,
    row = 0,
    col = matrix.length - 1;
  while (col >= 0) {
    sumElements += matrix[row][col];
    row++;
    col--;
  }
  return Math.round(sumElements / matrix.length);
}

function matrixWithMultipliedDiagonal(matrix) {
  let newMatrix = [];
  matrix.forEach((row, i) => {
    newMatrix[i] = [];
    row.map((element, j) => {
      if (i === j) newMatrix[i][j] = element * multiplier33;
      else newMatrix[i][j] = element;
    });
  });
  return newMatrix;
}

/* 34. Faça um algoritmo que leia uma matriz 50 x 50 de números reais. A seguir, multiplique
cada linha pelo elemento da diagonal principal daquela linha. Mostre a matriz após as
multiplicações.
*/
exercise();
let matrix34 = matrix(50, 50, 1, 3);

matrix34.forEach((row, i) => {
  let multiplier = row[i];
  row.map((element, j) => {
    matrix34[i][j] = element * multiplier;
  });
});

console.log("Matriz resultante: ");
printColorMainDiagonal(matrix34, "yellow");
// > IMPORTANTE: o terminal pode apresentar erro se não houver espaço para renderizar todos os
// elementos em uma unica linha

/* 35. Elaborar um algoritmo que leia um conjunto de 30 valores e os coloca em 2 vetores
conforme forem pares ou ímpares. O tamanho do vetor é de 5 posições. Se algum vetor
estiver cheio, escrevê-lo. Terminada a leitura, escrever o conteúdo dos dois vetores. Cada
vetor pode ser preenchido quantas vezes forem necessárias.
*/
exercise();
let numbers35 = getVector(30, 1, 100);
let pairNumbers = [];
let oddNumbers = [];
let pairMatrix = [];
let oddMatrix = [];

console.log(`SELECIONADOS:`, `${numbers35.toString()}`.green);

numbers35.forEach((element, index) => {
  if (element % 2 === 0) {
    pairNumbers.push(element);
    if (pairNumbers.length === 5 || index === numbers35.length) {
      console.log(`PARES:`, `${pairNumbers}`.blue);
      pairMatrix.push(pairNumbers);
      pairNumbers = [];
    }
  } else {
    oddNumbers.push(element);
  }
  if (oddNumbers.length === 5 || index === numbers35.length) {
    console.log(`IMPARES:`, `${oddNumbers}`.yellow);
    oddMatrix.push(oddNumbers);
    oddNumbers = [];
  }
});

if (pairNumbers.length > 0) {
  pairMatrix.push(pairNumbers);
  console.log(`PARES:`, `${pairNumbers}`.blue);
}
if (oddNumbers.length > 0) {
  oddMatrix.push(oddNumbers);
  console.log(`IMPARES:`, `${oddNumbers}`.yellow);
}

console.log("Todos os números pares:");
printColorMatrix(pairMatrix, "blue");
console.log("Todos os números ímpares:");
printColorMatrix(oddMatrix, "yellow");

/* 36. Escreva um algoritmo que leia um vetor de 13 elementos inteiros, que é o Gabarito de
um teste da loteria esportiva. Leia, a seguir, para cada um dos 100 apostadores, o número
do seu cartão e um vetor de Respostas de 13 posições. Verifique para cada apostador o
número de acertos, comparando o vetor de Gabarito com o vetor de Respostas. Escreva
o número do apostador e o número de acertos. Se o apostador tiver 13 acertos, mostrar a
mensagem "Parabéns, tu foi o GANHADOR".
*/
exercise();
const DRAW_NUMBERS = 100;
const sportsLotteryNumbers = getVector(13, 1, DRAW_NUMBERS);
let lotteryBetting = [];
let winners = 0;

console.log(`Números sorteados: `, `${sportsLotteryNumbers}`.blue);

for (i = 1; i <= 100; i++) {
  const bet = {
    key: i,
    numbers: getVector(13, 1, DRAW_NUMBERS),
  };
  lotteryBetting.push(bet);
}

lotteryBetting.forEach((bet) => {
  let numberOfHits = 0;
  bet.numbers.map((number) => {
    if (sportsLotteryNumbers.includes(number)) numberOfHits++;
  });
  if (numberOfHits === 13) {
    console.log(
      `Aposta ${bet.key} - ${bet.numbers} - total de ${numberOfHits} acerto(s)`,
      ` - Parabéns, tu foi o GANHADOR`.green
    );
    winners++;
  } else
    console.log(
      `Aposta ${bet.key} - ${bet.numbers} - total de ${numberOfHits} acerto(s).`
    );
});

console.log(winners > 0 ? `Houve ${winners} ganhador(es)` : "Nenhum ganhador.");

/* 37. Escreva um algoritmo que leia um vetor G de 20 elementos caractere que representa
o gabarito de uma prova. A seguir, para cada um dos 50 alunos da turma, leia o vetor de
respostas (R) do aluno e conte o número de acertos. Mostre o número de acertos do
aluno e uma mensagem “APROVADO” se a quantidade de acertos for maior ou igual a 12;
e mostre uma mensagem de “REPROVADO”, caso contrário.
*/
exercise();
const QUESTIONS = 20;
const STUDENTS = 50;
const CORRECT_ANSWERS_FOR_APPROVAL = 12;
let g = getVectorCharacters(QUESTIONS);
let studentsAnswers = generateStudentsResponse(STUDENTS);

correctStudentsTests(g, studentsAnswers);

studentsAnswers.forEach((student) => {
  console.log(
    `Aluno ${student.student} - acertos: ${student.correctAnswers} - situação:`,
    student.approval ? "APROVADO".green : "REPROVADO".red
  );
});

function drawAnswers() {
  const answers = ["a", "b", "c", "d"];
  const index = getRandomInt(0, 3);
  return answers[index];
}

function getVectorCharacters(size) {
  let vector = new Array(size).fill(null);
  vector.forEach((_, index) => {
    vector[index] = drawAnswers();
  });
  return vector;
}

function generateStudentsResponse(numberOfStudents) {
  let vector = new Array(numberOfStudents).fill(null);
  vector.forEach((_, index) => {
    vector[index] = {
      student: index + 1,
      answers: getVectorCharacters(QUESTIONS),
      correctAnswers: 0,
      approval: false,
    };
  });
  return vector;
}

function correctStudentsTests(template, tests) {
  tests.forEach((test, index) => {
    let corrects = 0;
    let student = index + 1;
    test.answers.map((response, index) => {
      if (response === template[index]) corrects++;
    });
    if (corrects >= CORRECT_ANSWERS_FOR_APPROVAL) test.approval = true;
    test.correctAnswers = corrects;
  });
}

/* 38. Elabore um algoritmo que leia um vetor de 6 posições e após sua leitura leia outra
variável identificadora que calcule a operação conforme a informação contida nesta
variável:
1- soma dos elementos;
2- produto dos elementos;
3- média dos elementos;
4- ordene os elementos em ordem crescente;
5- mostre o vetor.
*/
console.clear();
exercise();
continueReading = 1;
console.log("Informe 6 valores");

let vector38 = new Array(6).fill(null);
vector38.forEach((_, index) => {
  vector38[index] = parseInt(prompt(`Informe o valor ${index + 1}: `));
});

start(vector38, add, product, average, ordered, printVector);

function start(vector, add, product, average, ordered, printVector) {
  while (continueReading !== 0) {
    console.clear();
    menu();
    option = parseInt(prompt("OPÇÃO: "));
    console.clear();
    switch (option) {
      case 0:
        continueReading = 0;
        break;
      case 1:
        add(vector);
        continueReading = subMenu();
        break;
      case 2:
        product(vector);
        continueReading = subMenu();
        break;
      case 3:
        average(vector);
        continueReading = subMenu();
        break;
      case 4:
        ordered(vector);
        continueReading = subMenu();
        break;
      case 5:
        printVector(vector);
        continueReading = subMenu();
        break;
      default:
        break;
    }
  }
}

function add(vector) {
  printVector(vector);
  return console.log(
    "Soma dos elementos do vetor: ",
    vector.reduce((accumulator, current) => accumulator + current, 0)
  );
}

function product(vector) {
  printVector(vector);
  return console.log(
    "Produto dos elementos do vetor: ",
    vector.reduce((accumulator, current) => accumulator * current, 1)
  );
}

function average(vector) {
  printVector(vector);
  return console.log(
    "Média dos elementos do vetor: ",
    (
      vector.reduce((accumulator, current) => accumulator + current, 0) /
      vector.length
    ).toFixed(1)
  );
}

function ordered(vector) {
  printVector(vector);
  let orderedVector = [...vector];
  return printVector(
    orderedVector.sort((a, b) => {
      return a - b;
    })
  );
}

function printVector(vector) {
  let print = "";
  vector.forEach((element, index) => {
    print += element;
    if (index < vector.length - 1) print += " | ";
  });
  console.log(print);
}

function menu() {
  console.log(
    "MENU > ".yellow,
    "1 - Soma | 2 - Produto | 3 - Média | 4 - Ordenar | 5 - Vetor".blue,
    " | 0 - SAIR".red
  );
}

function subMenu() {
  console.log("\nMENU > ".yellow, "1 - Voltar".green, " | ", "0 - SAIR: ".red);
  let option = parseInt(prompt("OPÇÃO: "));
  console.clear();
  return option;
}

/* 39. Faça um algoritmo que leia um vetor (A) de 100 posições. Em seguida, compacte o
vetor, retirando os valores nulos e negativos. Coloque o resultado no vetor B
*/
exercise();
let vectorA = getVectorWithRepetition(100, -10, 10);
let vectorB = [];
vectorA.forEach((element) => {
  if (element > 0) vectorB.push(element);
});

console.log(`Vetor A (${vectorA.length} elementos)\n`, vectorA);
console.log(`Vetor B (${vectorB.length} elementos)\n`, vectorB);

/* 40. Faça um algoritmo que leia um vetor de 5 elementos inteiros, correspondentes ao
resultado oficial da Loto. A seguir, leia 50 conjuntos de vetores (com 5 elementos inteiros
cada), representando as apostas feitas. Compare os números das apostas com o
resultado oficial e mostre uma mensagem ("Ganhador") se todos os números
corresponderem ao resultado oficial. (Observação: não é necessário procurar por ternos
e quadras, apenas por quinas.)
*/
exercise();
const NUMBER_OF_BETTORS = 50;
const lotteryDraw = getVector(5, 1, 61);
const apostas50 = [];

for (i = 0; i < NUMBER_OF_BETTORS; i++) {
  apostas50[i] = getVector(5, 1, 61);
}

console.log("Números sorteados:", lotteryDraw);
apostas50.forEach((aposta) => {
  let hits = 0;
  for (i = 0; i < aposta.length; i++) {
    if (lotteryDraw.includes(aposta[i])) {
      hits++;
    }
  }
  let winner = hits === 5 ? true : false;
  console.log(
    aposta,
    winner ? `- Ganhador (5 acertos)`.green : `${hits} acerto(s)`.red
  );
});

/* 41. Dado o objeto pessoa com propriedades nome e idade, acesse e imprima o valor de
idade. Adicione uma nova propriedade chamada email ao objeto pessoa que já possui
nome e idade.
*/
exercise();
let pessoa = {
  nome: "Maria",
  idade: 27,
};
console.log(pessoa);
console.log("Idade: ", pessoa.idade);

pessoa.email = "maria@gmail.com";
console.log(pessoa);

/* 
>
>
> Funções auxíliares reutilizaveis 
*/

//Gerar mensagem inicio das questões
function exercise() {
  return console.log(`\n --- EXERCICIO ${exerciseNumber++} ---`);
}

//Gerador de números aleatórios por intervalo
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Gerador de sequência Fibonacci até n valores
function getFibonacci(n) {
  let fibonacci = [0, 1];
  for (i = 2; i < n; i++) fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
  return fibonacci;
}

//Leitor de números inteiros até n valores - retorna array
function integersNumbers(n) {
  let integersNumbers = [];
  while (integersNumbers.length < n)
    integersNumbers.push(
      prompt(`Informe o número ${integersNumbers.length + 1}: `)
    );
  return integersNumbers;
}

//Gerar matriz - linhas x colunas - números aleatórios
function matrix(rows, columns, min, max) {
  let matrix = [];
  console.log(`Matriz ${rows} x ${columns}`);
  for (i = 0; i < rows; i++) {
    let line = [];
    for (j = 0; j < columns; j++) {
      line[j] = getRandomInt(min, max);
    }
    matrix[i] = line;
  }
  printMatrix(matrix);
  return matrix;
}

//Printar matriz - chamando no método de geração
function printMatrix(matrix) {
  for (i = 0; i < matrix.length; i++) {
    let line = "";
    for (j = 0; j < matrix[i].length; j++) {
      line += matrix[i][j] >= 0 ? ` ${matrix[i][j]}` : matrix[i][j];
      if (j < matrix[i].length - 1) line += " |";
    }
    console.log(line);
  }
}

//Printar matrix (com número decimal) - chamando no método de geração
function printMatrixWithDecimalNumber(matrix) {
  for (i = 0; i < matrix.length; i++) {
    let line = "";
    for (j = 0; j < matrix[i].length; j++) {
      line +=
        matrix[i][j] >= 0
          ? ` ${matrix[i][j].toFixed(1)}`
          : matrix[i][j].toFixed(1);
      if (j < matrix[i].length - 1) line += " |";
    }
    console.log(line);
  }
}

//Printar matriz com forEach e map - pode ser passada cor por parâmetro
function printColorMatrix(matrix, color) {
  matrix.forEach((row, i) => {
    let line = " ";
    row.map((element, j) => {
      line += element;
      if (j < row.length - 1) line += " | ";
    });
    if (color !== undefined) console.log(line.toString()[color]);
    else console.log(line);
  });
}

//Printar diagonal principal com cor por parâmetro
function printColorMainDiagonal(matrix, color) {
  matrix.forEach((row, i) => {
    let coloredRow = row.map((element, j) => {
      if (i === j) return element.toString()[color];
      else return element.toString();
    });
    console.log(` ${coloredRow.join(" | ")}`);
  });
}

// Gera um vetor de inteiros com tamanho definido e numeros aleatórios no intervalo definido
function getVector(size, min, max) {
  if (size <= max - min + 1) {
    let vector = new Array(size).fill(null);
    vector.forEach((_, index) => {
      let number;
      do {
        number = getRandomInt(min, max);
      } while (vector.includes(number));
      vector[index] = number;
    });
    return vector.sort((a, b) => {
      return a - b;
    });
  } else {
    return [];
  }
}

// Gera um vetor de inteiros com tamanho definido e numeros aleatórios no intervalo definido com repetição
function getVectorWithRepetition(size, min, max) {
  let vector = new Array(size).fill(null);
  vector.forEach((_, index) => {
    vector[index] = getRandomInt(min, max);
  });
  return vector;
}
