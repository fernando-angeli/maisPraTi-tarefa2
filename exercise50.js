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
  constructor(database) {
    this.database = database;
  }
  createCity(name) {
    try {
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
    try {
      return database.findById("cities", id);
    } catch (error) {
      messageError(error.message);
      return {};
    }
  }
}
const cityService = new CityService();

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
  constructor(cityService, database) {
    this.cityService = cityService;
    this.database = database;
  }
  createHotel(name, cityId, numberOfRooms) {
    try {
      const city = cityService.findById(cityId);
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
    try {
      return database.findById("hotels", id);
    } catch (error) {
      messageError(error.message);
    }
  }
  findAvailableHotelsByCity(cityId) {
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
const hotelService = new HotelService();

/* Entity HotelResevation (Reservas de hoteis) */
class HotelReservation {
  constructor(id, idHotel, clientName) {
    this.id = id;
    this.idHotel = idHotel;
    this.clientName = clientName;
  }
}

class HotelReservationService {
  constructor(database, hotelService, cityService) {
    this.database = database;
    this.hotelService = hotelService;
    this.cityService = cityService;
  }
  createReservation(idHotel, nameClient) {
    try {
      const hotel = hotelService.findById(idHotel);
      if (!isEmpty(hotel) && hotel.availableRooms > 0) {
        const id = database.generateIdHotelReservation();
        hotelService.reservateRoom(hotel);
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
  cancelReservation(reservationId) {
    try {
      const reservation = hotelReservationService.findById(reservationId);
      if (!isEmpty(reservation)) {
        const hotel = hotelService.findById(reservation.idHotel);
        hotelService.cancelReservateRoom(hotel);
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
    try {
      return database.findById("reservations", id);
    } catch (error) {
      messageError(error.message);
      return {};
    }
  }
  findAllDetailedReservation() {
    const reservationsDTO = [];
    try {
      const reservations = Object.values(database.findAll("reservations"));
      reservations.forEach((reservation) => {
        if (!isEmpty(reservation)) {
          const hotel = hotelService.findById(reservation.idHotel);
          const city = cityService.findById(hotel.cityId);

          reservationsDTO.push(
            new HotelReservationDTO(reservation, hotel, city)
          );
        }
      });
      return reservationsDTO;
    } catch (error) {
      messageError(error.messages);
    }
  }
}
const hotelReservationService = new HotelReservationService();

/* DTO para retornar Reservas com id, nome cliente, nome hotel e cidade hotel */
class HotelReservationDTO {
  constructor(hotelReservation, hotel, city) {
    this.reservationId = hotelReservation.id;
    this.clientName = hotelReservation.clientName;
    this.hotelName = hotel.name;
    this.cityName = city.name;
  }
}

/* Criação de menu para iteração com usuário */
function menuPrincipal() {
  const menu = () => {
    title();
    console.log(
      " - INICIO - \n".yellow,
      `[0] ENCERRAR\n`.red,
      `[1] Cidades\n [2] Hotéis\n [3] Reservas`.blue
    );
  };
  menu();
  let option = parseInt(prompt("Digite uma opção> "));
  while (option < 0 || option > 3) {
    delay(2000, "ERRO - Opção inválida!", menu());
    option = parseInt(prompt("Digite uma opção> "));
  }
  switch (option) {
    case 0:
      delay(2000, "Encerrando sistema...", "");
      return;
    case 1:
      citySubmenu();
      break;
    case 2:
      hotelSubmenu();
      break;
    case 3:
      hotelReservationSubmenu();
      break;
    default:
      menu();
      break;
  }
}

function citySubmenu() {
  const submenu = () => {
    title();
    console.log(
      " - INICIO / CIDADES - \n".green,
      `[0] Voltar ao menu inicial\n`.red,
      `[1] Cadastrar\n [2] Ver todas\n [3] Pesquisar`.blue
    );
  };
  submenu();
  let option = parseInt(prompt("Digite uma opção> "));
  while (option < 0 || option > 3) {
    delay(2000, "ERRO - Opção inválida!", menu());
    option = parseInt(prompt("Digite uma opção> "));
  }
  switch (option) {
    case 0:
      menuPrincipal();
    case 1:
      //cadastrar cidade;
      break;
    case 2:
      //ver todas as cidades
      break;
    case 3:
      //pesquisar cidades
      break;
    default:
      menu();
      break;
  }
}

function hotelSubmenu() {
  const submenu = () => {
    title();
    console.log(
      ` - INICIO / HOTÉIS - \n`.green,
      `[0] Voltar ao menu inicial\n`.red,
      `[1] Cadastrar\n [2] Ver todos\n [3] Pesquisar\n [4] Consultar por cidade`
        .blue
    );
  };
  submenu();
  let option = parseInt(prompt("Digite uma opção> "));
  while (option < 0 || option > 3) {
    delay(2000, "ERRO - Opção inválida!", menu());
    option = parseInt(prompt("Digite uma opção> "));
  }
  switch (option) {
    case 0:
      menuPrincipal();
    case 1:
      //cadastrar hotel;
      break;
    case 2:
      //ver todas os hoteis
      break;
    case 3:
      //pesquisar hotéis
      break;
    case 4:
      //pesquisar hotéis disponíveis por cidade
      break;
    default:
      menu();
      break;
  }
}

function hotelReservationSubmenu() {
  const submenu = () => {
    title();
    console.log(
      ` - INICIO / RESERVAS - \n`.green,
      `[0] Voltar ao menu inicial\n`.red,
      `[1] Cadastrar\n [2] Ver todos\n [3] Pesquisar\n [4] Cancelar`.blue
    );
  };
  submenu();
  let option = parseInt(prompt("Digite uma opção> "));
  while (option < 0 || option > 3) {
    delay(2000, "ERRO - Opção inválida!", menu());
    option = parseInt(prompt("Digite uma opção> "));
  }
  switch (option) {
    case 0:
      menuPrincipal();
    case 1:
      //cadastrar reserva;
      break;
    case 2:
      //ver todas as reservas
      break;
    case 3:
      //pesquisar reservas
      break;
    case 4:
      //cancelar reserva
      break;
    default:
      menu();
      break;
  }
}

function title() {
  console.clear();
  console.log(" ---- RESERVAS DE HOTÉIS ---- ");
}

function delay(seconds, message, callback) {
  console.log(message);
  setTimeout(() => {
    callback;
  }, seconds);
}

// TESTES PARA CIDADES
cityService.createCity("Rio de Janeiro");
cityService.createCity("Porto Alegre");
cityService.createCity("Canoas");

// TESTES PARA HOTEL
hotelService.createHotel("Copa Cabana Palace", 1, 2);
hotelService.createHotel("Ibis", 1, 5);
hotelService.createHotel("Ibis", 2, 5);
hotelService.createHotel("Canoas Hotel", 3, 3);

// TESTES PARA FILTRO HOTÉIS DISPONIVEIS POR CIDADE
console.log("TESTE FILTRO CIDADE / HOTEL");
console.log(hotelService.findAvailableHotelsByCity(1));

// TESTES PARA RESERVAS
hotelReservationService.createReservation(1, "Pedro");
hotelReservationService.createReservation(1, "João");
hotelReservationService.createReservation(3, "Henrique");
hotelReservationService.createReservation(3, "Maria");

/*
  IMPLEMENTAÇÕES
 - INCLUIR FUNÇÃO DE CHECK=IN E CHECK-OUT NAS RESERVAS
 - VER DEMAIS REQUISITOS
 */

menuPrincipal();
