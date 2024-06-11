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
    this.database = { hotels: {}, reservations: {} };
  }

  generateIdHotel() {
    const keys = Object.keys(this.database["hotels"]);
    if (keys.length === 0) return 1;
    return parseInt(keys.length + 1);
  }

  generateIdHotelReservation() {
    const keys = Object.keys(this.database["reservations"]);
    if (keys.length === 0) return 1;
    return parseInt(keys.length + 1);
  }

  insert(object) {
    let id = "";
    if (object instanceof Hotel) {
      id = this.generateIdHotel();
      this.database["hotels"][id] = object;
    } else if (object instanceof HotelReservation) {
      id = this.generateIdHotelReservation();
      this.database["reservations"][id] = object;
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
    return type === "hotels" ? "hotel" : "reserva";
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

function messageError(erro) {
  return console.log(`ERRO: ${erro}`.red);
}

function isEmpty(obj) {
  return obj === undefined || obj === null || Object.keys(obj).length === 0;
}

const database = new Database();

class Hotel {
  constructor(name, city, numberOfRooms) {
    this.id = database.generateIdHotel();
    this.name = name;
    this.city = city;
    this.numberOfRooms = numberOfRooms;
    this.availableRooms = this.numberOfRooms;
    this.reservedRooms = 0;
  }
}

class HotelService {
  constructor() {}

  createHotel(name, city, numberOfRooms) {
    let newHotel = new Hotel(name, city, numberOfRooms);
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

// Instanciação da Classe HotelService
const hotelService = new HotelService();

// REFATORAR CODIGOS PARA CLASSES DE SERVIÇOS PARA CRIAR HOTEIS E RESERVAS, DEIXAR SOMENTE O QUE SERIA REFERENTE A CLASSE COMO MÉTODOS GET DE ALGUM ATRIBUTO
class HotelReservation {
  constructor(idHotel, nameClient) {
    this.idResevation = database.generateIdHotelReservation();
    this.idHotel = idHotel;
    this.nameClient = nameClient;
  }
}

class HotelReservationService {
  constructor() {}
  createReservation(idHotel, nameClient) {
    let newReservation = new HotelReservation(idHotel, nameClient);
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

hotelService.createHotel("Copa Cabana", "Rio de Janeiro", 200);
hotelService.createHotel("Ibis RS", "Porto Alegre", 160);
hotelService.createHotel("Ibis SP", "São Paulo", 160);
hotelReservationService.createReservation(1, "Pedro");
console.log(hotelReservationService.findAll());
console.log(hotelService.findById(1));
console.log(hotelService.findById(4));
console.log(hotelReservationService.findById(2));

/*
IMPLEMENTAÇÕES
 - VERIFICAR DISPONIBILIDADE DE QUARTOS ANTES DE FAZER RESERVA
 - ATUALIZAR QUANTIDADE DE QUARTOS DISPONIVEIS AO FAZER RESERVA
 - LISTAR QUARTOS DISPONIVEIS (COM POSSIBILIDADE DE FAZER RESERVA)
 - INCLUIR FUNÇÃO DE CHECK=IN E CHECK-OUT NAS RESERVAS
 - VER DEMAIS REQUISITOS
 */
