const prompt = require("prompt-sync")();
const colors = require("colors");

/* 50. Desenvolva um pequeno sistema de reserva de hotéis usando JavaScript. O sistema
deverá ser capaz de interagir com o usuário através do console do navegador e manter
um registro das reservas e hotéis disponíveis. Utilize objetos e arrays para gerenciar as
informações. Não é necessário interface gráfica, apenas funcionalidade lógica.
1. Estrutura de Dados:
○ Hotel: Cada hotel deve ser um objeto com propriedades para id, nome,
cidade, quartos totais e quartos disponiveis.
○ Reservas: Cada reserva deve ser um objeto contendo idReserva, idHotel, e
nomeCliente.
2. Funcionalidades:
○ Adicionar hotéis: Permitir que o usuário adicione novos hotéis ao sistema.
○ Buscar hotéis por cidade: Permitir que o usuário liste todos os hotéis
disponíveis em uma cidade específica.
○ Fazer reserva: Permitir que um usuário faça uma reserva em um hotel. Isso
deve diminuir o número de quartos disponiveis do hotel.
○ Cancelar reserva: Permitir que um usuário cancele uma reserva. Isso deve
aumentar o número de quartos disponiveis no hotel correspondente.
○ Listar reservas: Mostrar todas as reservas, incluindo detalhes do hotel e do
cliente.
3. Regras de Negócio:
○ Um hotel só pode aceitar reservas se houver quartos disponíveis.
○ As reservas devem ser identificadas por um ID único e associadas a um
único hotel.
4. Desafios Adicionais (Opcionais):
○ Implementar uma função de check-in e check-out que atualize a
disponibilidade de quartos.
○ Gerar relatórios de ocupação para um hotel.
○ Permitir que o usuário avalie o hotel após a estadia, e armazenar essas
avaliações dentro do objeto do hotel.
*/
console.log(`\n --- EXERCICIO 50 ---`);

/* SIMULAÇÃO DE BANCO DE DADOS */
class Database {
  constructor() {
    this.database = { hotels: {}, reservations: {}, cities: {} };
  }

  generateIdHotel() {
    if (Object.keys(this.database["hotels"]).length === 0) return 1;
    return parseInt(Object.keys(this.database["hotels"]).length + 1);
  }

  generateIdHotelReservation() {
    if (Object.keys(this.database["reservations"]).length === 0) return 1;
    return parseInt(Object.keys(this.database["reservations"]).length + 1);
  }

  generateIdCity() {
    if (Object.keys(this.database["cities"]).length === 0) return 1;
    return parseInt(Object.keys(this.database["cities"]).length + 1);
  }

  insert(object) {
    if (object instanceof Hotel) {
      object.id = this.generateIdHotel();
      this.database["hotels"][object.id] = object;
    } else if (object instanceof HotelReservation) {
      object.id = this.generateIdHotelReservation();
      this.database["reservations"][object.id] = object;
    } else if (object instanceof City) {
      object.id = this.generateIdCity();
      this.database["cities"][object.id] = object;
    }
  }

  findAll(type) {
    const data = this.database[type];
    if (isEmpty(data)) {
      throw new Error(
        `Sem cadastrado de ${this.verifyTypeEntity(type)} até o momento.`
      );
    }
    return data;
  }

  findById(type, id) {
    const data = this.database[type][id];
    if (isEmpty(data)) {
      throw new Error(
        `Id ${id} para ${this.verifyTypeEntity(type)} não localizado.`
      );
    }
    return data;
  }

  verifyTypeEntity(type) {
    switch (type) {
      case "hotels":
        return "hotel";
      case "reservations":
        return "reserva";
      case "cities":
        return "cidade";
      default:
        return "Não identifcado";
    }
  }

  // deleteTask(id) {

  // }

  // loadTasks() {
  //   const tasks = Array();
  //   const id = localStorage.getItem("id");
  //   for (let i = 1; i <= id; i++) {
  //     const task = JSON.parse(localStorage.getItem(i));
  //     if (task === null) continue;
  //     task.id = i;
  //     tasks.push(task);
  //   }
  //   return tasks;
  // }

  // searchTasks(task) {
  //   let filterTask = Array();
  //   filterTask = this.loadTasks();

  //   if (task.date !== "")
  //     filterTask = filterTask.filter((t) => t.date === task.date);
  //   if (task.title !== "")
  //     filterTask = filterTask.filter((t) => regex(task.title).test(t.title));
  //   if (task.description !== "")
  //     filterTask = filterTask.filter((t) =>
  //       regex(task.description).test(t.description)
  //     );
  //   return filterTask;
  // }
}
const database = new Database();

function messageError(erro) {
  return console.log(`ERRO: ${erro}`.red);
}

function isEmpty(obj) {
  return obj === undefined || obj === null || Object.keys(obj).length === 0;
}

