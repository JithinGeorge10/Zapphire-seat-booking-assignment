import { AddUserInput, AddUserOutput, GetUserOutput } from "./userRepository.types";

export interface IUserRepository {
  [x: string]: any;
  cancelSeat(userId: any): unknown;
  bookedSeat(): unknown;
  bookSeat(user: any, seatNumber: any): unknown;
  addUser(userData: AddUserInput): Promise<AddUserOutput>;  
  getUserByEmail(email: string) : Promise<GetUserOutput>;
}
