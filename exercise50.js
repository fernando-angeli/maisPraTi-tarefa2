const prompt = require("prompt-sync")();
const colors = require("colors");

/* 50. Desenvolva um pequeno sistema de reserva de hotéis usando JavaScript. O sistema
deverá ser capaz de interagir com o usuário através do console do navegador e manter
um registro das reservas e hotéis disponíveis. Utilize objetos e arrays para gerenciar as
informações. Não é necessário interface gráfica, apenas funcionalidade lógica.
1. Estrutura de Dados:
OK > ○ Hotel: Cada hotel deve ser um objeto com propriedades para id, nome,
cidade, quartos totais e quartos disponiveis.
OK > ○ Reservas: Cada reserva deve ser um objeto contendo idReserva, idHotel, e
nomeCliente.
2. Funcionalidades:
OK > ○ Adicionar hotéis: Permitir que o usuário adicione novos hotéis ao sistema.
OK > ○ Buscar hotéis por cidade: Permitir que o usuário liste todos os hotéis
disponíveis em uma cidade específica.
OK > ○ Fazer reserva: Permitir que um usuário faça uma reserva em um hotel. Isso
deve diminuir o número de quartos disponiveis do hotel.
OK > ○ Cancelar reserva: Permitir que um usuário cancele uma reserva. Isso deve
aumentar o número de quartos disponiveis no hotel correspondente.
OK > ○ Listar reservas: Mostrar todas as reservas, incluindo detalhes do hotel e do
cliente.
3. Regras de Negócio:
OK > ○ Um hotel só pode aceitar reservas se houver quartos disponíveis.
OK > ○ As reservas devem ser identificadas por um ID único e associadas a um
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
  insertOrUpdate(object) {
    switch (true) {
      case object instanceof Hotel:
        this.database.hotels[object.id] = object;
        break;
      case object instanceof City:
        this.database.cities[object.id] = object;
        break;
      case object instanceof HotelReservation:
        this.database.reservations[object.id] = object;
        break;
      default:
        throw new Error("Entidade não encontrada.");
    }
  }
  findAll(type) {
    const data = this.database[type];
    if (isEmpty(data)) {
      throw new Error(
        `Sem cadastrado de ${this.getDescription(type)} até o momento.`
      );
    }
    return data;
  }
  findById(type, id) {
    const data = this.database[type][id];
    if (isEmpty(data)) {
      throw new Error(
        `Id ${id} para ${this.getDescription(type)} não localizado.`
      );
    }
    return data;
  }
  getDescription(type) {
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
  delete(object) {
    switch (true) {
      case object instanceof Hotel:
        this.database.hotels[object.id] = {};
        break;
      case object instanceof City:
        this.database.cities[object.id] = {};
        break;
      case object instanceof HotelReservation:
        this.database.reservations[object.id] = {};
        break;
      default:
        throw new Error("Entidade não encontrada.");
    }
  }
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
    this.name = name;
  }
}

class CityService {
  constructor() {}
  create() {
    try {
      const name = prompt("Nome da cidade: ");
      if (!isEmpty(name)) {
        const id = database.generateIdCity();
        const newCity = new City(id, name);
        database.insertOrUpdate(newCity);
        console.log("Cidade criada com sucesso:", newCity);
        return;
      }
      throw new Error("Obrigatório informar o nome da cidade.");
    } catch (error) {
      messageError(error.message);
    }
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
    if (id === undefined) {
      id = parseInt(prompt("Informe o ID para buscar: "));
    }
    try {
      return database.findById("cities", id);
    } catch (error) {
      messageError(error.message);
      return {};
    }
  }
}

/* Entity Hotel (Hoteis) */
class Hotel {
  constructor(id, name, cityId, numberOfRooms) {
    this.id = id;
    this.name = name;
    this.cityId = cityId;
    this.numberOfRooms = numberOfRooms;
    this.availableRooms = this.numberOfRooms;
    this.reservedRooms = 0;
  }
}

