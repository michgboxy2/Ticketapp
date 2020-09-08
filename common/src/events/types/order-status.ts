export enum OrderStatus {
  //when the order has been created but the ticket has not been reserved
  Created = "created",

  //The ticket the order is trying to reserv or reserved or when the user has cancelled the order
  Cancelled = "cancelled",

  //The order has successfully reserved the ticket
  AwaitingPayment = "awaiting:payment",

  //The order has reserved the ticket and the user has provided payment successfully
  Complete = "complete",
}
