const prompt = require("prompt-sync")();
const colors = require("colors");

console.log(`\n --- EXERCICIO 50 ---`);

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

// Gerador de ids
const idGeneration = () => {
  let nextId = 1;
  return () => nextId++;
};
// Gerador de id para Hotel
const getIdHotel = idGeneration();
// Gerador de id para Reserva
const getIdResevation = idGeneration();

class Hotel {
  constructor(name, city, numberOfRooms) {
    this.id = getIdHotel();
    this.name = name;
    this.city = city;
    this.numberOfRooms = numberOfRooms;
    this.availableRooms = this.numberOfRooms;
    this.reservedRooms = 0;
  }

  getAvailableRooms() {
    if (this.availableRooms > 0) return this.availableRooms;
    return null;
  }

  bookRoom(rooms) {
    if (this.availableRooms >= rooms) {
      this.reservedRooms += rooms;
      this.availableRooms -= rooms;
      return true;
    }
    return false;
  }
}

class HotelResevation {
  constructor(idHotel, nameClient) {
    this.idResevation = getIdResevation();
    this.idHotel = idHotel;
    this.nameClient = nameClient;
  }
}

const h1 = new Hotel("Copacabana Palace", "Rio de Janeiro", 200);
const h2 = new Hotel("Ibis", "Porto Alegre", 150);
const r1 = new HotelResevation(1, "Pedro");
const r2 = new HotelResevation(2, "Joao");
console.log(h1, h2);
console.log(r1, r2);