class HotelService {
  constructor() {
    this.cityService = new CityService();
  }
  create() {
    try {
      let name = prompt("Nome do hotel: ");
      let { cityId, city } = "";
      do {
        cityId = parseInt(prompt("ID da cidade: "));
        city = this.cityService.findById(cityId);
      } while (isEmpty(city));
      const numberOfRooms = parseInt(prompt("Número de quartos: "));
      if (!isEmpty(city)) {
        const id = database.generateIdHotel();
        const newHotel = new Hotel(id, name, cityId, numberOfRooms);
        database.insertOrUpdate(newHotel);
        console.log("Hotel criado com sucesso:", newHotel);
      }
    } catch (error) {
      messageError(error.message);
    }
  }
  reservateRoom(hotel) {
    hotel.availableRooms--;
    hotel.reservedRooms++;
    database.insertOrUpdate(hotel);
    return hotel;
  }
  cancelReservateRoom(hotel) {
    hotel.availableRooms++;
    hotel.reservedRooms--;
    database.insertOrUpdate(hotel);
    return hotel;
  }
  findAll() {
    try {
      return database.findAll("hotels");
    } catch (error) {
      messageError(error.message);
    }
  }
  findById(id) {
    if (id === undefined) {
      id = parseInt(prompt("Informe o ID para buscar: "));
    }
    try {
      return database.findById("hotels", id);
    } catch (error) {
      messageError(error.message);
    }
  }
  findAvailableHotelsByCity() {
    const cityId = parseInt(
      prompt("Informe o ID da cidade para consultar os hotéis disponíveis: ")
    );
    const hotels = Object.values(database.findAll("hotels"));
    return hotels.filter(
      (hotel) => hotel.cityId === cityId && hotel.availableRooms > 0
    );
  }
  getAvailableRooms(id) {
    const hotel = this.findById(id);
    try {
      return hotel.getAvailableRooms;
    } catch (error) {
      messageError(error.message);
    }
  }
}

/* Entity HotelResevation (Reservas de hoteis) */
class HotelReservation {
  constructor(id, idHotel, clientName) {
    this.id = id;
    this.idHotel = idHotel;
    this.clientName = clientName;
  }
}

class HotelReservationService {
  constructor() {
    this.cityService = new CityService();
    this.hotelService = new HotelService();
  }
  create() {
    try {
      let idHotel = parseInt(prompt("ID do hotel: "));
      let hotel = this.hotelService.findById(idHotel);
      let nameClient = prompt("Nome do cliente: ");
      if (!isEmpty(hotel) && hotel.availableRooms > 0) {
        const id = database.generateIdHotelReservation();
        this.hotelService.reservateRoom(hotel);
        let newReservation = new HotelReservation(id, idHotel, nameClient);
        database.insertOrUpdate(newReservation);
        console.log("Reserva criada com sucesso:", newReservation);
        return;
      } else if (!isEmpty(hotel) && hotel.availableRooms === 0) {
        throw new Error(
          `Lamentamos mas o hotel selecionado não possui quartos disponíveis no momento.`
        );
      }
    } catch (error) {
      messageError(error.message);
    }
  }
  cancelReservation() {
    let reservationId = parseInt(
      prompt("Informe o ID que deseja cancelar a reserva: ")
    );
    try {
      const reservation = this.findById(reservationId);
      if (!isEmpty(reservation)) {
        let hotel = this.hotelService.findById(reservation.idHotel);
        this.hotelService.cancelReservateRoom(hotel);
        database.delete(reservation);
        console.log("Reserva cancelada com sucesso.");
        return;
      }
    } catch (error) {
      messageError(error.message);
    }
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
    if (id === undefined) {
      id = parseInt(prompt("Informe o ID para buscar: "));
    }
    try {
      return database.findById("reservations", id);
    } catch (error) {
      messageError(error.message);
      return {};
    }
  }
  findAllDetailedReservation() {
    try {
      let reservationsDTO = [];
      let reservations = Object.values(this.findAll());
      reservations.forEach((reservation) => {
        if (!isEmpty(reservation)) {
          let hotel = this.hotelService.findById(reservation.idHotel);
          let city = this.cityService.findById(hotel.cityId);
          reservationsDTO.push(
            new HotelReservationDTO(
              reservation.id,
              reservation.clientName,
              hotel.name,
              city.name
            )
          );
        }
      });
      return reservationsDTO;
    } catch (error) {
      messageError(error.messages);
    }
  }
}

/* DTO para retornar Reservas com id, nome cliente, nome hotel e cidade hotel */
class HotelReservationDTO {
  constructor(reservationId, clienteName, hotelName, cityName) {
    this.reservationId = reservationId;
    this.clientName = clienteName;
    this.hotelName = hotelName;
    this.cityName = cityName;
  }
}
const hotelReservationDTO = new HotelReservationDTO();

