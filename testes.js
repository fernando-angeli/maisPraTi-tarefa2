const prompt = require("prompt-sync")();

let employeeData = [];
const INSS_ALIQUOT = 0.12;

class Employee {
  constructor(registry, name, grossPay, inss, netPay) {
    this.registry = registry;
    this.name = name;
    this.grossPay = grossPay;
    this.inss = grossPay * INSS_ALIQUOT;
    this.netPay = this.grossPay - this.inss;
  }
}

employeeData.push(new Employee(1, "Fernando", 1000.0));
employeeData.push(new Employee(1, "Pedro", 1500.0));

console.log(employeeData);
console.log(validateRegistry(1));

function validateRegistry(registry) {
  for (e of employeeData)
    if (e.registry === registry) {
      console.log("Matrícula já utilizada, informe outro valor.");
      return false;
    }
  return true;
}