/* Entity City (Cidades) */
class City {
  constructor(id, name) {
    this.id = id;
    this.city = name;
  }
}

class CityService {
  constructor(database) {
    this.database = database;
  }

  createCity(name) {
    let id = database.generateIdCity();
    let newCity = new City(id, name);
    database.insert(newCity);
    return newCity;
  }

  findAll() {
    try {
      return database.findAll("cities");
    } catch (error) {
      messageError(error.message);
      return {};
    }
  }

  findById(id) {
    try {
      return database.findById("cities", id);
    } catch (error) {
      messageError(error.message);
      return {};
    }
  }
}
const cityService = new CityService();

class Hotel {
  constructor(id, name, cityId, numberOfRooms) {
    this.id = id;
    this.name = name;
    this.city = cityId;
    this.numberOfRooms = numberOfRooms;
    this.availableRooms = this.numberOfRooms;
    this.reservedRooms = 0;
  }
}

class HotelService {
  constructor(cityService, database) {
    this.cityService = cityService;
    this.database = database;
  }

  createHotel(name, cityId, numberOfRooms) {
    const id = database.generateIdHotel();
    const city = cityService.findById(cityId);
    if (city == {}) {
      throw new Error(`A cidade de id ${cityId} não foi localizada.`);
    }
    let newHotel = new Hotel(id, name, cityId, numberOfRooms);
    database.insert(newHotel);
    return newHotel;
  }

  findAll() {
    try {
      return database.findAll("hotels");
    } catch (error) {
      messageError(error.message);
      return {};
    }
  }

  findById(id) {
    try {
      return database.findById("hotels", id);
    } catch (error) {
      messageError(error.message);
      return {};
    }
  }

  // getAvailableRooms(id) {
  //   if (this.availableRooms > 0) return this.availableRooms;
  //   return null;
  // }

  // bookRoom(rooms) {
  //   if (this.availableRooms >= rooms) {
  //     this.reservedRooms += rooms;
  //     this.availableRooms -= rooms;
  //     return true;
  //   }
  //   return false;
  // }
}
const hotelService = new HotelService();

// REFATORAR CODIGOS PARA CLASSES DE SERVIÇOS PARA CRIAR HOTEIS E RESERVAS, DEIXAR SOMENTE O QUE SERIA REFERENTE A CLASSE COMO MÉTODOS GET DE ALGUM ATRIBUTO
class HotelReservation {
  constructor(id, idHotel, nameClient) {
    this.id = id;
    this.idHotel = idHotel;
    this.nameClient = nameClient;
  }
}

class HotelReservationService {
  constructor(database, hotelService) {}

  createReservation(idHotel, nameClient) {
    const hotel = hotelService.findById(idHotel);
    let newReservation = new HotelReservation(hotel, nameClient);
    database.insert(newReservation);
    return newReservation;
  }

  findAll() {
    try {
      return database.findAll("reservations");
    } catch (error) {
      messageError(error.message);
      return {};
    }
  }

  findById(id) {
    try {
      return database.findById("reservations", id);
    } catch (error) {
      messageError(error.message);
      return {};
    }
  }
}
const hotelReservationService = new HotelReservationService();

/*USO*/
// TESTES PARA CITY
cityService.createCity("Rio de Janeiro");
cityService.createCity("Porto Alegre");
cityService.createCity("São Paulo");
// console.log(cityService.findAll());
// console.log(cityService.findById(1));
// console.log(cityService.findById(4));

// TESTES PARA HOTEL
function createHotel(name, idCity, numberOfRooms) {
  try {
    const newHotel = hotelService.createHotel(name, idCity, numberOfRooms);
    console.log("Hotel criado com sucesso!", newHotel);
  } catch (error) {
    messageError(error.message);
  }
}

console.log(cityService.findAll());

createHotel("Copa Cabana Palace", 1, 200);
createHotel("Ibis ERRADO", 4, 160);
createHotel("Ibis", 2, 160);
console.log(hotelService.findById(2));
console.log(hotelService.findAll());

// TESTES PARA RESERVAS
// hotelReservationService.createReservation(1, "Pedro");
// console.log(hotelReservationService.findAll());
// console.log(hotelReservationService.findAll());
// console.log(hotelService.findById(1));
// console.log(hotelService.findById(4));
// console.log(hotelReservationService.findById(2));

/*
IMPLEMENTAÇÕES
 - VERIFICAR DISPONIBILIDADE DE QUARTOS ANTES DE FAZER RESERVA
 - ATUALIZAR QUANTIDADE DE QUARTOS DISPONIVEIS AO FAZER RESERVA
 - LISTAR QUARTOS DISPONIVEIS (COM POSSIBILIDADE DE FAZER RESERVA)
 - INCLUIR FUNÇÃO DE CHECK=IN E CHECK-OUT NAS RESERVAS
 - VER DEMAIS REQUISITOS
 */