/* Criação de menu para iteração com usuário */
class MenuSystem {
  constructor() {
    this.cityService = new CityService();
    this.hotelService = new HotelService();
    this.hotelReservationService = new HotelReservationService();
  }
  mainMenu() {
    while (true) {
      console.clear();
      console.log(
        `${this.title()}`,
        `| Inicio\n`.blue,
        `[1] Cidades\n [2] Hotéis\n [3] Reservas\n`.green,
        `[S] SAIR\n`.red
      );
      const option = prompt("Digite uma opção > ").toUpperCase();
      switch (option) {
        case "S":
          delay(1000, "Encerrando sistema...", "");
          return;
        case "1":
          this.citySubmenu();
          break;
        case "2":
          this.hotelSubmenu();
          break;
        case "3":
          this.hotelReservationSubmenu();
          break;
        default:
          console.log("Opção inválida.");
      }
    }
  }
  citySubmenu() {
    while (true) {
      console.clear();
      console.log(
        `${this.title()}`,
        `| Inicio/Cidades\n`.blue,
        `[1] Cadastrar\n [2] Todas\n [3] Pesquisa\n`.green,
        `[V] VOLTAR\n`.red
      );
      const option = prompt("Digite uma opção > ").toUpperCase();
      switch (option) {
        case "V":
          return;
        case "1":
          this.cityService.create();
          if (this.continue()) break;
        case "2":
          this.printCities();
          if (this.continue()) break;
        case "3":
          this.printCity();
          if (this.continue()) break;
        default:
          console.log("Opção inválida.");
      }
    }
  }
  hotelSubmenu() {
    while (true) {
      console.clear();
      this.title();
      console.log(
        `${this.title()}`,
        `| Inicio/Hotel\n`.blue,
        `[1] Cadastrar\n [2] Todos\n [3] Pesquisa\n [4] Disponível por cidade\n`
          .green,
        `[V] VOLTAR\n`.red
      );
      const option = parseInt(prompt("Digite uma opção > ")).toUpperCase();
      switch (option) {
        case "V":
          return;
        case "1":
          this.hotelService.create();
          if (this.continue()) break;
        case "2":
          this.hotelService.findAll();
          if (this.continue()) break;
        case "3":
          console.log(this.hotelService.findById());
          if (this.continue()) break;
        case "4":
          console.log(this.hotelService.findAvailableHotelsByCity());
          if (this.continue()) break;
        default:
          console.log("Opção inválida.");
      }
    }
  }
  hotelReservationSubmenu() {
    while (true) {
      console.clear();
      this.title();
      console.log(
        `${this.title()}`,
        `| Inicio/Reservas\n`.blue,
        `[1] Cadastrar\n [2] Todos\n [3] Pesquisa\n [4] Cancelar reserva\n`
          .green,
        `[V] VOLTAR\n`.red` - INICIO / RESERVAS - \n`.green,
        `[0] Voltar ao menu inicial\n`.red,
        `[1] Cadastrar\n [2] Ver todos\n [3] Pesquisar\n [4] Cancelar`.blue
      );
      const option = parseInt(prompt("Digite uma opção> ")).toUpperCase();
      switch (option) {
        case "V":
          return;
        case "1":
          this.hotelReservationService.create();
          if (this.continue()) break;
        case "2":
          console.log(
            this.hotelReservationService.findAllDetailedReservation()
          );
          if (this.continue()) break;
        case "3":
          console.log(this.hotelReservationService.findById());
          if (this.continue()) break;
        case "4":
          this.hotelReservationService.cancelReservation();
          if (this.continue()) break;
        default:
          console.log("Opção inválida.");
          break;
      }
    }
  }
  title() {
    return " >>> RESERVAS DE HOTÉIS <<< ".yellow;
  }
  continue() {
    while (true) {
      const option = prompt("[V] Voltar: ").toUpperCase();
      switch (option) {
        case "V":
          return true;
        default:
          console.log("Opção inválida.");
      }
    }
  }
  printCity() {
    let city = this.cityService.findById();
    if (!isEmpty(city)) console.log(`Cidade: [ ${city.id} - ${city.name} ]`);
    else return;
  }
  printCities() {
    let result = "";
    let cities = Object.values(this.cityService.findAll());
    if (!isEmpty(cities)) {
      cities.forEach((city) => {
        result += `${city.id} - ${city.name} | `;
      });
      result = result.substring(0, result.length - 3);
      return console.log("Cidades: [ ", result, "]");
    }
    return;
  }
}

function delay(seconds, message, callback) {
  console.log(message);
  setTimeout(() => {
    callback;
  }, seconds);
}

// TESTES PARA CIDADES
// const cityService = new CityService();
// cityService.create("Rio de Janeiro");
// cityService.create("Porto Alegre");
// cityService.create("Canoas");

// TESTES PARA HOTEL
// const hotelService = new HotelService();
// hotelService.create("Copa Cabana Palace", 1, 2);
// hotelService.create("Ibis", 1, 5);
// hotelService.create("Ibis", 2, 5);
// hotelService.create("Canoas Hotel", 3, 3);

// TESTES PARA FILTRO HOTÉIS DISPONIVEIS POR CIDADE
// console.log("TESTE FILTRO CIDADE / HOTEL");
// console.log(hotelService.findAvailableHotelsByCity(1));

// TESTES PARA RESERVAS
// const hotelReservationService = new HotelReservationService();
// hotelReservationService.create(1, "Pedro");
// hotelReservationService.create(1, "João");
// hotelReservationService.create(3, "Henrique");
// hotelReservationService.create(3, "Maria");
// console.log(hotelReservationService.findAllDetailedReservation());

/*
  IMPLEMENTAÇÕES
 - INCLUIR FUNÇÃO DE CHECK=IN E CHECK-OUT NAS RESERVAS
 - VER DEMAIS REQUISITOS
 */

const menuSystem = new MenuSystem();
menuSystem.mainMenu();
